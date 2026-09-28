import { assert, assertStringIncludes } from "@std/assert";
import { buildZenelmAtlas, LICENSE_URL, SOURCE_URL } from "./atlas.ts";

const page = buildZenelmAtlas();

Deno.test("zenelm atlas carries the AGPL notices", () => {
  assertStringIncludes(page, "copyright © 2026 Filed Inc.");
  assertStringIncludes(page, "Modified by Zenelm");
  assertStringIncludes(page, `href="${LICENSE_URL}"`);
  assertStringIncludes(page, `href="${SOURCE_URL}"`);
  assertStringIncludes(page, "not affiliated with or endorsed by Filed Inc.");
  assertStringIncludes(page, "not tax advice");
});

Deno.test("zenelm atlas is a full document by default and a fragment on request", () => {
  assert(page.startsWith("<!doctype html>"));
  const fragment = buildZenelmAtlas({ fragment: true });
  assert(fragment.startsWith("<title>Zenelm Forms Atlas</title>"));
  assertStringIncludes(fragment, "Modified by Zenelm");
});

Deno.test("zenelm atlas uses only the Zenelm fonts and square corners", () => {
  assert(!page.includes("IBM+Plex"), "the default fonts should be swapped out");
  assertStringIncludes(page, "Shippori+Mincho");
  assert(!/border-radius:\s*[1-9]/.test(page), "no rounded corners");
  assert(!page.includes("prefers-color-scheme: dark"), "Zenelm has one light theme");
});
