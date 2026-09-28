import { basename, fromFileUrl } from "@std/path";

// Written by `deno task explore-engine`; embedded into compiled binaries with --include.
const PREBUILT = new URL("./explore-engine.js", import.meta.url);
const ENTRY = new URL("./explore-browser.ts", import.meta.url);

function runningFromSource(): boolean {
  return ENTRY.protocol === "file:" && /^deno(\.exe)?$/i.test(basename(Deno.execPath()));
}

async function bundleFromSource(): Promise<string | undefined> {
  try {
    const { success, stdout } = await new Deno.Command(Deno.execPath(), {
      args: ["bundle", "--platform", "browser", "--minify", fromFileUrl(ENTRY)],
      stdout: "piped",
      stderr: "null",
    }).output();
    return success ? new TextDecoder().decode(stdout) : undefined;
  } catch {
    return undefined;
  }
}

async function readPrebuilt(): Promise<string | undefined> {
  try {
    return await Deno.readTextFile(PREBUILT);
  } catch {
    return undefined;
  }
}

/**
 * Returns the in-browser engine as one JS module, or undefined when it cannot be
 * produced (the page then renders read-only). From source it is bundled fresh so it
 * always matches the engine on disk; compiled binaries use the prebuilt copy.
 */
export async function loadEngineBundle(): Promise<string | undefined> {
  return runningFromSource() ? await bundleFromSource() : await readPrebuilt();
}
