import {
  FIGMA_SIDEBAR_FRAMES,
  type SidebarSubcomponentSlot,
} from "../../../src/stories/canvases/figma-sidebar-layout";
import type { FigmaComparisonRegion } from "./compare-images";

const slotLabel = (
  slot: SidebarSubcomponentSlot,
  frameName: string,
  slotIndex: number,
  frameIndex: number,
): string => {
  if (slot.kind === "newChat") {
    const collapsed = slot.collapsed ? "collapsed" : "expanded";
    return `newChat-${slot.state ?? "idle"}-${collapsed}@${frameIndex}:${slotIndex}`;
  }

  if (slot.kind === "indicator") {
    return `indicator-${slot.chief}@${frameIndex}:${slotIndex}`;
  }

  if (slot.kind === "sidebarLink") {
    const collapsed = slot.collapsed ? "collapsed" : "expanded";
    return `sidebarLink-${slot.state ?? "idle"}-${collapsed}@${frameIndex}:${slotIndex}`;
  }

  if (slot.kind === "sidebarHeading") {
    const collapsed = slot.collapsed ? "collapsed" : "expanded";
    return `sidebarHeading-${slot.state ?? "idle"}-${collapsed}@${frameIndex}:${slotIndex}`;
  }

  if (slot.kind === "sidebarEntry") {
    const menu = slot.showMenu ? "-menu" : "";
    return `sidebarEntry-${slot.state ?? "idle"}${menu}@${frameIndex}:${slotIndex}`;
  }

  if (slot.kind === "ships") {
    return `ships-${slot.expanded ? "expanded" : "collapsed"}@${frameIndex}:${slotIndex}`;
  }

  if (slot.kind === "activity") {
    const empty = slot.empty ? "empty" : "filled";
    return `activity-${slot.chief}-${empty}@${frameIndex}:${slotIndex}`;
  }

  if (slot.kind === "account") {
    const collapsed = slot.collapsed ? "collapsed" : "expanded";
    return `account-${slot.state ?? "idle"}-${collapsed}@${frameIndex}:${slotIndex}`;
  }

  return `${frameName}@${frameIndex}:${slotIndex}`;
};

const toRegion = (
  frameIndex: number,
  frameName: string,
  slotIndex: number,
  slot: SidebarSubcomponentSlot,
  frameX: number,
  frameY: number,
): FigmaComparisonRegion => ({
  x: frameX + slot.x,
  y: frameY + slot.y,
  width: slot.width,
  height: slot.height,
  label: slotLabel(slot, frameName, slotIndex, frameIndex),
  compareMode: "box",
});

/** Component slot boxes at Figma layout coordinates in the cropped 400×2824 grid. */
export const SIDEBAR_COMPARISON_REGIONS: FigmaComparisonRegion[] =
  FIGMA_SIDEBAR_FRAMES.flatMap((frame, frameIndex) =>
    frame.slots.map((slot, slotIndex) =>
      toRegion(frameIndex, frame.name, slotIndex, slot, frame.x, frame.y),
    ),
  );

export const SIDEBAR_COMPARE_THRESHOLD = 0.1;

export const SIDEBAR_MAX_PER_REGION_DIFF_RATIO = 0.05;
