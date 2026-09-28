// Entry point for the explorer page's in-browser engine. Bundled with
// `deno task explore-engine` (or on the fly by `opentax return explore`).
// Imports the registry directly rather than the catalog so the PDF and MeF
// exporters stay out of the bundle.
import { F1040_2025_CONFIG } from "../../forms/f1040/2025/config.ts";
import { inputNodes } from "../../forms/f1040/2025/inputs.ts";
import { registry } from "../../forms/f1040/2025/registry.ts";
import type { Entry, ExplorerData, InputSpec, TraceEngine, TraceLabels } from "./explore-trace.ts";
import { describeInputs, traceReturn } from "./explore-trace.ts";

const engines: Readonly<Record<string, TraceEngine>> = {
  "f1040:2025": { ...F1040_2025_CONFIG, inputNodes, registry },
};

function engineFor(key: string): TraceEngine {
  const engine = engines[key];
  if (!engine) throw new Error(`No in-browser engine for ${key}`);
  return engine;
}

export const explorerApi = {
  supports: (key: string): boolean => key in engines,
  trace: (key: string, entries: readonly Entry[], labels: TraceLabels): ExplorerData =>
    traceReturn(engineFor(key), entries, labels),
  specs: (key: string): InputSpec[] => describeInputs(engineFor(key)),
};

Object.assign(globalThis, { OpenTaxExplorer: explorerApi });
globalThis.dispatchEvent(new Event("opentax-engine-ready"));
