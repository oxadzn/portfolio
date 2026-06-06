import sharp from "sharp";
import { join } from "path";

const SIZE = 256; // 256x256 is tileable and small
const INTENSITY = 0.5; // How bright the noise should be (0 to 1)

// Generate raw random pixel data (monochrome noise)
const rawData = new Uint8Array(SIZE * SIZE);
for (let i = 0; i < rawData.length; i++) {
  // Generate a random brightness value
  const val = Math.random() * 255 * INTENSITY;
  rawData[i] = val;
}

async function run() {
  const outPath = join(process.cwd(), "public", "noise.webp");
  await sharp(rawData, {
    raw: {
      width: SIZE,
      height: SIZE,
      channels: 1, // grayscale
    },
  })
    .webp({ quality: 80 }) // compressed webp
    .toFile(outPath);
  
  console.log(`Noise texture generated at ${outPath}`);
}

run();
