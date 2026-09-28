// Browser script for the explorer page. Plain ES5-style JS inside a TS string:
// no template literals, so it can live in this template string untouched.
//
// It renders from the embedded trace, and once the in-browser engine module
// announces itself ("opentax-engine-ready") it enables editing: every change
// re-runs the engine and rebuilds the model, graph, lines and inspector.

export const CLIENT_SCRIPT = `
(function () {
  "use strict";
  var ORIG = JSON.parse(document.getElementById("trace-data").textContent);
  var formsEl = document.getElementById("forms-data");
  var FORM_DOCS = formsEl ? JSON.parse(formsEl.textContent) : {};
  var RESULT = ORIG.formType;
  var KEY = ORIG.formType + ":" + ORIG.taxYear;
  var data = ORIG;
  var M = null;

  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function load(key, fallback) { try { var v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ } }

  var state = {
    sel: null,
    showZero: load("opentax-explore-zero", "0") === "1",
    tab: load("opentax-explore-tab", "lines"),
    entries: clone(ORIG.entries || []),
    api: null,
    specs: {},
    edited: false,
    status: ""
  };

  // ---------- model ----------
  function buildModel(d) {
    var m = { byType: {}, order: [], diag: {}, incoming: {}, selfOut: {}, edges: {}, preds: {}, succs: {}, anc: {} };
    d.steps.forEach(function (s) { m.byType[s.nodeType] = { input: s.input, outputs: s.outputs, ran: true }; m.order.push(s.nodeType); });
    d.unrun.forEach(function (u) { m.byType[u.nodeType] = { input: u.input, outputs: [], ran: false }; m.order.push(u.nodeType); });
    d.diagnostics.forEach(function (x) { (m.diag[x.nodeType] = m.diag[x.nodeType] || []).push(x.message); });
    d.steps.forEach(function (s) {
      s.outputs.forEach(function (o) {
        if (o.to === s.nodeType) { m.selfOut[o.to] = Object.assign(m.selfOut[o.to] || {}, o.fields); return; }
        var tgt = m.incoming[o.to] = m.incoming[o.to] || {};
        Object.keys(o.fields).forEach(function (k) { (tgt[k] = tgt[k] || []).push({ from: s.nodeType, value: o.fields[k] }); });
        var key = s.nodeType + ">" + o.to;
        var e = m.edges[key] = m.edges[key] || { from: s.nodeType, to: o.to, fields: {} };
        Object.keys(o.fields).forEach(function (k) { e.fields[k] = true; });
        if (!m.byType[o.to]) { m.byType[o.to] = { input: {}, outputs: [], ran: false }; m.order.push(o.to); }
      });
    });
    Object.keys(m.edges).forEach(function (key) {
      var e = m.edges[key];
      (m.preds[e.to] = m.preds[e.to] || []).push(e.from);
      (m.succs[e.from] = m.succs[e.from] || []).push(e.to);
    });
    layout(m);
    return m;
  }

  // Layered left-to-right layout: column = longest path from the start node,
  // rows ordered by alternating barycenter sweeps to reduce crossings.
  var NW = 158, NH = 42, CG = 62, RG = 14, PAD = 16;
  function layout(m) {
    var layer = {};
    m.order.forEach(function (n) {
      var l = 0;
      (m.preds[n] || []).forEach(function (p) { if (layer[p] !== undefined) l = Math.max(l, layer[p] + 1); });
      layer[n] = l;
    });
    var nLayers = 0;
    m.order.forEach(function (n) { nLayers = Math.max(nLayers, layer[n] + 1); });
    var cols = [];
    for (var i = 0; i < nLayers; i++) cols.push([]);
    m.order.forEach(function (n) { cols[layer[n]].push(n); });
    var pos = {};
    function place(c) { c.forEach(function (n, k) { pos[n] = c.length > 1 ? k / (c.length - 1) : 0.5; }); }
    function bary(list) {
      if (!list || !list.length) return null;
      return list.reduce(function (s, p) { return s + pos[p]; }, 0) / list.length;
    }
    cols.forEach(place);
    for (var pass = 0; pass < 6; pass++) {
      var down = pass % 2 === 0;
      for (var s = 0; s < cols.length; s++) {
        var c = cols[down ? s : cols.length - 1 - s];
        var score = {};
        c.forEach(function (n) {
          var b = bary(down ? m.preds[n] : m.succs[n]);
          score[n] = b === null ? pos[n] : b;
        });
        c.sort(function (a, b) { return score[a] - score[b]; });
        place(c);
      }
    }
    var maxRows = cols.reduce(function (mx, c) { return Math.max(mx, c.length); }, 0);
    m.W = PAD * 2 + nLayers * NW + Math.max(0, nLayers - 1) * CG;
    m.H = PAD * 2 + maxRows * NH + Math.max(0, maxRows - 1) * RG;
    m.xy = {};
    cols.forEach(function (c, j) {
      var colH = c.length * NH + (c.length - 1) * RG;
      var top = PAD + (m.H - PAD * 2 - colH) / 2;
      c.forEach(function (n, k) { m.xy[n] = { x: PAD + j * (NW + CG), y: top + k * (NH + RG) }; });
    });
  }

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
    if (t !== "start" && FORM_DOCS[t]) return FORM_DOCS[t].title;
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
  function kindOf(t) { return data.kinds[t] || (t === RESULT ? "result" : state.specs[t] ? "input" : "computed"); }

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
  function plainValue(v, k) {
    if (Array.isArray(v) && v.every(function (x) { return typeof x !== "object" || x === null; })) return v.map(function (x) { return fmtScalar(x, k); }).join(" + ");
    if (v && typeof v === "object") return JSON.stringify(v);
    return fmtScalar(v, k);
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
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

  // ---------- provenance ----------
  function inputOf(n) { return (M.byType[n] && M.byType[n].input) || {}; }
  function valueOf(n, k) {
    if (n === RESULT && k in data.result) return data.result[k];
    if (M.selfOut[n] && k in M.selfOut[n]) return M.selfOut[n][k];
    return inputOf(n)[k];
  }
  function sourcesOf(n, k) { return (M.incoming[n] && M.incoming[n][k]) || []; }
  function isComputedHere(n, k) { return !!(M.selfOut[n] && k in M.selfOut[n]); }
  function nodeAncestors(n) {
    if (M.anc[n]) return M.anc[n];
    var set = {};
    Object.keys(M.incoming[n] || {}).forEach(function (k) {
      sourcesOf(n, k).forEach(function (c) {
        set[c.from] = true;
        Object.keys(nodeAncestors(c.from)).forEach(function (a) { set[a] = true; });
      });
    });
    M.anc[n] = set;
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

  // ---------- graph ----------
  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function isDead(n) { return M.byType[n].ran && !(M.succs[n] || []).length && n !== RESULT; }
  function renderGraph() {
    var svg = ['<svg class="flow" id="flow" width="' + M.W + '" height="' + M.H + '" viewBox="0 0 ' + M.W + " " + M.H + '" role="img" aria-label="Data flow between forms">'];
    svg.push('<defs><marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="arrow" d="M0,0 L8,4 L0,8 z"/></marker>' +
      '<marker id="arr-on" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="arrow-on" d="M0,0 L8,4 L0,8 z"/></marker></defs>');
    Object.keys(M.edges).forEach(function (key) {
      var e = M.edges[key], a = M.xy[e.from], b = M.xy[e.to];
      if (!a || !b) return;
      var x1 = a.x + NW, y1 = a.y + NH / 2, x2 = b.x - 2, y2 = b.y + NH / 2, c = Math.max(24, (x2 - x1) / 2);
      var fields = Object.keys(e.fields).map(fieldLabel).join(", ");
      svg.push('<path class="edge" data-from="' + esc(e.from) + '" data-to="' + esc(e.to) + '" marker-end="url(#arr)" d="M' + x1 + " " + y1 + " C" + (x1 + c) + " " + y1 + " " + (x2 - c) + " " + y2 + " " + x2 + " " + y2 + '"><title>' +
        esc(nodeLabel(e.from) + " → " + nodeLabel(e.to) + ": " + fields) + "</title></path>");
    });
    M.order.forEach(function (n) {
      var p = M.xy[n], info = M.byType[n], dead = isDead(n);
      var cls = "node k-" + kindOf(n) + (info.ran ? "" : " unrun") + (dead ? " dead" : "");
      svg.push('<g class="' + cls + '" data-node="' + esc(n) + '" tabindex="0" role="button" aria-label="' + esc(nodeLabel(n)) + '" transform="translate(' + p.x + "," + p.y + ')">' +
        '<rect width="' + NW + '" height="' + NH + '" rx="2"/>' +
        '<text x="10" y="18">' + esc(trunc(nodeLabel(n), 22)) + "</text>" +
        '<text class="id" x="10" y="33">' + esc(trunc(n, 26)) + "</text>" +
        "<title>" + esc(nodeLabel(n) + " (" + n + ")" + (info.ran ? "" : " — did not run") + (dead ? " — sent nothing onward" : "")) + "</title></g>");
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
    if (state.edited || !data.expected || !(k in data.expected)) return "";
    var exp = data.expected[k], got = num(data.result[k]);
    var ok = Math.abs(exp - got) <= 1;
    return '<span class="chk ' + (ok ? "ok" : "bad") + '">' + (ok ? "✓ matches IRS answer" : "✗ IRS answer " + esc(fmtNum(exp, k))) + "</span>";
  }
  function wasNote(k) {
    if (!state.edited || same(ORIG.result[k], data.result[k])) return "";
    return '<span class="was">was ' + esc(plainValue(ORIG.result[k] === undefined ? 0 : ORIG.result[k], k)) + "</span>";
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
        '<span class="ln">' + esc(l[1]) + '</span><span class="v">' + esc(fmtNum(num(data.result[l[0]]), l[0])) + "</span>" +
        expectedCheck(l[0]) + wasNote(l[0]) + "</button>";
    }).join("");
    var banner = document.getElementById("banner");
    banner.innerHTML = data.diagnostics.length
      ? '<div class="banner" role="alert"><b>' + data.diagnostics.length + (data.diagnostics.length === 1 ? " form failed" : " forms failed") +
        ". Its numbers are missing from the return.</b>" +
        data.diagnostics.map(function (d) { return "<div>" + chip(d.nodeType) + " " + esc(d.message) + "</div>"; }).join("") + "</div>"
      : "";
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
    function row(k) {
      var v = data.result[k];
      if (!visible(v)) return "";
      var lp = lineParts(k);
      var sel = !!state.sel && state.sel.n === RESULT && state.sel.k === k;
      var label = lp ? (lp.rest ? words(lp.rest.split("_")) : fieldLabel(k)) : fieldLabel(k);
      return '<li><button type="button" class="line-btn" data-field="' + esc(RESULT + "|" + k) + '" aria-pressed="' + sel + '">' +
        '<span class="no">' + esc(lp ? lp.no : "") + '</span><span class="lbl">' + esc(label) + "</span>" +
        '<span class="v' + (isEmpty(v) ? " zero" : "") + '">' + fmtValue(v, k) + wasNote(k) + "</span></button></li>";
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
      '<div class="meta"><span class="rawid">' + esc(n + "." + k) + "</span>" + (n === RESULT ? expectedCheck(k) + wasNote(k) : chip(n)) + "</div></div>";
    var root = { t: "field", n: n, k: k, v: v };
    var ch = childrenOf(root);
    spec(root);
    var body = ch.kids.length
      ? '<div><div class="eyebrow">How it was derived</div><ul class="tree"><li><div class="t-line"><span class="t-pad"></span>' + viaHtml(root) + "</div><ul>" + kidsHtml(ch, 1) + "</ul></li></ul></div>"
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
    return '<div class="kv-wrap"><table class="kv"><thead><tr><th>Field</th><th class="r">Value</th>' + (withFrom ? "<th>From</th>" : "") + "</tr></thead><tbody>" +
      keys.map(function (f) {
        return '<tr><td><button type="button" class="linklike" data-field="' + esc(n + "|" + f) + '">' + esc(fieldLabel(f)) + '</button></td><td class="v">' + fmtValue(obj[f], f) + "</td>" +
          (withFrom ? "<td>" + fromCell(n, f) + "</td>" : "") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }
  function renderNode(n) {
    var info = M.byType[n];
    var kind = kindOf(n);
    var parts = ['<div class="focus-head"><div class="eyebrow">' + esc(kind === "computed" ? "Computed form or worksheet" : kind === "result" ? "Final return" : "Your entries") + "</div>" +
      "<h3>" + esc(nodeLabel(n)) + "</h3>" +
      (FORM_DOCS[n] && FORM_DOCS[n].subtitle ? '<div class="d-sub">' + esc(FORM_DOCS[n].subtitle) + "</div>" : "") +
      '<div class="meta"><span class="rawid">' + esc(n) + "</span></div>" +
      (FORM_DOCS[n] ? '<p class="about">' + esc(FORM_DOCS[n].summary) + "</p>" : "") + "</div>"];
    if (!info.ran) parts.push('<div class="banner"><b>This form did not run.</b>' + (M.diag[n] || ["Its input did not pass validation."]).map(function (m) { return "<div>" + esc(m) + "</div>"; }).join("") + "</div>");
    else if (M.diag[n]) parts.push('<div class="banner"><b>This form failed.</b>' + M.diag[n].map(function (m) { return "<div>" + esc(m) + "</div>"; }).join("") + "</div>");
    if (n !== "start") parts.push('<div><div class="eyebrow">Received</div>' + kvTable(n, info.input, true) + "</div>");
    if (M.selfOut[n]) parts.push('<div><div class="eyebrow">Calculated here</div>' + kvTable(n, n === RESULT ? data.result : M.selfOut[n], false) + "</div>");
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
    var set = {};
    Object.keys(nodeAncestors(n)).forEach(function (a) { set[a] = true; });
    set[n] = true;
    highlight(set, n);
  }

  function syncPressed() {
    document.querySelectorAll(".tile, .line-btn").forEach(function (b) {
      var f = b.getAttribute("data-field");
      b.setAttribute("aria-pressed", String(!!state.sel && state.sel.k !== undefined && f === state.sel.n + "|" + state.sel.k));
    });
  }
  function defaultSelection() {
    var first = ["line24_total_tax", "line11_agi"].filter(function (k) { return k in data.result; })[0];
    if (first) return { n: RESULT, k: first };
    return M.order.length ? { n: M.order[M.order.length - 1] } : null;
  }
  function selectionValid(sel) {
    if (!sel) return false;
    if (sel.n === RESULT && sel.k !== undefined) return sel.k in data.result;
    if (!M.byType[sel.n]) return false;
    return sel.k === undefined || valueOf(sel.n, sel.k) !== undefined;
  }
  function renderInspector() {
    if (!selectionValid(state.sel)) state.sel = defaultSelection();
    if (!state.sel) return;
    if (state.sel.k !== undefined) renderField(state.sel.n, state.sel.k);
    else renderNode(state.sel.n);
    syncPressed();
  }
  function selectField(n, k) { state.sel = { n: n, k: k }; renderInspector(); }
  function selectNode(n) { state.sel = { n: n }; renderInspector(); }
  function renderResults() { renderHeader(); renderGraph(); renderLines(); renderInspector(); }

  // ---------- tabs ----------
  function renderTabs() {
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      var on = b.getAttribute("data-tab") === state.tab;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    document.getElementById("tab-lines").hidden = state.tab !== "lines";
    document.getElementById("tab-entries").hidden = state.tab !== "entries";
    document.getElementById("zero-toggle").hidden = state.tab !== "lines";
  }

  // ---------- entries editor ----------
  function specFor(t) { return state.specs[t]; }
  function fieldSpecFor(t, k) {
    var s = specFor(t);
    return s && s.fieldBy[k];
  }
  function inferKind(v) {
    if (typeof v === "number") return "number";
    if (typeof v === "boolean") return "boolean";
    if (typeof v === "string") return "text";
    return "json";
  }
  function defaultFor(fs) {
    if (fs.list) return [];
    if (fs.children) return {};
    if (fs.kind === "number") return 0;
    if (fs.kind === "boolean") return false;
    if (fs.kind === "enum") return fs.options[0];
    if (fs.kind === "text") return "";
    return {};
  }
  function entryTitle(i) {
    var e = state.entries[i];
    var peers = state.entries.filter(function (x) { return x.nodeType === e.nodeType; });
    if (peers.length < 2) return nodeLabel(e.nodeType);
    return nodeLabel(e.nodeType) + " #" + (peers.indexOf(e) + 1);
  }
  function orderedKeys(e) {
    var s = specFor(e.nodeType);
    var keys = Object.keys(e.data);
    if (!s) return keys;
    var inSpec = s.fields.map(function (f) { return f.key; }).filter(function (k) { return k in e.data; });
    return inSpec.concat(keys.filter(function (k) { return inSpec.indexOf(k) < 0; }));
  }
  function fieldInput(i, k, v, editable) {
    var e = state.entries[i];
    var spec = fieldSpecFor(e.nodeType, k);
    var fs = !spec ? { kind: inferKind(v) } : spec.list || spec.children ? { kind: "json" } : spec;
    var id = "in-" + i + "-" + k;
    var attrs = ' id="' + esc(id) + '" data-entry="' + i + '" data-key="' + esc(k) + '" data-kind="' + fs.kind + '"' + (editable ? "" : " disabled");
    if (fs.kind === "boolean") return '<input type="checkbox"' + attrs + (v ? " checked" : "") + ">";
    if (fs.kind === "enum") {
      var opts = (fs.options || []).slice();
      if (opts.indexOf(v) < 0) opts.unshift(String(v));
      return "<select" + attrs + ">" + opts.map(function (o) { return '<option value="' + esc(o) + '"' + (o === v ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select>";
    }
    if (fs.kind === "number") return '<input type="number" step="any" inputmode="decimal"' + attrs + ' value="' + esc(v === undefined || v === null ? "" : v) + '">';
    if (fs.kind === "text") return '<input type="text"' + attrs + ' value="' + esc(v === undefined || v === null ? "" : v) + '">';
    return '<textarea rows="2"' + attrs + ">" + esc(JSON.stringify(v)) + "</textarea>";
  }
  function cardHtml(e, i, editable) {
    var keys = orderedKeys(e);
    var rows = keys.map(function (k) {
      var fs = fieldSpecFor(e.nodeType, k);
      return '<div class="f-row"><label for="' + esc("in-" + i + "-" + k) + '" title="' + esc(k) + '">' + esc(fieldLabel(k)) + "</label>" +
        fieldInput(i, k, e.data[k], editable) +
        (editable && !(fs && fs.required) ? '<button type="button" class="x" data-remove-field="' + i + "|" + esc(k) + '" aria-label="Remove ' + esc(fieldLabel(k)) + '">×</button>' : '<span class="x-pad"></span>') +
        "</div>";
    }).join("");
    var s = specFor(e.nodeType);
    var addable = s ? s.fields.filter(function (f) { return !(f.key in e.data); }) : [];
    var add = editable && addable.length
      ? '<select class="add-field" data-add-field="' + i + '" aria-label="Add a field to ' + esc(entryTitle(i)) + '"><option value="">Add a field…</option>' +
        addable.map(function (f) { return '<option value="' + esc(f.key) + '">' + esc(fieldLabel(f.key)) + "</option>"; }).join("") + "</select>"
      : "";
    return '<div class="card" data-card="' + i + '"><div class="card-head"><span class="chip k-' + (e.nodeType === "general" ? "input" : kindOf(e.nodeType)) + '">' + esc(entryTitle(i)) + '</span>' +
      '<span class="rawid">' + esc(e.nodeType) + "</span>" +
      (editable ? '<button type="button" class="linklike rm" data-remove-entry="' + i + '">Remove</button>' : "") + "</div>" +
      (rows || '<div class="empty">No fields yet.</div>') + add + "</div>";
  }
  function renderEditor() {
    var editable = !!state.api;
    var note = document.getElementById("edit-note");
    note.textContent = editable
      ? "Change any value and the whole return recalculates here in your browser."
      : "Read-only. This page was generated without the in-browser engine, so entries can't be edited.";
    document.getElementById("edit-tools").hidden = !editable;
    document.getElementById("cards").innerHTML = state.entries.map(function (e, i) { return cardHtml(e, i, editable); }).join("") ||
      '<div class="empty">No documents entered.</div>';
    if (editable) {
      var present = {};
      state.entries.forEach(function (e) { present[e.nodeType] = true; });
      var types = Object.keys(state.specs).sort(function (a, b) { return nodeLabel(a) < nodeLabel(b) ? -1 : 1; });
      document.getElementById("add-doc").innerHTML = '<option value="">Add a document…</option>' + types.map(function (t) {
        var blocked = !state.specs[t].isArray && present[t];
        return '<option value="' + esc(t) + '"' + (blocked ? " disabled" : "") + ">" + esc(nodeLabel(t)) + (nodeLabel(t) === t ? "" : " (" + esc(t) + ")") + "</option>";
      }).join("");
    }
    renderStatus();
  }
  function renderStatus() {
    document.getElementById("edit-status").textContent = state.status;
    document.getElementById("reset").disabled = !state.edited;
    document.getElementById("tab-entries-btn").classList.toggle("dirty", state.edited);
  }
  function setEntryData(i, next) {
    state.entries = state.entries.map(function (e, j) { return j === i ? { nodeType: e.nodeType, data: next } : e; });
  }
  function withField(data0, k, v) {
    var next = Object.assign({}, data0);
    if (v === undefined) delete next[k]; else next[k] = v;
    return next;
  }
  function parseInput(el) {
    var kind = el.getAttribute("data-kind");
    if (kind === "boolean") return { ok: true, v: el.checked };
    if (kind === "enum" || kind === "text") return { ok: true, v: el.value };
    if (kind === "number") {
      if (el.value.trim() === "") return { ok: true, v: undefined };
      var n = Number(el.value);
      return isFinite(n) ? { ok: true, v: n } : { ok: false };
    }
    try { return { ok: true, v: JSON.parse(el.value) }; } catch (e) { return { ok: false }; }
  }
  var timer = null;
  function scheduleRecalc() {
    clearTimeout(timer);
    timer = setTimeout(recalc, 180);
  }
  function recalc() {
    clearTimeout(timer);
    state.edited = !same(state.entries, ORIG.entries || []);
    var labels = { title: ORIG.title, subtitle: ORIG.subtitle };
    if (ORIG.expected) labels.expected = ORIG.expected;
    var t0 = performance.now();
    try {
      data = state.api.trace(KEY, state.entries, labels);
    } catch (err) {
      state.status = "Could not recalculate: " + (err && err.message ? err.message : String(err));
      renderStatus();
      return;
    }
    M = buildModel(data);
    state.status = state.edited ? "Edited · recalculated in " + Math.max(1, Math.round(performance.now() - t0)) + " ms" : "Showing the original entries";
    renderResults();
    renderStatus();
  }
  function onFieldInput(el) {
    var i = +el.getAttribute("data-entry"), k = el.getAttribute("data-key");
    var p = parseInput(el);
    el.setAttribute("aria-invalid", String(!p.ok));
    if (!p.ok) return;
    setEntryData(i, withField(state.entries[i].data, k, p.v));
    scheduleRecalc();
  }
  function focusField(i, k) {
    var el = document.getElementById("in-" + i + "-" + k);
    if (el) el.focus();
  }
  function addDocument(t) {
    var s = specFor(t);
    var init = {};
    s.fields.filter(function (f) { return f.required; }).forEach(function (f) { init[f.key] = defaultFor(f); });
    state.entries = state.entries.concat([{ nodeType: t, data: init }]);
    renderEditor();
    recalc();
    var card = document.querySelector('[data-card="' + (state.entries.length - 1) + '"]');
    if (card) { card.scrollIntoView({ block: "nearest" }); var f = card.querySelector("input, select, textarea"); if (f) f.focus(); }
  }
  function addField(i, k) {
    setEntryData(i, withField(state.entries[i].data, k, defaultFor(fieldSpecFor(state.entries[i].nodeType, k))));
    renderEditor();
    recalc();
    focusField(i, k);
  }
  function removeField(i, k) {
    setEntryData(i, withField(state.entries[i].data, k, undefined));
    renderEditor();
    recalc();
  }
  function removeEntry(i) {
    state.entries = state.entries.filter(function (_, j) { return j !== i; });
    renderEditor();
    recalc();
  }
  function resetEntries() {
    state.entries = clone(ORIG.entries || []);
    renderEditor();
    recalc();
  }
  function inputJson() {
    return JSON.stringify({
      year: ORIG.taxYear,
      scenario: ORIG.subtitle,
      forms: state.entries.map(function (e) { return { node_type: e.nodeType, data: e.data }; })
    }, null, 2);
  }
  function copyJson() {
    var text = inputJson();
    var box = document.getElementById("json-out");
    var area = document.getElementById("json-text");
    function fallback() {
      area.value = text;
      box.hidden = false;
      area.focus();
      area.select();
      state.status = "Copy the input.json below.";
      renderStatus();
    }
    if (!navigator.clipboard || !navigator.clipboard.writeText) return fallback();
    navigator.clipboard.writeText(text).then(function () {
      state.status = "Copied input.json to the clipboard.";
      renderStatus();
    }, fallback);
  }

  function engineReady() {
    var api = window.OpenTaxExplorer;
    if (state.api || !api || !api.supports(KEY)) return;
    state.api = api;
    api.specs(KEY).forEach(function (s) {
      var by = {};
      s.fields.forEach(function (f) { by[f.key] = f; });
      state.specs[s.nodeType] = { isArray: s.isArray, fields: s.fields, fieldBy: by };
    });
    state.status = "Showing the original entries";
    renderEditor();
  }

  // ---------- events ----------
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-spec], [data-field], [data-node], [data-tab], [data-remove-entry], [data-remove-field], #reset, #copy-json");
    if (!t) return;
    if (t.hasAttribute("data-tab")) {
      state.tab = t.getAttribute("data-tab");
      save("opentax-explore-tab", state.tab);
      return renderTabs();
    }
    if (t.hasAttribute("data-remove-entry")) return removeEntry(+t.getAttribute("data-remove-entry"));
    if (t.hasAttribute("data-remove-field")) {
      var rf = t.getAttribute("data-remove-field"), ri = rf.indexOf("|");
      return removeField(+rf.slice(0, ri), rf.slice(ri + 1));
    }
    if (t.id === "reset") return resetEntries();
    if (t.id === "copy-json") return copyJson();
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
  document.addEventListener("input", function (ev) {
    var el = ev.target;
    if (el.hasAttribute && el.hasAttribute("data-entry") && (el.type === "number" || el.type === "text")) onFieldInput(el);
  });
  document.addEventListener("change", function (ev) {
    var el = ev.target;
    if (el.id === "show-zero") {
      state.showZero = el.checked;
      save("opentax-explore-zero", state.showZero ? "1" : "0");
      renderLines();
      return renderInspector();
    }
    if (el.id === "add-doc") { if (el.value) addDocument(el.value); return; }
    if (el.hasAttribute("data-add-field")) { if (el.value) addField(+el.getAttribute("data-add-field"), el.value); return; }
    if (el.hasAttribute("data-entry") && el.type !== "number" && el.type !== "text") onFieldInput(el);
  });
  window.addEventListener("opentax-engine-ready", engineReady);

  // ---------- boot ----------
  if (state.tab !== "lines" && state.tab !== "entries") state.tab = "lines";
  document.getElementById("show-zero").checked = state.showZero;
  M = buildModel(data);
  renderResults();
  renderTabs();
  renderEditor();
  engineReady();
})();
`;
