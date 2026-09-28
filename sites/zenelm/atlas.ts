// Zenelm's branded build of the forms atlas (`opentax node explore`).
//
// The atlas page itself is unbranded; this swaps in the Zenelm design tokens,
// fonts and overrides, adds the wordmark and ink band, and replaces the footer
// with the notices the AGPL v3 requires for a published modified version.
//
//   deno task zenelm-atlas                       # full HTML document for a website
//   deno task zenelm-atlas --fragment <out.html> # body only, for hosts that add <head>
//
// Licensed under AGPL v3 like the rest of this repository; see README.md here.
import { catalog } from "../../catalog.ts";
import { buildAtlas } from "../../cli/commands/atlas.ts";
import { renderAtlasFragment, renderAtlasHtml } from "../../cli/commands/atlas-page.ts";
import { docsFor, situationsFor } from "../../cli/commands/form-docs.ts";
import { FONTS, THEME_CSS } from "../../cli/commands/page-theme.ts";

// Where visitors can get the complete source of the page as published (AGPL §6, §13).
export const SOURCE_URL = "https://github.com/scottngancb-ui/opentax";
export const LICENSE_URL = "https://www.gnu.org/licenses/agpl-3.0.html";
// When Zenelm last modified this build (AGPL §5a: a relevant date).
export const MODIFIED = "September 2026";

const ZEN_FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap" rel="stylesheet">';

// Zenelm tokens, plus the atlas's own token names mapped onto them. One light theme only.
const ZEN_THEME = `
:root {
  color-scheme: light;
  --bg: #f1f2ef;
  --surface: #fbfbf9;
  --panel: #e8ebe7;
  --ink: #1f3a34;
  --ink-soft: #1f3a34b3;
  --bg-soft: #f1f2efb3;
  --accent: #8fae7b;
  --accent-deep: #5e7f63;
  --accent-glow: #8fae7b59;
  --border: #1f3a341f;
  --border-strong: #1f3a344d;
  --font-heading: "Shippori Mincho", serif;
  --font-body: "Zen Kaku Gothic New", sans-serif;
  --font-mono: ui-monospace, Menlo, monospace;
  --space-1: 4px; --space-2: 8px; --space-3: 16px; --space-4: 24px; --space-5: 32px;
  --space-6: 48px; --space-7: 64px; --space-8: 96px; --space-9: 128px;
  --radius-none: 0px;
  /* matcha at low strength, for selected rows and computed forms */
  --matcha-tint: #8fae7b2e;
  /* the same tint made opaque over surface, for map boxes drawn over edges */
  --matcha-solid: #e2e9dc;
  /* ink scrim behind the quick-look dialog */
  --ink-scrim: #1f3a3466;

  /* atlas token names */
  --paper: var(--bg);
  --sunk: var(--bg);
  --ink-2: var(--ink-soft);
  --ink-3: var(--ink-soft);
  --rule: var(--border);
  --edge: var(--border-strong);
  --accent-soft: var(--matcha-tint);
  --entry: var(--ink);
  --entry-soft: var(--surface);
  --result-bg: var(--ink);
  --result-ink: var(--bg);
  --ok: var(--accent-deep);
  --bad: var(--ink);
  --bad-soft: var(--surface);
  --sans: var(--font-body);
  --cond: var(--font-body);
  --mono: var(--font-mono);
}
* { box-sizing: border-box; }
html, body { margin: 0; }
body { background: var(--bg); color: var(--ink); font: 16px/1.6 var(--font-body); padding-inline: var(--space-3); padding-block: var(--space-5) var(--space-7); }
.wrap { max-width: 1360px; margin: 0 auto; display: grid; gap: var(--space-5); }
button { font: inherit; color: inherit; }
button:focus-visible, summary:focus-visible, input:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.num { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.eyebrow { font: 11px/1.3 var(--font-mono); letter-spacing: 0.24em; text-transform: uppercase; color: var(--accent-deep); }
`;

const ZEN_OVERRIDES = `
/* ---- Zenelm overrides ---- */
*, *::before, *::after { border-radius: 0 !important; box-shadow: none !important; }
.wordmark { font-family: var(--font-heading); font-weight: 500; font-size: 28px; letter-spacing: -0.02em; color: var(--ink); line-height: 1; }
header.top { gap: var(--space-4); padding-block: var(--space-6) var(--space-5); }
header.top .eyebrow { margin-top: var(--space-5); }
header.top h1 { font-family: var(--font-heading); font-weight: 500; font-size: clamp(40px, 8vw, 72px); line-height: 1.04; letter-spacing: -0.02em; margin: 0; }
header.top p { font: 400 19px/1.55 var(--font-body); color: var(--ink-soft); max-width: 62ch; }

.zn-band { background: var(--ink); color: var(--bg); padding: var(--space-7) var(--space-4); display: grid; gap: var(--space-4); }
.zn-band .eyebrow { color: var(--accent); }
.zn-band .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-5); margin: 0; }
.zn-band .stat { display: grid; gap: var(--space-2); }
.zn-band .stat-n { font-family: var(--font-heading); font-weight: 600; font-size: clamp(40px, 6vw, 64px); line-height: 1; letter-spacing: -0.01em; color: var(--accent); }
.zn-band .stat-l { font: 14px/1.4 var(--font-body); color: var(--bg-soft); }

.atlas { gap: var(--space-5); }
.side, .detail { background: var(--surface); border: 1px solid var(--border); }
.side-head { padding: var(--space-4); gap: var(--space-3); }
.search { height: 44px; padding: 0 var(--space-3); background: var(--bg); border: 1px solid var(--border-strong); font: 16px var(--font-body); }
.search:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.segs { border: 1px solid var(--border-strong); }
.seg { font: 500 14px/1.4 var(--font-body); padding: 6px var(--space-3); background: transparent; color: var(--ink-soft); }
.seg + .seg { border-left: 1px solid var(--border-strong); }
.seg[aria-pressed="true"] { background: var(--ink); color: var(--bg); }
.count { font: 11px/1.3 var(--font-mono); letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); }
.group > .eyebrow { padding: var(--space-4) var(--space-4) var(--space-2); }
.item { padding: 10px var(--space-4); column-gap: var(--space-3); }
.item { border-left: 2px solid transparent; }
.item[aria-current="true"] { background: var(--matcha-tint); border-left-color: var(--ink); }
.it-title { font: 500 15px/1.35 var(--font-body); }
.it-sub { font-size: 13px; color: var(--ink-soft); }
.hint { color: var(--accent-deep); font-family: var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px; }
.mark.k-input { background: var(--surface); border-color: var(--ink); }
.mark.k-computed { background: var(--matcha-tint); border-color: var(--accent-deep); }
.mark.k-result { background: var(--ink); border-color: var(--ink); }

.detail { padding: var(--space-6) var(--space-5); gap: var(--space-5); }
@media (max-width: 480px) { .detail { padding: var(--space-5) var(--space-4); } }
.d-head { gap: var(--space-3); }
.pill { font: 11px/22px var(--font-mono); letter-spacing: 0.2em; text-transform: uppercase; padding: 0 var(--space-2); border: 1px solid; background: transparent; }
.pill.k-input { color: var(--ink); border-color: var(--ink); background: transparent; }
.pill.k-computed { color: var(--accent-deep); border-color: var(--accent-deep); background: var(--matcha-tint); }
.pill.k-result { color: var(--bg); background: var(--ink); border-color: var(--ink); }
.detail h2 { font-family: var(--font-heading); font-weight: 500; font-size: clamp(36px, 6vw, 56px); line-height: 1.04; letter-spacing: -0.02em; }
.d-sub { font: 400 19px/1.55 var(--font-body); color: var(--ink-soft); }
.d-sum { font: 400 16px/1.6 var(--font-body); color: var(--ink-soft); max-width: 68ch; }
.d-entry { font-size: 14px; color: var(--ink-soft); }
.fkey { font-family: var(--font-mono); color: var(--ink-soft); }
.notice { border: 1px dashed var(--ink); background: transparent; color: var(--ink); padding: var(--space-3); font-size: 14px; }

.dtabs { border-bottom: 1px solid var(--border); margin-bottom: 0; gap: var(--space-4); }
.dtab { font: 11px/1.3 var(--font-mono); letter-spacing: 0.24em; text-transform: uppercase; padding: var(--space-3) 0; color: var(--ink-soft); border-bottom: 2px solid transparent; }
.dtab[aria-selected="true"] { color: var(--ink); border-bottom-color: var(--accent); }
.dtab .n { font-size: 11px; }

.flow { background: var(--bg); border: 1px solid var(--border); padding: var(--space-4); gap: var(--space-4); }
.flow-mid { display: none; }
@media (min-width: 641px) { .flow { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
.flow h3, .fields h3 { font: 11px/1.3 var(--font-mono); letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent-deep); margin-bottom: var(--space-3); }
.n { font-family: var(--font-mono); color: var(--ink-soft); }
.chip { font: 500 13px/28px var(--font-body); padding: 0 var(--space-2); background: var(--surface); border: 1px solid var(--border-strong); }
.chip.k-input { background: var(--surface); border-color: var(--ink); color: var(--ink); }
.chip.k-computed { background: var(--matcha-tint); border-color: var(--accent-deep); color: var(--ink); }
.chip.k-result { background: var(--ink); border-color: var(--ink); color: var(--bg); }
.chip:focus-visible, .item:focus-visible, .seg:focus-visible, .dtab:focus-visible, .node:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }

.ftable { font-size: 14px; }
.ftable th { font: 11px/1.3 var(--font-mono); letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); padding: var(--space-2) var(--space-2) var(--space-3); border-bottom: 1px solid var(--border-strong); }
.ftable td { padding: var(--space-3) var(--space-2); border-bottom: 1px solid var(--border); }
.ftable tr.hit td { background: var(--matcha-tint); }
.flabel { font-weight: 500; }
.ftype { color: var(--ink-soft); }
.req { font: 10px/16px var(--font-mono); letter-spacing: 0.2em; color: var(--accent-deep); }
.fdesc { color: var(--ink-soft); }
.nodesc { color: var(--ink-soft); }
.opts dt, .choices code { font-family: var(--font-mono); color: var(--ink); }
.opts dd { color: var(--ink-soft); }
.opt-wrap summary { color: var(--accent-deep); font-weight: 500; }

.map { gap: var(--space-3); }
.hint-line { font-size: 14px; color: var(--ink-soft); }
.map-wrap { background: var(--bg); border: 1px solid var(--border); }
.flow-map .node rect { rx: 0; ry: 0; }
.flow-map .node text { font-family: var(--font-body); font-weight: 500; fill: var(--ink); }
.flow-map .node text.id { font-family: var(--font-body); fill: var(--ink-soft); }
.flow-map .k-input rect { fill: var(--surface); stroke: var(--ink); }
.flow-map .k-computed rect { fill: var(--matcha-solid); stroke: var(--accent-deep); }
.flow-map .k-result rect { fill: var(--ink); stroke: var(--ink); }
.flow-map .k-result text, .flow-map .k-result text.id { fill: var(--bg); }
.flow-map .edge { stroke: var(--border-strong); }
.flow-map .edge.on { stroke: var(--accent-deep); }
.flow-map .arrow { fill: var(--border-strong); }
.flow-map .arrow-on { fill: var(--accent-deep); }
.flow-map .node.unrun rect { stroke: var(--ink); stroke-dasharray: 4 3; }
.flow-map .node.sel rect { stroke: var(--ink); stroke-width: 3; }
.legend { font: 11px/1.3 var(--font-mono); letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-soft); gap: var(--space-2) var(--space-4); }
.mark.unrun-mark { background: var(--surface); border: 1px dashed var(--ink); }

.peek { border: 1px solid var(--border-strong); background: var(--surface); }
.peek::backdrop { background: var(--ink-scrim); }
.peek-head { padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--border); }
.peek-x { width: 36px; height: 36px; border: 1.5px solid var(--border-strong); background: transparent; color: var(--ink); }
.peek-scroll { padding: var(--space-4); gap: var(--space-3); }
.peek-scroll > h3 { font-family: var(--font-heading); font-weight: 500; font-size: 32px; line-height: 1.15; letter-spacing: -0.01em; }
.peek-rel { background: transparent; border-left: 2px solid var(--accent); padding: var(--space-1) var(--space-3); font-size: 14px; color: var(--ink); }
.peek-links { font: 11px/1.3 var(--font-mono); letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); }
.peek-foot { padding: var(--space-3) var(--space-4); border-top: 1px solid var(--border); gap: var(--space-3); }
.btn { font: 700 14px/1 var(--font-body); height: auto; padding: 15.5px 30.5px; background: transparent; color: var(--ink); border: 1.5px solid var(--border-strong); }
.btn.primary { background: var(--ink); color: var(--bg); border: none; padding: 17px 32px; }
.btn:focus-visible, .peek-x:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }

/* page tabs */
.ptabs { gap: var(--space-5); border-bottom: 1px solid var(--border-strong); margin-top: var(--space-3); }
.ptab { font: 500 16px/1.4 var(--font-body); padding: var(--space-3) 0; color: var(--ink-soft); border-bottom: 2px solid transparent; }
.ptab[aria-selected="true"] { color: var(--ink); border-bottom-color: var(--ink); }
.ptab:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
header.top { padding-block: var(--space-5) var(--space-3); }
header.top .eyebrow { margin-top: var(--space-4); }
/* situation planner */
.planner { background: var(--surface); border: 1px solid var(--border); padding: var(--space-6) var(--space-5); gap: var(--space-4); }
@media (max-width: 480px) { .planner { padding: var(--space-5) var(--space-4); } }
.planner h2 { font-family: var(--font-heading); font-weight: 500; font-size: clamp(32px, 5vw, 56px); line-height: 1.04; letter-spacing: -0.02em; }
.planner-lead { font: 400 19px/1.55 var(--font-body); color: var(--ink-soft); max-width: 62ch; }
.checks { gap: var(--space-5) var(--space-6); margin-top: var(--space-3); }
.check-group legend { padding-bottom: var(--space-3); }
.check { padding: var(--space-2) 0; gap: var(--space-3); grid-template-columns: 18px minmax(0, 1fr); border-top: 1px solid var(--border); }
.check:hover { background: transparent; }
.check input { accent-color: var(--ink); width: 18px; height: 18px; margin-top: 2px; }
.check-label { font: 500 16px/1.4 var(--font-body); color: var(--ink); }
.check-detail { font: 400 14px/1.4 var(--font-body); color: var(--ink-soft); }
.check-docs { font: 11px/1.4 var(--font-mono); letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-deep); margin-top: var(--space-1); }
.check:focus-within { outline: 2px solid var(--ink); outline-offset: 3px; }
.plan { border-top: 1px solid var(--border); padding-top: var(--space-5); gap: var(--space-5); }
.plan-empty { font-size: 16px; color: var(--ink-soft); max-width: 62ch; }
.plan-count { font: 400 19px/1.55 var(--font-body); color: var(--ink); }
.plan-count strong { font-family: var(--font-heading); font-weight: 600; font-size: 32px; color: var(--accent-deep); }
.plan-cols { gap: var(--space-5); }
.plan-h { font: 11px/1.3 var(--font-mono); letter-spacing: 0.24em; text-transform: uppercase; color: var(--accent-deep); margin-bottom: var(--space-2); }
.plan-note { font-size: 14px; color: var(--ink-soft); margin-bottom: var(--space-3); }
.doc-list { border-top: 1px solid var(--border-strong); }
.doc-list li { border-bottom: 1px solid var(--border); }
.doc-row { padding: var(--space-2) 0; column-gap: var(--space-3); }
.doc-row:hover { background: var(--matcha-tint); }
.doc-row:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
footer { border-top: 1px solid var(--border); padding-top: var(--space-4); display: grid; gap: var(--space-3); }
.footer-meta { margin: 0; font: 11px/1.8 var(--font-mono); letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); }
.footer-legal { margin: 0; font: 14px/1.6 var(--font-body); color: var(--ink-soft); max-width: 90ch; }
.footer-legal a { color: var(--accent-deep); text-underline-offset: 3px; }
.footer-legal a:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
kbd { font: 11px var(--font-mono); border: 1px solid var(--border-strong); padding: 0 var(--space-1); }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
`;

const FOOTER =
  "<footer>" +
  '<p class="footer-meta">For learning, not tax advice. Press <kbd>/</kbd> to search forms and fields.</p>' +
  '<p class="footer-legal">Built on Filed Open Tax software, copyright © 2026 Filed Inc. ' +
  `Modified by Zenelm, ${MODIFIED}. ` +
  `Licensed under the <a href="${LICENSE_URL}" rel="license">GNU Affero General Public License v3.0</a>. ` +
  `<a href="${SOURCE_URL}">Source code</a>, including Zenelm's changes in <code>sites/zenelm</code>. ` +
  "Zenelm is not affiliated with or endorsed by Filed Inc.</p>" +
  "</footer>";

function replaceOnce(html: string, from: string | RegExp, to: string): string {
  const found = typeof from === "string" ? html.includes(from) : from.test(html);
  if (!found) throw new Error(`expected markup not found: ${String(from).slice(0, 60)}`);
  return html.replace(from, to);
}

/** Renders the Zenelm atlas page: a full document, or the body only with fragment. */
export function buildZenelmAtlas(options: { readonly fragment?: boolean } = {}): string {
  const data = buildAtlas(catalog["f1040:2025"], docsFor("f1040:2025") ?? {}, situationsFor("f1040:2025"));
  const base = options.fragment ? renderAtlasFragment(data) : renderAtlasHtml(data);
  const steps: readonly [string | RegExp, string][] = [
    [FONTS, ZEN_FONTS],
    [THEME_CSS, ZEN_THEME],
    ["</style>", ZEN_OVERRIDES + "</style>"],
    [/<title>[^<]*<\/title>/, "<title>Zenelm Forms Atlas</title>"],
    ['<header class="top">\n    <div class="eyebrow" id="h-eyebrow"></div>', '<header class="top">\n    <div class="wordmark">Zenelm</div>\n    <div class="eyebrow" id="h-eyebrow"></div>'],
    ['    <div class="stats" id="stats"></div>\n  </header>', '  </header>\n  <section class="zn-band" aria-label="At a glance"><div class="eyebrow">At a glance</div><div class="stats" id="stats"></div></section>'],
    [/<footer>[\s\S]*?<\/footer>/, FOOTER],
  ];
  return steps.reduce((html, [from, to]) => replaceOnce(html, from, to), base);
}

if (import.meta.main) {
  const fragment = Deno.args.includes("--fragment");
  const output = Deno.args.find((a) => !a.startsWith("--")) ?? ".state/explore/zenelm-forms-atlas.html";
  await Deno.mkdir(output.split("/").slice(0, -1).join("/") || ".", { recursive: true });
  await Deno.writeTextFile(output, buildZenelmAtlas({ fragment }));
  console.log(`Wrote ${output}`);
}
