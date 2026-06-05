/* =================================================================== *
 *  optimize-designs.mjs — shrink raw design masters into web assets.
 *
 *  WHY: real exports can be 100–300 MB PNGs (huge canvas / 16-bit).
 *  GitHub rejects >100 MB files and next/image OOMs decoding them.
 *  No screen needs that — 2560px WebP looks identical and is ~100x smaller.
 *
 *  FLOW:
 *    1. Drop masters in  designs/masters/<category>/<project>/<file>
 *       <category> = identities | logos | posters   (any image format)
 *    2. Run:  npm run optimize
 *    3. Optimized .webp land in  public/work/<category>/<project>/
 *       and a ready-to-paste projects.ts snippet prints to the console.
 *
 *  designs/masters/ is git-ignored — masters never bloat the repo.
 * =================================================================== */
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, relative, parse, sep } from "node:path";
import sharp from "sharp";

const SRC = "designs/masters";
const OUT = "public/work";
const MAX_EDGE = 2560;   // long-edge cap in px (retina poster)
const QUALITY = 82;      // WebP quality — 78–85 is the sweet spot
const EXT = /\.(png|jpe?g|tiff?|webp|avif|gif|bmp)$/i;

const fmtMB = (b) => (b / 1024 / 1024).toFixed(1) + " MB";
const fmtKB = (b) => (b / 1024).toFixed(0) + " KB";

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out; // dir missing
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (EXT.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(SRC);
if (files.length === 0) {
  console.log(`No images in ${SRC}/. Drop masters there, e.g.`);
  console.log(`  ${SRC}/identities/acme/cover.png`);
  process.exit(0);
}

console.log(`Optimizing ${files.length} master(s) → ${OUT}/ (max ${MAX_EDGE}px, webp q${QUALITY})\n`);

const snippets = [];
let savedIn = 0, savedOut = 0;

for (const file of files) {
  const rel = relative(SRC, file);                 // identities/acme/cover.png
  const { dir, name } = parse(rel);
  const outDir = join(OUT, dir);
  const outPath = join(outDir, `${name}.webp`);
  await mkdir(outDir, { recursive: true });

  const inSize = (await stat(file)).size;
  const img = sharp(file, { limitInputPixels: false }).rotate(); // honor EXIF
  const meta = await img.metadata();

  await img
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  const outSize = (await stat(outPath)).size;
  savedIn += inSize; savedOut += outSize;

  console.log(
    `  ${rel}\n    ${meta.width}x${meta.height} ${fmtMB(inSize)}  →  ` +
    `${outMeta.width}x${outMeta.height} ${fmtKB(outSize)}  (${(outSize / inSize * 100).toFixed(1)}%)`
  );

  const webSrc = "/" + relative("public", outPath).split(sep).join("/");
  snippets.push(
    `    { src: "${webSrc}", alt: "${name}", width: ${outMeta.width}, height: ${outMeta.height} },`
  );
}

console.log(`\nTotal: ${fmtMB(savedIn)} → ${fmtMB(savedOut)}  (saved ${fmtMB(savedIn - savedOut)})\n`);
console.log("Paste the right pixel sizes into content/projects.ts:\n");
console.log(snippets.join("\n"));
