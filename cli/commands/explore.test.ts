import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { catalog } from "../../catalog.ts";
import { exploreCommand, NodeKind, traceCase, traceReturn } from "./explore.ts";
import { renderExplorerHtml } from "./explore-page.ts";
import { createReturnCommand } from "./return.ts";
import { formAddCommand } from "./form.ts";

const def = catalog["f1040:2025"];
const CASE_DIR = new URL("../../benchmark/cases/f1040/2025/05-single-w2-interest-income", import.meta.url).pathname;

function singleW2Inputs(): Record<string, unknown> {
  return {
    general: { filing_status: "single" },
    w2: [{ box1_wages: 50000, box2_fed_withheld: 6000 }],
  };
}

Deno.test("traceReturn records each deposit with its source node", () => {
  const data = traceReturn(def, singleW2Inputs(), { title: "t", subtitle: "" });
  const w2 = data.steps.find((s) => s.nodeType === "w2");
  const toF1040 = w2?.outputs.find((o) => o.to === "f1040");
  assertEquals(toF1040?.fields.line1a_wages, 50000);
  assertEquals(data.result.line1a_wages, 50000);
});

Deno.test("traceReturn drops nodes that received nothing and sent nothing", () => {
  const data = traceReturn(def, singleW2Inputs(), { title: "t", subtitle: "" });
  const types = data.steps.map((s) => s.nodeType);
  assertEquals(types.includes("form4684"), false);
  assertEquals(types.includes("schedule_e"), false);
  assert(data.steps.every((s) => s.outputs.every((o) => Object.keys(o.fields).length > 0)));
});

Deno.test("traceReturn classifies nodes by kind", () => {
  const data = traceReturn(def, singleW2Inputs(), { title: "t", subtitle: "" });
  assertEquals(data.kinds.start, NodeKind.Start);
  assertEquals(data.kinds.w2, NodeKind.Input);
  assertEquals(data.kinds.agi_aggregator, NodeKind.Computed);
  assertEquals(data.kinds.f1040, NodeKind.Result);
});

Deno.test("traceReturn result matches the untraced engine", () => {
  const data = traceReturn(def, singleW2Inputs(), { title: "t", subtitle: "" });
  assertEquals(typeof data.result.line24_total_tax, "number");
  assertEquals(data.diagnostics.length, 0);
});

Deno.test("traceCase loads a benchmark case and its IRS answers", async () => {
  const data = await traceCase(CASE_DIR);
  assertEquals(data.title, "05-single-w2-interest-income");
  assertEquals(data.result.line24_total_tax, data.expected?.line24_total_tax);
  assertEquals(data.steps.filter((s) => s.nodeType === "f1099int").length, 1);
});

Deno.test("renderExplorerHtml embeds data without breaking out of the script tag", () => {
  const data = traceReturn(def, singleW2Inputs(), { title: "</script><b>x", subtitle: "" });
  const html = renderExplorerHtml(data);
  assertStringIncludes(html, '<script type="application/json" id="trace-data">');
  assertEquals(html.split("</script>").length - 1, 2);
  assertStringIncludes(html, "<title>&lt;/script>&lt;b>x · Return explorer</title>");
});

Deno.test("exploreCommand writes an HTML page for a stored return", async () => {
  const tmpDir = await Deno.makeTempDir();
  try {
    const { returnId } = await createReturnCommand({ year: 2025, baseDir: tmpDir });
    await formAddCommand({ returnId, nodeType: "general", dataJson: JSON.stringify({ filing_status: "single" }), baseDir: tmpDir });
    await formAddCommand({ returnId, nodeType: "w2", dataJson: JSON.stringify({ box1_wages: 40000, box2_fed_withheld: 3000 }), baseDir: tmpDir });
    const { output, nodes } = await exploreCommand({ returnId, baseDir: tmpDir });
    assertEquals(output, `${tmpDir}/${returnId}/explore.html`);
    assert(nodes > 3);
    assertStringIncludes(await Deno.readTextFile(output), '"line1a_wages":40000');
  } finally {
    await Deno.remove(tmpDir, { recursive: true });
  }
});
