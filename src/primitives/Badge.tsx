import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export type BadgeColor = "blue" | "green" | "red" | "orange" | "purple" | "grey";
export type BadgeType = "label" | "icon";

export type BadgeProps = {
  color: BadgeColor;
  /** `label` grows with content (pill). `icon` is a compact circle for a glyph/digit. */
  type?: BadgeType;
  children: ReactNode;
  className?: string;
};

const colorStyles: Record<BadgeColor, string> = {
  blue: "bg-meta-blue text-meta-onBlue",
  green: "bg-meta-green text-meta-onGreen",
  red: "bg-meta-red text-meta-onRed",
  orange: "bg-meta-orange text-meta-onOrange",
  purple: "bg-meta-purple text-meta-onPurple",
  grey: "bg-grey-100 text-display-on-light-secondary",
};

/**
 * Figma Badge (4365:74363) — padding + rounded-full; no fixed width on labels.
 */
export const Badge = ({
  color,
  type = "label",
  children,
  className,
}: BadgeProps) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center justify-center text-footnote-em leading-none",
      type === "label" && "rounded-full px-1.5 py-0.5",
      type === "icon" && "size-5 rounded-full [&>svg]:size-3",
      colorStyles[color],
      className,
    )}
  >
    {children}
  </span>
);
