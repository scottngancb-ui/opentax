import { dirname, join } from "@std/path";
import { ensureDir } from "@std/fs";
import type { z } from "zod";
import type { FormDefinition } from "../../core/types/form-definition.ts";
import type { NodeRegistry } from "../../core/types/node-registry.ts";
import type { NodeDoc } from "../../forms/f1040/nodes/doc.ts";
import { Topic } from "../../forms/f1040/nodes/doc.ts";
import { catalog } from "../../catalog.ts";
import type { FieldSpec } from "./schema-fields.ts";
import { objectFields } from "./schema-fields.ts";
import { NodeKind } from "./explore-trace.ts";
import { renderAtlasHtml } from "./atlas-page.ts";
import type { DocIndex } from "./form-docs.ts";
import { docsFor } from "./form-docs.ts";

export enum EntryMode {
  // One entry per document received (W-2s, 1099s, ...).
  Multiple = "multiple",
  // Entered once per return.
  Single = "single",
  // Filled in by the engine from other forms.
  Computed = "computed",
}

export type AtlasField = Omit<FieldSpec, "children"> & {
  readonly optionNotes?: Readonly<Record<string, string>>;
  readonly children?: readonly AtlasField[];
};

export type AtlasForm = {
  readonly nodeType: string;
  readonly kind: NodeKind;
  readonly entry: EntryMode;
  readonly title: string;
  readonly subtitle: string;
  readonly topic: string;
  readonly summary: string;
  readonly documented: boolean;
  // False for a computed form that nothing sends data to, so it never runs.
  readonly reachable: boolean;
  readonly fields: readonly AtlasField[];
  // Forms this one sends data to, and forms that send data to it.
  readonly feeds: readonly string[];
  readonly fedBy: readonly string[];
};

export type AtlasData = {
  readonly formType: string;
  readonly taxYear: number;
  // Display order for topic groups.
  readonly topics: readonly string[];
  readonly forms: readonly AtlasForm[];
};

// The start node only fans entries out to input nodes; it is not a form.
const HIDDEN = new Set(["start"]);

const UNDOCUMENTED_TOPIC = "Not yet documented";

function schemaFor(def: FormDefinition, nodeType: string): z.ZodTypeAny {
  const entry = def.inputNodes.find((e) => e.node.nodeType === nodeType);
  if (!entry) return def.registry[nodeType].inputSchema;
  return entry.isArray ? entry.itemSchema : entry.inputSchema;
}

function entryMode(def: FormDefinition, nodeType: string): EntryMode {
  const entry = def.inputNodes.find((e) => e.node.nodeType === nodeType);
  if (!entry) return EntryMode.Computed;
  return entry.isArray ? EntryMode.Multiple : EntryMode.Single;
}

function kindOf(def: FormDefinition, nodeType: string): NodeKind {
  if (nodeType === def.formType) return NodeKind.Result;
  return def.inputNodes.some((e) => e.node.nodeType === nodeType) ? NodeKind.Input : NodeKind.Computed;
}

function withDocs(fields: readonly FieldSpec[], doc: NodeDoc | undefined, prefix = ""): AtlasField[] {
  return fields.map((f) => {
    const path = prefix + f.key;
    const description = doc?.fields[path] ?? f.description;
    const optionNotes = doc?.options?.[path];
    const { children: _children, ...rest } = f;
    return {
      ...rest,
      ...(description ? { description } : {}),
      ...(optionNotes ? { optionNotes } : {}),
      ...(f.children ? { children: withDocs(f.children, doc, path + ".") } : {}),
    };
  });
}

function fedByIndex(registry: NodeRegistry): Record<string, string[]> {
  return Object.entries(registry).reduce<Record<string, string[]>>((acc, [from, node]) =>
    node.outputNodeTypes.reduce((inner, to) => ({ ...inner, [to]: [...(inner[to] ?? []), from] }), acc), {});
}

function atlasForm(def: FormDefinition, nodeType: string, doc: NodeDoc | undefined, fedBy: readonly string[]): AtlasForm {
  const visible = (t: string) => t !== nodeType && !HIDDEN.has(t) && t in def.registry;
  const entry = entryMode(def, nodeType);
  return {
    nodeType,
    kind: kindOf(def, nodeType),
    entry,
    reachable: entry !== EntryMode.Computed || fedBy.some((t) => t !== nodeType),
    title: doc?.title ?? nodeType,
    subtitle: doc?.subtitle ?? "",
    topic: doc?.topic ?? UNDOCUMENTED_TOPIC,
    summary: doc?.summary ?? "This form has no documentation yet. Its fields are listed from the engine's schema.",
    documented: doc !== undefined,
    fields: withDocs(objectFields(schemaFor(def, nodeType)), doc),
    feeds: [...new Set(def.registry[nodeType].outputNodeTypes)].filter(visible),
    fedBy: [...new Set(fedBy)].filter(visible),
  };
}

/** Every form in the definition, with its documentation, fields and connections. */
export function buildAtlas(def: FormDefinition, docs: DocIndex): AtlasData {
  const fedBy = fedByIndex(def.registry);
  return {
    formType: def.formType,
    taxYear: def.taxYear,
    topics: [...Object.values(Topic), UNDOCUMENTED_TOPIC],
    forms: Object.keys(def.registry)
      .filter((t) => !HIDDEN.has(t))
      .map((t) => atlasForm(def, t, docs[t], fedBy[t] ?? [])),
  };
}

/** Node types in the definition that have no doc.ts. */
export function undocumentedNodes(def: FormDefinition, docs: DocIndex): string[] {
  return Object.keys(def.registry).filter((t) => !HIDDEN.has(t) && !(t in docs));
}

export type AtlasArgs = {
  readonly formType?: string;
  readonly year?: number;
  readonly outputPath?: string;
};

/**
 * CLI handler for `opentax node explore`. Writes a self-contained HTML reference
 * of every form: what it is for, its fields, and how it connects to other forms.
 */
export async function atlasCommand(args: AtlasArgs): Promise<{ output: string; forms: number; undocumented: string[] }> {
  const key = `${args.formType ?? "f1040"}:${args.year ?? 2025}`;
  const def = catalog[key];
  const docs = docsFor(key);
  if (!def || !docs) throw new Error(`Unsupported form: ${key}`);
  const data = buildAtlas(def, docs);
  const output = args.outputPath ?? join(".state", "explore", `${def.formType}-${def.taxYear}-forms.html`);
  await ensureDir(dirname(output));
  await Deno.writeTextFile(output, renderAtlasHtml(data));
  return { output, forms: data.forms.length, undocumented: undocumentedNodes(def, docs) };
}
