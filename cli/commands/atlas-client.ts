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
        " fed by it, within " + (state.depth === "all" ? "the full chain" : state.depth + (state.depth === "1" ? " step" : " steps")) + ". Click a box to recenter.</p></div>" +
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
    var inMap = !!t.closest(".map-wrap");
    select(t.getAttribute("data-form"), true);
    if (!inMap && (t.closest("#detail") || narrow())) document.getElementById("detail").scrollIntoView({ block: "start" });
  });
  document.addEventListener("keydown", function (ev) {
    var g = ev.target.closest && ev.target.closest(".map-wrap [data-form]");
    if (g && (ev.key === "Enter" || ev.key === " ")) {
      ev.preventDefault();
      return select(g.getAttribute("data-form"), true);
    }
    if (ev.key === "/" && document.activeElement !== document.getElementById("q")) {
      ev.preventDefault();
      document.getElementById("q").focus();
    }
  });
  window.addEventListener("popstate", function () { var t = fromHash(); if (t) select(t, false); });
  window.addEventListener("hashchange", function () { var t = fromHash(); if (t && t !== state.sel) select(t, false); });

  if (!FILTERS.some(function (f) { return f[0] === state.kind; })) state.kind = "all";
  if (state.tab !== "fields" && state.tab !== "map") state.tab = "fields";
  if (!DEPTHS.some(function (d) { return d[0] === state.depth; })) state.depth = "1";
  renderStats();
  renderFilters();
  select(fromHash() || (BY[DATA.formType] ? DATA.formType : FORMS[0].nodeType), false);
})();
`;
