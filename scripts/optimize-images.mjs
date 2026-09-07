// One-off (re-runnable) image compression: converts every png/jpg in public/
// to webp (max 2000px longest side, q82, EXIF-aware) and deletes the original.
// Run: node scripts/optimize-images.mjs   (originals are git-tracked, revert-safe)
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const MAX_EDGE = 2000;
const QUALITY = 82;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let inBytes = 0, outBytes = 0, n = 0;
for await (const file of walk(ROOT)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const src = sharp(file)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  let size;
  try {
    size = (await src.webp({ quality: QUALITY, alphaQuality: QUALITY }).toFile(out)).size;
  } catch (err) {
    console.error(`SKIP ${file}: ${err.message}`);
    continue;
  }
  const before = (await stat(file)).size;
  await unlink(file);
  inBytes += before; outBytes += size; n++;
  console.log(
    `${(before / 1024 / 1024).toFixed(1).padStart(6)}MB -> ${(size / 1024 / 1024).toFixed(1).padStart(6)}MB` +
    `  ${path.relative("public", out)}`
  );
}
console.log(`\n${n} images: ${(inBytes / 1024 / 1024).toFixed(1)}MB -> ${(outBytes / 1024 / 1024).toFixed(1)}MB`);