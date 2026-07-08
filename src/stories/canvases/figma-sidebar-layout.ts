import type { Chief } from "../../patterns/Sidebar/Switcher";

/** Figma Sidebar subcomponents > Content (`12:1255`) */
export const FIGMA_SIDEBAR_CONTENT = {
  width: 400,
  height: 2824,
  padding: 24,
} as const;

export const FIGMA_SIDEBAR_PAGE_WIDTH = 464;
/** Page Title height offset — used only when cropping page screenshots to Content in baseline script. */
export const FIGMA_SIDEBAR_PAGE_TOP = 188;

export type NewChatSlot = {
  kind: "newChat";
  state?: "idle" | "hover";
  collapsed?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type IndicatorSlot = {
  kind: "indicator";
  chief: Chief;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SidebarLinkSlot = {
  kind: "sidebarLink";
  state?: "idle" | "hover" | "active";
  collapsed?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SidebarHeadingSlot = {
  kind: "sidebarHeading";
  state?: "idle" | "hover";
  collapsed?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SidebarEntrySlot = {
  kind: "sidebarEntry";
  state?: "idle" | "hover" | "selected";
  showMenu?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ShipsSlot = {
  kind: "ships";
  expanded?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ActivitySlot = {
  kind: "activity";
  chief: Chief;
  empty?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AccountSlot = {
  kind: "account";
  state?: "idle" | "hover";
  collapsed?: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SidebarSubcomponentSlot =
  | NewChatSlot
  | IndicatorSlot
  | SidebarLinkSlot
  | SidebarHeadingSlot
  | SidebarEntrySlot
  | ShipsSlot
  | ActivitySlot
  | AccountSlot;

export type SidebarSubcomponentFrame = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  slots: SidebarSubcomponentSlot[];
};

/** Slot positions are relative to each dashed frame — from Figma metadata `12:1255`. */
export const FIGMA_SIDEBAR_FRAMES: SidebarSubcomponentFrame[] = [
  {
    name: "New chat",
    x: 24,
    y: 24,
    width: 352,
    height: 280,
    slots: [
      { kind: "newChat", state: "idle", collapsed: false, x: 24, y: 24, width: 304, height: 40 },
      { kind: "newChat", state: "hover", collapsed: false, x: 24, y: 88, width: 304, height: 40 },
      { kind: "newChat", state: "idle", collapsed: true, x: 24, y: 152, width: 40, height: 40 },
      { kind: "newChat", state: "hover", collapsed: true, x: 24, y: 216, width: 40, height: 40 },
    ],
  },
  {
    name: "Indicator",
    x: 24,
    y: 328,
    width: 120,
    height: 72,
    slots: [
      { kind: "indicator", chief: "technical", x: 24, y: 24, width: 24, height: 24 },
      { kind: "indicator", chief: "compliance", x: 72, y: 24, width: 24, height: 24 },
    ],
  },
  {
    name: "Section",
    x: 24,
    y: 424,
    width: 352,
    height: 372,
    slots: [
      { kind: "sidebarLink", state: "idle", collapsed: false, x: 24, y: 24, width: 304, height: 36 },
      { kind: "sidebarLink", state: "hover", collapsed: false, x: 24, y: 84, width: 304, height: 36 },
      { kind: "sidebarLink", state: "active", collapsed: false, x: 24, y: 144, width: 304, height: 36 },
      { kind: "sidebarLink", state: "idle", collapsed: true, x: 24, y: 204, width: 32, height: 32 },
      { kind: "sidebarLink", state: "hover", collapsed: true, x: 24, y: 260, width: 32, height: 32 },
      { kind: "sidebarLink", state: "active", collapsed: true, x: 24, y: 316, width: 32, height: 32 },
    ],
  },
  {
    name: "Heading",
    x: 24,
    y: 820,
    width: 352,
    height: 232,
    slots: [
      { kind: "sidebarHeading", state: "idle", collapsed: true, x: 24, y: 24, width: 304, height: 28 },
      { kind: "sidebarHeading", state: "idle", collapsed: false, x: 24, y: 76, width: 304, height: 28 },
      { kind: "sidebarHeading", state: "hover", collapsed: true, x: 24, y: 128, width: 304, height: 28 },
      { kind: "sidebarHeading", state: "hover", collapsed: false, x: 24, y: 180, width: 304, height: 28 },
    ],
  },
  {
    name: "Entry",
    x: 24,
    y: 1076,
    width: 352,
    height: 204,
    slots: [
      { kind: "sidebarEntry", state: "idle", x: 24, y: 24, width: 304, height: 36 },
      { kind: "sidebarEntry", state: "hover", showMenu: true, x: 24, y: 84, width: 304, height: 36 },
      { kind: "sidebarEntry", state: "selected", x: 24, y: 144, width: 304, height: 36 },
    ],
  },
  {
    name: "Ships",
    x: 24,
    y: 1304,
    width: 312,
    height: 312,
    slots: [
      { kind: "ships", expanded: false, x: 24, y: 24, width: 264, height: 40 },
      { kind: "ships", expanded: true, x: 24, y: 88, width: 264, height: 200 },
    ],
  },
  {
    name: "Activity",
    x: 24,
    y: 1640,
    width: 296,
    height: 924,
    slots: [
      { kind: "activity", chief: "technical", empty: true, x: 24, y: 24, width: 248, height: 36 },
      { kind: "activity", chief: "technical", empty: false, x: 24, y: 84, width: 248, height: 396 },
      { kind: "activity", chief: "compliance", empty: false, x: 24, y: 504, width: 248, height: 396 },
    ],
  },
  {
    name: "Account",
    x: 24,
    y: 2588,
    width: 352,
    height: 212,
    slots: [
      { kind: "account", state: "idle", collapsed: false, x: 24, y: 24, width: 304, height: 36 },
      { kind: "account", state: "idle", collapsed: true, x: 24, y: 84, width: 40, height: 40 },
      { kind: "account", state: "hover", collapsed: true, x: 24, y: 148, width: 40, height: 40 },
    ],
  },
];
