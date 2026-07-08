import {
  FIGMA_SIDEBAR_LAYOUTS_FRAMES,
  type SidebarLayoutsFrameSlot,
} from "../../../src/stories/canvases/figma-sidebar-layouts-layout";
import type { FigmaComparisonRegion } from "./compare-images";

const slotLabel = (
  slot: SidebarLayoutsFrameSlot,
  frameIndex: number,
  slotIndex: number,
): string => {
  if (slot.kind === "switcher") {
    const expanded = slot.expanded ? "expanded" : "collapsed";
    return `switcher-${slot.chief}-${expanded}@${frameIndex}:${slotIndex}`;
  }

  const activity = slot.activity ? "activity" : "no-activity";
  const ships = slot.ships ? "ships" : "no-ships";
  const collapsed = slot.collapsed ? "collapsed" : "expanded";
  return `sidebarLayout-${slot.chief}-${activity}-${ships}-${collapsed}@${frameIndex}:${slotIndex}`;
};

const toRegion = (
  frameIndex: number,
  slotIndex: number,
  slot: SidebarLayoutsFrameSlot,
  frameX: number,
  frameY: number,
): FigmaComparisonRegion => ({
  x: frameX + slot.x,
  y: frameY + slot.y,
  width: slot.width,
  height: slot.height,
  label: slotLabel(slot, frameIndex, slotIndex),
  compareMode: "box",
});

/** Full switcher + sidebar layout symbols in the cropped 1368×2464 grid. */
export const SIDEBAR_LAYOUTS_COMPARISON_REGIONS: FigmaComparisonRegion[] =
  FIGMA_SIDEBAR_LAYOUTS_FRAMES.flatMap((frame, frameIndex) =>
    frame.slots.map((slot, slotIndex) =>
      toRegion(frameIndex, slotIndex, slot, frame.x, frame.y),
    ),
  );

export const SIDEBAR_LAYOUTS_COMPARE_THRESHOLD = 0.1;

export const SIDEBAR_LAYOUTS_MAX_PER_REGION_DIFF_RATIO = 0.05;
