import { access, copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sourceRoot = resolve(process.cwd(), "..", "music-improved");
const targetRoot = process.cwd();

const assets = [
  ["public/assets/photos/smoky-concert.jpg", "public/assets/photos/maloya/live.jpg"],
  ["public/assets/photos/guitar.jpg", "public/assets/photos/maloya/guitar.jpg"],
  ["public/assets/photos/mafate.jpg", "public/assets/photos/maloya/mafate.jpg"],
  ["public/assets/photos/cilaos.jpg", "public/assets/photos/maloya/cilaos.jpg"],
  ["public/assets/photos/fournaise.jpg", "public/assets/photos/maloya/fournaise.jpg"],
  ["public/assets/photos/piton.jpg", "public/assets/photos/maloya/piton.jpg"],
  ["public/assets/photos/poster.jpg", "public/assets/photos/maloya/poster.jpg"],
  ["public/assets/photos/portrait shot.jpg", "public/assets/photos/maloya/portrait.jpg"]
];

for (const [from, to] of assets) {
  const source = resolve(sourceRoot, from);
  const target = resolve(targetRoot, to);

  await access(source);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
  console.log(`✓ ${to}`);
}

console.log(`Imported ${assets.length} curated Maloya assets from ../music-improved.`);
