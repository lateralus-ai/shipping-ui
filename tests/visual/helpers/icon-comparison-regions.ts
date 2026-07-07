import {
  FIGMA_ICON_FRAMES,
  FIGMA_ICONS_GRID_TOP,
  type IconFrameSlot,
} from "../../../src/stories/canvases/figma-icons-layout";
import type { IconSize } from "../../../src/icons/types";
import { ICON_BOX } from "../../../src/icons/types";

export type IconComparisonRegion = {
  x: number;
  y: number;
  size: number;
  label: string;
  frameIndex: number;
  slotIndex: number;
  kind: IconFrameSlot["kind"];
  iconName?: string;
  iconSize?: IconSize;
  filled?: boolean;
  direction?: string;
};

const slotSize = (slot: IconFrameSlot): number => {
  if (slot.kind === "icon") return ICON_BOX[slot.size];
  if (slot.kind === "arrow") return ICON_BOX.large;
  return ICON_BOX.small;
};

const slotLabel = (slot: IconFrameSlot, slotIndex: number, frameIndex: number): string => {
  if (slot.kind === "icon") {
    const filled = slot.filled ? "-filled" : "";
    return `${slot.name}-${slot.size}${filled}@${frameIndex}:${slotIndex}`;
  }
  return `${slot.kind}-${slot.direction}@${frameIndex}:${slotIndex}`;
};

const toRegion = (
  frameIndex: number,
  slotIndex: number,
  slot: IconFrameSlot,
  frameX: number,
  frameY: number,
): IconComparisonRegion => {
  const base = {
    x: frameX + slot.x,
    y: frameY + slot.y - FIGMA_ICONS_GRID_TOP,
    size: slotSize(slot),
    label: slotLabel(slot, slotIndex, frameIndex),
    frameIndex,
    slotIndex,
    kind: slot.kind,
  };

  if (slot.kind === "icon") {
    return { ...base, iconName: slot.name, iconSize: slot.size, filled: slot.filled };
  }

  if (slot.kind === "arrow") {
    return { ...base, direction: slot.direction };
  }

  return { ...base, direction: slot.direction };
};

/** Icon symbol boxes at Figma layout coordinates in the cropped grid (710×1536). */
export const ICON_COMPARISON_REGIONS: IconComparisonRegion[] =
  FIGMA_ICON_FRAMES.flatMap((frame, frameIndex) =>
    frame.slots.map((slot, slotIndex) =>
      toRegion(frameIndex, slotIndex, slot, frame.x, frame.y),
    ),
  );

export const ICON_COMPARE_THRESHOLD = 0.2;

export const MAX_PER_REGION_DIFF_RATIO = 0.05;
