/**
 * Parses Figma-exported SVGs and generates src/icons/icons-data.ts
 *
 * Usage:
 *   1. Populate scripts/figma-svg-urls.json via Figma MCP download_assets
 *   2. node scripts/extract-figma-icons.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(__dirname, "figma-icon-nodes.json");
const URLS_FILE = path.join(__dirname, "figma-svg-urls.json");
const SVG_DIR = path.join(__dirname, ".figma-svgs");
const OUTPUT = path.join(ROOT, "src", "icons", "icons-data.ts");

const toPascal = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const DEFAULT_ICON_FILL = "#262420";

const parseShapeAttrs = (attrs) => {
  const stroke = /stroke="(?!none)([^"]+)"/.test(attrs);
  const fillMatch = attrs.match(/fill="(?!none)([^"]+)"/);
  const fillRule = attrs.match(/fill-rule="([^"]+)"/)?.[1];
  const strokeWidth = attrs.match(/stroke-width="([^"]+)"/)?.[1];
  const opacity = attrs.match(/opacity="([^"]+)"/)?.[1];
  const strokeColor = attrs.match(/stroke="(?!none)([^"]+)"/)?.[1];
  const fillColor = fillMatch?.[1];

  return {
    fill: fillColor && fillColor !== DEFAULT_ICON_FILL ? fillColor : undefined,
    stroke: strokeColor,
    fillRule: fillRule === "evenodd" ? "evenodd" : undefined,
    strokeWidth: stroke ? Number(strokeWidth ?? 1.5) : undefined,
    opacity: opacity ? Number(opacity) : undefined,
  };
};

const isBackgroundShape = (attrs) =>
  attrs.includes('fill="#F5F5F5"') ||
  attrs.includes('fill="white"') ||
  attrs.includes("stroke-dasharray");

const parseSvgPaths = (svg) => {
  const colorPath = svg.match(/<path[^>]*id="Color"[^>]*d="([^"]+)"[^>]*>/);
  if (colorPath) {
    return [{ type: "path", d: colorPath[1], ...parseShapeAttrs(colorPath[0]) }];
  }

  const stateGroupMatch = svg.match(
    /<g[^>]*id="(?:State|Status|Type|Variant|Workflow|Form)=[^"]*"[^>]*>([\s\S]*?)<\/g>\s*(?:<\/g>|$)/,
  );
  const sizeGroupMatch = svg.match(
    /<g[^>]*id="Size=[^"]*"[^>]*>([\s\S]*?)<\/g>\s*(?:<\/g>|$)/,
  );

  const searchArea = stateGroupMatch?.[1] ?? sizeGroupMatch?.[1] ?? svg;
  const shapes = [];

  const rectRegex = /<rect\b([^>]*)\/?>/g;
  let rectMatch = rectRegex.exec(searchArea);
  while (rectMatch) {
    const attrs = rectMatch[1];
    if (isBackgroundShape(attrs)) {
      rectMatch = rectRegex.exec(searchArea);
      continue;
    }

    const x = Number(attrs.match(/\bx="([^"]+)"/)?.[1]);
    const y = Number(attrs.match(/\by="([^"]+)"/)?.[1]);
    const width = Number(attrs.match(/\bwidth="([^"]+)"/)?.[1]);
    const height = Number(attrs.match(/\bheight="([^"]+)"/)?.[1]);
    const rx = attrs.match(/\brx="([^"]+)"/)?.[1];

    shapes.push({
      type: "rect",
      x,
      y,
      width,
      height,
      rx: rx ? Number(rx) : undefined,
      ...parseShapeAttrs(attrs),
    });

    rectMatch = rectRegex.exec(searchArea);
  }

  const pathRegex = /<path\b([^>]*)\/?>/g;
  let match = pathRegex.exec(searchArea);
  while (match) {
    const attrs = match[1];
    const dMatch = attrs.match(/\bd="([^"]+)"/);
    if (!dMatch || isBackgroundShape(attrs)) {
      match = pathRegex.exec(searchArea);
      continue;
    }

    shapes.push({
      type: "path",
      d: dMatch[1],
      ...parseShapeAttrs(attrs),
    });

    match = pathRegex.exec(searchArea);
  }

  if (shapes.length === 0) {
    const fallbackPath = svg.match(/<path[^>]*id="Color"[^>]*d="([^"]+)"/);
    if (fallbackPath) {
      shapes.push({ type: "path", d: fallbackPath[1] });
    }
  }

  return shapes;
};

const mergePaths = (paths) => {
  if (paths.length === 0) return null;
  if (paths.length === 1) return paths[0];

  const hasRect = paths.some((shape) => shape.type === "rect");
  const hasMixedOpacity = new Set(paths.map((shape) => shape.opacity ?? 1)).size > 1;
  const hasMixedStroke = new Set(paths.map((shape) => shape.strokeWidth !== undefined)).size > 1;

  if (hasRect || hasMixedOpacity || hasMixedStroke) {
    return paths;
  }

  const allStroke = paths.every((shape) => shape.strokeWidth !== undefined);
  const allFill = paths.every((shape) => shape.strokeWidth === undefined);

  if (allStroke || allFill) {
    return {
      type: "path",
      d: paths.map((shape) => shape.d).join(" "),
      strokeWidth: allStroke ? paths[0].strokeWidth : undefined,
      fillRule: paths.find((shape) => shape.fillRule)?.fillRule,
      opacity: paths[0].opacity,
    };
  }

  return paths;
};

const downloadSvg = async (url, dest) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  const text = await response.text();
  fs.writeFileSync(dest, text, "utf8");
  return text;
};

const loadSvg = async (nodeId, urls) => {
  const safeId = nodeId.replace(":", "-");
  const dest = path.join(SVG_DIR, `${safeId}.svg`);

  if (fs.existsSync(dest)) {
    return fs.readFileSync(dest, "utf8");
  }

  const url = urls?.[nodeId];
  if (!url) {
    throw new Error(`Missing SVG file and URL for node ${nodeId}`);
  }

  return downloadSvg(url, dest);
};

const formatShapeEntry = (shape) => {
  const parts = [];

  if (shape.type === "rect") {
    parts.push('type: "rect"');
    if (shape.x !== undefined) parts.push(`x: ${shape.x}`);
    if (shape.y !== undefined) parts.push(`y: ${shape.y}`);
    if (shape.width !== undefined) parts.push(`width: ${shape.width}`);
    if (shape.height !== undefined) parts.push(`height: ${shape.height}`);
    if (shape.rx !== undefined) parts.push(`rx: ${shape.rx}`);
  } else {
    parts.push(`d: ${JSON.stringify(shape.d)}`);
  }

  if (shape.fill) parts.push(`fill: ${JSON.stringify(shape.fill)}`);
  if (shape.stroke) parts.push(`stroke: ${JSON.stringify(shape.stroke)}`);
  if (shape.fillRule) parts.push(`fillRule: "evenodd"`);
  if (shape.strokeWidth !== undefined) parts.push(`strokeWidth: ${shape.strokeWidth}`);
  if (shape.opacity !== undefined) parts.push(`opacity: ${shape.opacity}`);

  return `{ ${parts.join(", ")} }`;
};

const formatPathEntry = (entry) => {
  if (Array.isArray(entry)) {
    return `[\n      ${entry.map((shape) => formatShapeEntry(shape)).join(",\n      ")},\n    ]`;
  }

  return formatShapeEntry(entry);
};

const formatPathSet = (set, indent = "    ") => {
  const closeIndent = indent.length >= 4 ? indent.slice(0, -4) : "";
  const lines = Object.entries(set).map(
    ([size, entry]) => `${indent}${size}: ${formatPathEntry(entry)},`,
  );
  return `{\n${lines.join("\n")}\n${closeIndent}}`;
};

const buildPathSets = async (config, urls, context) => {
  const outline = {};
  const filled = {};

  for (const [variant, sizes] of Object.entries(config)) {
    if (variant !== "outline" && variant !== "filled") continue;

    const target = variant === "filled" ? filled : outline;

    for (const [size, nodeId] of Object.entries(sizes)) {
      const svg = await loadSvg(nodeId, urls);
      const parsed = mergePaths(parseSvgPaths(svg));
      if (!parsed) {
        throw new Error(`No paths found for ${context} ${variant} ${size} (${nodeId})`);
      }
      target[size] = parsed;
    }
  }

  return {
    outline,
    filled: Object.keys(filled).length > 0 ? filled : undefined,
  };
};

const buildIconEntry = async (name, config, urls) => {
  const entry = {
    name: `${toPascal(name)}Icon`,
    ...(await buildPathSets(config, urls, name)),
  };

  if (config.variants) {
    entry.variants = {};
    for (const [variantName, variantConfig] of Object.entries(config.variants)) {
      entry.variants[variantName] = await buildPathSets(
        variantConfig,
        urls,
        `${name}.${variantName}`,
      );
    }
  }

  return entry;
};

const buildDirectionalEntry = async (config, urls) => {
  const result = {};

  for (const [direction, sizes] of Object.entries(config)) {
    result[direction] = {};

    for (const [size, nodeId] of Object.entries(sizes)) {
      const svg = await loadSvg(nodeId, urls);
      const parsed = mergePaths(parseSvgPaths(svg));
      if (!parsed) {
        throw new Error(`No paths for ${direction} ${size} (${nodeId})`);
      }
      result[direction][size] = parsed;
    }
  }

  return result;
};

const generateIconsData = (icons) => {
  const blocks = Object.entries(icons).map(([key, entry]) => {
    const lines = [`  ${key}: {`, `    name: "${entry.name}",`];

    lines.push(`    outline: ${formatPathSet(entry.outline)},`);

    if (entry.filled) {
      lines.push(`    filled: ${formatPathSet(entry.filled)},`);
    }

    if (entry.variants) {
      const variantLines = Object.entries(entry.variants).map(([variantName, variant]) => {
        const variantParts = [`      ${variantName}: {`];
        variantParts.push(`        outline: ${formatPathSet(variant.outline, "        ")},`);
        if (variant.filled) {
          variantParts.push(`        filled: ${formatPathSet(variant.filled, "        ")},`);
        }
        variantParts.push("      },");
        return variantParts.join("\n");
      });
      lines.push(`    variants: {\n${variantLines.join("\n")}\n    },`);
    }

    lines.push("  },");
    return lines.join("\n");
  });

  return `import type { CreateIconOptions } from "./createIcon";

export type IconDataEntry = CreateIconOptions;

export const iconsData = {
${blocks.join("\n")}
} as const satisfies Record<string, IconDataEntry>;

export type IconDataName = keyof typeof iconsData;
`;
};

const generateDirectionalData = (name, data) => {
  const directions = Object.entries(data)
    .map(([direction, sizes]) => {
      const sizeLines = Object.entries(sizes)
        .map(([size, entry]) => `    ${size}: ${formatPathEntry(entry)},`)
        .join("\n");
      return `  ${direction}: {\n${sizeLines}\n  },`;
    })
    .join("\n");

  return `export const ${name}_PATHS = {\n${directions}\n} as const;\n`;
};

const collectNodeIds = (manifest) => {
  const ids = new Set();

  const addFromSizes = (sizes) => {
    Object.values(sizes).forEach((nodeId) => ids.add(nodeId));
  };

  const addFromIconConfig = (config) => {
    Object.entries(config).forEach(([key, value]) => {
      if (key === "variants") {
        Object.values(value).forEach(addFromIconConfig);
        return;
      }

      addFromSizes(value);
    });
  };

  Object.values(manifest.icons).forEach(addFromIconConfig);
  Object.values(manifest.arrow).forEach(addFromSizes);
  Object.values(manifest.chevron).forEach(addFromSizes);

  return [...ids];
};

const main = async () => {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

  if (!fs.existsSync(URLS_FILE)) {
    const ids = collectNodeIds(manifest);
    fs.writeFileSync(
      URLS_FILE,
      JSON.stringify(
        Object.fromEntries(ids.map((id) => [id, ""])),
        null,
        2,
      ),
    );
    console.error(
      `Created ${URLS_FILE} with ${ids.length} node IDs. Populate URLs from Figma MCP download_assets, then re-run.`,
    );
    process.exit(1);
  }

  const urls = fs.existsSync(URLS_FILE)
    ? JSON.parse(fs.readFileSync(URLS_FILE, "utf8"))
    : {};

  const hasSvgCache = fs.existsSync(SVG_DIR);
  const missing = Object.entries(urls).filter(([, url]) => !url);
  if (missing.length > 0 && !hasSvgCache) {
    console.error(`Missing ${missing.length} URLs in figma-svg-urls.json`);
    process.exit(1);
  }

  fs.mkdirSync(SVG_DIR, { recursive: true });

  const icons = {};
  for (const [name, config] of Object.entries(manifest.icons)) {
    icons[name] = await buildIconEntry(name, config, urls);
    console.log(`✓ ${name}`);
  }

  fs.writeFileSync(OUTPUT, generateIconsData(icons));

  const arrowPaths = await buildDirectionalEntry(manifest.arrow, urls);
  const chevronPaths = await buildDirectionalEntry(manifest.chevron, urls);

  fs.writeFileSync(
    path.join(ROOT, "src", "icons", "arrow-paths.ts"),
    `${generateDirectionalData("ARROW", arrowPaths)}`,
  );

  fs.writeFileSync(
    path.join(ROOT, "src", "icons", "chevron-paths.ts"),
    `${generateDirectionalData("CHEVRON", chevronPaths)}`,
  );

  console.log(`\nWrote ${OUTPUT}`);
  console.log("Wrote arrow-paths.ts and chevron-paths.ts");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
