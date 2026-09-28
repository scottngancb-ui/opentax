import { basename, dirname, join } from "@std/path";
import { ensureDir } from "@std/fs";
import type { z } from "zod";
import { execute } from "../../core/runtime/executor.ts";
import { buildExecutionPlan } from "../../core/runtime/planner.ts";
import type { NodeRegistry } from "../../core/types/node-registry.ts";
import type { NodeContext } from "../../core/types/node-context.ts";
import type { FormDefinition } from "../../core/types/form-definition.ts";
import type { NodeResult } from "../../core/types/tax-node.ts";
import { TaxNode } from "../../core/types/tax-node.ts";
import { catalog } from "../../catalog.ts";
import { buildEngineInputs, loadReturn } from "../store/store.ts";
import type { InputsJson } from "../store/types.ts";
import { renderExplorerHtml } from "./explore-page.ts";

export enum NodeKind {
  Start = "start",
  Input = "input",
  Computed = "computed",
  Result = "result",
}

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

export type ExplorerData = {
  readonly title: string;
  readonly subtitle: string;
  readonly taxYear: number;
  readonly formType: string;
  readonly steps: readonly TraceStep[];
  readonly unrun: readonly UnrunNode[];
  readonly kinds: Readonly<Record<string, NodeKind>>;
  readonly result: Readonly<Record<string, unknown>>;
  readonly expected?: Readonly<Record<string, number>>;
  readonly diagnostics: readonly { readonly nodeType: string; readonly message: string }[];
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

function nodeKinds(def: FormDefinition, nodeTypes: readonly string[]): Record<string, NodeKind> {
  const inputTypes = new Set(def.inputNodes.map((e) => e.node.nodeType));
  const kindOf = (nodeType: string): NodeKind => {
    if (nodeType === "start") return NodeKind.Start;
    if (nodeType === def.formType) return NodeKind.Result;
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

export type TraceLabels = {
  readonly title: string;
  readonly subtitle: string;
  readonly expected?: Readonly<Record<string, number>>;
};

/**
 * Runs the engine with every node wrapped in a recorder, capturing what each node
 * received and what it sent where. The engine itself is unchanged.
 */
export function traceReturn(
  def: FormDefinition,
  engineInputs: Record<string, unknown>,
  labels: TraceLabels,
): ExplorerData {
  const recorded: TraceStep[] = [];
  const registry = tracedRegistry(def.registry, (step) => recorded.push(step));
  const plan = buildExecutionPlan(def.registry);
  const ctx = { taxYear: def.taxYear, formType: def.formType };
  const result = execute(plan, registry, engineInputs, ctx);
  const steps = activeSteps(recorded, result.pending);
  const unrun = unrunNodes(result.pending, steps);
  const nodeTypes = [...steps.map((s) => s.nodeType), ...unrun.map((u) => u.nodeType)];

  return {
    ...labels,
    taxYear: def.taxYear,
    formType: def.formType,
    steps,
    unrun,
    kinds: nodeKinds(def, nodeTypes),
    result: result.pending[def.formType] ?? {},
    diagnostics: result.diagnostics.map((d) => ({ nodeType: d.nodeType, message: d.message })),
  };
}

function catalogEntry(formType: string, year: number): FormDefinition {
  const def = catalog[`${formType}:${year}`];
  if (!def) throw new Error(`Unsupported form: ${formType}:${year}`);
  return def;
}

function singletonTypes(def: FormDefinition): Set<string> {
  return new Set(def.inputNodes.filter((e) => !e.isArray).map((e) => e.node.nodeType));
}

type CaseForm = { readonly node_type: string; readonly data: Record<string, unknown> };

type CaseInput = {
  readonly year: number;
  readonly scenario?: string;
  readonly source?: string;
  readonly forms: readonly CaseForm[];
};

// Groups a benchmark case's forms list into the store's InputsJson shape.
function caseInputs(forms: readonly CaseForm[]): InputsJson {
  return forms.reduce<InputsJson>((acc, form, i) => ({
    ...acc,
    [form.node_type]: [
      ...(acc[form.node_type] ?? []),
      { id: `${form.node_type}_${i + 1}`, fields: form.data },
    ],
  }), {});
}

async function readExpected(caseDir: string): Promise<Record<string, number> | undefined> {
  try {
    const parsed = JSON.parse(await Deno.readTextFile(join(caseDir, "correct.json")));
    return parsed.correct;
  } catch {
    return undefined;
  }
}

export async function traceCase(caseDir: string): Promise<ExplorerData> {
  const caseData: CaseInput = JSON.parse(await Deno.readTextFile(join(caseDir, "input.json")));
  const def = catalogEntry("f1040", caseData.year);
  const engineInputs = buildEngineInputs(caseInputs(caseData.forms), singletonTypes(def));
  const expected = await readExpected(caseDir);
  return traceReturn(def, engineInputs, {
    title: basename(caseDir),
    subtitle: [caseData.scenario, caseData.source].filter(Boolean).join(" · "),
    ...(expected ? { expected } : {}),
  });
}

export async function traceStoredReturn(returnId: string, baseDir: string): Promise<ExplorerData> {
  const { meta, inputs } = await loadReturn(join(baseDir, returnId));
  const def = catalogEntry(meta.formType ?? "f1040", meta.year);
  const engineInputs = buildEngineInputs(inputs, singletonTypes(def));
  return traceReturn(def, engineInputs, {
    title: `Return ${meta.returnId}`,
    subtitle: `Created ${meta.createdAt.slice(0, 10)}`,
  });
}

export type ExploreArgs = {
  readonly returnId?: string;
  readonly caseDir?: string;
  readonly baseDir: string;
  readonly outputPath?: string;
};

function defaultOutputPath(args: ExploreArgs): string {
  if (args.caseDir) return join(".state", "explore", `${basename(args.caseDir)}.html`);
  return join(args.baseDir, args.returnId ?? "", "explore.html");
}

/**
 * CLI handler for `opentax return explore`. Writes a self-contained HTML page
 * that shows how every line of the return was derived.
 */
export async function exploreCommand(
  args: ExploreArgs,
): Promise<{ output: string; nodes: number }> {
  if (!args.returnId && !args.caseDir) throw new Error("Pass --returnId or --case");
  const data = args.caseDir
    ? await traceCase(args.caseDir)
    : await traceStoredReturn(args.returnId ?? "", args.baseDir);
  const output = args.outputPath ?? defaultOutputPath(args);
  await ensureDir(dirname(output));
  await Deno.writeTextFile(output, renderExplorerHtml(data));
  return { output, nodes: data.steps.length + data.unrun.length };
}
