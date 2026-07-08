import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import type { IconComparisonRegion } from "./icon-comparison-regions";

export type CompareMode = "ink" | "box";

export type FigmaComparisonRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  compareMode: CompareMode;
};

export type CompareImagesResult = {
  diffPixels: number;
  totalPixels: number;
  diffRatio: number;
  width: number;
  height: number;
  diffPng: Buffer;
};

export type RegionCompareResult = {
  diffPixels: number;
  comparablePixels: number;
  shift: { dx: number; dy: number };
  label: string;
  diffRatio: number;
  compareMode: CompareMode;
};

export type FigmaRegionReport = FigmaComparisonRegion & {
  diffPixels: number;
  comparablePixels: number;
  diffRatio: number;
  diffPercent: number;
  passed: boolean;
  shift: { dx: number; dy: number };
};

export type CompareFigmaRegionsResult = CompareImagesResult & {
  maskedDiffPixels: number;
  maskedComparablePixels: number;
  maskedDiffRatio: number;
  regionCount: number;
  shiftedRegionCount: number;
  fullDiffRatio: number;
  maskPng: Buffer;
  dominantShift: { dx: number; dy: number; regionCount: number };
  perRegionMaxDiffRatio: number;
  regions: FigmaRegionReport[];
  failedRegions: FigmaRegionReport[];
};

export type IconRegionReport = IconComparisonRegion & {
  diffPixels: number;
  inkPixels: number;
  diffRatio: number;
  diffPercent: number;
  passed: boolean;
  shift: { dx: number; dy: number };
};

export type CompareIconsResult = CompareImagesResult & {
  maskedDiffPixels: number;
  maskedTotalPixels: number;
  maskedDiffRatio: number;
  regionCount: number;
  shiftedRegionCount: number;
  fullDiffRatio: number;
  maskPng: Buffer;
  dominantShift: { dx: number; dy: number; regionCount: number };
  perRegionMaxDiffRatio: number;
  regions: IconRegionReport[];
  failedRegions: IconRegionReport[];
};

type CompareOptions = {
  threshold?: number;
  maxShift?: number;
  inkThreshold?: number;
  perRegionMaxDiffRatio?: number;
};

const INK_CUTOFF = 120;

const isInkPixel = (img: PNG, x: number, y: number, inkThreshold: number) => {
  const idx = (img.width * y + x) << 2;
  const r = img.data[idx];
  const g = img.data[idx + 1];
  const b = img.data[idx + 2];
  return r < inkThreshold && g < inkThreshold && b < inkThreshold;
};

const isComparablePixel = (
  expected: PNG,
  received: PNG,
  ax: number,
  ay: number,
  bx: number,
  by: number,
  compareMode: CompareMode,
  inkThreshold: number,
) => {
  if (compareMode === "box") return true;

  return (
    isInkPixel(expected, ax, ay, inkThreshold) ||
    isInkPixel(received, bx, by, inkThreshold)
  );
};

const colorDelta = (
  img1: PNG,
  img2: PNG,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  threshold: number,
) => {
  const idx1 = (img1.width * y1 + x1) << 2;
  const idx2 = (img2.width * y2 + x2) << 2;

  const delta =
    (Math.abs(img1.data[idx1] - img2.data[idx2]) +
      Math.abs(img1.data[idx1 + 1] - img2.data[idx2 + 1]) +
      Math.abs(img1.data[idx1 + 2] - img2.data[idx2 + 2])) /
    3;

  return delta > threshold * 255;
};

const compareRegion = (
  expected: PNG,
  received: PNG,
  region: FigmaComparisonRegion,
  maxShift: number,
  threshold: number,
  inkThreshold: number,
): RegionCompareResult => {
  let bestDiff = Number.POSITIVE_INFINITY;
  let bestComparablePixels = 0;
  let bestShift = { dx: 0, dy: 0 };

  for (let dy = -maxShift; dy <= maxShift; dy += 1) {
    for (let dx = -maxShift; dx <= maxShift; dx += 1) {
      let diffPixels = 0;
      let comparablePixels = 0;

      for (let py = 0; py < region.height; py += 1) {
        for (let px = 0; px < region.width; px += 1) {
          const bx = region.x + px;
          const by = region.y + py;
          const ax = bx + dx;
          const ay = by + dy;

          if (
            ax < 0 ||
            ay < 0 ||
            ax >= expected.width ||
            ay >= expected.height ||
            bx < 0 ||
            by < 0 ||
            bx >= received.width ||
            by >= received.height
          ) {
            continue;
          }

          if (
            !isComparablePixel(
              expected,
              received,
              ax,
              ay,
              bx,
              by,
              region.compareMode,
              inkThreshold,
            )
          ) {
            continue;
          }

          comparablePixels += 1;

          if (colorDelta(expected, received, ax, ay, bx, by, threshold)) {
            diffPixels += 1;
          }
        }
      }

      if (comparablePixels === 0) continue;

      if (diffPixels < bestDiff) {
        bestDiff = diffPixels;
        bestComparablePixels = comparablePixels;
        bestShift = { dx, dy };
      }
    }
  }

  return {
    diffPixels: bestDiff === Number.POSITIVE_INFINITY ? 0 : bestDiff,
    comparablePixels: bestComparablePixels,
    shift: bestShift,
    label: region.label,
    compareMode: region.compareMode,
    diffRatio:
      bestComparablePixels === 0
        ? 0
        : (bestDiff === Number.POSITIVE_INFINITY ? 0 : bestDiff) /
          bestComparablePixels,
  };
};

const paintRegionMask = (
  mask: PNG,
  region: FigmaComparisonRegion,
  rgba: [number, number, number, number],
) => {
  for (let py = 0; py < region.height; py += 1) {
    for (let px = 0; px < region.width; px += 1) {
      const x = region.x + px;
      const y = region.y + py;
      const idx = (mask.width * y + x) << 2;
      mask.data[idx] = rgba[0];
      mask.data[idx + 1] = rgba[1];
      mask.data[idx + 2] = rgba[2];
      mask.data[idx + 3] = rgba[3];
    }
  }
};

const paintRegionDiff = (
  expected: PNG,
  received: PNG,
  diff: PNG,
  region: FigmaComparisonRegion,
  shift: { dx: number; dy: number },
  threshold: number,
  inkThreshold: number,
) => {
  for (let py = 0; py < region.height; py += 1) {
    for (let px = 0; px < region.width; px += 1) {
      const bx = region.x + px;
      const by = region.y + py;
      const ax = bx + shift.dx;
      const ay = by + shift.dy;
      const idx = (diff.width * by + bx) << 2;

      if (
        ax < 0 ||
        ay < 0 ||
        ax >= expected.width ||
        ay >= expected.height ||
        bx < 0 ||
        by < 0 ||
        bx >= received.width ||
        by >= received.height
      ) {
        continue;
      }

      if (
        !isComparablePixel(
          expected,
          received,
          ax,
          ay,
          bx,
          by,
          region.compareMode,
          inkThreshold,
        )
      ) {
        continue;
      }

      if (colorDelta(expected, received, ax, ay, bx, by, threshold)) {
        diff.data[idx] = 255;
        diff.data[idx + 1] = 0;
        diff.data[idx + 2] = 0;
        diff.data[idx + 3] = 255;
      }
    }
  }
};

export const comparePngBuffers = (
  baseline: Buffer,
  actual: Buffer,
  threshold = 0.1,
): CompareImagesResult => {
  const expected = PNG.sync.read(baseline);
  const received = PNG.sync.read(actual);

  if (expected.width !== received.width || expected.height !== received.height) {
    throw new Error(
      `Image size mismatch: baseline ${expected.width}x${expected.height}, actual ${received.width}x${received.height}`,
    );
  }

  const { width, height } = expected;
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(
    expected.data,
    received.data,
    diff.data,
    width,
    height,
    { threshold },
  );

  return {
    diffPixels,
    totalPixels: width * height,
    diffRatio: diffPixels / (width * height),
    width,
    height,
    diffPng: PNG.sync.write(diff),
  };
};

export const compareFigmaRegions = (
  baseline: Buffer,
  actual: Buffer,
  regions: FigmaComparisonRegion[],
  options: CompareOptions = {},
): CompareFigmaRegionsResult => {
  const threshold = options.threshold ?? 0.1;
  const maxShift = options.maxShift ?? 1;
  const inkThreshold = options.inkThreshold ?? INK_CUTOFF;
  const perRegionMaxDiffRatio = options.perRegionMaxDiffRatio ?? 0.05;

  const expected = PNG.sync.read(baseline);
  const received = PNG.sync.read(actual);

  if (expected.width !== received.width || expected.height !== received.height) {
    throw new Error(
      `Image size mismatch: baseline ${expected.width}x${expected.height}, actual ${received.width}x${received.height}`,
    );
  }

  const { width, height } = expected;
  const full = comparePngBuffers(baseline, actual, threshold);
  const mask = new PNG({ width, height });
  const maskedDiff = new PNG({ width, height });

  let maskedDiffPixels = 0;
  let maskedComparablePixels = 0;
  let shiftedRegionCount = 0;
  const shiftCounts = new Map<string, number>();
  const regionResults: RegionCompareResult[] = [];

  regions.forEach((region) => {
    paintRegionMask(mask, region, [80, 120, 255, 48]);

    const result = compareRegion(
      expected,
      received,
      region,
      maxShift,
      threshold,
      inkThreshold,
    );

    const { diffPixels, comparablePixels, shift, label, diffRatio, compareMode } =
      result;
    regionResults.push(result);

    const shiftKey = `${shift.dx},${shift.dy}`;
    shiftCounts.set(shiftKey, (shiftCounts.get(shiftKey) ?? 0) + 1);

    if (shift.dx !== 0 || shift.dy !== 0) {
      shiftedRegionCount += 1;
    }

    maskedDiffPixels += diffPixels;
    maskedComparablePixels += comparablePixels;
    paintRegionDiff(
      expected,
      received,
      maskedDiff,
      region,
      shift,
      threshold,
      inkThreshold,
    );
  });

  const regionReports: FigmaRegionReport[] = regionResults.map((result, index) => {
    const region = regions[index];
    const diffPercent = Number((result.diffRatio * 100).toFixed(2));
    return {
      ...region,
      diffPixels: result.diffPixels,
      comparablePixels: result.comparablePixels,
      diffRatio: result.diffRatio,
      diffPercent,
      passed: result.diffRatio <= perRegionMaxDiffRatio,
      shift: result.shift,
    };
  });

  const regionsSorted = [...regionReports].sort(
    (left, right) => right.diffRatio - left.diffRatio,
  );
  const failedRegions = regionsSorted.filter((region) => !region.passed);

  const dominantShiftEntry = [...shiftCounts.entries()].sort(
    (left, right) => right[1] - left[1],
  )[0];
  const [dominantShiftKey, dominantShiftCount] = dominantShiftEntry ?? ["0,0", 0];
  const [dx, dy] = dominantShiftKey.split(",").map(Number);

  return {
    ...full,
    diffPng: PNG.sync.write(maskedDiff),
    maskPng: PNG.sync.write(mask),
    maskedDiffPixels,
    maskedComparablePixels,
    maskedDiffRatio:
      maskedComparablePixels === 0
        ? 0
        : maskedDiffPixels / maskedComparablePixels,
    regionCount: regions.length,
    shiftedRegionCount,
    fullDiffRatio: full.diffRatio,
    dominantShift: { dx, dy, regionCount: dominantShiftCount },
    perRegionMaxDiffRatio,
    regions: regionsSorted,
    failedRegions,
  };
};

const iconRegionToFigmaRegion = (
  region: IconComparisonRegion,
): FigmaComparisonRegion => ({
  x: region.x,
  y: region.y,
  width: region.size,
  height: region.size,
  label: region.label,
  compareMode: "ink",
});

export const compareIconRegions = (
  baseline: Buffer,
  actual: Buffer,
  regions: IconComparisonRegion[],
  options: CompareOptions = {},
): CompareIconsResult => {
  const figmaRegions = regions.map(iconRegionToFigmaRegion);
  const result = compareFigmaRegions(baseline, actual, figmaRegions, options);

  const iconReports: IconRegionReport[] = result.regions.map((region, index) => ({
    ...regions.find((entry) => entry.label === region.label) ?? regions[index],
    diffPixels: region.diffPixels,
    inkPixels: region.comparablePixels,
    diffRatio: region.diffRatio,
    diffPercent: region.diffPercent,
    passed: region.passed,
    shift: region.shift,
  }));

  const failedRegions = iconReports.filter((region) => !region.passed);

  return {
    diffPixels: result.diffPixels,
    totalPixels: result.totalPixels,
    diffRatio: result.diffRatio,
    width: result.width,
    height: result.height,
    diffPng: result.diffPng,
    maskedDiffPixels: result.maskedDiffPixels,
    maskedTotalPixels: result.maskedComparablePixels,
    maskedDiffRatio: result.maskedDiffRatio,
    regionCount: result.regionCount,
    shiftedRegionCount: result.shiftedRegionCount,
    fullDiffRatio: result.fullDiffRatio,
    maskPng: result.maskPng,
    dominantShift: result.dominantShift,
    perRegionMaxDiffRatio: result.perRegionMaxDiffRatio,
    regions: iconReports,
    failedRegions,
  };
};

export const formatDiffSummary = (result: CompareImagesResult) =>
  `${(result.diffRatio * 100).toFixed(2)}% (${result.diffPixels.toLocaleString()}/${result.totalPixels.toLocaleString()} pixels)`;

export const formatMaskedDiffSummary = (
  result: CompareFigmaRegionsResult | CompareIconsResult,
) => {
  const comparable =
    "maskedComparablePixels" in result
      ? result.maskedComparablePixels
      : result.maskedTotalPixels;

  return `${(result.maskedDiffRatio * 100).toFixed(2)}% (${result.maskedDiffPixels.toLocaleString()}/${comparable.toLocaleString()} masked pixels, ${result.regionCount} regions)`;
};
