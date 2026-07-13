import {
  FIGMA_BUTTON_SLOTS,
  FIGMA_BUTTONS_GRID,
} from "../../../src/stories/canvases/figma-buttons-layout";
import type { FigmaComparisonRegion } from "./compare-images";

/** Figma button symbol boxes — excludes `data-visual-test-only` extras on the canvas. */
export const BUTTONS_COMPARISON_REGIONS: FigmaComparisonRegion[] =
  FIGMA_BUTTON_SLOTS.map((slot) => ({
    x: slot.x,
    y: slot.y,
    width: slot.width,
    height: slot.height,
    label: `${slot.hierarchy}-${slot.visualState}@${slot.x}:${slot.y}`,
    compareMode: "box",
  }));

export const BUTTONS_GRID_CROP = FIGMA_BUTTONS_GRID;

export const BUTTONS_COMPARE_THRESHOLD = 0.1;

export const BUTTONS_MAX_PER_REGION_DIFF_RATIO = 0.05;
