// Browser-safe: no Deno APIs. This module is bundled into the explorer page so the
// page can re-run the engine when entries are edited.
import { z } from "zod";
import { execute } from "../../core/runtime/executor.ts";
import { buildExecutionPlan } from "../../core/runtime/planner.ts";
import type { NodeRegistry } from "../../core/types/node-registry.ts";
import type { NodeContext } from "../../core/types/node-context.ts";
import type { FormDefinition } from "../../core/types/form-definition.ts";
import type { NodeResult } from "../../core/types/tax-node.ts";
import { TaxNode } from "../../core/types/tax-node.ts";

export enum NodeKind {
  Start = "start",
  Input = "input",
  Computed = "computed",
  Result = "result",
}

export enum FieldKind {
  Number = "number",
  Boolean = "boolean",
  Enum = "enum",
  Text = "text",
  Json = "json",
}

// The engine pieces a trace needs; FormDefinition minus the exporters.
export type TraceEngine = Pick<FormDefinition, "formType" | "taxYear" | "inputNodes" | "registry">;

// One entered document: a W-2, a 1099-INT, the general filer info, ...
export type Entry = {
  readonly nodeType: string;
  readonly data: Readonly<Record<string, unknown>>;
};

export type TraceOutput = {
  readonly to: string;
  readonly fields: Readonly<Record<string, unknown>>;
};

// One compute() call: the validated input the node saw and every deposit it made downstream.
export type TraceStep = {
  readonly nodeType: string;
  readonly input: Readonly<Record<string, unknown>>;
  readonly outputs: readonly TraceOutput[];
};

// A node that received data but never computed (its input failed validation).
export type UnrunNode = {
  readonly nodeType: string;
  readonly input: Readonly<Record<string, unknown>>;
};

export type TraceLabels = {
  readonly title: string;
  readonly subtitle: string;
  readonly expected?: Readonly<Record<string, number>>;
};

export type ExplorerData = TraceLabels & {
  readonly taxYear: number;
  readonly formType: string;
  readonly entries: readonly Entry[];
  readonly steps: readonly TraceStep[];
  readonly unrun: readonly UnrunNode[];
  readonly kinds: Readonly<Record<string, NodeKind>>;
  readonly result: Readonly<Record<string, unknown>>;
  readonly diagnostics: readonly { readonly nodeType: string; readonly message: string }[];
};

export type FieldSpec = {
  readonly key: string;
  readonly kind: FieldKind;
  readonly required: boolean;
  readonly options?: readonly string[];
};

export type InputSpec = {
  readonly nodeType: string;
  readonly isArray: boolean;
  readonly fields: readonly FieldSpec[];
};

// Delegates to a real node and reports each compute() call to a recorder.
class TracedNode extends TaxNode {
  readonly nodeType: string;
  readonly inputSchema: z.ZodTypeAny;
  readonly outputNodes: TaxNode["outputNodes"];
  override readonly implemented: boolean;

  constructor(
    private readonly inner: TaxNode,
    private readonly record: (step: TraceStep) => void,
  ) {
    super();
    this.nodeType = inner.nodeType;
    this.inputSchema = inner.inputSchema;
    this.outputNodes = inner.outputNodes;
    this.implemented = inner.implemented;
  }

  compute(ctx: NodeContext, input: unknown): NodeResult {
    const result = this.inner.compute(ctx, input);
    this.record({
      nodeType: this.nodeType,
      input: toRecord(input),
      outputs: result.outputs.map((o) => ({ to: o.nodeType, fields: o.fields })),
    });
    return result;
  }
}

function toRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? { ...value }
    : { value };
}

function tracedRegistry(
  registry: NodeRegistry,
  record: (step: TraceStep) => void,
): NodeRegistry {
  return Object.fromEntries(
    Object.entries(registry).map(([key, node]) => [key, new TracedNode(node, record)]),
  );
}

function nodeKinds(engine: TraceEngine, nodeTypes: readonly string[]): Record<string, NodeKind> {
  const inputTypes = new Set(engine.inputNodes.map((e) => e.node.nodeType));
  const kindOf = (nodeType: string): NodeKind => {
    if (nodeType === "start") return NodeKind.Start;
    if (nodeType === engine.formType) return NodeKind.Result;
    if (inputTypes.has(nodeType)) return NodeKind.Input;
    return NodeKind.Computed;
  };
  return Object.fromEntries(nodeTypes.map((t) => [t, kindOf(t)]));
}

function hasFields(fields: Readonly<Record<string, unknown>>): boolean {
  return Object.keys(fields).length > 0;
}

// Most registered nodes run with nothing deposited (their input is only schema defaults)
// and emit nothing; they are noise here.
function activeSteps(
  steps: readonly TraceStep[],
  pending: Readonly<Record<string, Record<string, unknown>>>,
): TraceStep[] {
  return steps
    .map((s) => ({ ...s, outputs: s.outputs.filter((o) => hasFields(o.fields)) }))
    .filter((s) => hasFields(pending[s.nodeType] ?? {}) || s.outputs.length > 0);
}

function unrunNodes(
  pending: Readonly<Record<string, Record<string, unknown>>>,
  steps: readonly TraceStep[],
): UnrunNode[] {
  const ran = new Set(steps.map((s) => s.nodeType));
  return Object.entries(pending)
    .filter(([nodeType, input]) => !ran.has(nodeType) && hasFields(input))
    .map(([nodeType, input]) => ({ nodeType, input }));
}

function singletonTypes(engine: TraceEngine): Set<string> {
  return new Set(engine.inputNodes.filter((e) => !e.isArray).map((e) => e.node.nodeType));
}

/**
 * Builds the start node's input from entries, matching the CLI store's rules:
 * singleton documents take the first entry, repeatable documents collect into an array.
 */
export function entriesToEngineInputs(
  engine: TraceEngine,
  entries: readonly Entry[],
): Record<string, unknown> {
  const singletons = singletonTypes(engine);
  return entries.reduce<Record<string, unknown>>((acc, entry) => {
    const existing = acc[entry.nodeType];
    if (singletons.has(entry.nodeType)) {
      return existing === undefined ? { ...acc, [entry.nodeType]: entry.data } : acc;
    }
    const list = Array.isArray(existing) ? existing : [];
    return { ...acc, [entry.nodeType]: [...list, entry.data] };
  }, {});
}

// A "start" entry bundles several documents keyed by node type ({ general: {...}, w2: [...] }).
export function startEntries(data: Readonly<Record<string, unknown>>): Entry[] {
  return Object.entries(data).flatMap(([nodeType, value]) =>
    Array.isArray(value)
      ? value.map((item) => ({ nodeType, data: toRecord(item) }))
      : [{ nodeType, data: toRecord(value) }]
  );
}

/**
 * Runs the engine with every node wrapped in a recorder, capturing what each node
 * received and what it sent where. The engine itself is unchanged.
 */
export function traceReturn(
  engine: TraceEngine,
  entries: readonly Entry[],
  labels: TraceLabels,
): ExplorerData {
  const recorded: TraceStep[] = [];
  const registry = tracedRegistry(engine.registry, (step) => recorded.push(step));
  const plan = buildExecutionPlan(engine.registry);
  const ctx = { taxYear: engine.taxYear, formType: engine.formType };
  const result = execute(plan, registry, entriesToEngineInputs(engine, entries), ctx);
  const steps = activeSteps(recorded, result.pending);
  const unrun = unrunNodes(result.pending, steps);
  const nodeTypes = [...steps.map((s) => s.nodeType), ...unrun.map((u) => u.nodeType)];

  return {
    ...labels,
    taxYear: engine.taxYear,
    formType: engine.formType,
    entries,
    steps,
    unrun,
    kinds: nodeKinds(engine, nodeTypes),
    result: result.pending[engine.formType] ?? {},
    diagnostics: result.diagnostics.map((d) => ({ nodeType: d.nodeType, message: d.message })),
  };
}

function unwrap(schema: z.ZodTypeAny): z.ZodTypeAny {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) return unwrap(schema.unwrap());
  if (schema instanceof z.ZodDefault) return unwrap(schema.removeDefault());
  if (schema instanceof z.ZodEffects) return unwrap(schema.innerType());
  return schema;
}

function enumOptions(schema: z.ZodTypeAny): string[] | undefined {
  if (schema instanceof z.ZodEnum) return [...schema.options];
  if (schema instanceof z.ZodNativeEnum) {
    return Object.values(schema.enum as Record<string, unknown>).filter((v): v is string => typeof v === "string");
  }
  if (schema instanceof z.ZodLiteral && typeof schema.value === "string") return [schema.value];
  return undefined;
}

function fieldKind(schema: z.ZodTypeAny): FieldKind {
  if (schema instanceof z.ZodNumber) return FieldKind.Number;
  if (schema instanceof z.ZodBoolean) return FieldKind.Boolean;
  if (enumOptions(schema)) return FieldKind.Enum;
  if (schema instanceof z.ZodString) return FieldKind.Text;
  return FieldKind.Json;
}

function fieldSpec(key: string, schema: z.ZodTypeAny): FieldSpec {
  const inner = unwrap(schema);
  const options = enumOptions(inner);
  return { key, kind: fieldKind(inner), required: !schema.isOptional(), ...(options ? { options } : {}) };
}

function objectFields(schema: z.ZodTypeAny): FieldSpec[] {
  const inner = unwrap(schema);
  if (!(inner instanceof z.ZodObject)) return [];
  const shape: Record<string, z.ZodTypeAny> = inner.shape;
  return Object.entries(shape).map(([key, value]) => fieldSpec(key, value));
}

/** Describes every input document's fields so the page can build an editor for them. */
export function describeInputs(engine: TraceEngine): InputSpec[] {
  return engine.inputNodes.map((entry) => ({
    nodeType: entry.node.nodeType,
    isArray: entry.isArray,
    fields: objectFields(entry.isArray ? entry.itemSchema : entry.inputSchema),
  }));
}
