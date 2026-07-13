/** Figma Buttons > Content > Button frame — 414×312, slots 106×40 */

export const FIGMA_BUTTONS_GRID = {
  width: 414,
  height: 312,
} as const;

export type ButtonVisualState = "idle" | "hover" | "disabled";

export type ButtonGridSlot = {
  hierarchy:
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "destructive";
  visualState: ButtonVisualState;
  x: number;
  y: number;
  width: number;
  height: number;
};

const BUTTON_WIDTH = 106;
const BUTTON_HEIGHT = 40;
const COLUMN_X = [24, 154, 284] as const;
const ROW_Y = [24, 80, 136, 192, 248] as const;

const hierarchies = [
  "primary",
  "secondary",
  "tertiary",
  "quaternary",
  "destructive",
] as const;

const visualStates: ButtonVisualState[] = ["idle", "hover", "disabled"];

export const FIGMA_BUTTON_SLOTS: ButtonGridSlot[] = hierarchies.flatMap(
  (hierarchy, rowIndex) =>
    visualStates.map((visualState, columnIndex) => ({
      hierarchy,
      visualState,
      x: COLUMN_X[columnIndex],
      y: ROW_Y[rowIndex],
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
    })),
);

export type ButtonVariantSlot = {
  hierarchy: (typeof hierarchies)[number];
  variant: "noIcon" | "noDropdown";
  x: number;
  y: number;
};

const VARIANT_COLUMN_X = [414, 544] as const;

/** Extra canvas slots — excluded from `data-figma-buttons-grid` visual clip */
export const BUTTON_VARIANT_SLOTS: ButtonVariantSlot[] = hierarchies.flatMap(
  (hierarchy, rowIndex) => [
    {
      hierarchy,
      variant: "noIcon" as const,
      x: VARIANT_COLUMN_X[0],
      y: ROW_Y[rowIndex],
    },
    {
      hierarchy,
      variant: "noDropdown" as const,
      x: VARIANT_COLUMN_X[1],
      y: ROW_Y[rowIndex],
    },
  ],
);

export const FIGMA_BUTTONS_CANVAS = {
  figmaGridWidth: FIGMA_BUTTONS_GRID.width,
  figmaGridHeight: FIGMA_BUTTONS_GRID.height,
  width: VARIANT_COLUMN_X[1] + BUTTON_WIDTH + 24,
  height: FIGMA_BUTTONS_GRID.height,
} as const;
