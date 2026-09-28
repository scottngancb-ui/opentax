import type { ExplorerData } from "./explore-trace.ts";
import type { FormBlurb } from "./form-docs.ts";
import { CLIENT_SCRIPT } from "./explore-client.ts";
import { FONTS, THEME_CSS } from "./page-theme.ts";

// The page is one self-contained file: styles, script, the trace data and (optionally)
// the bundled engine are all inline.

const STYLE = `
header.top { display: grid; gap: 6px; }
header.top h1 { margin: 0; font: 600 26px/1.15 var(--cond); text-wrap: balance; }
header.top p { margin: 0; color: var(--ink-2); max-width: 90ch; }

.summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
.tile { background: var(--surface); border: 0; padding: 12px 14px; text-align: left; cursor: pointer; display: grid; gap: 2px; }
.tile:hover { background: var(--sunk); }
.tile[aria-pressed="true"] { background: var(--accent-soft); }
.tile .ln { font: 600 11px/1.2 var(--cond); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); }
.tile .v { font: 500 20px/1.2 var(--mono); font-variant-numeric: tabular-nums; }
.tile .chk { font-size: 12px; }
.chk.ok { color: var(--ok); }
.chk.bad { color: var(--bad); }

.banner { border: 1px solid var(--bad); background: var(--bad-soft); padding: 10px 14px; display: grid; gap: 4px; }
.banner b { color: var(--bad); }

section.graph { background: var(--surface); border: 1px solid var(--rule); }
.graph-head { display: flex; flex-wrap: wrap; gap: 8px 20px; align-items: baseline; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid var(--rule); }
.graph-head h2, .panel h2 { margin: 0; font: 600 15px/1.3 var(--cond); letter-spacing: .02em; }
.legend { display: flex; flex-wrap: wrap; gap: 14px; font-size: 12px; color: var(--ink-2); }
.legend i { display: inline-block; width: 12px; height: 12px; vertical-align: -2px; margin-right: 5px; border: 1px solid var(--rule); }
.legend .k-input { background: var(--entry-soft); border-color: var(--entry); }
.legend .k-computed { background: var(--accent-soft); border-color: var(--accent); }
.legend .k-result { background: var(--result-bg); border-color: var(--result-bg); }
.graph-scroll { overflow-x: auto; padding: 8px 0; }
svg.flow { display: block; }
svg.flow .edge { fill: none; stroke: var(--edge); stroke-width: 1.2; }
svg.flow .edge.on { stroke: var(--accent); stroke-width: 2; }
svg.flow.focus .edge:not(.on) { opacity: .35; }
svg.flow .node { cursor: pointer; }
svg.flow .node rect { stroke-width: 1; }
svg.flow .node text { font-family: var(--cond); font-size: 13px; font-weight: 500; }
svg.flow .node text.id { font-family: var(--mono); font-size: 10px; font-weight: 400; }
svg.flow .k-start rect, svg.flow .k-input rect { fill: var(--entry-soft); stroke: var(--entry); }
svg.flow .k-computed rect { fill: var(--accent-soft); stroke: var(--accent); }
svg.flow .k-result rect { fill: var(--result-bg); stroke: var(--result-bg); }
svg.flow .node text { fill: var(--ink); }
svg.flow .node text.id { fill: var(--ink-2); }
svg.flow .k-result text, svg.flow .k-result text.id { fill: var(--result-ink); }
svg.flow .node.dead rect { stroke-dasharray: 3 3; }
svg.flow .node.unrun rect { stroke: var(--bad); stroke-dasharray: 4 2; }
svg.flow.focus .node:not(.on) { opacity: .4; }
svg.flow .node.sel rect { stroke-width: 3; }
svg.flow .arrow { fill: var(--edge); }
svg.flow .arrow-on { fill: var(--accent); }

.cols { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 20px; align-items: start; }
@media (max-width: 900px) { .cols { grid-template-columns: minmax(0, 1fr); } }
.panel { background: var(--surface); border: 1px solid var(--rule); min-width: 0; }
.panel-head { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid var(--rule); }
.toggle { font-size: 12px; color: var(--ink-2); display: flex; gap: 6px; align-items: center; cursor: pointer; }

.lines { list-style: none; margin: 0; padding: 0; }
.lines li + li { border-top: 1px solid var(--rule); }
.line-btn { width: 100%; border: 0; background: none; cursor: pointer; text-align: left; display: grid; grid-template-columns: 3.4em minmax(0, 1fr) auto; gap: 10px; align-items: baseline; padding: 7px 14px; }
.line-btn:hover { background: var(--sunk); }
.line-btn[aria-pressed="true"] { background: var(--accent-soft); }
.line-btn .no { font: 600 13px/1.3 var(--mono); color: var(--accent); }
.line-btn .lbl { overflow-wrap: anywhere; }
.line-btn .v { font-family: var(--mono); font-variant-numeric: tabular-nums; text-align: right; }
.line-btn .v.zero { color: var(--ink-3); }
.group-title { padding: 10px 14px 4px; background: var(--sunk); border-top: 1px solid var(--rule); }

.inspect { padding: 16px; display: grid; gap: 16px; }
.focus-head { display: grid; gap: 4px; }
.focus-head .big { font: 500 28px/1.1 var(--mono); font-variant-numeric: tabular-nums; }
.focus-head h3 { margin: 0; font: 600 18px/1.25 var(--cond); }
.focus-head .d-sub { color: var(--ink-2); }
.focus-head .about { margin: 6px 0 0; max-width: 70ch; line-height: 1.55; }
.meta { color: var(--ink-2); font-size: 13px; display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; }
.rawid { font: 12px var(--mono); color: var(--ink-3); overflow-wrap: anywhere; }
.chip { display: inline-flex; align-items: center; gap: 4px; border: 1px solid var(--rule); background: var(--sunk); padding: 0 7px; font: 500 12px/20px var(--cond); cursor: pointer; white-space: nowrap; }
.chip:hover { border-color: var(--ink-3); }
.chip.k-start, .chip.k-input { background: var(--entry-soft); border-color: var(--entry); }
.chip.k-computed { background: var(--accent-soft); border-color: var(--accent); }
.chip.k-result { background: var(--result-bg); color: var(--result-ink); border-color: var(--result-bg); }
.tag { font: 600 11px/18px var(--cond); letter-spacing: .05em; text-transform: uppercase; padding: 0 6px; color: var(--entry); border: 1px solid var(--entry); }

.tree, .tree ul { list-style: none; margin: 0; padding: 0; }
.tree ul { margin-left: 11px; padding-left: 14px; border-left: 1px solid var(--rule); }
.t-line { display: flex; flex-wrap: wrap; gap: 4px 8px; align-items: center; padding: 4px 0; }
.t-tog { width: 20px; height: 20px; border: 1px solid var(--rule); background: var(--surface); cursor: pointer; font: 12px/1 var(--mono); padding: 0; flex: none; }
.t-tog[aria-expanded="true"] { background: var(--accent-soft); border-color: var(--accent); }
.t-pad { width: 20px; flex: none; }
.t-field { font-weight: 500; overflow-wrap: anywhere; }
.t-val { font-family: var(--mono); font-variant-numeric: tabular-nums; }
.t-via { color: var(--ink-2); font-size: 13px; display: inline-flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.t-cap { color: var(--ink-3); font-size: 12px; padding: 2px 0 0 28px; }

table.kv { width: 100%; border-collapse: collapse; font-size: 13px; }
table.kv th { text-align: left; font: 600 11px/1.2 var(--cond); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); padding: 6px 8px; border-bottom: 1px solid var(--rule); }
table.kv td { padding: 6px 8px; border-bottom: 1px solid var(--rule); vertical-align: top; }
table.kv td.v { font-family: var(--mono); font-variant-numeric: tabular-nums; text-align: right; white-space: nowrap; }
.kv-wrap { overflow-x: auto; }
.linklike { border: 0; background: none; padding: 0; cursor: pointer; text-align: left; color: var(--accent); text-decoration: underline; text-decoration-color: var(--rule); text-underline-offset: 3px; overflow-wrap: anywhere; }
details.obj summary { cursor: pointer; color: var(--ink-2); }
details.obj dl { margin: 4px 0 0; display: grid; grid-template-columns: auto auto; gap: 1px 12px; font-size: 12px; }
details.obj dt { color: var(--ink-2); font-family: var(--mono); }
details.obj dd { margin: 0; font-family: var(--mono); text-align: right; }
details.obj .item + .item { margin-top: 6px; padding-top: 6px; border-top: 1px dashed var(--rule); }
.sent-group + .sent-group { margin-top: 12px; }
.sent-group h4 { margin: 0 0 4px; font: 500 13px var(--sans); display: flex; gap: 8px; align-items: center; }
.empty { color: var(--ink-3); }
footer { color: var(--ink-3); font-size: 12px; }
.tabs-head { padding-block: 0; }
.tabs { display: flex; gap: 2px; align-self: stretch; }
.tabs [role="tab"] { border: 0; border-bottom: 2px solid transparent; background: none; padding: 12px 10px 10px; font: 600 15px/1.3 var(--cond); color: var(--ink-2); cursor: pointer; }
.tabs [role="tab"][aria-selected="true"] { color: var(--ink); border-bottom-color: var(--accent); }
.tabs [role="tab"].dirty::after { content: ""; display: inline-block; width: 7px; height: 7px; margin-left: 6px; vertical-align: 2px; background: var(--entry); border-radius: 50%; }
.edit-bar { padding: 12px 14px; display: grid; gap: 8px; border-bottom: 1px solid var(--rule); }
.hint { margin: 0; color: var(--ink-2); font-size: 13px; }
.status:empty { display: none; }
.edit-tools { display: flex; flex-wrap: wrap; gap: 8px; }
.btn, .edit-tools select, .add-field { font: 500 13px/1 var(--sans); height: 30px; padding: 0 10px; border: 1px solid var(--rule); background: var(--surface); color: var(--ink); cursor: pointer; }
.edit-tools select { max-width: 16em; }
.btn:hover:not(:disabled), .edit-tools select:hover { border-color: var(--ink-3); }
.btn:disabled { color: var(--ink-3); cursor: default; }
.cards { display: grid; gap: 1px; background: var(--rule); }
.card { background: var(--surface); padding: 12px 14px; display: grid; gap: 6px; }
.card-head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 2px; }
.card-head .rm { margin-left: auto; font-size: 13px; }
.f-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 11em) 22px; gap: 8px; align-items: center; }
.f-row label { font-size: 13px; color: var(--ink-2); overflow-wrap: anywhere; }
.f-row input[type="number"], .f-row input[type="text"], .f-row select, .f-row textarea {
  width: 100%; min-width: 0; height: 28px; padding: 0 8px; border: 1px solid var(--rule); background: var(--paper); color: var(--ink);
  font: 13px var(--mono); font-variant-numeric: tabular-nums;
}
.f-row input[type="number"] { text-align: right; }
.f-row textarea { height: auto; padding: 4px 8px; resize: vertical; }
.f-row input[type="checkbox"] { justify-self: end; width: 16px; height: 16px; accent-color: var(--accent); }
.f-row [aria-invalid="true"] { border-color: var(--bad); background: var(--bad-soft); }
.f-row :disabled { opacity: .85; }
.x { width: 22px; height: 22px; border: 0; background: none; color: var(--ink-3); cursor: pointer; font-size: 16px; line-height: 1; padding: 0; }
.x:hover { color: var(--bad); }
.add-field { justify-self: start; height: 28px; margin-top: 2px; color: var(--ink-2); }
.json-out { padding: 12px 14px; display: grid; gap: 6px; border-top: 1px solid var(--rule); }
.json-out textarea { width: 100%; font: 12px/1.5 var(--mono); background: var(--paper); color: var(--ink); border: 1px solid var(--rule); padding: 8px; }
.was { display: block; font: 12px var(--mono); color: var(--entry); }
.line-btn .was { text-align: right; }
.meta .was { display: inline; }
table.kv th.r { text-align: right; }
@media (prefers-reduced-motion: no-preference) {
  svg.flow .node, svg.flow .edge { transition: opacity .15s; }
}
`;

const MARKUP = `
<div class="wrap">
  <header class="top">
    <div class="eyebrow" id="h-eyebrow"></div>
    <h1 id="h-title"></h1>
    <p id="h-sub"></p>
  </header>
  <div class="summary" id="summary"></div>
  <div id="banner"></div>
  <section class="graph" aria-label="Data flow">
    <div class="graph-head">
      <h2>How data moved through the return</h2>
      <div class="legend">
        <span><i class="k-input"></i>Your entries</span>
        <span><i class="k-computed"></i>Computed form or worksheet</span>
        <span><i class="k-result"></i>Final return</span>
      </div>
    </div>
    <div class="graph-scroll" id="graph"></div>
  </section>
  <div class="cols">
    <section class="panel">
      <div class="panel-head tabs-head">
        <div class="tabs" role="tablist" aria-label="Left panel">
          <button type="button" role="tab" id="tab-lines-btn" data-tab="lines" aria-controls="tab-lines">Return lines</button>
          <button type="button" role="tab" id="tab-entries-btn" data-tab="entries" aria-controls="tab-entries">Your entries</button>
        </div>
        <label class="toggle" for="show-zero" id="zero-toggle"><input type="checkbox" id="show-zero"> Show zero and empty</label>
      </div>
      <div id="tab-lines" role="tabpanel" aria-labelledby="tab-lines-btn"><div id="lines"></div></div>
      <div id="tab-entries" role="tabpanel" aria-labelledby="tab-entries-btn" hidden>
        <div class="edit-bar">
          <p class="hint" id="edit-note"></p>
          <div class="edit-tools" id="edit-tools" hidden>
            <select id="add-doc" aria-label="Add a document"></select>
            <button type="button" class="btn" id="reset" disabled>Reset to original</button>
            <button type="button" class="btn" id="copy-json">Copy input.json</button>
          </div>
          <div class="hint status" id="edit-status" role="status" aria-live="polite"></div>
        </div>
        <div class="cards" id="cards"></div>
        <div class="json-out" id="json-out" hidden>
          <label for="json-text" class="eyebrow">input.json</label>
          <textarea id="json-text" rows="10" readonly></textarea>
        </div>
      </div>
    </section>
    <section class="panel" aria-label="Details">
      <div class="inspect" id="inspect"></div>
    </section>
  </div>
  <footer>Generated by <span class="num">opentax return explore</span>. Values are the engine's output for these entries, not tax advice. Edits stay in this page; use Copy input.json to keep them.</footer>
</div>
`;

// JSON inside <script> must not contain "</script" or line separators that end the string.
function embedJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function pageTitle(data: ExplorerData): string {
  return `<title>${escapeText(data.title)} · Return explorer</title>`;
}

export type PageExtras = {
  // The bundled in-browser engine; without it the page is read-only.
  readonly engine?: string;
  // Titles and summaries by node type, shown in the inspector.
  readonly forms?: Readonly<Record<string, FormBlurb>>;
};

// A module script runs after the classic app script, then announces itself.
function engineScript(engine: string | undefined): string {
  if (!engine) return "";
  return `<script type="module">${engine.replace(/<\/(script)/gi, "<\\/$1")}</script>`;
}

function bodyContent(data: ExplorerData, extras: PageExtras): string {
  return MARKUP +
    `<script type="application/json" id="trace-data">${embedJson(data)}</script>` +
    `<script type="application/json" id="forms-data">${embedJson(extras.forms ?? {})}</script>` +
    `<script>${CLIENT_SCRIPT}</script>` +
    engineScript(extras.engine);
}

/** Page content without the document skeleton, for hosts that supply their own. */
export function renderExplorerFragment(data: ExplorerData, extras: PageExtras = {}): string {
  return pageTitle(data) + FONTS + `<style>${THEME_CSS}${STYLE}</style>` + bodyContent(data, extras);
}

/** A complete standalone HTML document. Pass the engine bundle to enable editing. */
export function renderExplorerHtml(data: ExplorerData, extras: PageExtras = {}): string {
  return "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">" +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
    pageTitle(data) + FONTS + `<style>${THEME_CSS}${STYLE}</style></head><body>` +
    bodyContent(data, extras) + "</body></html>\n";
}
