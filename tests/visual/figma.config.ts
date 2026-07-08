/** Figma source for visual regression — AskChief Rebranded Components file */

import {
  FIGMA_ICONS_CONTENT,
  FIGMA_ICONS_GRID_HEIGHT,
  FIGMA_ICONS_GRID_TOP,
} from "../../src/stories/canvases/figma-icons-layout";
import { FIGMA_SIDEBAR_CONTENT } from "../../src/stories/canvases/figma-sidebar-layout";
import { FIGMA_SIDEBAR_LAYOUTS_CONTENT } from "../../src/stories/canvases/figma-sidebar-layouts-layout";

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

/** Sidebar subcomponents page (`12:1258`) — crop page Title, compare full Content (no in-content top exclusion unlike icons) */
export const FIGMA_SIDEBAR_PAGE_NODE_ID = "12:1258";
export const FIGMA_SIDEBAR_GRID_CROP = {
  x: 32,
  y: 188,
  width: FIGMA_SIDEBAR_CONTENT.width,
  height: FIGMA_SIDEBAR_CONTENT.height,
} as const;

export const SIDEBAR_STORY = {
  id: "components-sidebar--canvas",
  width: 464,
} as const;

export const FIGMA_SIDEBAR_BASELINE_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-grid.png`;
export const FIGMA_SIDEBAR_BASELINE_META = `${FIGMA_BASELINE_DIR}/sidebar-grid.meta.json`;
export const FIGMA_SIDEBAR_ACTUAL_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-grid-actual.png`;
export const FIGMA_SIDEBAR_DIFF_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-grid-diff.png`;
export const FIGMA_SIDEBAR_MASK_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-grid-mask.png`;
export const FIGMA_SIDEBAR_REPORT_JSON = `${FIGMA_BASELINE_DIR}/sidebar-grid-report.json`;
export const FIGMA_SIDEBAR_FAILURES_JSON = `${FIGMA_BASELINE_DIR}/sidebar-grid-failures.json`;

/** Sidebar layouts page (`14:841`) — crop page Title, compare full Content */
export const FIGMA_SIDEBAR_LAYOUTS_PAGE_NODE_ID = "14:841";
export const FIGMA_SIDEBAR_LAYOUTS_GRID_CROP = {
  x: 32,
  y: 188,
  width: FIGMA_SIDEBAR_LAYOUTS_CONTENT.width,
  height: FIGMA_SIDEBAR_LAYOUTS_CONTENT.height,
} as const;

export const SIDEBAR_LAYOUTS_STORY = {
  id: "components-sidebar-layouts--canvas",
  width: 1432,
} as const;

export const FIGMA_SIDEBAR_LAYOUTS_BASELINE_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-layouts-grid.png`;
export const FIGMA_SIDEBAR_LAYOUTS_BASELINE_META = `${FIGMA_BASELINE_DIR}/sidebar-layouts-grid.meta.json`;
export const FIGMA_SIDEBAR_LAYOUTS_ACTUAL_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-layouts-grid-actual.png`;
export const FIGMA_SIDEBAR_LAYOUTS_DIFF_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-layouts-grid-diff.png`;
export const FIGMA_SIDEBAR_LAYOUTS_MASK_IMAGE = `${FIGMA_BASELINE_DIR}/sidebar-layouts-grid-mask.png`;
export const FIGMA_SIDEBAR_LAYOUTS_REPORT_JSON = `${FIGMA_BASELINE_DIR}/sidebar-layouts-grid-report.json`;
export const FIGMA_SIDEBAR_LAYOUTS_FAILURES_JSON = `${FIGMA_BASELINE_DIR}/sidebar-layouts-grid-failures.json`;
