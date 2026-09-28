import { basename, dirname, join } from "@std/path";
import { ensureDir } from "@std/fs";
import type { FormDefinition } from "../../core/types/form-definition.ts";
import { catalog } from "../../catalog.ts";
import { loadReturn } from "../store/store.ts";
import type { InputsJson } from "../store/types.ts";
import type { Entry, ExplorerData } from "./explore-trace.ts";
import { startEntries, traceReturn } from "./explore-trace.ts";
import { renderExplorerHtml } from "./explore-page.ts";
import { loadEngineBundle } from "./explore-bundle.ts";

export { NodeKind, traceReturn } from "./explore-trace.ts";
export type { Entry, ExplorerData } from "./explore-trace.ts";

function catalogEntry(formType: string, year: number): FormDefinition {
  const def = catalog[`${formType}:${year}`];
  if (!def) throw new Error(`Unsupported form: ${formType}:${year}`);
  return def;
}

export type CaseForm = { readonly node_type: string; readonly data: Record<string, unknown> };

type CaseInput = {
  readonly year: number;
  readonly scenario?: string;
  readonly source?: string;
  readonly forms: readonly CaseForm[];
};

export function caseEntries(forms: readonly CaseForm[]): Entry[] {
  return forms.flatMap((form) =>
    form.node_type === "start" ? startEntries(form.data) : [{ nodeType: form.node_type, data: form.data }]
  );
}

export function storedEntries(inputs: InputsJson): Entry[] {
  return Object.entries(inputs).flatMap(([nodeType, list]) =>
    nodeType === "start"
      ? list.flatMap((e) => startEntries(e.fields))
      : list.map((e) => ({ nodeType, data: e.fields }))
  );
}

async function readExpected(caseDir: string): Promise<Record<string, number> | undefined> {
  try {
    const parsed = JSON.parse(await Deno.readTextFile(join(caseDir, "correct.json")));
    return parsed.correct;
  } catch {
    return undefined;
  }
}

export async function traceCase(caseDir: string): Promise<ExplorerData> {
  const caseData: CaseInput = JSON.parse(await Deno.readTextFile(join(caseDir, "input.json")));
  const def = catalogEntry("f1040", caseData.year);
  const expected = await readExpected(caseDir);
  return traceReturn(def, caseEntries(caseData.forms), {
    title: basename(caseDir),
    subtitle: [caseData.scenario, caseData.source].filter(Boolean).join(" · "),
    ...(expected ? { expected } : {}),
  });
}

export async function traceStoredReturn(returnId: string, baseDir: string): Promise<ExplorerData> {
  const { meta, inputs } = await loadReturn(join(baseDir, returnId));
  const def = catalogEntry(meta.formType ?? "f1040", meta.year);
  return traceReturn(def, storedEntries(inputs), {
    title: `Return ${meta.returnId}`,
    subtitle: `Created ${meta.createdAt.slice(0, 10)}`,
  });
}

export type ExploreArgs = {
  readonly returnId?: string;
  readonly caseDir?: string;
  readonly baseDir: string;
  readonly outputPath?: string;
};

function defaultOutputPath(args: ExploreArgs): string {
  if (args.caseDir) return join(".state", "explore", `${basename(args.caseDir)}.html`);
  return join(args.baseDir, args.returnId ?? "", "explore.html");
}

/**
 * CLI handler for `opentax return explore`. Writes a self-contained HTML page
 * that shows how every line of the return was derived. When the engine bundle is
 * available the page can also edit entries and recalculate in the browser.
 */
export async function exploreCommand(
  args: ExploreArgs,
): Promise<{ output: string; nodes: number; editable: boolean }> {
  if (!args.returnId && !args.caseDir) throw new Error("Pass --returnId or --case");
  const data = args.caseDir
    ? await traceCase(args.caseDir)
    : await traceStoredReturn(args.returnId ?? "", args.baseDir);
  const output = args.outputPath ?? defaultOutputPath(args);
  await ensureDir(dirname(output));
  const engine = await loadEngineBundle();
  await Deno.writeTextFile(output, renderExplorerHtml(data, engine));
  return { output, nodes: data.steps.length + data.unrun.length, editable: engine !== undefined };
}
