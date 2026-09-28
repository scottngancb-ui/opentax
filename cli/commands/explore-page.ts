import type { ExplorerData } from "./explore.ts";

// The page is one self-contained file: styles, script and the trace data are all inline.
// Client code below avoids template literals so it can live inside this TS template string.

const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">';

const STYLE = `
:root {
  --paper: #f3f6f5;
  --surface: #ffffff;
  --sunk: #e9efed;
  --ink: #14201c;
  --ink-2: #4b5c56;
  --ink-3: #7a8a84;
  --rule: #d3ddd9;
  --accent: #0b6e5a;
  --accent-soft: #dcefe8;
  --entry: #94570a;
  --entry-soft: #f6e8d2;
  --result-bg: #14201c;
  --result-ink: #f3f6f5;
  --ok: #1d7a3b;
  --bad: #b42318;
  --bad-soft: #fbe4e1;
  --edge: #b9c7c2;
  --sans: "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --cond: "IBM Plex Sans Condensed", "Arial Narrow", system-ui, sans-serif;
  --mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --paper: #0e1412;
    --surface: #151d1a;
    --sunk: #1b2622;
    --ink: #e2ebe7;
    --ink-2: #a3b5ae;
    --ink-3: #72847d;
    --rule: #2a3632;
    --accent: #4cc2a0;
    --accent-soft: #173a31;
    --entry: #e3ab57;
    --entry-soft: #3a2b14;
    --result-bg: #e2ebe7;
    --result-ink: #0e1412;
    --ok: #5fcf85;
    --bad: #f07b6e;
    --bad-soft: #3d1a17;
    --edge: #3a4a44;
  }
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --paper: #0e1412;
  --surface: #151d1a;
  --sunk: #1b2622;
  --ink: #e2ebe7;
  --ink-2: #a3b5ae;
  --ink-3: #72847d;
  --rule: #2a3632;
  --accent: #4cc2a0;
  --accent-soft: #173a31;
  --entry: #e3ab57;
  --entry-soft: #3a2b14;
  --result-bg: #e2ebe7;
  --result-ink: #0e1412;
  --ok: #5fcf85;
  --bad: #f07b6e;
  --bad-soft: #3d1a17;
  --edge: #3a4a44;
}
* { box-sizing: border-box; }
html, body { margin: 0; }
body {
  background: var(--paper);
  color: var(--ink);
  font: 14px/1.5 var(--sans);
  padding-inline: 16px;
  padding-block: 20px 48px;
}
.wrap { max-width: 1360px; margin: 0 auto; display: grid; gap: 20px; }
button { font: inherit; color: inherit; }
button:focus-visible, summary:focus-visible, input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.num { font-family: var(--mono); font-variant-numeric: tabular-nums; }
.eyebrow { font: 600 11px/1.2 var(--cond); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }

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
    <section class="panel" aria-label="Return lines">
      <div class="panel-head">
        <h2 id="lines-title">Return lines</h2>
        <label class="toggle" for="show-zero"><input type="checkbox" id="show-zero"> Show zero and empty</label>
      </div>
      <div id="lines"></div>
    </section>
    <section class="panel" aria-label="Details">
      <div class="inspect" id="inspect"></div>
    </section>
  </div>
  <footer>Generated by <span class="num">opentax return explore</span>. Values are the engine's output for this return, not tax advice.</footer>
</div>
`;

const SCRIPT = `
(function () {
  "use strict";
  var data = JSON.parse(document.getElementById("trace-data").textContent);
  var RESULT = data.formType;
  var byType = {};
  var order = [];
  data.steps.forEach(function (s) { byType[s.nodeType] = { input: s.input, outputs: s.outputs, ran: true }; order.push(s.nodeType); });
  data.unrun.forEach(function (u) { byType[u.nodeType] = { input: u.input, outputs: [], ran: false }; order.push(u.nodeType); });
  var diag = {};
  data.diagnostics.forEach(function (d) { (diag[d.nodeType] = diag[d.nodeType] || []).push(d.message); });

  // incoming[target][field] = [{ from, value }]; selfOut[node][field] = value
  var incoming = {}, selfOut = {}, edges = {};
  data.steps.forEach(function (s) {
    s.outputs.forEach(function (o) {
      if (o.to === s.nodeType) { selfOut[o.to] = Object.assign(selfOut[o.to] || {}, o.fields); return; }
      var tgt = incoming[o.to] = incoming[o.to] || {};
      Object.keys(o.fields).forEach(function (k) { (tgt[k] = tgt[k] || []).push({ from: s.nodeType, value: o.fields[k] }); });
      var key = s.nodeType + ">" + o.to;
      var e = edges[key] = edges[key] || { from: s.nodeType, to: o.to, fields: {} };
      Object.keys(o.fields).forEach(function (k) { e.fields[k] = true; });
      if (!byType[o.to]) { byType[o.to] = { input: {}, outputs: [], ran: false }; order.push(o.to); }
    });
  });

  var state = { sel: null, showZero: false };
  try { state.showZero = localStorage.getItem("opentax-explore-zero") === "1"; } catch (e) { /* storage unavailable */ }
  document.getElementById("show-zero").checked = state.showZero;

  // ---------- formatting ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  var WORDS = { w2: "W-2", w2s: "W-2s", agi: "AGI", qbi: "QBI", eitc: "EITC", ira: "IRA", ss: "SS", ssa: "SSA", hsa: "HSA",
    niit: "NIIT", amt: "AMT", ptc: "PTC", aptc: "APTC", ctc: "CTC", actc: "ACTC", odc: "ODC", aotc: "AOTC", llc: "LLC",
    se: "SE", fica: "FICA", us: "US", ssn: "SSN", ein: "EIN", dob: "date of birth", qdcg: "QDCG", ltcg: "LTCG", stcg: "STCG",
    k1: "K-1", rmd: "RMD", mfj: "MFJ", mfs: "MFS", hoh: "HOH", ftc: "FTC", magi: "MAGI", qbid: "QBID", nol: "NOL" };
  function words(parts) {
    var out = parts.filter(Boolean).map(function (w) {
      var l = w.toLowerCase();
      if (WORDS[l]) return WORDS[l];
      var m = /^f?1099([a-z]*)$/.exec(l);
      if (m) {
        var plural = /^(int|div|b|r|nec|misc|g|k|oid|patr|c|sa|q)s$/.exec(m[1]);
        if (plural) return "1099-" + plural[1].toUpperCase() + " forms";
        return m[1] ? "1099-" + m[1].toUpperCase() : "1099";
      }
      return l;
    }).join(" ");
    return out.charAt(0).toUpperCase() + out.slice(1);
  }
  function lineParts(k) {
    var m = /^(line|box|part)_?(\\d+[a-z]?)(?:_(.*))?$/i.exec(k);
    if (!m) return null;
    return { kind: m[1].toLowerCase(), no: m[2], rest: m[3] || "" };
  }
  function fieldLabel(k) {
    var lp = lineParts(k);
    if (lp) {
      var head = lp.kind.charAt(0).toUpperCase() + lp.kind.slice(1) + " " + lp.no;
      return lp.rest ? head + " · " + words(lp.rest.split("_")).toLowerCase() : head;
    }
    return words(k.replace(/([a-z])([A-Z])/g, "$1_$2").split("_"));
  }
  var NAMED = { start: "Your entries", general: "General info", f1040: "Form 1040", w2: "W-2", w2g: "W-2G",
    qdcgtw: "QDCG tax worksheet", eitc: "EITC worksheet", agi_aggregator: "AGI aggregator", ssa1099: "SSA-1099",
    k1_partnership: "K-1 (partnership)", k1_s_corp: "K-1 (S corp)", k1_trust: "K-1 (trust)" };
  function nodeLabel(t) {
    if (NAMED[t]) return NAMED[t];
    var m;
    if ((m = /^f(1099|1098|1095)([a-z]*)$/.exec(t))) return m[1] + (m[2] ? "-" + m[2].toUpperCase() : "");
    if ((m = /^schedule_?([a-z0-9]+)$/.exec(t))) {
      var s = m[1].toUpperCase();
      return "Schedule " + s.replace(/^(\\d+)([A-Z])$/, "$1-$2");
    }
    if ((m = /^(?:form_?|f)(\\d+)([a-z]*)$/.exec(t))) return "Form " + m[1] + (m[2] ? "-" + m[2].toUpperCase() : "");
    return words(t.split("_"));
  }
  function kindOf(t) { return data.kinds[t] || (t === RESULT ? "result" : "computed"); }

  var NOT_MONEY = /(count|_age|age_|year|_pct|percent|rate|number|months|days|dob|zip|ssn|ein|_code|code_|_id$|ratio)/;
  function fmtNum(n, k) {
    if (!isFinite(n)) return String(n);
    if (k && NOT_MONEY.test(k)) return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
    var cents = Math.abs(n - Math.round(n)) > 0.004;
    return (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 });
  }
  function isEmpty(v) {
    if (v === null || v === undefined || v === "" || v === 0 || v === false) return true;
    if (Array.isArray(v)) return v.every(isEmpty);
    if (typeof v === "object") return Object.keys(v).length === 0;
    return false;
  }
  function visible(v) { return state.showZero || !isEmpty(v); }
  function fmtScalar(v, k) {
    if (typeof v === "number") return fmtNum(v, k);
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (v === null || v === undefined) return "—";
    return String(v);
  }
  function fmtValue(v, k) {
    if (Array.isArray(v) && v.every(function (x) { return typeof x !== "object" || x === null; })) {
      return esc(v.map(function (x) { return fmtScalar(x, k); }).join(" + "));
    }
    if (v && typeof v === "object") return objDetails(v);
    return esc(fmtScalar(v, k));
  }
  function objDl(o) {
    var keys = Object.keys(o).filter(function (kk) { return visible(o[kk]); });
    if (!keys.length) return '<div class="empty">No values</div>';
    return "<dl>" + keys.map(function (kk) {
      var val = o[kk];
      var shown = val && typeof val === "object" ? JSON.stringify(val) : fmtScalar(val, kk);
      return "<dt>" + esc(kk) + "</dt><dd>" + esc(shown) + "</dd>";
    }).join("") + "</dl>";
  }
  function objDetails(v) {
    var items = Array.isArray(v) ? v : [v];
    var label = Array.isArray(v) ? v.length + (v.length === 1 ? " entry" : " entries") : Object.keys(v).length + " fields";
    return '<details class="obj"><summary>' + esc(label) + "</summary>" +
      items.map(function (it) { return '<div class="item">' + (it && typeof it === "object" ? objDl(it) : esc(fmtScalar(it))) + "</div>"; }).join("") +
      "</details>";
  }
  function chip(t) {
    return '<button type="button" class="chip k-' + kindOf(t) + '" data-node="' + esc(t) + '" title="' + esc(t) + '">' + esc(nodeLabel(t)) + "</button>";
  }

  // ---------- provenance ----------
  function inputOf(n) { return (byType[n] && byType[n].input) || {}; }
  function valueOf(n, k) {
    if (n === RESULT && k in data.result) return data.result[k];
    if (selfOut[n] && k in selfOut[n]) return selfOut[n][k];
    return inputOf(n)[k];
  }
  function sourcesOf(n, k) { return (incoming[n] && incoming[n][k]) || []; }
  function isComputedHere(n, k) { return !!(selfOut[n] && k in selfOut[n]); }

  var ancMemo = {};
  function nodeAncestors(n) {
    if (ancMemo[n]) return ancMemo[n];
    var set = {};
    Object.keys(incoming[n] || {}).forEach(function (k) {
      sourcesOf(n, k).forEach(function (c) {
        set[c.from] = true;
        Object.keys(nodeAncestors(c.from)).forEach(function (a) { set[a] = true; });
      });
    });
    ancMemo[n] = set;
    return set;
  }
  function fieldAncestors(n, k) {
    var set = {};
    set[n] = true;
    var ups = sourcesOf(n, k);
    var roots = ups.length ? ups.map(function (c) { return c.from; }) : (isComputedHere(n, k) ? [n] : []);
    roots.forEach(function (r) {
      set[r] = true;
      Object.keys(nodeAncestors(r)).forEach(function (a) { set[a] = true; });
    });
    return set;
  }

  // ---------- graph layout ----------
  var preds = {}, succs = {};
  Object.keys(edges).forEach(function (key) {
    var e = edges[key];
    (preds[e.to] = preds[e.to] || []).push(e.from);
    (succs[e.from] = succs[e.from] || []).push(e.to);
  });
  var layer = {};
  order.forEach(function (n) {
    var l = 0;
    (preds[n] || []).forEach(function (p) { if (layer[p] !== undefined) l = Math.max(l, layer[p] + 1); });
    layer[n] = l;
  });
  var nLayers = 0;
  order.forEach(function (n) { nLayers = Math.max(nLayers, layer[n] + 1); });
  var cols = [];
  for (var i = 0; i < nLayers; i++) cols.push([]);
  order.forEach(function (n) { cols[layer[n]].push(n); });
  var pos = {};
  function reindex() { cols.forEach(function (c) { c.forEach(function (n, j) { pos[n] = c.length > 1 ? j / (c.length - 1) : 0.5; }); }); }
  function bary(list) {
    if (!list || !list.length) return null;
    return list.reduce(function (s, p) { return s + pos[p]; }, 0) / list.length;
  }
  reindex();
  for (var pass = 0; pass < 6; pass++) {
    var down = pass % 2 === 0;
    var seq = cols.map(function (_, j) { return down ? j : cols.length - 1 - j; });
    seq.forEach(function (j) {
      var c = cols[j];
      var score = {};
      c.forEach(function (n) {
        var b = bary(down ? preds[n] : succs[n]);
        score[n] = b === null ? pos[n] : b;
      });
      c.sort(function (a, b) { return score[a] - score[b]; });
      c.forEach(function (n, k) { pos[n] = c.length > 1 ? k / (c.length - 1) : 0.5; });
    });
  }

  var NW = 158, NH = 42, CG = 62, RG = 14, PAD = 16;
  var maxRows = cols.reduce(function (m, c) { return Math.max(m, c.length); }, 0);
  var W = PAD * 2 + nLayers * NW + (nLayers - 1) * CG;
  var H = PAD * 2 + maxRows * NH + (maxRows - 1) * RG;
  var xy = {};
  cols.forEach(function (c, j) {
    var colH = c.length * NH + (c.length - 1) * RG;
    var top = PAD + (H - PAD * 2 - colH) / 2;
    c.forEach(function (n, k) { xy[n] = { x: PAD + j * (NW + CG), y: top + k * (NH + RG) }; });
  });
  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }

  function renderGraph() {
    var svg = ['<svg class="flow" id="flow" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Data flow between forms">'];
    svg.push('<defs><marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="arrow" d="M0,0 L8,4 L0,8 z"/></marker>' +
      '<marker id="arr-on" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="arrow-on" d="M0,0 L8,4 L0,8 z"/></marker></defs>');
    Object.keys(edges).forEach(function (key) {
      var e = edges[key], a = xy[e.from], b = xy[e.to];
      if (!a || !b) return;
      var x1 = a.x + NW, y1 = a.y + NH / 2, x2 = b.x - 2, y2 = b.y + NH / 2, c = Math.max(24, (x2 - x1) / 2);
      var fields = Object.keys(e.fields).map(fieldLabel).join(", ");
      svg.push('<path class="edge" data-from="' + esc(e.from) + '" data-to="' + esc(e.to) + '" marker-end="url(#arr)" d="M' + x1 + " " + y1 + " C" + (x1 + c) + " " + y1 + " " + (x2 - c) + " " + y2 + " " + x2 + " " + y2 + '"><title>' +
        esc(nodeLabel(e.from) + " → " + nodeLabel(e.to) + ": " + fields) + "</title></path>");
    });
    order.forEach(function (n) {
      var p = xy[n], info = byType[n];
      var cls = "node k-" + kindOf(n) + (info.ran ? "" : " unrun") + (info.ran && !(succs[n] || []).length && n !== RESULT ? " dead" : "");
      svg.push('<g class="' + cls + '" data-node="' + esc(n) + '" tabindex="0" role="button" aria-label="' + esc(nodeLabel(n)) + '" transform="translate(' + p.x + "," + p.y + ')">' +
        '<rect width="' + NW + '" height="' + NH + '" rx="2"/>' +
        '<text x="10" y="18">' + esc(trunc(nodeLabel(n), 22)) + "</text>" +
        '<text class="id" x="10" y="33">' + esc(trunc(n, 26)) + "</text>" +
        "<title>" + esc(nodeLabel(n) + " (" + n + ")" + (info.ran ? "" : " — did not run") + (info.ran && !(succs[n] || []).length && n !== RESULT ? " — sent nothing onward" : "")) + "</title></g>");
    });
    svg.push("</svg>");
    document.getElementById("graph").innerHTML = svg.join("");
  }

  function highlight(set, selNode) {
    var flow = document.getElementById("flow");
    if (!flow) return;
    flow.classList.toggle("focus", !!set);
    flow.querySelectorAll(".node").forEach(function (g) {
      var n = g.getAttribute("data-node");
      g.classList.toggle("on", !!set && !!set[n]);
      g.classList.toggle("sel", n === selNode);
    });
    flow.querySelectorAll(".edge").forEach(function (p) {
      var on = !!set && !!set[p.getAttribute("data-from")] && !!set[p.getAttribute("data-to")];
      p.classList.toggle("on", on);
      p.setAttribute("marker-end", on ? "url(#arr-on)" : "url(#arr)");
    });
  }

  // ---------- header + summary ----------
  var KEY_LINES = [
    ["line9_total_income", "Line 9 · Total income"],
    ["line11_agi", "Line 11 · AGI"],
    ["line15_taxable_income", "Line 15 · Taxable income"],
    ["line24_total_tax", "Line 24 · Total tax"],
    ["line33_total_payments", "Line 33 · Payments"],
    ["line35a_refund", "Line 35a · Refund"],
    ["line37_amount_owed", "Line 37 · Amount owed"]
  ];
  function num(v) { return Array.isArray(v) ? (typeof v[0] === "number" ? v[0] : 0) : (typeof v === "number" ? v : 0); }
  function expectedCheck(k) {
    if (!data.expected || !(k in data.expected)) return "";
    var exp = data.expected[k], got = num(data.result[k]);
    var ok = Math.abs(exp - got) <= 1;
    return '<span class="chk ' + (ok ? "ok" : "bad") + '">' + (ok ? "✓ matches IRS answer" : "✗ IRS answer " + esc(fmtNum(exp, k))) + "</span>";
  }
  function renderHeader() {
    document.getElementById("h-eyebrow").textContent = nodeLabel(RESULT) + " · Tax year " + data.taxYear;
    document.getElementById("h-title").textContent = data.title;
    document.getElementById("h-sub").textContent = data.subtitle;
    var refund = num(data.result.line35a_refund), owed = num(data.result.line37_amount_owed);
    var tiles = KEY_LINES.filter(function (l) {
      if (l[0] === "line35a_refund") return refund > 0 || owed === 0;
      if (l[0] === "line37_amount_owed") return owed > 0;
      return true;
    });
    document.getElementById("summary").innerHTML = tiles.map(function (l) {
      return '<button type="button" class="tile" data-field="' + esc(RESULT + "|" + l[0]) + '" aria-pressed="false">' +
        '<span class="ln">' + esc(l[1]) + '</span><span class="v">' + esc(fmtNum(num(data.result[l[0]]), l[0])) + "</span>" + expectedCheck(l[0]) + "</button>";
    }).join("");
    if (data.diagnostics.length) {
      document.getElementById("banner").innerHTML = '<div class="banner" role="alert"><b>' + data.diagnostics.length +
        (data.diagnostics.length === 1 ? " node failed" : " nodes failed") + ". Their numbers are missing from the return.</b>" +
        data.diagnostics.map(function (d) { return "<div>" + chip(d.nodeType) + " " + esc(d.message) + "</div>"; }).join("") + "</div>";
    }
  }

  // ---------- lines list ----------
  function sortKey(k) {
    var lp = lineParts(k);
    if (!lp) return [1e9, k];
    var m = /^(\\d+)([a-z]?)$/.exec(lp.no);
    return [parseInt(m[1], 10) + (m[2] ? (m[2].charCodeAt(0) - 96) / 100 : 0), k];
  }
  function renderLines() {
    var keys = Object.keys(data.result);
    var lineKeys = keys.filter(function (k) { return lineParts(k); }).sort(function (a, b) {
      var x = sortKey(a), y = sortKey(b);
      return x[0] - y[0] || (x[1] < y[1] ? -1 : 1);
    });
    var other = keys.filter(function (k) { return !lineParts(k); });
    document.getElementById("lines-title").textContent = nodeLabel(RESULT) + " lines";
    function row(k) {
      var v = data.result[k];
      if (!visible(v)) return "";
      var lp = lineParts(k);
      var sel = state.sel && state.sel.n === RESULT && state.sel.k === k;
      var label = lp ? (lp.rest ? words(lp.rest.split("_")) : fieldLabel(k)) : fieldLabel(k);
      return '<li><button type="button" class="line-btn" data-field="' + esc(RESULT + "|" + k) + '" aria-pressed="' + sel + '">' +
        '<span class="no">' + esc(lp ? lp.no : "") + '</span><span class="lbl">' + esc(label) + "</span>" +
        '<span class="v' + (isEmpty(v) ? " zero" : "") + '">' + fmtValue(v, k) + "</span></button></li>";
    }
    var html = '<ul class="lines">' + lineKeys.map(row).join("") + "</ul>";
    var otherRows = other.map(row).join("");
    if (otherRows) html += '<div class="group-title eyebrow">Filer details</div><ul class="lines">' + otherRows + "</ul>";
    document.getElementById("lines").innerHTML = html;
  }

  // ---------- derivation tree ----------
  var specs = [];
  function spec(s) { specs.push(s); return specs.length - 1; }
  function inputFields(n, exclude) {
    if (n === "start") return [];
    var inp = inputOf(n);
    return Object.keys(inp).filter(function (f) { return f !== exclude && visible(inp[f]); })
      .map(function (f) { return { t: "field", n: n, k: f, v: inp[f] }; });
  }
  function childrenOf(s) {
    if (s.t === "source") return { cap: "Inputs to " + nodeLabel(s.n), kids: inputFields(s.n) };
    if (s.n === "start") return { kids: [] };
    var ups = sourcesOf(s.n, s.k);
    if (ups.length === 1) {
      return ups[0].from === "start" ? { kids: [] } : { cap: nodeLabel(ups[0].from) + " worked from", kids: inputFields(ups[0].from) };
    }
    if (ups.length > 1) return { cap: "Added together from", kids: ups.map(function (c) { return { t: "source", n: c.from, v: c.value, k: s.k }; }) };
    if (isComputedHere(s.n, s.k)) return { cap: "Calculated on " + nodeLabel(s.n) + " from", kids: inputFields(s.n, s.k) };
    return { kids: [] };
  }
  function viaHtml(s) {
    if (s.t === "source") return '<span class="t-via">sent ' + chip(s.n) + "</span>";
    if (s.n === "start") return '<span class="tag">you entered</span>';
    var ups = sourcesOf(s.n, s.k);
    if (ups.length === 1 && ups[0].from === "start") return '<span class="tag">you entered</span>';
    if (ups.length === 1) return '<span class="t-via">from ' + chip(ups[0].from) + "</span>";
    if (ups.length > 1) return '<span class="t-via">' + ups.length + " sources</span>";
    if (isComputedHere(s.n, s.k)) return '<span class="t-via">calculated on ' + chip(s.n) + "</span>";
    if (kindOf(s.n) === "input") return '<span class="tag">you entered</span>';
    return '<span class="t-via">no recorded source</span>';
  }
  function rowHtml(s, depth) {
    var id = spec(s);
    var ch = childrenOf(s);
    var expandable = ch.kids.length > 0;
    var open = expandable && depth < 1;
    var label = s.t === "source" ? nodeLabel(s.n) : fieldLabel(s.k);
    var inner = open ? kidsHtml(ch, depth + 1) : "";
    return '<li><div class="t-line">' +
      (expandable ? '<button type="button" class="t-tog" data-spec="' + id + '" aria-expanded="' + open + '" aria-label="Show inputs">' + (open ? "−" : "+") + "</button>" : '<span class="t-pad"></span>') +
      (s.t === "field" ? '<button type="button" class="linklike t-field" data-field="' + esc(s.n + "|" + s.k) + '" title="' + esc(s.n + "." + s.k) + '">' + esc(label) + "</button>" : '<span class="t-field">' + esc(label) + "</span>") +
      '<span class="t-val">' + fmtValue(s.v, s.k) + "</span>" + viaHtml(s) +
      '</div><ul data-kids="' + id + '"' + (open ? "" : " hidden") + ">" + inner + "</ul></li>";
  }
  function kidsHtml(ch, depth) {
    var cap = ch.cap ? '<li class="t-cap">' + esc(ch.cap) + "</li>" : "";
    return cap + ch.kids.map(function (k) { return rowHtml(k, depth); }).join("");
  }
  function toggleSpec(btn) {
    var id = btn.getAttribute("data-spec");
    var ul = btn.closest("li").querySelector('ul[data-kids="' + id + '"]');
    var open = btn.getAttribute("aria-expanded") !== "true";
    if (open && !ul.innerHTML) ul.innerHTML = kidsHtml(childrenOf(specs[+id]), 99);
    ul.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "−" : "+";
  }

  // ---------- inspector ----------
  function renderField(n, k) {
    specs = [];
    var v = valueOf(n, k);
    var head = '<div class="focus-head"><div class="eyebrow">' + esc(nodeLabel(n)) + "</div><h3>" + esc(fieldLabel(k)) + "</h3>" +
      '<div class="big">' + fmtValue(v, k) + "</div>" +
      '<div class="meta"><span class="rawid">' + esc(n + "." + k) + "</span>" + (n === RESULT ? expectedCheck(k) : chip(n)) + "</div></div>";
    var root = { t: "field", n: n, k: k, v: v };
    var ch = childrenOf(root);
    spec(root);
    var body = ch.kids.length
      ? '<div><div class="eyebrow">How it was derived</div><ul class="tree">' + '<li><div class="t-line"><span class="t-pad"></span>' + viaHtml(root) + "</div><ul>" + kidsHtml(ch, 1) + "</ul></li></ul></div>"
      : '<div class="meta">' + viaHtml(root) + "</div>";
    document.getElementById("inspect").innerHTML = head + body;
    highlight(fieldAncestors(n, k), n);
  }
  function fromCell(n, f) {
    var ups = sourcesOf(n, f);
    if (!ups.length) return n === "start" || kindOf(n) === "input" ? '<span class="tag">you entered</span>' : '<span class="empty">—</span>';
    return ups.map(function (c) { return c.from === "start" ? '<span class="tag">you entered</span>' : chip(c.from); }).join(" ");
  }
  function kvTable(n, obj, withFrom) {
    var keys = Object.keys(obj).filter(function (f) { return visible(obj[f]); });
    if (!keys.length) return '<div class="empty">Nothing to show. Turn on "Show zero and empty" to see every field.</div>';
    return '<div class="kv-wrap"><table class="kv"><thead><tr><th>Field</th><th style="text-align:right">Value</th>' + (withFrom ? "<th>From</th>" : "") + "</tr></thead><tbody>" +
      keys.map(function (f) {
        return '<tr><td><button type="button" class="linklike" data-field="' + esc(n + "|" + f) + '">' + esc(fieldLabel(f)) + '</button></td><td class="v">' + fmtValue(obj[f], f) + "</td>" +
          (withFrom ? "<td>" + fromCell(n, f) + "</td>" : "") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }
  function renderNode(n) {
    var info = byType[n] || { input: {}, outputs: [], ran: false };
    var parts = ['<div class="focus-head"><div class="eyebrow">' + esc(kindOf(n) === "computed" ? "Computed form or worksheet" : kindOf(n) === "result" ? "Final return" : "Your entries") + "</div>" +
      "<h3>" + esc(nodeLabel(n)) + '</h3><div class="meta"><span class="rawid">' + esc(n) + "</span></div></div>"];
    if (!info.ran) parts.push('<div class="banner"><b>This form did not run.</b>' + (diag[n] || ["Its input did not pass validation."]).map(function (m) { return "<div>" + esc(m) + "</div>"; }).join("") + "</div>");
    else if (diag[n]) parts.push('<div class="banner"><b>This form failed.</b>' + diag[n].map(function (m) { return "<div>" + esc(m) + "</div>"; }).join("") + "</div>");
    if (n !== "start") parts.push('<div><div class="eyebrow">Received</div>' + kvTable(n, info.input, true) + "</div>");
    if (selfOut[n]) parts.push('<div><div class="eyebrow">Calculated here</div>' + kvTable(n, n === RESULT ? data.result : selfOut[n], false) + "</div>");
    var sent = info.outputs.filter(function (o) { return o.to !== n; });
    if (sent.length) {
      var grouped = {};
      sent.forEach(function (o) { (grouped[o.to] = grouped[o.to] || []).push(o.fields); });
      parts.push('<div><div class="eyebrow">Sent onward</div>' + Object.keys(grouped).map(function (to) {
        var rows = [];
        grouped[to].forEach(function (fields) {
          Object.keys(fields).forEach(function (f) { if (visible(fields[f])) rows.push("<tr><td>" + esc(fieldLabel(f)) + '</td><td class="v">' + fmtValue(fields[f], f) + "</td></tr>"); });
        });
        return '<div class="sent-group"><h4>to ' + chip(to) + "</h4>" + (rows.length ? '<div class="kv-wrap"><table class="kv"><tbody>' + rows.join("") + "</tbody></table></div>" : '<div class="empty">Only zero or empty values.</div>') + "</div>";
      }).join("") + "</div>");
    } else if (info.ran && n !== RESULT) {
      parts.push('<div class="empty">This form ran but sent nothing onward.</div>');
    }
    document.getElementById("inspect").innerHTML = parts.join("");
    var set = nodeAncestors(n), withSelf = {};
    Object.keys(set).forEach(function (a) { withSelf[a] = true; });
    withSelf[n] = true;
    highlight(withSelf, n);
  }

  function syncPressed() {
    document.querySelectorAll(".tile, .line-btn").forEach(function (b) {
      var f = b.getAttribute("data-field");
      b.setAttribute("aria-pressed", String(!!state.sel && state.sel.k !== undefined && f === state.sel.n + "|" + state.sel.k));
    });
  }
  function render() {
    if (!state.sel) return;
    if (state.sel.k !== undefined) renderField(state.sel.n, state.sel.k);
    else renderNode(state.sel.n);
    syncPressed();
  }
  function selectField(n, k) { state.sel = { n: n, k: k }; render(); }
  function selectNode(n) { state.sel = { n: n }; render(); }

  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-spec], [data-field], [data-node]");
    if (!t) return;
    if (t.hasAttribute("data-spec")) return toggleSpec(t);
    if (t.hasAttribute("data-field")) {
      var f = t.getAttribute("data-field"), i = f.indexOf("|");
      return selectField(f.slice(0, i), f.slice(i + 1));
    }
    selectNode(t.getAttribute("data-node"));
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    var g = ev.target.closest && ev.target.closest("svg [data-node]");
    if (!g) return;
    ev.preventDefault();
    selectNode(g.getAttribute("data-node"));
  });
  document.getElementById("show-zero").addEventListener("change", function (ev) {
    state.showZero = ev.target.checked;
    try { localStorage.setItem("opentax-explore-zero", state.showZero ? "1" : "0"); } catch (e) { /* storage unavailable */ }
    renderLines();
    render();
  });

  renderHeader();
  renderGraph();
  renderLines();
  var first = ["line24_total_tax", "line11_agi"].filter(function (k) { return k in data.result; })[0];
  if (first) selectField(RESULT, first);
  else if (order.length) selectNode(order[order.length - 1]);
})();
`;

// JSON inside <script> must not contain "</script" or line separators that end the string.
function embedJson(data: ExplorerData): string {
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

function bodyContent(data: ExplorerData): string {
  return MARKUP +
    `<script type="application/json" id="trace-data">${embedJson(data)}</script>` +
    `<script>${SCRIPT}</script>`;
}

/** Page content without the document skeleton, for hosts that supply their own. */
export function renderExplorerFragment(data: ExplorerData): string {
  return pageTitle(data) + FONTS + `<style>${STYLE}</style>` + bodyContent(data);
}

/** A complete standalone HTML document. */
export function renderExplorerHtml(data: ExplorerData): string {
  return "<!doctype html>\n<html lang=\"en\"><head><meta charset=\"utf-8\">" +
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
    pageTitle(data) + FONTS + `<style>${STYLE}</style></head><body>` +
    bodyContent(data) + "</body></html>\n";
}
