import type { ArrowDirection, ChevronDirection, IconSize } from "../../icons/types";
import type { IconName } from "../../icons/Icon";

/** Figma Icons > Content area — 710×1833, 24px padding inside dashed frames */
export const FIGMA_ICONS_CONTENT = {
  width: 710,
  height: 1833,
  padding: 24,
} as const;

/** Icon symbol frames start below cursor sections in Figma Content */
export const FIGMA_ICONS_GRID_TOP = 297;
export const FIGMA_ICONS_GRID_HEIGHT =
  FIGMA_ICONS_CONTENT.height - FIGMA_ICONS_GRID_TOP;

/** Browser SVG rendering vs Figma export — nudge icons to match baseline alignment */
export const FIGMA_ICON_RENDER_OFFSET = { x: -1, y: -1 } as const;

type IconSlot = {
  kind: "icon";
  name: IconName;
  size: IconSize;
  filled?: boolean;
  variant?: string;
  x: number;
  y: number;
};

type ArrowSlot = {
  kind: "arrow";
  direction: ArrowDirection;
  x: number;
  y: number;
};

type ChevronSlot = {
  kind: "chevron";
  direction: ChevronDirection;
  x: number;
  y: number;
};

export type IconFrameSlot = IconSlot | ArrowSlot | ChevronSlot;

export type IconFrameLayout = {
  x: number;
  y: number;
  width: number;
  height: number;
  slots: IconFrameSlot[];
};

const L = (
  name: IconName,
  size: IconSize,
  x: number,
  y: number,
  filled?: boolean,
  variant?: string,
): IconSlot => ({
  kind: "icon",
  name,
  size,
  filled,
  variant,
  x,
  y,
});

const outlinePair = (name: IconName): IconSlot[] => [
  L(name, "large", 24, 24),
  L(name, "small", 72, 28),
];

const filledPair = (name: IconName): IconSlot[] => [
  L(name, "large", 24, 24),
  L(name, "large", 72, 24, true),
  L(name, "small", 120, 28),
  L(name, "small", 160, 28, true),
];

const smallOnly = (name: IconName): IconSlot[] => [L(name, "small", 24, 24)];

const largeOnly = (name: IconName): IconSlot[] => [L(name, "large", 24, 24)];

/**
 * Icon frames in Figma document order (top-to-bottom, left-to-right).
 * Cursors sections omitted per design spec.
 */
export const FIGMA_ICON_FRAMES: IconFrameLayout[] = [
  {
    x: 24,
    y: 297,
    width: 120,
    height: 72,
    slots: [
      { kind: "arrow", direction: "left", x: 24, y: 24 },
      { kind: "arrow", direction: "right", x: 72, y: 24 },
    ],
  },
  { x: 168, y: 297, width: 112, height: 72, slots: outlinePair("attachment") },
  {
    x: 304,
    y: 297,
    width: 224,
    height: 64,
    slots: [
      { kind: "chevron", direction: "right", x: 24, y: 24 },
      { kind: "chevron", direction: "left", x: 64, y: 24 },
      { kind: "chevron", direction: "down", x: 104, y: 24 },
      { kind: "chevron", direction: "up", x: 144, y: 24 },
      { kind: "chevron", direction: "upDown", x: 184, y: 24 },
    ],
  },
  {
    x: 24,
    y: 393,
    width: 272,
    height: 72,
    slots: [
      L("clear", "large", 24, 24),
      L("clear", "small", 72, 28),
      L("clear", "xs", 112, 30),
      L("clear", "large", 148, 24, true),
      L("clear", "small", 196, 28, true),
      L("clear", "xs", 236, 30, true),
    ],
  },
  { x: 320, y: 393, width: 112, height: 72, slots: outlinePair("microphone") },
  { x: 456, y: 393, width: 200, height: 72, slots: filledPair("add") },
  { x: 24, y: 489, width: 112, height: 72, slots: outlinePair("plus") },
  { x: 160, y: 489, width: 112, height: 72, slots: outlinePair("done") },
  { x: 296, y: 489, width: 112, height: 72, slots: outlinePair("minus") },
  { x: 432, y: 489, width: 200, height: 72, slots: filledPair("send") },
  { x: 24, y: 585, width: 112, height: 72, slots: outlinePair("search") },
  { x: 160, y: 585, width: 112, height: 72, slots: outlinePair("star") },
  { x: 296, y: 585, width: 112, height: 72, slots: outlinePair("heart") },
  { x: 432, y: 585, width: 112, height: 72, slots: outlinePair("analytics") },
  { x: 568, y: 585, width: 112, height: 72, slots: outlinePair("trash") },
  { x: 24, y: 681, width: 112, height: 72, slots: outlinePair("chat") },
  { x: 160, y: 681, width: 112, height: 72, slots: outlinePair("chatPro") },
  { x: 296, y: 681, width: 112, height: 72, slots: outlinePair("filters") },
  { x: 432, y: 681, width: 112, height: 72, slots: outlinePair("pen") },
  {
    x: 24,
    y: 777,
    width: 148,
    height: 72,
    slots: [
      L("tick", "large", 24, 24),
      L("tick", "small", 72, 28),
      L("tick", "xs", 112, 30),
    ],
  },
  { x: 196, y: 777, width: 112, height: 72, slots: outlinePair("document") },
  { x: 332, y: 777, width: 64, height: 64, slots: smallOnly("sparkles") },
  { x: 420, y: 777, width: 64, height: 64, slots: smallOnly("expand") },
  { x: 508, y: 777, width: 64, height: 64, slots: smallOnly("speaker") },
  { x: 596, y: 777, width: 64, height: 64, slots: smallOnly("copy") },
  { x: 24, y: 873, width: 64, height: 64, slots: smallOnly("date") },
  { x: 112, y: 873, width: 64, height: 64, slots: smallOnly("refresh") },
  { x: 200, y: 873, width: 112, height: 72, slots: outlinePair("activity") },
  { x: 336, y: 873, width: 72, height: 72, slots: largeOnly("menu") },
  { x: 432, y: 873, width: 112, height: 72, slots: outlinePair("invite") },
  { x: 568, y: 873, width: 72, height: 72, slots: largeOnly("report") },
  {
    x: 24,
    y: 969,
    width: 104,
    height: 64,
    slots: [
      L("sidebar", "small", 24, 24, undefined, "expanded"),
      L("sidebar", "small", 64, 24, undefined, "collapsed"),
    ],
  },
  { x: 152, y: 969, width: 112, height: 72, slots: outlinePair("download") },
  { x: 288, y: 969, width: 112, height: 72, slots: outlinePair("upload") },
  { x: 424, y: 969, width: 112, height: 72, slots: outlinePair("preview") },
  { x: 560, y: 969, width: 112, height: 72, slots: outlinePair("fixes") },
  { x: 24, y: 1065, width: 72, height: 72, slots: largeOnly("issues") },
  { x: 120, y: 1065, width: 112, height: 72, slots: outlinePair("more") },
  {
    x: 256,
    y: 1065,
    width: 160,
    height: 72,
    slots: [
      L("bulb", "large", 24, 24),
      L("bulb", "large", 72, 24, true),
      L("bulb", "small", 120, 28),
    ],
  },
  {
    x: 440,
    y: 1065,
    width: 200,
    height: 72,
    slots: [
      L("ship", "large", 24, 24),
      L("ship", "large", 72, 24, undefined, "smart"),
      L("ship", "small", 120, 28),
      L("ship", "small", 160, 28, undefined, "smart"),
    ],
  },
  { x: 24, y: 1161, width: 112, height: 72, slots: outlinePair("person") },
  { x: 160, y: 1161, width: 112, height: 72, slots: outlinePair("archive") },
  { x: 296, y: 1161, width: 112, height: 72, slots: outlinePair("logOut") },
  { x: 432, y: 1161, width: 112, height: 72, slots: outlinePair("settings") },
  { x: 568, y: 1161, width: 112, height: 72, slots: outlinePair("tasks") },
  {
    x: 24,
    y: 1257,
    width: 216,
    height: 72,
    slots: [
      L("workflow", "large", 24, 24, undefined, "preparation"),
      L("workflow", "large", 72, 24, undefined, "response"),
      L("workflow", "large", 120, 24, undefined, "technical"),
      L("workflow", "large", 168, 24, undefined, "inspection"),
    ],
  },
  {
    x: 264,
    y: 1257,
    width: 168,
    height: 72,
    slots: [
      L("form", "large", 24, 24, undefined, "risk"),
      L("form", "large", 72, 24, undefined, "accident"),
      L("form", "large", 120, 24, undefined, "rootCause"),
    ],
  },
  { x: 456, y: 1257, width: 72, height: 72, slots: largeOnly("actions") },
  {
    x: 552,
    y: 1257,
    width: 120,
    height: 72,
    slots: [
      L("approval", "large", 24, 24, undefined, "approved"),
      L("approval", "large", 72, 24, undefined, "partly"),
    ],
  },
  {
    x: 24,
    y: 1353,
    width: 208,
    height: 72,
    slots: [
      L("forms", "large", 24, 24, undefined, "pending"),
      L("forms", "large", 72, 24, undefined, "reviewed"),
      L("forms", "small", 120, 28, undefined, "reviewed"),
      L("forms", "large", 160, 24, undefined, "completed"),
    ],
  },
  { x: 256, y: 1353, width: 112, height: 72, slots: outlinePair("book") },
  { x: 392, y: 1353, width: 112, height: 72, slots: outlinePair("workflow") },
  { x: 528, y: 1353, width: 112, height: 72, slots: outlinePair("mention") },
  { x: 24, y: 1449, width: 112, height: 72, slots: outlinePair("critical") },
  { x: 160, y: 1449, width: 112, height: 72, slots: outlinePair("information") },
  { x: 296, y: 1449, width: 72, height: 72, slots: largeOnly("caution") },
  { x: 392, y: 1449, width: 112, height: 72, slots: outlinePair("folder") },
  { x: 528, y: 1449, width: 112, height: 72, slots: outlinePair("folderStarred") },
  { x: 24, y: 1545, width: 72, height: 72, slots: largeOnly("quality") },
  { x: 120, y: 1545, width: 72, height: 72, slots: largeOnly("location") },
  { x: 216, y: 1545, width: 112, height: 72, slots: outlinePair("users") },
  { x: 352, y: 1545, width: 112, height: 72, slots: outlinePair("undo") },
  { x: 488, y: 1545, width: 72, height: 72, slots: largeOnly("spinner") },
  { x: 584, y: 1545, width: 72, height: 72, slots: largeOnly("clock") },
  { x: 24, y: 1641, width: 72, height: 72, slots: largeOnly("gap") },
  { x: 120, y: 1641, width: 112, height: 72, slots: outlinePair("defectReport") },
  { x: 256, y: 1641, width: 112, height: 72, slots: outlinePair("task") },
  {
    x: 392,
    y: 1641,
    width: 216,
    height: 72,
    slots: [
      L("file", "large", 24, 24, undefined, "csv"),
      L("file", "large", 72, 24, undefined, "doc"),
      L("file", "large", 120, 24, undefined, "pdf"),
      L("file", "large", 168, 24, undefined, "xls"),
    ],
  },
  {
    x: 24,
    y: 1737,
    width: 120,
    height: 72,
    slots: [
      L("reportActions", "large", 24, 24, undefined, "view"),
      L("reportActions", "large", 72, 24, undefined, "edit"),
    ],
  },
  {
    x: 168,
    y: 1737,
    width: 264,
    height: 72,
    slots: [
      L("checkbox", "large", 24, 24, undefined, "unselected"),
      L("checkbox", "large", 72, 24, undefined, "unselectedHover"),
      L("checkbox", "large", 120, 24, undefined, "selected"),
      L("checkbox", "large", 168, 24, undefined, "multi"),
      L("checkbox", "large", 216, 24, undefined, "selectedHover"),
    ],
  },
  {
    x: 456,
    y: 1737,
    width: 104,
    height: 64,
    slots: [
      L("status", "small", 24, 24, undefined, "open"),
      L("status", "small", 64, 24, undefined, "closed"),
    ],
  },
];
