import type { NodeDoc } from "../../forms/f1040/nodes/doc.ts";
import { docs as f1040Docs2025 } from "../../forms/f1040/2025/docs.ts";

export type DocIndex = Readonly<Record<string, NodeDoc>>;

// The short description the return explorer shows for each form.
export type FormBlurb = {
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
};

const DOCS: Readonly<Record<string, DocIndex>> = {
  "f1040:2025": f1040Docs2025,
};

/** Node docs for a "form:year" key, or undefined when that year has none. */
export function docsFor(key: string): DocIndex | undefined {
  return DOCS[key];
}

export function formBlurbs(docs: DocIndex): Record<string, FormBlurb> {
  return Object.fromEntries(
    Object.entries(docs).map(([t, d]) => [t, { title: d.title, subtitle: d.subtitle, summary: d.summary }]),
  );
}
