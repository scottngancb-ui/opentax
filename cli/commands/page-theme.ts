// Palette, type and base styles shared by the explorer pages (return explorer
// and forms atlas), so both read as one tool in light and dark themes.

export const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap">';

export const THEME_CSS = `
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

`;
