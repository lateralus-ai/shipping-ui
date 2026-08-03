#!/usr/bin/env node
/**
 * Assert that everything package.json promises is actually inside the tarball
 * npm would publish.
 *
 * This exists because of a bug that shipped: the Vite 5 -> 6 bump renamed the
 * emitted stylesheet from `style.css` to `shipping-ui.css`, while
 * `exports["./style.css"]` kept pointing at `./dist/style.css`. `npm run build`
 * succeeded, the type check succeeded, the visual suite was not a gate, and
 * 2.0.0-dev.32 was published with an export target that resolved to nothing —
 * every style in the consuming app would have vanished on the next lockfile
 * refresh. Nothing in this repo could see it, because every check ran against
 * the working tree and the failure was in the *package*.
 *
 * So this check deliberately runs against the packed artifact, not `dist/`:
 * it calls `npm pack`, extracts the tarball, and looks for the real files.
 * Checking `dist/` would have passed the whole time the package was broken.
 *
 * Dependency-free on purpose — it must keep working when node_modules is the
 * thing under suspicion. Uses the `tar` that ships with macOS, Linux and the
 * GitHub runners.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8"));

/** Collect every "./..." string in the exports tree, with the path that led to it. */
function collectExportTargets(node, trail, out) {
  if (typeof node === "string") {
    out.push({ target: node, where: `exports${trail}` });
    return out;
  }
  if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      collectExportTargets(value, `${trail}[${JSON.stringify(key)}]`, out);
    }
  }
  return out;
}

const targets = [];

for (const field of ["main", "module", "types", "browser", "style", "bin"]) {
  const value = pkg[field];
  if (typeof value === "string") targets.push({ target: value, where: field });
}

collectExportTargets(pkg.exports ?? {}, "", targets);

// `sideEffects` names real files too, and it silently mis-marks tree-shaking
// when it points at something that no longer exists.
for (const entry of Array.isArray(pkg.sideEffects) ? pkg.sideEffects : []) {
  if (!entry.includes("*")) targets.push({ target: entry, where: "sideEffects" });
}

const workDir = mkdtempSync(join(tmpdir(), "shipping-ui-pack-"));
let failures = [];

try {
  // `npm pack` writes the tarball and prints its filename on stdout.
  const tarball = execFileSync("npm", ["pack", "--silent", "--pack-destination", workDir], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  })
    .trim()
    .split("\n")
    .pop()
    .trim();

  execFileSync("tar", ["-xzf", join(workDir, tarball), "-C", workDir]);
  const packed = join(workDir, "package");

  const normalise = (p) => p.replace(/^\.\//, "").replace(/^\//, "");

  for (const { target, where } of targets) {
    const rel = normalise(target);
    let stat;
    try {
      stat = statSync(join(packed, rel));
    } catch {
      failures.push(`${where} -> "${target}" is not in the published package`);
      continue;
    }
    if (stat.isFile() && stat.size === 0) {
      failures.push(`${where} -> "${target}" is in the package but empty`);
    }
  }

  // Every `files` entry should contribute something. A stale entry is dead
  // weight at best and a missing directory at worst.
  for (const entry of pkg.files ?? []) {
    const rel = normalise(entry);
    try {
      statSync(join(packed, rel));
    } catch {
      failures.push(`files -> "${entry}" matched nothing in the published package`);
    }
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(
    `\npackage.json points at ${failures.length} path(s) the published tarball does not contain:\n`,
  );
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error("\nRun `npm run build` first. If a build output was renamed, either restore the");
  console.error("old name or update package.json — but remember the name is a public contract.\n");
  process.exit(1);
}

console.log(
  `check-package-exports: ${targets.length} export targets and ${(pkg.files ?? []).length} files entries all present in the packed tarball.`,
);
