import type { Chief } from "../../patterns/Sidebar/Switcher";

/** Figma Sidebar Layouts > Content (`14:840`) */
export const FIGMA_SIDEBAR_LAYOUTS_CONTENT = {
  width: 1368,
  height: 2464,
} as const;

export const FIGMA_SIDEBAR_LAYOUTS_PAGE_WIDTH = 1432;
/** Page Title height offset — used only when cropping page screenshots to Content in baseline script. */
export const FIGMA_SIDEBAR_LAYOUTS_PAGE_TOP = 188;

export type SwitcherSlot = {
  kind: "switcher";
  chief: Chief;
  expanded: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SidebarLayoutSlot = {
  kind: "sidebarLayout";
  chief: Chief;
  activity: boolean;
  ships: boolean;
  collapsed: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SidebarLayoutsFrameSlot = SwitcherSlot | SidebarLayoutSlot;

export type SidebarLayoutsFrame = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  slots: SidebarLayoutsFrameSlot[];
};

export const FIGMA_SIDEBAR_EXPANDED_WIDTH = 280;
export const FIGMA_SIDEBAR_COLLAPSED_WIDTH = 56;
export const FIGMA_SIDEBAR_LAYOUT_HEIGHT = 1024;

/** Slot positions relative to each dashed frame — from Figma metadata `14:840`. */
export const FIGMA_SIDEBAR_LAYOUTS_FRAMES: SidebarLayoutsFrame[] = [
  {
    name: "Switcher",
    x: 24,
    y: 24,
    width: 296,
    height: 272,
    slots: [
      { kind: "switcher", chief: "technical", expanded: true, x: 24, y: 24, width: 248, height: 44 },
      { kind: "switcher", chief: "compliance", expanded: true, x: 24, y: 92, width: 248, height: 44 },
      { kind: "switcher", chief: "technical", expanded: false, x: 24, y: 160, width: 40, height: 32 },
      { kind: "switcher", chief: "compliance", expanded: false, x: 24, y: 216, width: 40, height: 32 },
    ],
  },
  {
    name: "Sidebar",
    x: 24,
    y: 320,
    width: 1320,
    height: 2120,
    slots: [
      { kind: "sidebarLayout", chief: "technical", activity: false, ships: false, collapsed: false, x: 24, y: 24, width: 280, height: 1024 },
      { kind: "sidebarLayout", chief: "technical", activity: false, ships: false, collapsed: true, x: 328, y: 24, width: 56, height: 1024 },
      { kind: "sidebarLayout", chief: "technical", activity: true, ships: false, collapsed: false, x: 408, y: 24, width: 280, height: 1024 },
      { kind: "sidebarLayout", chief: "technical", activity: true, ships: true, collapsed: false, x: 712, y: 24, width: 280, height: 1024 },
      { kind: "sidebarLayout", chief: "technical", activity: false, ships: true, collapsed: false, x: 1016, y: 24, width: 280, height: 1024 },
      { kind: "sidebarLayout", chief: "compliance", activity: false, ships: false, collapsed: false, x: 24, y: 1072, width: 280, height: 1024 },
      { kind: "sidebarLayout", chief: "compliance", activity: false, ships: false, collapsed: true, x: 328, y: 1072, width: 56, height: 1024 },
      { kind: "sidebarLayout", chief: "compliance", activity: true, ships: false, collapsed: false, x: 408, y: 1072, width: 280, height: 1024 },
      { kind: "sidebarLayout", chief: "compliance", activity: true, ships: true, collapsed: false, x: 712, y: 1072, width: 280, height: 1024 },
      { kind: "sidebarLayout", chief: "compliance", activity: false, ships: true, collapsed: false, x: 1016, y: 1072, width: 280, height: 1024 },
    ],
  },
];
