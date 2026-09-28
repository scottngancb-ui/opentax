import type { AtlasData } from "./atlas.ts";
import { ATLAS_SCRIPT } from "./atlas-client.ts";
import { FONTS, THEME_CSS } from "./page-theme.ts";

// One self-contained file: styles, script and the atlas data are all inline.

const STYLE = `
header.top { display: grid; gap: 10px; }
header.top h1 { margin: 0; font: 600 30px/1.1 var(--cond); text-wrap: balance; }
header.top p { margin: 0; color: var(--ink-2); max-width: 75ch; font-size: 15px; }
.stats { display: flex; flex-wrap: wrap; gap: 8px 28px; margin-top: 4px; }
.stat { display: grid; }
.stat-n { font: 500 22px/1.1 var(--mono); font-variant-numeric: tabular-nums; }
.stat-l { font-size: 12px; color: var(--ink-3); }

.atlas { display: grid; grid-template-columns: minmax(260px, 340px) minmax(0, 1fr); gap: 20px; align-items: start; }
@media (max-width: 860px) { .atlas { grid-template-columns: minmax(0, 1fr); } }

.side { background: var(--surface); border: 1px solid var(--rule); display: grid; grid-template-rows: auto minmax(0, 1fr); }
@media (min-width: 861px) {
  .side { position: sticky; top: calc(env(safe-area-inset-top, 0px) + 12px); max-height: calc(100vh - 24px); }
}
.side-head { padding: 12px; display: grid; gap: 8px; border-bottom: 1px solid var(--rule); }
.search { width: 100%; height: 34px; padding: 0 10px; border: 1px solid var(--rule); background: var(--paper); color: var(--ink); font: 14px var(--sans); }
.search::placeholder { color: var(--ink-3); }
.search:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.segs { display: flex; gap: 0; border: 1px solid var(--rule); width: max-content; max-width: 100%; }
.seg { border: 0; background: var(--surface); padding: 4px 10px; font: 500 12px/18px var(--sans); color: var(--ink-2); cursor: pointer; }
.seg + .seg { border-left: 1px solid var(--rule); }
.seg[aria-pressed="true"] { background: var(--accent-soft); color: var(--ink); }
.count { font-size: 12px; color: var(--ink-3); }
.side-list { position: relative; overflow-y: auto; max-height: 60vh; }
@media (min-width: 861px) { .side-list { max-height: none; } }
#list, .items { list-style: none; margin: 0; padding: 0; }
.group > .eyebrow { padding: 12px 12px 4px; }
.item { width: 100%; border: 0; background: none; text-align: left; cursor: pointer; display: grid; grid-template-columns: 10px minmax(0, 1fr); column-gap: 10px; padding: 6px 12px; }
.item:hover { background: var(--sunk); }
.item[aria-current="true"] { background: var(--accent-soft); }
.mark { grid-row: span 2; width: 10px; height: 10px; margin-top: 5px; border: 1px solid; }
.mark.k-input { background: var(--entry-soft); border-color: var(--entry); }
.mark.k-computed { background: var(--accent-soft); border-color: var(--accent); }
.mark.k-result { background: var(--result-bg); border-color: var(--result-bg); }
.it-title { font: 600 14px/1.3 var(--cond); }
.it-sub { font-size: 12px; color: var(--ink-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hint { font-size: 11px; color: var(--entry); grid-column: 2; }
.pad { padding: 12px; }
.empty { color: var(--ink-3); margin: 0; }

.detail { background: var(--surface); border: 1px solid var(--rule); padding: 20px; display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; min-width: 0; scroll-margin-top: 12px; }
@media (max-width: 480px) { .detail { padding: 16px; } .detail h2 { font-size: 28px; } }
.d-head { display: grid; gap: 8px; }
.d-meta { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.pill { font: 600 11px/20px var(--cond); letter-spacing: .05em; text-transform: uppercase; padding: 0 8px; border: 1px solid; }
.pill.k-input { color: var(--entry); border-color: var(--entry); background: var(--entry-soft); }
.pill.k-computed { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
.pill.k-result { color: var(--result-ink); background: var(--result-bg); border-color: var(--result-bg); }
.detail h2 { margin: 0; font: 600 34px/1.05 var(--cond); text-wrap: balance; }
.d-sub { margin: 0; font-size: 17px; color: var(--ink-2); }
.d-sum { margin: 4px 0 0; font-size: 15px; line-height: 1.6; max-width: 72ch; }
.d-entry { margin: 0; font-size: 13px; color: var(--ink-2); display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: baseline; }
.notice { margin: 0; padding: 8px 12px; border: 1px solid var(--bad); background: var(--bad-soft); font-size: 13px; max-width: 72ch; }
.fkey { font: 12px var(--mono); color: var(--ink-3); overflow-wrap: anywhere; }

.flow { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 16px; align-items: start; padding: 16px; background: var(--sunk); border: 1px solid var(--rule); }
@media (max-width: 640px) { .flow { grid-template-columns: minmax(0, 1fr); } .flow-mid { display: none; } }
.flow h3, .fields h3 { margin: 0 0 8px; font: 600 13px/1.3 var(--cond); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-2); display: flex; flex-wrap: wrap; gap: 8px; align-items: baseline; }
.n { font: 500 12px var(--mono); color: var(--ink-3); letter-spacing: 0; }
.flow-mid { align-self: center; display: flex; align-items: center; gap: 8px; color: var(--ink-3); }
.flow-mid::before, .flow-mid::after { content: "→"; font: 16px var(--mono); }
.links { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.chip { display: inline-flex; align-items: center; border: 1px solid var(--rule); background: var(--surface); padding: 0 8px; font: 500 13px/24px var(--cond); cursor: pointer; white-space: nowrap; color: var(--ink); }
.chip:hover { border-color: var(--ink-3); }
.chip.k-input { background: var(--entry-soft); border-color: var(--entry); }
.chip.k-computed { background: var(--accent-soft); border-color: var(--accent); }
.chip.k-result { background: var(--result-bg); color: var(--result-ink); border-color: var(--result-bg); }
.chip:focus-visible, .item:focus-visible, .seg:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.tbl-wrap { overflow-x: auto; min-width: 0; }
.ftable { width: 100%; border-collapse: collapse; font-size: 13px; }
.ftable th { text-align: left; font: 600 11px/1.2 var(--cond); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); padding: 8px; border-bottom: 1px solid var(--rule); }
.ftable td { padding: 8px; border-bottom: 1px solid var(--rule); vertical-align: top; }
.ftable tr.hit td { background: var(--entry-soft); }
.fname { padding-left: calc(8px + var(--depth, 0) * 18px) !important; min-width: 12em; }
.child .fname { border-left: 2px solid var(--rule); }
.flabel { display: block; font-weight: 600; }
.ftype { white-space: nowrap; color: var(--ink-2); }
.req { display: block; margin-top: 2px; font: 600 10px/16px var(--cond); letter-spacing: .06em; text-transform: uppercase; color: var(--entry); }
.fdesc { min-width: 16em; line-height: 1.5; }
.nodesc { color: var(--ink-3); font-style: italic; }
tr.cap td { padding-top: 2px; padding-bottom: 2px; padding-left: calc(8px + var(--depth, 0) * 18px); font-size: 12px; color: var(--ink-3); border-bottom: 0; }
.choices { margin-top: 4px; color: var(--ink-2); font-size: 12px; }
.choices code, .opts dt { font: 12px var(--mono); }
.opts { margin: 6px 0 0; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 2px 12px; font-size: 12px; }
.opts dt { color: var(--ink); }
.opts dd { margin: 0; color: var(--ink-2); }
.opt-wrap { margin-top: 6px; }
.opt-wrap summary { cursor: pointer; color: var(--accent); font-size: 12px; }
.dtabs { display: flex; gap: 2px; border-bottom: 1px solid var(--rule); margin-bottom: -8px; }
.dtab { border: 0; border-bottom: 2px solid transparent; background: none; padding: 8px 12px; font: 600 15px/1.3 var(--cond); color: var(--ink-2); cursor: pointer; display: inline-flex; gap: 6px; align-items: baseline; }
.dtab[aria-selected="true"] { color: var(--ink); border-bottom-color: var(--accent); }
.dtab:focus-visible, .node:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.map { display: grid; gap: 10px; }
.map-bar { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; }
.hint-line { margin: 0; font-size: 13px; color: var(--ink-2); }
.map-wrap { overflow: auto; max-height: 72vh; border: 1px solid var(--rule); background: var(--sunk); }
svg.flow-map { display: block; }
.flow-map .edge { fill: none; stroke: var(--edge); stroke-width: 1.2; }
.flow-map .edge.on { stroke: var(--accent); stroke-width: 2; }
.flow-map .arrow { fill: var(--edge); }
.flow-map .arrow-on { fill: var(--accent); }
.flow-map .node { cursor: pointer; }
.flow-map .node rect { stroke-width: 1; }
.flow-map .node text { font-family: var(--cond); font-size: 13px; font-weight: 500; fill: var(--ink); }
.flow-map .node text.id { font-family: var(--sans); font-size: 10px; font-weight: 400; fill: var(--ink-2); }
.flow-map .k-input rect { fill: var(--entry-soft); stroke: var(--entry); }
.flow-map .k-computed rect { fill: var(--accent-soft); stroke: var(--accent); }
.flow-map .k-result rect { fill: var(--result-bg); stroke: var(--result-bg); }
.flow-map .k-result text, .flow-map .k-result text.id { fill: var(--result-ink); }
.flow-map .node.unrun rect { stroke: var(--bad); stroke-dasharray: 4 2; }
.flow-map .node.sel rect { stroke-width: 3; }
.flow-map .node:hover rect { stroke-width: 2; }
.legend { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 12px; color: var(--ink-2); }
.legend span { display: inline-flex; align-items: center; gap: 6px; }
.legend .mark { margin: 0; grid-row: auto; }
.mark.unrun-mark { background: var(--surface); border: 1px dashed var(--bad); }
footer { color: var(--ink-3); font-size: 12px; }
kbd { font: 11px var(--mono); border: 1px solid var(--rule); padding: 0 4px; }
`;

const MARKUP = `
<div class="wrap">
  <header class="top">
    <div class="eyebrow" id="h-eyebrow"></div>
    <h1>Forms Atlas</h1>
    <p>Every form, schedule and worksheet in the engine: what it is for, what goes into it, and where its numbers go next. Pick a form to read about it, or search for a form number, a box or a word like "tips".</p>
    <div class="stats" id="stats"></div>
  </header>
  <div class="atlas">
    <aside class="side" aria-label="Forms">
      <div class="side-head">
        <label class="eyebrow" for="q">Search forms and fields</label>
        <input class="search" id="q" type="search" placeholder="e.g. 8959, box 12, dependent care" autocomplete="off">
        <div class="segs" id="filters" role="group" aria-label="Show"></div>
        <div class="count" id="count" aria-live="polite"></div>
      </div>
      <div class="side-list"><ul id="list"></ul></div>
    </aside>
    <main class="detail" id="detail" aria-live="polite"></main>
  </div>
  <footer>Generated by <span class="num">opentax node explore</span> from the engine's schemas and form documentation. Press <kbd>/</kbd> to search. For learning, not tax advice.</footer>
</div>
`;

// JSON inside <script> must not contain "</script" or line separators that end the string.
function embedJson(data: AtlasData): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function pageTitle(data: AtlasData): string {
  return `<title>Forms Atlas ${data.taxYear}</title>`;
}

function bodyContent(data: AtlasData): string {
  return MARKUP +
    `<script type="application/json" id="atlas-data">${embedJson(data)}</script>` +
    `<script>${ATLAS_SCRIPT}</script>`;
}

/** Page content without the document skeleton, for hosts that supply their own. */
export function renderAtlasFragment(data: AtlasData): string {
  return pageTitle(data) + FONTS + `<style>${THEME_CSS}${STYLE}</style>` + bodyContent(data);
}

/** A complete standalone HTML document. */
export function renderAtlasHtml(data: AtlasData): string {
  return "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">" +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
    pageTitle(data) + FONTS + `<style>${THEME_CSS}${STYLE}</style></head><body>` +
    bodyContent(data) + "</body></html>\n";
}
