/**
 * Downloads Figma SVG assets and saves to scripts/.figma-svgs/{nodeId}.svg
 * Usage: node scripts/download-figma-svgs.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URLS_FILE = path.join(__dirname, "figma-svg-urls.json");
const SVG_DIR = path.join(__dirname, ".figma-svgs");

const urls = JSON.parse(fs.readFileSync(URLS_FILE, "utf8"));
fs.mkdirSync(SVG_DIR, { recursive: true });

const entries = Object.entries(urls).filter(([, url]) => url);
let done = 0;
let failed = 0;

for (const [nodeId, url] of entries) {
  const dest = path.join(SVG_DIR, `${nodeId.replace(":", "-")}.svg`);
  if (fs.existsSync(dest)) {
    done++;
    continue;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    fs.writeFileSync(dest, await response.text(), "utf8");
    done++;
    process.stdout.write(".");
  } catch (error) {
    failed++;
    console.error(`\nFailed ${nodeId}: ${error.message}`);
  }
}

console.log(`\nDownloaded ${done} SVGs (${failed} failed) to ${SVG_DIR}`);
