// Browser code shared by the return explorer and the forms atlas: a layered
// left-to-right layout for a directed acyclic graph. Plain ES5-style JS in a
// TS string (no template literals) so it can be spliced into both page scripts.

export const LAYOUT_SCRIPT = `
  // Box size and spacing for graph nodes, in px.
  var NW = 158, NH = 42, CG = 62, RG = 14, PAD = 16;

  // nodes: node ids in their preferred initial order.
  // preds/succs: id -> ids; ids not in nodes are ignored.
  // Column = longest path from a source; rows ordered by alternating
  // barycenter sweeps to reduce crossings. Returns { xy, W, H }.
  function layeredLayout(nodes, preds, succs) {
    var inSet = {};
    nodes.forEach(function (n) { inSet[n] = true; });
    function inside(list) { return (list || []).filter(function (p) { return inSet[p]; }); }
    var layer = {}, visiting = {};
    function depthOf(n) {
      if (layer[n] !== undefined) return layer[n];
      if (visiting[n]) return 0;
      visiting[n] = true;
      var l = 0;
      inside(preds[n]).forEach(function (p) { l = Math.max(l, depthOf(p) + 1); });
      visiting[n] = false;
      layer[n] = l;
      return l;
    }
    nodes.forEach(depthOf);
    var nLayers = 0;
    nodes.forEach(function (n) { nLayers = Math.max(nLayers, layer[n] + 1); });
    var cols = [];
    for (var i = 0; i < nLayers; i++) cols.push([]);
    nodes.forEach(function (n) { cols[layer[n]].push(n); });
    var pos = {};
    function place(c) { c.forEach(function (n, k) { pos[n] = c.length > 1 ? k / (c.length - 1) : 0.5; }); }
    function bary(list) {
      var l = inside(list);
      if (!l.length) return null;
      return l.reduce(function (s, p) { return s + pos[p]; }, 0) / l.length;
    }
    cols.forEach(place);
    for (var pass = 0; pass < 6; pass++) {
      var down = pass % 2 === 0;
      for (var s = 0; s < cols.length; s++) {
        var c = cols[down ? s : cols.length - 1 - s];
        var score = {};
        c.forEach(function (n) {
          var b = bary(down ? preds[n] : succs[n]);
          score[n] = b === null ? pos[n] : b;
        });
        c.sort(function (a, b) { return score[a] - score[b]; });
        place(c);
      }
    }
    var maxRows = cols.reduce(function (mx, c) { return Math.max(mx, c.length); }, 0);
    var W = PAD * 2 + nLayers * NW + Math.max(0, nLayers - 1) * CG;
    var H = PAD * 2 + maxRows * NH + Math.max(0, maxRows - 1) * RG;
    var xy = {};
    cols.forEach(function (c, j) {
      var colH = c.length * NH + (c.length - 1) * RG;
      var top = PAD + (H - PAD * 2 - colH) / 2;
      c.forEach(function (n, k) { xy[n] = { x: PAD + j * (NW + CG), y: top + k * (NH + RG) }; });
    });
    return { xy: xy, W: W, H: H };
  }

  // Cubic edge from the right side of box a to the left side of box b.
  function edgePath(a, b) {
    var x1 = a.x + NW, y1 = a.y + NH / 2, x2 = b.x - 2, y2 = b.y + NH / 2, c = Math.max(24, (x2 - x1) / 2);
    return "M" + x1 + " " + y1 + " C" + (x1 + c) + " " + y1 + " " + (x2 - c) + " " + y2 + " " + x2 + " " + y2;
  }
`;
