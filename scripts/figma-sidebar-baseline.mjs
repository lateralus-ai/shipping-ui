/**
 * Updates Figma Sidebar visual baselines from MCP artifacts.
 *
 * Targets:
 *   subcomponents — page 12:1258, crop Content 400×2824 → sidebar-grid.png
 *   layouts       — page 14:841, crop Content 1368×2464 → sidebar-layouts-grid.png
 *
 * Usage (after MCP get_screenshot + get_metadata in Cursor):
 *   node scripts/figma-sidebar-baseline.mjs --target subcomponents --url <url> --metadata <metadata.xml>
 *   node scripts/figma-sidebar-baseline.mjs --target layouts --handoff scripts/.figma-sidebar-layouts-handoff.json
 *   node scripts/figma-sidebar-baseline.mjs --target subcomponents --check --metadata <fresh-metadata.xml>
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const FILE_KEY = "2Up8R8hZw2eivY9crqf5dz";

const TARGETS = {
  subcomponents: {
    nodeId: "12:1258",
    crop: { left: 32, top: 188, width: 400, height: 2824 },
    baselinePng: "sidebar-grid.png",
    baselineMeta: "sidebar-grid.meta.json",
    baselineMetadata: "sidebar-grid.metadata.xml",
    liveMetadata: "scripts/.figma-sidebar-live-metadata.xml",
  },
  layouts: {
    nodeId: "14:841",
    crop: { left: 32, top: 188, width: 1368, height: 2464 },
    baselinePng: "sidebar-layouts-grid.png",
    baselineMeta: "sidebar-layouts-grid.meta.json",
    baselineMetadata: "sidebar-layouts-grid.metadata.xml",
    liveMetadata: "scripts/.figma-sidebar-layouts-live-metadata.xml",
  },
};

const BASELINE_DIR = path.join(ROOT, "tests/visual/figma-baselines");

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");

const readArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return undefined;
  return args[index + 1];
};

const resolveTarget = () => {
  const target = readArg("--target") ?? "subcomponents";
  const config = TARGETS[target];
  if (!config) {
    throw new Error(`Unknown --target "${target}". Use subcomponents or layouts.`);
  }
  return { name: target, ...config };
};

const hashText = (text) =>
  crypto.createHash("sha256").update(text).digest("hex");

const readStoredMeta = (config) => {
  const metaPath = path.join(BASELINE_DIR, config.baselineMeta);
  if (!fs.existsSync(metaPath)) return null;
  return JSON.parse(fs.readFileSync(metaPath, "utf8"));
};

const downloadPng = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download screenshot (${response.status})`);
  }
  return Buffer.from(await response.arrayBuffer());
};

const cropBaseline = async (fullPng, crop) =>
  sharp(fullPng).extract(crop).png().toBuffer();

const writeBaseline = async ({ config, targetName, png, metadataText }) => {
  const metadataHash = hashText(metadataText);
  const baselinePng = path.join(BASELINE_DIR, config.baselinePng);
  const baselineMeta = path.join(BASELINE_DIR, config.baselineMeta);
  const baselineMetadata = path.join(BASELINE_DIR, config.baselineMetadata);

  fs.mkdirSync(BASELINE_DIR, { recursive: true });
  fs.writeFileSync(baselinePng, png);
  fs.writeFileSync(baselineMetadata, metadataText);

  const meta = {
    fileKey: FILE_KEY,
    nodeId: config.nodeId,
    target: targetName,
    crop: {
      x: config.crop.left,
      y: config.crop.top,
      width: config.crop.width,
      height: config.crop.height,
    },
    metadataHash,
    metadataFile: path.relative(ROOT, baselineMetadata),
    updatedAt: new Date().toISOString(),
    source: "figma-mcp",
  };

  fs.writeFileSync(baselineMeta, `${JSON.stringify(meta, null, 2)}\n`);

  console.log(`Wrote ${path.relative(ROOT, baselinePng)}`);
  console.log(`Wrote ${path.relative(ROOT, baselineMetadata)}`);
  console.log(`Wrote ${path.relative(ROOT, baselineMeta)}`);
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

const resolveInputs = async (config) => {
  const handoffPath = readArg("--handoff");
  if (handoffPath) {
    const handoff = loadHandoff(path.resolve(ROOT, handoffPath));
    const fullPng = handoff.screenshotPath
      ? fs.readFileSync(path.resolve(ROOT, handoff.screenshotPath))
      : await downloadPng(handoff.screenshotUrl);

    let metadataText;

    if (handoff.metadataPath) {
      metadataText = fs.readFileSync(path.resolve(ROOT, handoff.metadataPath), "utf8");
    } else if (handoff.metadataXml) {
      metadataText = handoff.metadataXml;
    } else if (handoff.metadataHash) {
      const baselineMetadata = path.join(BASELINE_DIR, config.baselineMetadata);
      if (!fs.existsSync(baselineMetadata)) {
        throw new Error("Committed metadata missing — refresh via MCP get_metadata");
      }
      metadataText = fs.readFileSync(baselineMetadata, "utf8");
      if (hashText(metadataText) !== handoff.metadataHash) {
        throw new Error(
          "Committed metadata hash does not match handoff.metadataHash — refresh metadata via MCP get_metadata",
        );
      }
    } else {
      throw new Error("Provide metadataXml, metadataPath, or metadataHash with existing baseline metadata");
    }

    return { fullPng, metadataText };
  }

  const skipMetadata = args.includes("--skip-metadata");
  const url = readArg("--url");
  const fromFile = readArg("--from-file");
  const metadataArg = readArg("--metadata");
  const baselineMetadata = path.join(BASELINE_DIR, config.baselineMetadata);

  if (skipMetadata && fs.existsSync(baselineMetadata)) {
    const metadataText = fs.readFileSync(baselineMetadata, "utf8");
    const fullPng = url
      ? await downloadPng(url)
      : fs.readFileSync(path.resolve(ROOT, fromFile));

    return { fullPng, metadataText };
  }

  if (!metadataArg) {
    throw new Error("--metadata is required (path to MCP get_metadata XML)");
  }

  const metadataText = fs.readFileSync(path.resolve(ROOT, metadataArg), "utf8");

  if (url) {
    return { fullPng: await downloadPng(url), metadataText };
  }

  if (fromFile) {
    return {
      fullPng: fs.readFileSync(path.resolve(ROOT, fromFile)),
      metadataText,
    };
  }

  throw new Error("Provide --url, --from-file, or --handoff");
};

const runCheck = (config, targetName) => {
  const stored = readStoredMeta(config);
  if (!stored) {
    console.error(`No baseline metadata found for ${targetName}. Refresh via Figma MCP first.`);
    process.exit(1);
  }

  const liveMetadataPath =
    readArg("--metadata") ??
    (fs.existsSync(path.join(ROOT, config.liveMetadata))
      ? config.liveMetadata
      : undefined);

  if (!liveMetadataPath) {
    console.warn(
      `No live Figma metadata found for ${targetName} — skipping stale check.\n` +
        `In Cursor, run Figma MCP get_metadata for node ${config.nodeId}, save to\n` +
        `  ${config.liveMetadata}\n` +
        `then run: npm run figma:baseline:sidebar:check -- --target ${targetName}`,
    );
    return;
  }

  const liveMetadata = fs.readFileSync(path.resolve(ROOT, liveMetadataPath), "utf8");
  const liveHash = hashText(liveMetadata);

  if (liveHash !== stored.metadataHash) {
    console.error(
      `Figma sidebar baseline (${targetName}) is stale.\n` +
        `  stored metadata hash: ${stored.metadataHash.slice(0, 12)}…\n` +
        `  live metadata hash:   ${liveHash.slice(0, 12)}…\n` +
        "In Cursor, run Figma MCP get_screenshot + get_metadata, then:\n" +
        `  npm run figma:baseline:sidebar -- --target ${targetName} --url <mcp-url> --metadata path/to/live-metadata.xml`,
    );
    process.exit(1);
  }

  console.log(`Figma sidebar baseline (${targetName}) metadata matches live Figma.`);
};

const printUsage = () => {
  console.log(`
Figma Sidebar baselines (MCP workflow)

Targets:
  subcomponents  node 12:1258 → sidebar-grid.png (400×2824)
  layouts        node 14:841  → sidebar-layouts-grid.png (1368×2464)

Refresh subcomponents baseline:
  1. Figma MCP → get_screenshot(fileKey=${FILE_KEY}, nodeId=12:1258, maxDimension=4096)
  2. Figma MCP → get_metadata(same node)
  3. npm run figma:baseline:sidebar -- --target subcomponents --url <url> --metadata path/to/metadata.xml

Refresh layouts baseline:
  1. Figma MCP → get_screenshot(fileKey=${FILE_KEY}, nodeId=14:841, maxDimension=4096)
  2. Figma MCP → get_metadata(same node)
  3. npm run figma:baseline:sidebar:layouts -- --url <url> --metadata path/to/metadata.xml

Check for design changes:
  npm run figma:baseline:sidebar:check -- --target subcomponents --metadata path/to/live-metadata.xml
`);
};

const main = async () => {
  if (args.includes("--help") || args.includes("-h")) {
    printUsage();
    return;
  }

  const { name: targetName, ...config } = resolveTarget();

  if (checkOnly) {
    runCheck(config, targetName);
    return;
  }

  const hasInput =
    readArg("--url") || readArg("--from-file") || readArg("--handoff");

  if (!hasInput) {
    printUsage();
    process.exit(1);
  }

  console.log(`Updating Figma Sidebar baseline (${targetName}) from MCP artifacts…`);
  const { fullPng, metadataText } = await resolveInputs(config);
  const png = await cropBaseline(fullPng, config.crop);
  await writeBaseline({ config, targetName, png, metadataText });
};

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
