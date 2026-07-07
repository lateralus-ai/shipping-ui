/**
 * Writes MCP get_metadata XML to a file.
 * Usage: node scripts/save-figma-metadata.mjs <output.xml>
 * Paste MCP get_metadata XML on stdin, then Ctrl+Z Enter (Windows) or Ctrl+D (Unix).
 */

import fs from "node:fs";

const outputPath = process.argv[2];
if (!outputPath) {
  console.error("Usage: node scripts/save-figma-metadata.mjs <output.xml>");
  process.exit(1);
}

const chunks = [];
for await (const chunk of process.stdin) {
  chunks.push(chunk);
}

const raw = Buffer.concat(chunks).toString("utf8").trim();
const xmlEnd = raw.lastIndexOf("</frame>");
if (xmlEnd === -1) {
  console.error("No </frame> found in stdin — paste MCP get_metadata XML");
  process.exit(1);
}

const xml = `${raw.slice(0, xmlEnd + "</frame>".length)}\n`;
fs.writeFileSync(outputPath, xml);
console.log(`Wrote ${outputPath} (${xml.length} bytes)`);
