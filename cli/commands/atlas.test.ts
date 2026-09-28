import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import { catalog } from "../../catalog.ts";
import { Topic } from "../../forms/f1040/nodes/doc.ts";
import { atlasCommand, buildAtlas, EntryMode } from "./atlas.ts";
import { renderAtlasHtml } from "./atlas-page.ts";
import { docsFor } from "./form-docs.ts";
import { NodeKind } from "./explore-trace.ts";

const def = catalog["f1040:2025"];
const docs = docsFor("f1040:2025") ?? {};
const atlas = buildAtlas(def, docs);
const form = (t: string) => atlas.forms.find((f) => f.nodeType === t);

Deno.test("buildAtlas lists every registered form except the start node", () => {
  assertEquals(atlas.forms.length, Object.keys(def.registry).length - 1);
  assertEquals(form("start"), undefined);
});

Deno.test("buildAtlas classifies forms and how they are entered", () => {
  assertEquals(form("w2")?.kind, NodeKind.Input);
  assertEquals(form("w2")?.entry, EntryMode.Multiple);
  assertEquals(form("general")?.entry, EntryMode.Single);
  assertEquals(form("form8959")?.kind, NodeKind.Computed);
  assertEquals(form("form8959")?.entry, EntryMode.Computed);
  assertEquals(form("f1040")?.kind, NodeKind.Result);
});

Deno.test("buildAtlas flags computed forms that nothing feeds", () => {
  assertEquals(form("form8959")?.reachable, true);
  assertEquals(form("w2")?.reachable, true);
  const orphans = atlas.forms.filter((f) => !f.reachable);
  assert(orphans.every((f) => f.entry === EntryMode.Computed && f.fedBy.length === 0));
});

Deno.test("buildAtlas connections are symmetric", () => {
  for (const f of atlas.forms) {
    for (const to of f.feeds) assert(form(to)?.fedBy.includes(f.nodeType), `${f.nodeType} -> ${to}`);
    for (const from of f.fedBy) assert(form(from)?.feeds.includes(f.nodeType), `${from} -> ${f.nodeType}`);
  }
});

Deno.test("buildAtlas lists what the user enters for input forms", () => {
  const keys = form("w2")?.fields.map((f) => f.key) ?? [];
  assert(keys.includes("box1_wages"));
  const box12 = form("w2")?.fields.find((f) => f.key === "box12_entries");
  assertEquals(box12?.list, true);
  assert(box12?.children?.some((c) => c.key === "code"));
});

Deno.test("buildAtlas carries doc text onto forms, fields and choices", () => {
  const w2 = form("w2");
  assertEquals(w2?.title, "Form W-2");
  assertEquals(w2?.topic, Topic.Wages);
  assertEquals(w2?.documented, true);
  const code = w2?.fields.find((f) => f.key === "box12_entries")?.children?.find((c) => c.key === "code");
  assertStringIncludes(code?.optionNotes?.D ?? "", "401(k)");
});

Deno.test("buildAtlas falls back to the schema for forms without docs", () => {
  const bare = buildAtlas(def, {});
  const w2 = bare.forms.find((f) => f.nodeType === "w2");
  assertEquals(w2?.documented, false);
  assertEquals(w2?.title, "w2");
  assert((w2?.fields.length ?? 0) > 0);
});

Deno.test("renderAtlasHtml embeds the data without breaking out of the script tag", () => {
  const html = renderAtlasHtml({ ...atlas, forms: [{ ...atlas.forms[0], summary: "</script><b>x" }] });
  assertStringIncludes(html, '<script type="application/json" id="atlas-data">');
  assertEquals(html.split("</script>").length - 1, 2);
  assertStringIncludes(html, "\\u003c/script>");
});

Deno.test("atlasCommand writes the atlas page", async () => {
  const dir = await Deno.makeTempDir();
  try {
    const result = await atlasCommand({ outputPath: `${dir}/atlas.html` });
    assertEquals(result.forms, atlas.forms.length);
    assertStringIncludes(await Deno.readTextFile(result.output), "Forms Atlas");
  } finally {
    await Deno.remove(dir, { recursive: true });
  }
});
