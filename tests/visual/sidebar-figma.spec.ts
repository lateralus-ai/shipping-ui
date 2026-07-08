import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import {
  FIGMA_BASELINE_DIR,
  FIGMA_SIDEBAR_ACTUAL_IMAGE,
  FIGMA_SIDEBAR_BASELINE_IMAGE,
  FIGMA_SIDEBAR_DIFF_IMAGE,
  FIGMA_SIDEBAR_FAILURES_JSON,
  FIGMA_SIDEBAR_GRID_CROP,
  FIGMA_SIDEBAR_MASK_IMAGE,
  FIGMA_SIDEBAR_REPORT_JSON,
  SIDEBAR_STORY,
} from "./figma.config";
import {
  compareFigmaRegions,
  formatDiffSummary,
  formatMaskedDiffSummary,
  type CompareFigmaRegionsResult,
} from "./helpers/compare-images";
import {
  SIDEBAR_COMPARISON_REGIONS,
  SIDEBAR_COMPARE_THRESHOLD,
  SIDEBAR_MAX_PER_REGION_DIFF_RATIO,
} from "./helpers/sidebar-comparison-regions";
import { loadStoryInIframe } from "./helpers/storybook";

const VIEWPORT_PADDING = 64;
const shouldSaveImages =
  process.env.SAVE_VISUAL_ARTIFACTS !== "0" && !process.env.CI;

const baselinePath = path.join(process.cwd(), FIGMA_SIDEBAR_BASELINE_IMAGE);
const artifactsDir = path.join(process.cwd(), FIGMA_BASELINE_DIR);

const formatFailedRegionsMessage = (result: CompareFigmaRegionsResult) => {
  const lines = result.failedRegions.map(
    (region) =>
      `  - ${region.label}: ${region.diffPercent}% (${region.diffPixels}/${region.comparablePixels}px ${region.compareMode})`,
  );
  return [
    `${result.failedRegions.length}/${result.regionCount} regions exceed ${result.perRegionMaxDiffRatio * 100}% box diff`,
    ...lines,
  ].join("\n");
};

const saveReport = (result: CompareFigmaRegionsResult) => {
  mkdirSync(artifactsDir, { recursive: true });

  const report = {
    comparedAt: new Date().toISOString(),
    story: SIDEBAR_STORY.id,
    baseline: FIGMA_SIDEBAR_BASELINE_IMAGE,
    actual: FIGMA_SIDEBAR_ACTUAL_IMAGE,
    diff: FIGMA_SIDEBAR_DIFF_IMAGE,
    mask: FIGMA_SIDEBAR_MASK_IMAGE,
    width: result.width,
    height: result.height,
    compareThreshold: SIDEBAR_COMPARE_THRESHOLD,
    compareMode: "box",
    perRegionMaxDiffRatio: result.perRegionMaxDiffRatio,
    perRegionMaxDiffPercent: result.perRegionMaxDiffRatio * 100,
    summary: {
      passed: result.failedRegions.length === 0,
      regionCount: result.regionCount,
      failedRegionCount: result.failedRegions.length,
      shiftedRegionCount: result.shiftedRegionCount,
      dominantShift: result.dominantShift,
      aggregateMaskedDiffPercent: Number((result.maskedDiffRatio * 100).toFixed(4)),
      aggregateFullFrameDiffPercent: Number((result.fullDiffRatio * 100).toFixed(4)),
    },
    failedRegions: result.failedRegions,
    regions: result.regions,
  };

  writeFileSync(
    path.join(process.cwd(), FIGMA_SIDEBAR_REPORT_JSON),
    `${JSON.stringify(report, null, 2)}\n`,
  );

  writeFileSync(
    path.join(process.cwd(), FIGMA_SIDEBAR_FAILURES_JSON),
    `${JSON.stringify(
      {
        comparedAt: report.comparedAt,
        perRegionMaxDiffPercent: report.perRegionMaxDiffPercent,
        failedRegionCount: result.failedRegions.length,
        failedRegions: result.failedRegions,
      },
      null,
      2,
    )}\n`,
  );
};

const saveImages = (screenshot: Buffer, result: CompareFigmaRegionsResult) => {
  writeFileSync(path.join(process.cwd(), FIGMA_SIDEBAR_ACTUAL_IMAGE), screenshot);
  writeFileSync(path.join(process.cwd(), FIGMA_SIDEBAR_DIFF_IMAGE), result.diffPng);
  writeFileSync(path.join(process.cwd(), FIGMA_SIDEBAR_MASK_IMAGE), result.maskPng);
};

const logComparison = (result: CompareFigmaRegionsResult) => {
  console.log("\nSidebar subcomponents vs Figma visual comparison:");
  console.log(
    `  Gate:      per-region ≤${result.perRegionMaxDiffRatio * 100}% box diff (${result.failedRegions.length} failed)`,
  );
  console.log(`  Box diff:  ${formatMaskedDiffSummary(result)} (aggregate, informational)`);
  console.log(`  Full frame: ${formatDiffSummary(result)} (includes whitespace)`);
  console.log(`  Shifted:   ${result.shiftedRegionCount}/${result.regionCount} regions needed alignment offset`);
  console.log(
    `  Dominant:  dx=${result.dominantShift.dx}, dy=${result.dominantShift.dy} (${result.dominantShift.regionCount} regions)`,
  );
  if (result.failedRegions.length > 0) {
    console.log("  Failed regions:");
    result.failedRegions.slice(0, 10).forEach((region) => {
      console.log(
        `    - ${region.label}: ${region.diffPercent}% (${region.diffPixels}/${region.comparablePixels}px)`,
      );
    });
    if (result.failedRegions.length > 10) {
      console.log(`    ... and ${result.failedRegions.length - 10} more (see report)`);
    }
  }
  console.log(`  Baseline:  ${FIGMA_SIDEBAR_BASELINE_IMAGE}`);
  console.log(`  Actual:    ${FIGMA_SIDEBAR_ACTUAL_IMAGE}`);
  console.log(`  Diff map:  ${FIGMA_SIDEBAR_DIFF_IMAGE}`);
  console.log(`  Mask:      ${FIGMA_SIDEBAR_MASK_IMAGE}`);
  console.log(`  Report:    ${FIGMA_SIDEBAR_REPORT_JSON}`);
  console.log(`  Failures:  ${FIGMA_SIDEBAR_FAILURES_JSON}\n`);
};

test.describe("Sidebar subcomponents vs Figma baseline", () => {
  test.beforeAll(() => {
    if (!existsSync(baselinePath)) {
      throw new Error(
        `Missing Figma baseline at ${FIGMA_SIDEBAR_BASELINE_IMAGE}. Run: npm run figma:baseline:sidebar`,
      );
    }
  });

  test("Storybook Sidebar canvas matches Figma subcomponent grid", async ({ page }) => {
    const { width, height } = FIGMA_SIDEBAR_GRID_CROP;

    await loadStoryInIframe(page, SIDEBAR_STORY.id, {
      width: width + VIEWPORT_PADDING,
      height: height + VIEWPORT_PADDING,
    });

    const grid = page.locator("[data-figma-sidebar-grid]").first();
    await expect(grid).toBeVisible({ timeout: 30000 });

    const box = await grid.boundingBox();
    expect(box?.width).toBe(width);
    expect(box?.height).toBe(height);

    const screenshot = await grid.screenshot({ type: "png" });
    const baseline = readFileSync(baselinePath);
    const result = compareFigmaRegions(baseline, screenshot, SIDEBAR_COMPARISON_REGIONS, {
      threshold: SIDEBAR_COMPARE_THRESHOLD,
      perRegionMaxDiffRatio: SIDEBAR_MAX_PER_REGION_DIFF_RATIO,
    });

    saveReport(result);
    if (shouldSaveImages) {
      saveImages(screenshot, result);
    }
    logComparison(result);

    expect(
      result.failedRegions,
      formatFailedRegionsMessage(result),
    ).toHaveLength(0);
  });
});
