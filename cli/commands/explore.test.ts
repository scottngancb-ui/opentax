import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { join } from "@std/path";
import { catalog } from "../../catalog.ts";
import { execute } from "../../core/runtime/executor.ts";
import { buildExecutionPlan } from "../../core/runtime/planner.ts";
import { buildEngineInputs } from "../store/store.ts";
import type { InputsJson } from "../store/types.ts";
import type { CaseForm, Entry } from "./explore.ts";
import { caseEntries, exploreCommand, NodeKind, traceCase, traceReturn } from "./explore.ts";
import { describeInputs, entriesToEngineInputs, FieldKind } from "./explore-trace.ts";
import { renderExplorerHtml } from "./explore-page.ts";
import { loadEngineBundle } from "./explore-bundle.ts";
import { explorerApi } from "./explore-browser.ts";
import { createReturnCommand } from "./return.ts";
import { formAddCommand } from "./form.ts";

const def = catalog["f1040:2025"];
const CASES_DIR = new URL("../../benchmark/cases/f1040/2025", import.meta.url).pathname;
const CASE_DIR = join(CASES_DIR, "05-single-w2-interest-income");
const labels = { title: "t", subtitle: "" };

function singleW2Entries(): Entry[] {
  return [
    { nodeType: "general", data: { filing_status: "single" } },
    { nodeType: "w2", data: { box1_wages: 50000, box2_fed_withheld: 6000 } },
  ];
}

// The CLI's own path from a case's forms list to engine inputs.
function storeEngineInputs(forms: readonly CaseForm[]): Record<string, unknown> {
  const inputs = forms.reduce<InputsJson>((acc, form, i) => ({
    ...acc,
    [form.node_type]: [...(acc[form.node_type] ?? []), { id: `${form.node_type}_${i}`, fields: form.data }],
  }), {});
  const singletons = new Set(def.inputNodes.filter((e) => !e.isArray).map((e) => e.node.nodeType));
  return buildEngineInputs(inputs, singletons);
}

Deno.test("traceReturn records each deposit with its source node", () => {
  const data = traceReturn(def, singleW2Entries(), labels);
  const w2 = data.steps.find((s) => s.nodeType === "w2");
  const toF1040 = w2?.outputs.find((o) => o.to === "f1040");
  assertEquals(toF1040?.fields.line1a_wages, 50000);
  assertEquals(data.result.line1a_wages, 50000);
  assertEquals(data.entries, singleW2Entries());
});

Deno.test("traceReturn drops nodes that received nothing and sent nothing", () => {
  const data = traceReturn(def, singleW2Entries(), labels);
  const types = data.steps.map((s) => s.nodeType);
  assertEquals(types.includes("form4684"), false);
  assertEquals(types.includes("schedule_e"), false);
  assert(data.steps.every((s) => s.outputs.every((o) => Object.keys(o.fields).length > 0)));
});

Deno.test("traceReturn classifies nodes by kind", () => {
  const data = traceReturn(def, singleW2Entries(), labels);
  assertEquals(data.kinds.start, NodeKind.Start);
  assertEquals(data.kinds.w2, NodeKind.Input);
  assertEquals(data.kinds.agi_aggregator, NodeKind.Computed);
  assertEquals(data.kinds.f1040, NodeKind.Result);
});

Deno.test("entriesToEngineInputs keeps the first singleton and collects repeatable documents", () => {
  const inputs = entriesToEngineInputs(def, [
    { nodeType: "general", data: { filing_status: "single" } },
    { nodeType: "general", data: { filing_status: "mfj" } },
    { nodeType: "w2", data: { box1_wages: 1 } },
    { nodeType: "w2", data: { box1_wages: 2 } },
  ]);
  assertEquals(inputs, {
    general: { filing_status: "single" },
    w2: [{ box1_wages: 1 }, { box1_wages: 2 }],
  });
});

Deno.test("caseEntries splits a start entry into one entry per document", () => {
  const entries = caseEntries([
    { node_type: "start", data: { general: { filing_status: "single" }, w2: [{ box1_wages: 1 }, { box1_wages: 2 }] } },
    { node_type: "f1099int", data: { box1: 5 } },
  ]);
  assertEquals(entries.map((e) => e.nodeType), ["general", "w2", "w2", "f1099int"]);
});

Deno.test("traced results match the CLI engine path on every benchmark case", async () => {
  const plan = buildExecutionPlan(def.registry);
  for await (const dir of Deno.readDir(CASES_DIR)) {
    if (!dir.isDirectory) continue;
    const caseDir = join(CASES_DIR, dir.name);
    const forms: CaseForm[] = JSON.parse(await Deno.readTextFile(join(caseDir, "input.json"))).forms;
    const direct = execute(plan, def.registry, storeEngineInputs(forms), { taxYear: 2025, formType: "f1040" });
    const traced = await traceCase(caseDir);
    assertEquals(traced.result, direct.pending.f1040 ?? {}, dir.name);
  }
});

Deno.test("traceCase loads a benchmark case and its IRS answers", async () => {
  const data = await traceCase(CASE_DIR);
  assertEquals(data.title, "05-single-w2-interest-income");
  assertEquals(data.result.line24_total_tax, data.expected?.line24_total_tax);
  assertEquals(data.entries.filter((e) => e.nodeType === "f1099int").length, 2);
});

Deno.test("describeInputs reports field kinds from the input schemas", () => {
  const specs = describeInputs(def);
  const w2 = specs.find((s) => s.nodeType === "w2");
  const wages = w2?.fields.find((f) => f.key === "box1_wages");
  assertEquals(w2?.isArray, true);
  assertEquals(wages?.kind, FieldKind.Number);
  assertEquals(wages?.required, true);
  const status = specs.find((s) => s.nodeType === "general")?.fields.find((f) => f.key === "filing_status");
  assertEquals(status?.kind, FieldKind.Enum);
  assert((status?.options ?? []).includes("single"));
});

Deno.test("in-browser engine API produces the same trace as the CLI", () => {
  assertEquals(explorerApi.supports("f1040:2025"), true);
  assertEquals(explorerApi.trace("f1040:2025", singleW2Entries(), labels), traceReturn(def, singleW2Entries(), labels));
});

Deno.test("renderExplorerHtml embeds data without breaking out of the script tag", () => {
  const data = traceReturn(def, singleW2Entries(), { title: "</script><b>x", subtitle: "" });
  const html = renderExplorerHtml(data);
  assertStringIncludes(html, '<script type="application/json" id="trace-data">');
  assertEquals(html.split("</script>").length - 1, 3);
  assertStringIncludes(html, "<title>&lt;/script>&lt;b>x · Return explorer</title>");
});

Deno.test("renderExplorerHtml embeds the engine as a module that cannot close its script tag", () => {
  const data = traceReturn(def, singleW2Entries(), labels);
  const html = renderExplorerHtml(data, { engine: 'const s = "</script>"; globalThis.x = s;' });
  assertStringIncludes(html, '<script type="module">const s = "<\\/script>";');
  assertEquals(html.split("</script>").length - 1, 4);
});

Deno.test("loadEngineBundle bundles the in-browser engine from source", async () => {
  const bundle = await loadEngineBundle();
  assert(bundle !== undefined, "bundle should build when running under deno with --allow-run");
  assertStringIncludes(bundle, "OpenTaxExplorer");
  assertEquals(/Deno\./.test(bundle), false);
});

Deno.test("exploreCommand writes an editable HTML page for a stored return", async () => {
  const tmpDir = await Deno.makeTempDir();
  try {
    const { returnId } = await createReturnCommand({ year: 2025, baseDir: tmpDir });
    await formAddCommand({ returnId, nodeType: "general", dataJson: JSON.stringify({ filing_status: "single" }), baseDir: tmpDir });
    await formAddCommand({ returnId, nodeType: "w2", dataJson: JSON.stringify({ box1_wages: 40000, box2_fed_withheld: 3000 }), baseDir: tmpDir });
    const { output, nodes, editable } = await exploreCommand({ returnId, baseDir: tmpDir });
    assertEquals(output, `${tmpDir}/${returnId}/explore.html`);
    assert(nodes > 3);
    assertEquals(editable, true);
    const html = await Deno.readTextFile(output);
    assertStringIncludes(html, '"line1a_wages":40000');
    assertStringIncludes(html, '<script type="module">');
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});
