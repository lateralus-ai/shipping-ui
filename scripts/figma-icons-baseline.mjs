/**
 * Updates the Figma Icons visual baseline from MCP artifacts.
 *
 * Figma MCP cannot be called directly from npm scripts — use Cursor's Figma MCP
 * to fetch a screenshot + metadata, then pass them here.
 *
 * Usage (after MCP get_screenshot + get_metadata in Cursor):
 *   node scripts/figma-icons-baseline.mjs --url <mcp-asset-url> --metadata <metadata.xml>
 *   node scripts/figma-icons-baseline.mjs --handoff scripts/.figma-mcp-handoff.json
 *   node scripts/figma-icons-baseline.mjs --from-file scripts/.figma-icons-full.png --metadata <metadata.xml>
 *
 * Stale check (compare live MCP metadata against committed baseline):
 *   node scripts/figma-icons-baseline.mjs --check --metadata <fresh-metadata.xml>
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const FILE_KEY = "2Up8R8hZw2eivY9crqf5dz";
const NODE_ID = "12:1251";
const CROP = { left: 0, top: 297, width: 710, height: 1536 };

const BASELINE_DIR = path.join(ROOT, "tests/visual/figma-baselines");
const BASELINE_PNG = path.join(BASELINE_DIR, "icons-grid.png");
const BASELINE_META = path.join(BASELINE_DIR, "icons-grid.meta.json");
const BASELINE_METADATA = path.join(BASELINE_DIR, "icons-grid.metadata.xml");

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");

const readArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  return args[index + 1];
};

const hashText = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");

const readStoredMeta = () => {
  if (!fs.existsSync(BASELINE_META)) return null;
  return JSON.parse(fs.readFileSync(BASELINE_META, "utf8"));
};

const downloadPng = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download screenshot (${response.status})`);
  }
  return Buffer.from(await response.arrayBuffer());
};

const cropBaseline = async (fullPng) =>
  sharp(fullPng).extract(CROP).png().toBuffer();

const writeBaseline = async ({ png, metadataText, metadataPath }) => {
  const metadataHash = hashText(metadataText);

  fs.mkdirSync(BASELINE_DIR, { recursive: true });
  fs.writeFileSync(BASELINE_PNG, png);
  fs.writeFileSync(BASELINE_METADATA, metadataText);

  const meta = {
    fileKey: FILE_KEY,
    nodeId: NODE_ID,
    crop: { x: CROP.left, y: CROP.top, width: CROP.width, height: CROP.height },
    metadataHash,
    metadataFile: path.relative(ROOT, BASELINE_METADATA),
    updatedAt: new Date().toISOString(),
    source: "figma-mcp",
  };

  fs.writeFileSync(BASELINE_META, `${JSON.stringify(meta, null, 2)}\n`);

  console.log(`Wrote ${path.relative(ROOT, BASELINE_PNG)}`);
  console.log(`Wrote ${path.relative(ROOT, BASELINE_METADATA)}`);
  console.log(`Wrote ${path.relative(ROOT, BASELINE_META)}`);
  console.log(`Metadata hash: ${metadataHash.slice(0, 12)}…`);
};

const loadHandoff = (handoffPath) => {
  const raw = fs.readFileSync(handoffPath, "utf8");
  const handoff = JSON.parse(raw);

  if (!handoff.screenshotUrl && !handoff.screenshotPath) {
    throw new Error("Handoff JSON needs screenshotUrl or screenshotPath");
  }
  if (!handoff.metadataXml && !handoff.metadataPath && !handoff.metadataHash) {
    throw new Error(
      "Handoff JSON needs metadataXml, metadataPath, or metadataHash with committed metadata",
    );
  }

  return handoff;
};

const resolveInputs = async () => {
  const handoffPath = readArg("--handoff");
  if (handoffPath) {
    const handoff = loadHandoff(path.resolve(ROOT, handoffPath));
    const fullPng = handoff.screenshotPath
      ? fs.readFileSync(path.resolve(ROOT, handoff.screenshotPath))
      : await downloadPng(handoff.screenshotUrl);

    let metadataText;
    let metadataPath;

    if (handoff.metadataPath) {
      metadataPath = path.resolve(ROOT, handoff.metadataPath);
      metadataText = fs.readFileSync(metadataPath, "utf8");
    } else if (handoff.metadataXml) {
      metadataText = handoff.metadataXml;
    } else if (handoff.metadataHash && fs.existsSync(BASELINE_METADATA)) {
      metadataText = fs.readFileSync(BASELINE_METADATA, "utf8");
      metadataPath = BASELINE_METADATA;
      if (hashText(metadataText) !== handoff.metadataHash) {
        throw new Error(
          "Committed metadata hash does not match handoff.metadataHash — refresh metadata via MCP get_metadata",
        );
      }
    } else {
      throw new Error("Provide metadataXml, metadataPath, or metadataHash with existing baseline metadata");
    }

    return { fullPng, metadataText, metadataPath };
  }

  const skipMetadata = args.includes("--skip-metadata");
  const url = readArg("--url");
  const fromFile = readArg("--from-file");
  const metadataArg = readArg("--metadata");

  if (skipMetadata && fs.existsSync(BASELINE_METADATA)) {
    const metadataText = fs.readFileSync(BASELINE_METADATA, "utf8");
    const metadataPath = BASELINE_METADATA;
    const fullPng = url
      ? await downloadPng(url)
      : fs.readFileSync(path.resolve(ROOT, fromFile));

    return { fullPng, metadataText, metadataPath };
  }

  if (!metadataArg) {
    throw new Error("--metadata is required (path to MCP get_metadata XML)");
  }

  const metadataPath = path.resolve(ROOT, metadataArg);
  const metadataText = fs.readFileSync(metadataPath, "utf8");

  if (url) {
    return { fullPng: await downloadPng(url), metadataText, metadataPath };
  }

  if (fromFile) {
    return {
      fullPng: fs.readFileSync(path.resolve(ROOT, fromFile)),
      metadataText,
      metadataPath,
    };
  }

  throw new Error("Provide --url, --from-file, or --handoff");
};

const runCheck = () => {
  const stored = readStoredMeta();
  if (!stored) {
    console.error("No baseline metadata found. Refresh via Figma MCP first.");
    process.exit(1);
  }

  const liveMetadataPath =
    readArg("--metadata") ??
    (fs.existsSync(path.join(ROOT, "scripts/.figma-icons-live-metadata.xml"))
      ? "scripts/.figma-icons-live-metadata.xml"
      : undefined);

  if (!liveMetadataPath) {
    console.warn(
      "No live Figma metadata found — skipping stale check.\n" +
        "In Cursor, run Figma MCP get_metadata for node 12:1251, save to\n" +
        "  scripts/.figma-icons-live-metadata.xml\n" +
        "then run: npm run figma:baseline:icons:check",
    );
    return;
  }

  const liveMetadata = fs.readFileSync(path.resolve(ROOT, liveMetadataPath), "utf8");
  const liveHash = hashText(liveMetadata);

  if (liveHash !== stored.metadataHash) {
    console.error(
      "Figma icons baseline is stale.\n" +
        `  stored metadata hash: ${stored.metadataHash.slice(0, 12)}…\n` +
        `  live metadata hash:   ${liveHash.slice(0, 12)}…\n` +
        "In Cursor, run Figma MCP get_screenshot + get_metadata, then:\n" +
        "  npm run figma:baseline:icons -- --url <mcp-url> --metadata path/to/live-metadata.xml",
    );
    process.exit(1);
  }

  console.log("Figma icons baseline metadata matches live Figma.");
};

const printUsage = () => {
  console.log(`
Figma Icons baseline (MCP workflow)

Refresh baseline in Cursor:
  1. Figma MCP → get_screenshot(fileKey=2Up8R8hZw2eivY9crqf5dz, nodeId=12:1251)
  2. Figma MCP → get_metadata(same node)
  3. Save metadata XML, then run:
     npm run figma:baseline:icons -- --url <screenshot-url> --metadata path/to/metadata.xml

Or write scripts/.figma-mcp-handoff.json and run:
  npm run figma:baseline:icons -- --handoff scripts/.figma-mcp-handoff.json

Check for design changes:
  npm run figma:baseline:icons:check -- --metadata path/to/live-metadata.xml
`);
};

const main = async () => {
  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }

  if (checkOnly) {
    runCheck();
    return;
  }

  const hasInput =
    readArg("--url") || readArg("--from-file") || readArg("--handoff");

  if (!hasInput) {
    printUsage();
    process.exit(1);
  }

  console.log("Updating Figma Icons baseline from MCP artifacts…");
  const { fullPng, metadataText, metadataPath } = await resolveInputs();
  const png = await cropBaseline(fullPng);
  await writeBaseline({ png, metadataText, metadataPath });
};

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
