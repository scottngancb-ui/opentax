// Browser script for the forms atlas page. Plain ES5-style JS inside a TS string:
// no template literals, so it can live in this template string untouched.

export const ATLAS_SCRIPT = `
(function () {
  "use strict";
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

  var state = { sel: null, q: "", kind: load("opentax-atlas-kind", "all") };

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
  function renderDetail() {
    var f = BY[state.sel];
    var el = document.getElementById("detail");
    if (!f) { el.innerHTML = '<p class="empty">Pick a form from the list.</p>'; return; }
    var hits = fieldMatches(f, terms());
    var fedEmpty = f.kind === "input" ? "Nothing. You enter it from your own documents." : "No other form sends data here.";
    var feedEmpty = "Nothing. It is the end of the line.";
    el.innerHTML =
      '<div class="d-head">' +
        '<div class="d-meta"><span class="pill ' + kindClass(f) + '">' + esc(KIND_LABEL[f.kind] || f.kind) + '</span><span class="eyebrow">' + esc(f.topic) + "</span></div>" +
        "<h2>" + esc(f.title) + "</h2>" +
        (f.subtitle ? '<p class="d-sub">' + esc(f.subtitle) + "</p>" : "") +
        '<p class="d-sum">' + esc(f.summary) + "</p>" +
        '<p class="d-entry">' + esc(ENTRY_NOTE[f.entry] || "") + ' <code class="fkey">' + esc(f.nodeType) + "</code></p>" +
        (f.reachable ? "" : '<p class="notice">Not connected yet: no form in the engine sends data here, so this form never runs in a calculation.</p>') +
      "</div>" +
      '<div class="flow">' +
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
    var t = ev.target.closest("[data-form], [data-kind]");
    if (!t) return;
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
    if (ev.key === "/" && document.activeElement !== document.getElementById("q")) {
      ev.preventDefault();
      document.getElementById("q").focus();
    }
  });
  window.addEventListener("popstate", function () { var t = fromHash(); if (t) select(t, false); });
  window.addEventListener("hashchange", function () { var t = fromHash(); if (t && t !== state.sel) select(t, false); });

  if (!FILTERS.some(function (f) { return f[0] === state.kind; })) state.kind = "all";
  renderStats();
  renderFilters();
  select(fromHash() || (BY[DATA.formType] ? DATA.formType : FORMS[0].nodeType), false);
})();
`;
