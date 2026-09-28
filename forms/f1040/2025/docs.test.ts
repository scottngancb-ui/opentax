import { assert, assertEquals } from "@std/assert";
import type { z } from "zod";
import { fieldPaths, type FieldSpec, objectFields } from "../../../cli/commands/schema-fields.ts";
import { Topic } from "../nodes/doc.ts";
import { docs } from "./docs.ts";
import { inputNodes } from "./inputs.ts";
import { registry } from "./registry.ts";

// The start node fans entries out to input nodes; it is not a form.
const documentedTypes = Object.keys(registry).filter((t) => t !== "start");

function schemaFor(nodeType: string): z.ZodTypeAny {
  const entry = inputNodes.find((e) => e.node.nodeType === nodeType);
  if (!entry) return registry[nodeType].inputSchema;
  return entry.isArray ? entry.itemSchema : entry.inputSchema;
}

function optionsByPath(fields: readonly FieldSpec[], prefix = ""): Map<string, readonly string[]> {
  return new Map(fields.flatMap((f) => [
    ...(f.options ? [[prefix + f.key, f.options] as const] : []),
    ...(f.children ? [...optionsByPath(f.children, prefix + f.key + ".")] : []),
  ]));
}

Deno.test("every registered node has a doc", () => {
  const missing = documentedTypes.filter((t) => !(t in docs));
  assertEquals(missing, [], `add a doc.ts next to each node and list it in docs.ts: ${missing.join(", ")}`);
});

Deno.test("docs only describe nodes that are registered", () => {
  assertEquals(Object.keys(docs).filter((t) => !(t in registry)), []);
});

Deno.test("docs have a title, subtitle, known topic and a real summary", () => {
  const topics = new Set<string>(Object.values(Topic));
  for (const [t, d] of Object.entries(docs)) {
    assert(d.title.trim().length > 0, `${t}: title`);
    assert(d.subtitle.trim().length > 0, `${t}: subtitle`);
    assert(topics.has(d.topic), `${t}: topic`);
    assert(d.summary.length >= 80, `${t}: summary too short`);
  }
});

Deno.test("doc fields exist in the node's schema", () => {
  for (const [t, d] of Object.entries(docs)) {
    const paths = new Set(fieldPaths(objectFields(schemaFor(t))));
    const stale = Object.keys(d.fields).filter((k) => !paths.has(k));
    assertEquals(stale, [], `${t}: documents fields that are not in its schema`);
  }
});

Deno.test("doc option notes explain real option values", () => {
  for (const [t, d] of Object.entries(docs)) {
    const valid = optionsByPath(objectFields(schemaFor(t)));
    for (const [path, notes] of Object.entries(d.options ?? {})) {
      const options = valid.get(path);
      assert(options, `${t}: options for "${path}", which has no coded choices`);
      const unknown = Object.keys(notes).filter((v) => !options.includes(v));
      assertEquals(unknown, [], `${t}: "${path}" explains values it does not have`);
    }
  }
});
