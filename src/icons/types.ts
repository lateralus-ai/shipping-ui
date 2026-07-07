export type IconSize = "large" | "small" | "xs";

export const ICON_BOX: Record<IconSize, number> = {
  large: 24,
  small: 16,
  xs: 12,
};

export type IconProps = {
  size?: IconSize;
  filled?: boolean;
  variant?: string;
  className?: string;
};

export type ChevronDirection = "left" | "right" | "up" | "down" | "upDown";

export type ArrowDirection = "left" | "right";
