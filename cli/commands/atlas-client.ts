// Browser script for the forms atlas page. Plain ES5-style JS inside a TS string:
// no template literals, so it can live in this template string untouched.

import { LAYOUT_SCRIPT } from "./graph-layout.ts";

export const ATLAS_SCRIPT = `
(function () {
  "use strict";
${LAYOUT_SCRIPT}
  var DATA = JSON.parse(document.getElementById("atlas-data").textContent);
  var FORMS = DATA.forms;
  var BY = {};
  FORMS.forEach(function (f) { BY[f.nodeType] = f; });

  var KIND_LABEL = { input: "You enter this", computed: "Filled in automatically", result: "The final return" };
  var ENTRY_NOTE = {
    multiple: "Enter one of these for each document you receive. Add as many as you need.",
    single: "Enter this once per return.",
    computed: "You don't fill this in. The engine builds it from the forms that send data to it."
  };
  var FILTERS = [["all", "All"], ["input", "You enter"], ["computed", "Computed"]];

  function load(key, fallback) { try { var v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ } }

  var DEPTHS = [["1", "1 step"], ["2", "2 steps"], ["3", "3 steps"], ["all", "Full chain"]];
  var state = {
    sel: null,
    q: "",
    kind: load("opentax-atlas-kind", "all"),
    tab: load("opentax-atlas-tab", "fields"),
    depth: load("opentax-atlas-depth", "1")
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  var ACRONYMS = { ein: "EIN", ssn: "SSN", tin: "TIN", itin: "ITIN", id: "ID", w2: "W-2", w2s: "W-2s", agi: "AGI", magi: "MAGI",
    hsa: "HSA", msa: "MSA", ira: "IRA", iras: "IRAs", ss: "SS", ssa: "SSA", rrb: "RRB", se: "SE", qbi: "QBI", eitc: "EITC", ctc: "CTC",
    actc: "ACTC", odc: "ODC", aotc: "AOTC", llc: "LLC", ptc: "PTC", aptc: "APTC", slcsp: "SLCSP", fmv: "FMV", us: "US", nol: "NOL",
    amt: "AMT", niit: "NIIT", fica: "FICA", sdi: "SDI", pfml: "PFML", k1: "K-1", rmd: "RMD", sep: "SEP", mfj: "MFJ", mfs: "MFS",
    hoh: "HOH", qss: "QSS", zip: "ZIP", irs: "IRS", ltc: "LTC", ppp: "PPP", oid: "OID", reit: "REIT", ptp: "PTP", qof: "QOF",
    pfic: "PFIC", fbar: "FBAR", ui: "UI", dob: "date of birth", ytd: "YTD", ev: "EV", qsehra: "QSEHRA", hra: "HRA", abc: "ABC" };
  function word(w, first) {
    var l = w.toLowerCase();
    if (ACRONYMS[l]) return ACRONYMS[l];
    var m = /^f?(1099|1098|1095)([a-z]*)$/.exec(l);
    if (m) return m[1] + (m[2] ? "-" + m[2].toUpperCase() : "");
    m = /^(box|line|part)(\\d+[a-z]?)$/.exec(l);
    if (m) return (first ? m[1].charAt(0).toUpperCase() + m[1].slice(1) : m[1]) + " " + m[2];
    return first ? l.charAt(0).toUpperCase() + l.slice(1) : l;
  }
  function words(k) {
    return k.replace(/([a-z])([A-Z])/g, "$1_$2").split("_").filter(Boolean).map(function (w, i) { return word(w, i === 0); }).join(" ");
  }
  function kindClass(f) { return f.kind === "result" ? "k-result" : f.kind === "input" ? "k-input" : "k-computed"; }

  // ---------- search ----------
  function terms() { return state.q.toLowerCase().split(/\\s+/).filter(Boolean); }
  function hay(s) { return (s || "").toLowerCase(); }
  function fieldHay(field, prefix) {
    var path = prefix + field.key;
    var own = [path, field.description, (field.options || []).join(" "), JSON.stringify(field.optionNotes || {})].join(" ");
    return hay(own);
  }
  function matchesAll(text, ts) { return ts.every(function (t) { return text.indexOf(t) >= 0; }); }
  function flatFields(fields, prefix) {
    return fields.reduce(function (acc, f) {
      acc.push({ field: f, path: prefix + f.key });
      return f.children ? acc.concat(flatFields(f.children, prefix + f.key + ".")) : acc;
    }, []);
  }
  function fieldMatches(form, ts) {
    if (!ts.length) return [];
    return flatFields(form.fields, "").filter(function (x) {
      return matchesAll(fieldHay(x.field, x.path.slice(0, x.path.length - x.field.key.length)), ts);
    }).map(function (x) { return x.path; });
  }
  function formMatch(form, ts) {
    if (!ts.length) return { hit: true, fields: [] };
    var head = hay([form.title, form.subtitle, form.nodeType, form.summary, form.topic].join(" "));
    var fields = fieldMatches(form, ts);
    return { hit: matchesAll(head, ts) || fields.length > 0, fields: fields };
  }
  function kindOk(form) {
    if (state.kind === "all") return true;
    if (state.kind === "input") return form.kind === "input";
    return form.kind !== "input";
  }

  // ---------- sidebar ----------
  function topicOrder() {
    var seen = [];
    FORMS.forEach(function (f) { if (seen.indexOf(f.topic) < 0) seen.push(f.topic); });
    var order = DATA.topics || [];
    return seen.sort(function (a, b) {
      var ia = order.indexOf(a), ib = order.indexOf(b);
      return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib) || (a < b ? -1 : 1);
    });
  }
  function sortForms(list) {
    return list.slice().sort(function (a, b) {
      if (a.kind !== b.kind) return a.kind === "result" ? -1 : b.kind === "result" ? 1 : a.kind === "input" ? -1 : 1;
      return a.title.localeCompare(b.title, "en", { numeric: true });
    });
  }
  function renderFilters() {
    document.getElementById("filters").innerHTML = FILTERS.map(function (f) {
      return '<button type="button" class="seg" data-kind="' + f[0] + '" aria-pressed="' + (state.kind === f[0]) + '">' + esc(f[1]) + "</button>";
    }).join("");
  }
  function renderList() {
    var ts = terms();
    var shown = 0;
    var html = topicOrder().map(function (topic) {
      var items = sortForms(FORMS.filter(function (f) { return f.topic === topic && kindOk(f); })).map(function (f) {
        var m = formMatch(f, ts);
        if (!m.hit) return "";
        shown++;
        var hint = ts.length && m.fields.length ? '<span class="hint">' + m.fields.length + (m.fields.length === 1 ? " field" : " fields") + " match</span>" : "";
        return '<li><button type="button" class="item" data-form="' + esc(f.nodeType) + '" aria-current="' + (state.sel === f.nodeType) + '">' +
          '<i class="mark ' + kindClass(f) + '" aria-hidden="true"></i>' +
          '<span class="it-title">' + esc(f.title) + "</span>" +
          '<span class="it-sub">' + esc(f.subtitle || f.nodeType) + "</span>" + hint + "</button></li>";
      }).join("");
      return items ? '<li class="group"><div class="eyebrow">' + esc(topic) + '</div><ul class="items">' + items + "</ul></li>" : "";
    }).join("");
    document.getElementById("list").innerHTML = html || '<li class="empty pad">No forms match. Try a form number, a box name or a word like "tips".</li>';
    document.getElementById("count").textContent = shown + " of " + FORMS.length + " forms";
  }

  // ---------- detail ----------
  var KIND_TEXT = { number: "Number", boolean: "Yes / no", enum: "Choice", text: "Text", json: "Record" };
  function typeLabel(f) {
    if (f.list && f.children) return "List of records";
    if (f.list) return "List of " + (f.kind === "number" ? "numbers" : f.kind === "enum" ? "choices" : "values");
    return KIND_TEXT[f.kind] || f.kind;
  }
  function optionsHtml(f) {
    var notes = f.optionNotes;
    var opts = f.options || [];
    if (notes && Object.keys(notes).length) {
      var rows = opts.filter(function (o) { return notes[o]; }).map(function (o) {
        return "<dt>" + esc(o) + "</dt><dd>" + esc(notes[o]) + "</dd>";
      }).join("");
      var list = '<dl class="opts">' + rows + "</dl>";
      return opts.length > 6
        ? '<details class="opt-wrap"><summary>' + opts.length + " choices</summary>" + list + "</details>"
        : list;
    }
    if (opts.length) return '<div class="choices">Choices: ' + opts.map(function (o) { return '<code>' + esc(o) + "</code>"; }).join(" ") + "</div>";
    return "";
  }
  function fieldRows(fields, prefix, depth, hits) {
    return fields.map(function (f) {
      var path = prefix + f.key;
      var label = f.description ? "" : '<span class="nodesc">No description yet.</span>';
      var row = '<tr class="' + (hits.indexOf(path) >= 0 ? "hit" : "") + (depth ? " child" : "") + '" id="' + esc("f-" + path) + '">' +
        '<td class="fname" style="--depth:' + depth + '"><span class="flabel">' + esc(words(f.key)) + '</span><code class="fkey">' + esc(path) + "</code></td>" +
        '<td class="ftype">' + esc(typeLabel(f)) + (f.required ? '<span class="req">Required</span>' : "") + "</td>" +
        '<td class="fdesc">' + (f.description ? esc(f.description) : label) + optionsHtml(f) + "</td></tr>";
      var kids = f.children && f.children.length
        ? '<tr class="cap child"><td colspan="3" style="--depth:' + (depth + 1) + '">' + (f.list ? "Each entry has:" : "Contains:") + "</td></tr>" +
          fieldRows(f.children, path + ".", depth + 1, hits)
        : "";
      return row + kids;
    }).join("");
  }
  function linkList(types, empty) {
    if (!types.length) return '<p class="empty">' + esc(empty) + "</p>";
    return '<ul class="links">' + types.map(function (t) {
      var f = BY[t];
      if (!f) return "";
      return '<li><button type="button" class="chip ' + kindClass(f) + '" data-form="' + esc(t) + '" title="' + esc(f.subtitle) + '">' + esc(f.title) + "</button></li>";
    }).join("") + "</ul>";
  }
  function countFields(fields) {
    return fields.reduce(function (n, f) { return n + 1 + (f.children ? countFields(f.children) : 0); }, 0);
  }
  // ---------- map ----------
  // Forms reachable from start in up to depth steps along next().
  function reach(start, next, depth) {
    var seen = {}, frontier = [start], d = 0;
    while (frontier.length && d < depth) {
      var nf = [];
      frontier.forEach(function (n) {
        next(n).forEach(function (m) { if (!seen[m] && m !== start) { seen[m] = true; nf.push(m); } });
      });
      frontier = nf;
      d++;
    }
    return seen;
  }
  function neighborhood(t, depth) {
    var limit = depth === "all" ? Infinity : +depth;
    var up = reach(t, function (n) { return BY[n].fedBy; }, limit);
    var down = reach(t, function (n) { return BY[n].feeds; }, limit);
    up[t] = true;
    down[t] = true;
    // Keep edges that run along the upstream side or the downstream side.
    var edges = [];
    Object.keys(up).concat(Object.keys(down)).forEach(function (a, i, all) {
      if (all.indexOf(a) !== i) return;
      BY[a].feeds.forEach(function (b) {
        if ((up[a] && up[b]) || (down[a] && down[b])) edges.push([a, b]);
      });
    });
    var nodes = Object.keys(up).concat(Object.keys(down).filter(function (n) { return !up[n]; }));
    nodes.sort(function (a, b) { return BY[a].title.localeCompare(BY[b].title, "en", { numeric: true }); });
    return { nodes: nodes, edges: edges, up: Object.keys(up).length - 1, down: Object.keys(down).length - 1 };
  }
  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function mapSvg(t, hood) {
    var preds = {}, succs = {};
    hood.edges.forEach(function (e) {
      (succs[e[0]] = succs[e[0]] || []).push(e[1]);
      (preds[e[1]] = preds[e[1]] || []).push(e[0]);
    });
    var g = layeredLayout(hood.nodes, preds, succs);
    var out = ['<svg class="flow-map" width="' + g.W + '" height="' + g.H + '" viewBox="0 0 ' + g.W + " " + g.H + '" role="img" aria-label="' + esc("Forms connected to " + BY[t].title) + '">',
      '<defs><marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="arrow" d="M0,0 L8,4 L0,8 z"/></marker>' +
      '<marker id="arr-on" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path class="arrow-on" d="M0,0 L8,4 L0,8 z"/></marker></defs>'];
    hood.edges.forEach(function (e) {
      var on = e[0] === t || e[1] === t;
      out.push('<path class="edge' + (on ? " on" : "") + '" marker-end="url(#' + (on ? "arr-on" : "arr") + ')" d="' + edgePath(g.xy[e[0]], g.xy[e[1]]) + '"><title>' +
        esc(BY[e[0]].title + " → " + BY[e[1]].title) + "</title></path>");
    });
    hood.nodes.forEach(function (n) {
      var f = BY[n], p = g.xy[n];
      out.push('<g class="node ' + kindClass(f) + (n === t ? " sel" : "") + (f.reachable ? "" : " unrun") + '" data-form="' + esc(n) + '" tabindex="0" role="button" aria-label="' + esc(f.title) + '" transform="translate(' + p.x + "," + p.y + ')">' +
        '<rect width="' + NW + '" height="' + NH + '" rx="2"/>' +
        '<text x="10" y="18">' + esc(trunc(f.title, 21)) + "</text>" +
        '<text class="id" x="10" y="33">' + esc(trunc(f.subtitle || n, 25)) + "</text>" +
        "<title>" + esc(f.title + (f.subtitle ? " — " + f.subtitle : "") + (f.reachable ? "" : " (not connected yet)")) + "</title></g>");
    });
    out.push("</svg>");
    return out.join("");
  }
  function mapHtml(f) {
    var hood = neighborhood(f.nodeType, state.depth);
    return '<section class="map">' +
      '<div class="map-bar"><div class="segs" role="group" aria-label="How far to follow connections">' +
        DEPTHS.map(function (d) { return '<button type="button" class="seg" data-depth="' + d[0] + '" aria-pressed="' + (state.depth === d[0]) + '">' + esc(d[1]) + "</button>"; }).join("") +
      '</div><p class="hint-line">' + hood.up + (hood.up === 1 ? " form feeds" : " forms feed") + " into " + esc(f.title) + " and " + hood.down + (hood.down === 1 ? " form is" : " forms are") +
        " fed by it, within " + (state.depth === "all" ? "the full chain" : state.depth + (state.depth === "1" ? " step" : " steps")) + ". Click any other box for a quick look without leaving " + esc(f.title) + ".</p></div>" +
      '<div class="map-wrap">' + mapSvg(f.nodeType, hood) + "</div>" +
      '<div class="legend"><span><i class="mark k-input"></i>You enter</span><span><i class="mark k-computed"></i>Computed</span><span><i class="mark k-result"></i>Form 1040</span><span><i class="mark unrun-mark"></i>Not connected yet</span></div>' +
    "</section>";
  }

  function fieldsHtml(f, hits) {
    var fedEmpty = f.kind === "input" ? "Nothing. You enter it from your own documents." : "No other form sends data here.";
    var feedEmpty = "Nothing. It is the end of the line.";
    return '<div class="flow">' +
        '<section><h3>Gets data from <span class="n">' + f.fedBy.length + "</span></h3>" + linkList(f.fedBy, fedEmpty) + "</section>" +
        '<div class="flow-mid" aria-hidden="true"><span class="chip ' + kindClass(f) + '">' + esc(f.title) + "</span></div>" +
        '<section><h3>Sends data to <span class="n">' + f.feeds.length + "</span></h3>" + linkList(f.feeds, feedEmpty) + "</section>" +
      "</div>" +
      '<section class="fields"><h3>' + (f.kind === "input" ? "Fields you fill in" : f.kind === "result" ? "Lines on the return" : "Values it works with") +
        ' <span class="n">' + countFields(f.fields) + "</span>" +
        (hits.length ? ' <span class="hint">' + hits.length + " match your search</span>" : "") + "</h3>" +
        (f.fields.length
          ? '<div class="tbl-wrap"><table class="ftable"><thead><tr><th>Field</th><th>Type</th><th>What it means</th></tr></thead><tbody>' +
            fieldRows(f.fields, "", 0, hits) + "</tbody></table></div>"
          : '<p class="empty">This form has no fields of its own.</p>') +
      "</section>";
  }

  function renderDetail() {
    var f = BY[state.sel];
    var el = document.getElementById("detail");
    if (!f) { el.innerHTML = '<p class="empty">Pick a form from the list.</p>'; return; }
    var hits = fieldMatches(f, terms());
    var tabs = [["fields", "Fields"], ["map", "Map"]];
    el.innerHTML =
      '<div class="d-head">' +
        '<div class="d-meta"><span class="pill ' + kindClass(f) + '">' + esc(KIND_LABEL[f.kind] || f.kind) + '</span><span class="eyebrow">' + esc(f.topic) + "</span></div>" +
        "<h2>" + esc(f.title) + "</h2>" +
        (f.subtitle ? '<p class="d-sub">' + esc(f.subtitle) + "</p>" : "") +
        '<p class="d-sum">' + esc(f.summary) + "</p>" +
        '<p class="d-entry">' + esc(ENTRY_NOTE[f.entry] || "") + ' <code class="fkey">' + esc(f.nodeType) + "</code></p>" +
        (f.reachable ? "" : '<p class="notice">Not connected yet: no form in the engine sends data here, so this form never runs in a calculation.</p>') +
      "</div>" +
      '<div class="dtabs" role="tablist" aria-label="Form views">' + tabs.map(function (tb) {
        return '<button type="button" role="tab" class="dtab" data-tab="' + tb[0] + '" aria-selected="' + (state.tab === tb[0]) + '">' + esc(tb[1]) +
          (tb[0] === "fields" ? ' <span class="n">' + countFields(f.fields) + "</span>" : "") + "</button>";
      }).join("") + "</div>" +
      '<div role="tabpanel">' + (state.tab === "map" ? mapHtml(f) : fieldsHtml(f, hits)) + "</div>";
    if (state.tab === "map") centerMap();
  }
  // Scroll the map box so the selected form is in view.
  function centerMap() {
    var wrap = document.querySelector(".map-wrap");
    var sel = wrap && wrap.querySelector(".node.sel");
    if (!sel) return;
    var m = /translate\\(([\\d.]+),([\\d.]+)\\)/.exec(sel.getAttribute("transform") || "");
    if (!m) return;
    wrap.scrollLeft = Math.max(0, +m[1] + NW / 2 - wrap.clientWidth / 2);
    wrap.scrollTop = Math.max(0, +m[2] + NH / 2 - wrap.clientHeight / 2);
  }

  // ---------- quick look (map pop-up) ----------
  var peekFrom = null;
  function relationText(sel, t) {
    var a = BY[sel], b = BY[t];
    if (a.feeds.indexOf(t) >= 0) return a.title + " sends data directly to " + b.title + ".";
    if (b.feeds.indexOf(sel) >= 0) return b.title + " sends data directly to " + a.title + ".";
    return b.title + " connects to " + a.title + " through other forms.";
  }
  // context: the form the pop-up is relative to (the selected atlas form), or null
  // when opened from the situation plan.
  function openPeek(t, fromEl, context) {
    if (context === undefined) context = state.sel;
    var f = BY[t], dlg = document.getElementById("peek");
    if (!f || !dlg) return;
    peekFrom = fromEl || null;
    document.getElementById("peek-body").innerHTML =
      '<div class="peek-head">' +
        '<div class="d-meta"><span class="pill ' + kindClass(f) + '">' + esc(KIND_LABEL[f.kind] || f.kind) + '</span><span class="eyebrow">' + esc(f.topic) + "</span></div>" +
        '<button type="button" class="peek-x" data-peek-close aria-label="Close">×</button>' +
      "</div>" +
      '<div class="peek-scroll">' +
        '<h3 id="peek-title">' + esc(f.title) + "</h3>" +
        (f.subtitle ? '<p class="d-sub">' + esc(f.subtitle) + "</p>" : "") +
        (context ? '<p class="peek-rel">' + esc(relationText(context, t)) + "</p>" : "") +
        '<p class="d-sum">' + esc(f.summary) + "</p>" +
        '<p class="d-entry">' + esc(ENTRY_NOTE[f.entry] || "") + ' <code class="fkey">' + esc(f.nodeType) + "</code></p>" +
        (f.reachable ? "" : '<p class="notice">Not connected yet: no form in the engine sends data here, so this form never runs in a calculation.</p>') +
        '<p class="peek-links">Gets data from ' + f.fedBy.length + (f.fedBy.length === 1 ? " form" : " forms") + " · sends data to " + f.feeds.length + (f.feeds.length === 1 ? " form" : " forms") + "</p>" +
        '<section class="fields"><h3>' + (f.kind === "input" ? "Fields you fill in" : f.kind === "result" ? "Lines on the return" : "Values it works with") +
          ' <span class="n">' + countFields(f.fields) + "</span></h3>" +
          (f.fields.length
            ? '<div class="tbl-wrap"><table class="ftable"><thead><tr><th>Field</th><th>Type</th><th>What it means</th></tr></thead><tbody>' +
              fieldRows(f.fields, "", 0, []) + "</tbody></table></div>"
            : '<p class="empty">This form has no fields of its own.</p>') +
        "</section>" +
      "</div>" +
      '<div class="peek-foot">' +
        '<button type="button" class="btn primary" data-peek-open="' + esc(t) + '">Open ' + esc(f.title) + "</button>" +
        '<button type="button" class="btn" data-peek-close>' + (context ? "Back to " + esc(BY[context].title) : "Close") + "</button>" +
      "</div>";
    if (typeof dlg.showModal === "function") {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
    var scroller = dlg.querySelector(".peek-scroll");
    if (scroller) scroller.scrollTop = 0;
    var close = dlg.querySelector(".peek-x");
    if (close) close.focus();
  }
  function closePeek() {
    var dlg = document.getElementById("peek");
    if (!dlg || !dlg.open) return;
    if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  }
  function onPeekClosed() {
    if (peekFrom && document.body.contains(peekFrom)) peekFrom.focus();
    peekFrom = null;
  }
  // A box on the map: the selected form does nothing, any other form gets a quick look.
  function mapNodeActivated(g) {
    var t = g.getAttribute("data-form");
    if (t && t !== state.sel) openPeek(t, g);
  }

  // ---------- page tabs ----------
  function setPage(page) {
    state.page = page === "browse" ? "browse" : "plan";
    save("opentax-atlas-page", state.page);
    document.querySelectorAll("[data-page]").forEach(function (b) {
      var on = b.getAttribute("data-page") === state.page;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    document.getElementById("panel-plan").hidden = state.page !== "plan";
    document.getElementById("panel-browse").hidden = state.page !== "browse";
    if (state.page === "browse") revealInList();
  }

  function select(t, push) {
    if (!BY[t]) return;
    state.sel = t;
    if (push && location.hash !== "#" + t) {
      try { history.pushState(null, "", "#" + t); } catch (e) { /* history unavailable */ }
    }
    renderList();
    renderDetail();
    revealInList();
  }
  // Scroll only the sidebar list, never the page, to show the selected form.
  function revealInList() {
    var box = document.querySelector(".side-list");
    var cur = document.querySelector('.item[aria-current="true"]');
    if (!box || !cur) return;
    var top = cur.offsetTop;
    if (top < box.scrollTop || top + cur.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTop = Math.max(0, top - box.clientHeight / 3);
    }
  }
  function narrow() { return window.matchMedia && window.matchMedia("(max-width: 860px)").matches; }
  function fromHash() {
    var t = decodeURIComponent((location.hash || "").slice(1));
    return BY[t] ? t : null;
  }

  // ---------- situation planner ----------
  var SITUATIONS = DATA.situations || [];
  var SIT_BY = {};
  SITUATIONS.forEach(function (x) { SIT_BY[x.id] = x; });
  state.picked = load("opentax-atlas-situations", "").split(",").filter(function (id) { return SIT_BY[id]; });
  var FILER = "general";

  function unique(list) { return list.filter(function (x, i) { return list.indexOf(x) === i && BY[x]; }); }
  // Shortest chain of forms from start to Form 1040, following where data flows.
  function pathToReturn(start) {
    var goal = DATA.formType;
    if (start === goal) return [goal];
    var parent = {}, queue = [start];
    parent[start] = null;
    while (queue.length) {
      var n = queue.shift();
      if (n === goal) break;
      (BY[n] ? BY[n].feeds : []).forEach(function (m) {
        if (!(m in parent)) { parent[m] = n; queue.push(m); }
      });
    }
    if (!(goal in parent)) return [start];
    var path = [];
    for (var c = goal; c !== null; c = parent[c]) path.unshift(c);
    return path;
  }
  function planFor(ids) {
    var picked = ids.map(function (id) { return SIT_BY[id]; });
    var docs = unique([FILER].concat([].concat.apply([], picked.map(function (x) { return x.documents; }))));
    var extra = unique([].concat.apply([], picked.map(function (x) { return x.forms; }))).filter(function (f) { return docs.indexOf(f) < 0; });
    var seeds = docs.concat(extra);
    var onPath = unique([].concat.apply([], seeds.map(pathToReturn)));
    var nodes = unique(seeds.concat(onPath, [DATA.formType]));
    var inSet = {};
    nodes.forEach(function (n) { inSet[n] = true; });
    var edges = [];
    nodes.forEach(function (a) { BY[a].feeds.forEach(function (b) { if (inSet[b]) edges.push([a, b]); }); });
    // The situations' own forms first, then connecting forms, then the return itself.
    var connectors = onPath.filter(function (n) { return docs.indexOf(n) < 0 && extra.indexOf(n) < 0 && n !== DATA.formType; });
    var forms = extra.concat(connectors, [DATA.formType]);
    return { docs: docs, forms: forms, extra: extra, nodes: nodes, edges: edges };
  }
  function renderChecks() {
    var box = document.getElementById("checks");
    if (!box) return;
    var groups = [];
    SITUATIONS.forEach(function (x) { if (groups.indexOf(x.group) < 0) groups.push(x.group); });
    box.innerHTML = groups.map(function (g) {
      return '<fieldset class="check-group"><legend class="eyebrow">' + esc(g) + "</legend>" +
        SITUATIONS.filter(function (x) { return x.group === g; }).map(function (x) {
          var id = "sit-" + x.id;
          var docs = x.documents.map(function (d) { return BY[d] ? BY[d].title : d; }).join(" · ");
          return '<label class="check" for="' + esc(id) + '"><input type="checkbox" id="' + esc(id) + '" data-situation="' + esc(x.id) + '"' +
            (state.picked.indexOf(x.id) >= 0 ? " checked" : "") + ">" +
            '<span class="check-text"><span class="check-label">' + esc(x.label) + '</span><span class="check-detail">' + esc(x.detail) + '</span><span class="check-docs">' + esc(docs) + "</span></span></label>";
        }).join("") + "</fieldset>";
    }).join("");
  }
  function docRow(t) {
    var f = BY[t];
    return '<li><button type="button" class="doc-row" data-peek-form="' + esc(t) + '"><i class="mark ' + kindClass(f) + '" aria-hidden="true"></i>' +
      '<span class="it-title">' + esc(f.title) + '</span><span class="it-sub">' + esc(f.subtitle || t) + "</span></button></li>";
  }
  function renderPlan() {
    var el = document.getElementById("plan");
    if (!el) return;
    if (!state.picked.length) {
      el.innerHTML = '<p class="plan-empty">Check what applies above. The documents you need and the forms they flow into will appear here, with a map of how they connect to ' + esc(BY[DATA.formType].title) + ".</p>";
      return;
    }
    var p = planFor(state.picked);
    el.innerHTML =
      '<div class="plan-head"><p class="plan-count"><strong>' + p.docs.length + "</strong> " + (p.docs.length === 1 ? "document or entry" : "documents and entries") +
        " to gather · <strong>" + p.forms.length + "</strong> " + (p.forms.length === 1 ? "form comes" : "forms come") + " into play</p>" +
        '<button type="button" class="btn" id="plan-clear">Clear checklist</button></div>' +
      '<div class="plan-cols">' +
        '<section><h3 class="plan-h">Documents to gather</h3><p class="plan-note">What you receive or fill in. The Form 1040 header (names, filing status) is always needed.</p><ul class="doc-list">' + p.docs.map(docRow).join("") + "</ul></section>" +
        '<section><h3 class="plan-h">Forms that come into play</h3><p class="plan-note">Filled in from your documents on the way to ' + esc(BY[DATA.formType].title) + '.</p><ul class="doc-list">' + p.forms.map(docRow).join("") + "</ul></section>" +
      "</div>" +
      '<section class="map plan-map"><h3 class="plan-h">How they connect</h3>' +
        '<p class="hint-line">Arrows show where each form sends its numbers. Click a box for a quick look.</p>' +
        '<div class="map-wrap">' + mapSvg(DATA.formType, p) + "</div>" +
        '<div class="legend"><span><i class="mark k-input"></i>You enter</span><span><i class="mark k-computed"></i>Computed</span><span><i class="mark k-result"></i>' + esc(BY[DATA.formType].title) + '</span><span><i class="mark unrun-mark"></i>Not connected yet</span></div>' +
      "</section>";
  }
  function setPicked(ids) {
    state.picked = ids;
    save("opentax-atlas-situations", ids.join(","));
    renderPlan();
  }

  // ---------- header ----------
  function renderStats() {
    var inputs = FORMS.filter(function (f) { return f.kind === "input"; }).length;
    var fields = FORMS.reduce(function (n, f) { return n + countFields(f.fields); }, 0);
    document.getElementById("stats").innerHTML = [
      [FORMS.length, "forms, schedules and worksheets"],
      [inputs, "you fill in"],
      [FORMS.length - inputs, "the engine computes"],
      [fields.toLocaleString("en-US"), "fields documented"]
    ].map(function (s) { return '<div class="stat"><span class="stat-n">' + s[0] + '</span><span class="stat-l">' + esc(s[1]) + "</span></div>"; }).join("");
    document.getElementById("h-eyebrow").textContent = (BY[DATA.formType] ? BY[DATA.formType].title : DATA.formType) + " · Tax year " + DATA.taxYear;
  }

  // ---------- events ----------
  var timer = null;
  document.getElementById("q").addEventListener("input", function (ev) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      state.q = ev.target.value;
      renderList();
      renderDetail();
    }, 120);
  });
  document.addEventListener("click", function (ev) {
    var dlg = document.getElementById("peek");
    if (dlg && ev.target === dlg) return closePeek();
    var pt = ev.target.closest("[data-page]");
    if (pt) return setPage(pt.getAttribute("data-page"));
    var pk = ev.target.closest("[data-peek-open], [data-peek-close]");
    if (pk) {
      if (pk.hasAttribute("data-peek-close")) return closePeek();
      var target = pk.getAttribute("data-peek-open");
      peekFrom = null;
      closePeek();
      setPage("browse");
      select(target, true);
      return document.getElementById("detail").scrollIntoView({ block: "start" });
    }
    var planNode = ev.target.closest(".plan [data-form], [data-peek-form]");
    if (planNode) return openPeek(planNode.getAttribute("data-form") || planNode.getAttribute("data-peek-form"), planNode, null);
    if (ev.target.closest("#plan-clear")) {
      setPicked([]);
      return renderChecks();
    }
    var node = ev.target.closest(".map-wrap [data-form]");
    if (node) return mapNodeActivated(node);
    var t = ev.target.closest("[data-form], [data-kind], [data-tab], [data-depth]");
    if (!t) return;
    if (t.hasAttribute("data-tab")) {
      state.tab = t.getAttribute("data-tab");
      save("opentax-atlas-tab", state.tab);
      return renderDetail();
    }
    if (t.hasAttribute("data-depth")) {
      state.depth = t.getAttribute("data-depth");
      save("opentax-atlas-depth", state.depth);
      return renderDetail();
    }
    if (t.hasAttribute("data-kind")) {
      state.kind = t.getAttribute("data-kind");
      save("opentax-atlas-kind", state.kind);
      renderFilters();
      return renderList();
    }
    select(t.getAttribute("data-form"), true);
    if (t.closest("#detail") || narrow()) document.getElementById("detail").scrollIntoView({ block: "start" });
  });
  document.addEventListener("keydown", function (ev) {
    var g = ev.target.closest && ev.target.closest(".map-wrap [data-form]");
    if (g && (ev.key === "Enter" || ev.key === " ")) {
      ev.preventDefault();
      return g.closest(".plan") ? openPeek(g.getAttribute("data-form"), g, null) : mapNodeActivated(g);
    }
    if (ev.key === "/" && document.activeElement !== document.getElementById("q") && !(ev.target.matches && ev.target.matches("input, textarea"))) {
      ev.preventDefault();
      setPage("browse");
      document.getElementById("q").focus();
    }
  });
  document.addEventListener("change", function (ev) {
    var id = ev.target.getAttribute && ev.target.getAttribute("data-situation");
    if (!id) return;
    var next = state.picked.filter(function (x) { return x !== id; });
    if (ev.target.checked) next.push(id);
    setPicked(SITUATIONS.map(function (x) { return x.id; }).filter(function (x) { return next.indexOf(x) >= 0; }));
  });
  var peekDlg = document.getElementById("peek");
  if (peekDlg) peekDlg.addEventListener("close", onPeekClosed);
  window.addEventListener("popstate", function () { var t = fromHash(); if (t) { setPage("browse"); select(t, false); } });
  window.addEventListener("hashchange", function () { var t = fromHash(); if (t && t !== state.sel) { setPage("browse"); select(t, false); } });

  if (!FILTERS.some(function (f) { return f[0] === state.kind; })) state.kind = "all";
  if (state.tab !== "fields" && state.tab !== "map") state.tab = "fields";
  if (!DEPTHS.some(function (d) { return d[0] === state.depth; })) state.depth = "1";
  renderStats();
  var planner = document.getElementById("planner");
  if (planner) planner.hidden = !SITUATIONS.length;
  document.getElementById("ptab-plan").hidden = !SITUATIONS.length;
  renderChecks();
  renderPlan();
  renderFilters();
  var linked = fromHash();
  select(linked || (BY[DATA.formType] ? DATA.formType : FORMS[0].nodeType), false);
  setPage(linked ? "browse" : load("opentax-atlas-page", SITUATIONS.length ? "plan" : "browse"));
})();
`;
