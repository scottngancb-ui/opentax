import { assert, assertEquals } from "@std/assert";
import { inputNodes } from "./inputs.ts";
import { registry } from "./registry.ts";
import { situations } from "./situations.ts";

const inputTypes = new Set(inputNodes.map((e) => e.node.nodeType));

function downstream(start: readonly string[]): Set<string> {
  const seen = new Set<string>(start);
  const queue = [...start];
  while (queue.length) {
    const n = queue.shift() ?? "";
    for (const m of registry[n]?.outputNodeTypes ?? []) {
      if (!seen.has(m)) {
        seen.add(m);
        queue.push(m);
      }
    }
  }
  return seen;
}

Deno.test("situation ids are unique", () => {
  const ids = situations.map((s) => s.id);
  assertEquals(new Set(ids).size, ids.length);
});

Deno.test("situation documents are input forms", () => {
  for (const s of situations) {
    assert(s.documents.length > 0, `${s.id}: needs at least one document`);
    const bad = s.documents.filter((d) => !inputTypes.has(d));
    assertEquals(bad, [], `${s.id}: documents must be input nodes`);
  }
});

Deno.test("situation forms are reachable from its documents", () => {
  for (const s of situations) {
    const reach = downstream(s.documents);
    const bad = s.forms.filter((f) => !(f in registry) || (!reach.has(f) && !inputTypes.has(f)));
    assertEquals(bad, [], `${s.id}: forms not fed by its documents`);
  }
});

Deno.test("every situation eventually reaches Form 1040", () => {
  for (const s of situations) {
    assert(downstream(s.documents).has("f1040"), `${s.id}: documents never reach f1040`);
  }
});
