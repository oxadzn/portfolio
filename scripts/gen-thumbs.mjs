/* =================================================================== *
 *  gen-thumbs.mjs — generate compressed WebP thumbnails for the gallery.
 *
 *  For every image referenced in projects.ts, produces a thumbnail at
 *  max 1600px on the long edge, WebP quality 85 — looks identical on
 *  screen, loads 50–200x faster than the raw masters.
 *
 *  Full-res originals are kept intact; the lightbox loads them on demand.
 *
 *  Output: public/thumbs/<original-public-path>.webp
 *  e.g.  /work/gamecon/gc.png  →  public/thumbs/work/gamecon/gc.webp
 *
 *  Run:  node scripts/gen-thumbs.mjs
 * =================================================================== */

import { readFile, mkdir, stat, access, readdir } from "node:fs/promises";
import { join, dirname, parse, relative } from "node:path";
import sharp from "sharp";

// ── config ────────────────────────────────────────────────────────────
const PUBLIC_DIR  = "public";
const THUMB_DIR   = join(PUBLIC_DIR, "thumbs");
const MAX_EDGE    = 1600;   // px — enough for 1× retina, a fraction of masters
const QUALITY     = 85;     // WebP quality (80-88 is transparent on screen)
const SKIP_EXISTING = true; // set false to force-regenerate all

async function walk(dir) {
  const out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (p.match(/\.(png|jpe?g|webp)$/i)) out.push(p);
  }
  return out;
}

const allFiles = await walk(join(PUBLIC_DIR, "work"));
const images = allFiles.map(f => "/" + relative(PUBLIC_DIR, f).split("\\").join("/"));

const fmtMB = (b) => (b / 1024 / 1024).toFixed(1) + " MB";
const fmtKB = (b) => (b / 1024).toFixed(0) + " KB";

/** Derive the public/thumbs/... path for a given /work/... src */
function thumbPath(src) {
  // src = "/work/gamecon/gc.png"
  // → "public/thumbs/work/gamecon/gc.webp"
  const { dir, name } = parse(src.replace(/^\//, "")); // strip leading /
  return join(THUMB_DIR, dir, `${name}.webp`);
}

/** Check if a file exists */
async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

let total = { in: 0, out: 0, skipped: 0 };

console.log(`\nGenerating WebP thumbnails (max ${MAX_EDGE}px, q${QUALITY})\n`);

for (const src of images) {
  const srcPath = join(PUBLIC_DIR, src.replace(/^\//, ""));
  const outPath = thumbPath(src);

  if (!(await exists(srcPath))) {
    console.log(`  ⚠  MISSING: ${src}`);
    continue;
  }

  if (SKIP_EXISTING && await exists(outPath)) {
    const sz = (await stat(outPath)).size;
    console.log(`  ✓  SKIP (exists): ${src.replace("/work/", "")}  →  ${fmtKB(sz)}`);
    total.skipped++;
    continue;
  }

  await mkdir(dirname(outPath), { recursive: true });

  const inSize = (await stat(srcPath)).size;
  const img = sharp(srcPath, { limitInputPixels: false }).rotate(); // honour EXIF
  const meta = await img.metadata();

  await img
    .resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toFile(outPath);

  const outSize = (await stat(outPath)).size;
  total.in  += inSize;
  total.out += outSize;

  const ratio = ((outSize / inSize) * 100).toFixed(1);
  console.log(
    `  ✓  ${src.replace("/work/", "")}\n` +
    `     ${meta.width}×${meta.height} ${fmtMB(inSize)}  →  ${fmtKB(outSize)}  (${ratio}%)`
  );
}

if (total.in > 0) {
  console.log(
    `\nDone. ${fmtMB(total.in)} of masters → ${fmtKB(total.out)} of thumbs` +
    `  (${((total.out / total.in) * 100).toFixed(1)}%)`
  );
}
if (total.skipped > 0) {
  console.log(`${total.skipped} file(s) already existed — skipped.`);
}
console.log(`\nThumbs at: public/thumbs/\n`);
