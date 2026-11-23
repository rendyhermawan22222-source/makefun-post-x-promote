// Entry for make.fun's "Promote make.fun's make-your-own-bounty post on X".
// The post itself is the entry: one post of our own on X that quotes
// make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), with a photo of its
// own attached and make.fun / @makefunai plus our play code in its text.
// This program's only job is to hand the house the post's address: it copies
// POST.json from the repository root to the output directory, where the gate
// reads it and scores the post's replies + reposts + quotes through
// FxTwitter's public read. Node 22, standard library only, no network,
// no wall clock, no files outside the repository: two runs write the
// same bytes.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// out/POST.json is then byte for byte this directory's POST.json.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir: string = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(join(botDir, "POST.json"), join(outDir, "POST.json"));
} catch (err) {
  const message: string = err instanceof Error ? err.message : String(err);
  console.error(`POST.json could not be copied from ${botDir}: ${message}`);
  process.exit(1);
}
