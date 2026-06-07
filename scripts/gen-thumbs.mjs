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

import { readFile, mkdir, stat, access } from "node:fs/promises";
import { join, dirname, parse, relative } from "node:path";
import sharp from "sharp";

// ── config ────────────────────────────────────────────────────────────
const PUBLIC_DIR = "public";
const THUMB_DIR = join(PUBLIC_DIR, "thumbs");
const MAX_EDGE = 1600;   // px — enough for 1× retina, a fraction of masters
const QUALITY = 85;     // WebP quality (80-88 is transparent on screen)
const SKIP_EXISTING = true; // set false to force-regenerate all

// ── image paths pulled straight from projects.ts ─────────────────────
// (rather than parsing TS at runtime, we list them explicitly)
const images = [
  // GameCon cover + gallery
  "/work/gamecon/gc.png",
  "/work/gamecon/Untitled109_20251103154544.png",
  "/work/gamecon/Untitled111_20251104000358.png",
  "/work/gamecon/Untitled112_20251104003940.png",
  "/work/gamecon/Untitled114_20251104015620.png",
  "/work/gamecon/Untitled118_20251104175709.png",
  "/work/gamecon/Untitled118_20251104190425.png",
  "/work/gamecon/Untitled119_20251105001624.png",
  "/work/gamecon/pbuildingworkshop poster.png",
  "/work/gamecon/imgonline-com-ua-CompressToSize-DmSMN2vKyINvj.jpg",

  // Hacktober cover + gallery
  "/work/hacktober/16x8 big banner.png",
  "/work/hacktober/standeehacktober.png",
  "/work/hacktober/courtsidebanner1 [ML & GIT].png",
  "/work/hacktober/courtsidebanner2 [CYBERSEC & LINUX].png",
  "/work/hacktober/bridgebanner.png",
  "/work/hacktober/hacktober banner long ecole ke aage.png",
  "/work/hacktober/Untitled54_20250929153439.png",
  "/work/hacktober/Untitled55_20250929171502.png",

  // Illustrations
  "/work/Illustrations/wemby.png",
  "/work/Illustrations/port1.png",
  "/work/Illustrations/port2.png",
  "/work/Illustrations/port3.png",
  "/work/Illustrations/port6.png",

  // Aeon 2026
  "/work/aeon26/post1.png",
  "/work/aeon26/Untitled28_20260310152344.png",
  "/work/aeon26/Untitled32_20260304231906.png",
  "/work/aeon26/Untitled33_20260316190017.png",
  "/work/aeon26/Untitled36_20260316185306.png",
  "/work/aeon26/Untitled48_20260328012008.png",
  "/work/aeon26/Untitled50_20260407154742.png",
  "/work/aeon26/Untitled61_20260420105609.png",
  "/work/aeon26/aeon26slide2.png",
  "/work/aeon26/aeon26slide6.png",

  // Social media banners
  "/work/social media banners/showboating.png",
  "/work/social media banners/memors'.png",
  "/work/social media banners/velt.png",
  "/work/social media banners/solar.png",
  "/work/social media banners/requitheader.png",
  "/work/social media banners/comboheader.png",
  "/work/social media banners/masonfiled.png",
  "/work/social media banners/NoXpost.png",
  "/work/social media banners/shelboating.png",
  "/work/social media banners/Untitled146_20230617192617.png",
  "/work/social media banners/Untitled254_20240208093217.png",
];

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
  total.in += inSize;
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
