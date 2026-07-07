/** Figma source for icon visual regression — AskChief Rebranded Components file */

import {
  FIGMA_ICONS_CONTENT,
  FIGMA_ICONS_GRID_HEIGHT,
  FIGMA_ICONS_GRID_TOP,
} from "../../src/stories/canvases/figma-icons-layout";

export const FIGMA_FILE_KEY = "2Up8R8hZw2eivY9crqf5dz";

/** Icons > Content frame (710×1833) */
export const FIGMA_ICONS_CONTENT_NODE_ID = "12:1251";

/** Crop region matching Storybook `[data-figma-icons-grid]` (icon frames only, no cursors) */
export const FIGMA_ICONS_GRID_CROP = {
  x: 0,
  y: FIGMA_ICONS_GRID_TOP,
  width: FIGMA_ICONS_CONTENT.width,
  height: FIGMA_ICONS_GRID_HEIGHT,
} as const;

export const ICONS_STORY = {
  id: "components-icons--canvas",
  width: 774,
} as const;

export const FIGMA_BASELINE_DIR = "tests/visual/figma-baselines";
export const FIGMA_ICONS_BASELINE_IMAGE = `${FIGMA_BASELINE_DIR}/icons-grid.png`;
export const FIGMA_ICONS_BASELINE_META = `${FIGMA_BASELINE_DIR}/icons-grid.meta.json`;
export const FIGMA_ICONS_ACTUAL_IMAGE = `${FIGMA_BASELINE_DIR}/icons-grid-actual.png`;
export const FIGMA_ICONS_DIFF_IMAGE = `${FIGMA_BASELINE_DIR}/icons-grid-diff.png`;
export const FIGMA_ICONS_MASK_IMAGE = `${FIGMA_BASELINE_DIR}/icons-grid-mask.png`;
export const FIGMA_ICONS_REPORT_JSON = `${FIGMA_BASELINE_DIR}/icons-grid-report.json`;
export const FIGMA_ICONS_FAILURES_JSON = `${FIGMA_BASELINE_DIR}/icons-grid-failures.json`;
