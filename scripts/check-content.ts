/**
 * Runs the content integrity checks and fails the process when one trips.
 *
 *   npm run check:content
 *
 * Compiled by `tsconfig.content.json` rather than run through a TypeScript
 * loader, so this needs no extra dependency.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { checkContent } from "../lib/content-integrity";

const root = path.resolve(__dirname, "..", "..", "..", "..");
const manifestPath = path.join(root, "assets/captures/manifest.json");

let manifest: string[] | undefined;
if (existsSync(manifestPath)) {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as string[];
} else {
  console.warn(
    "  note  assets/captures/manifest.json is missing — media references are unchecked.\n" +
      "        Run `npm run media` to regenerate it."
  );
}

const issues = checkContent(manifest);

if (issues.length === 0) {
  console.log("content: all checks passed");
  process.exit(0);
}

const grouped = new Map<string, string[]>();
for (const issue of issues) {
  grouped.set(issue.check, [...(grouped.get(issue.check) ?? []), issue.detail]);
}

console.error(`content: ${issues.length} issue(s)\n`);
for (const [check, details] of grouped) {
  console.error(`  ${check}`);
  for (const detail of details) console.error(`    - ${detail}`);
  console.error("");
}
process.exit(1);
