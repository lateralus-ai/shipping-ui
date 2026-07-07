import { type ReactNode } from "react";
import { cn } from "../utils/cn";

type BadgeColor = "blue" | "green" | "red" | "orange" | "purple" | "grey";
type BadgeType = "label" | "icon";

export type BadgeProps = {
  color: BadgeColor;
  type?: BadgeType;
  children: ReactNode;
  className?: string;
};

const colorStyles: Record<BadgeColor, string> = {
  blue: "bg-meta-blue text-meta-on-blue",
  green: "bg-meta-green text-meta-on-green",
  red: "bg-meta-red text-meta-on-red",
  orange: "bg-meta-orange text-meta-on-orange",
  purple: "bg-meta-purple text-meta-on-purple",
  grey: "bg-grey-100 text-display-on-light-secondary",
};

export const Badge = ({ color, type = "label", children, className }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center justify-center text-footnote-em",
      type === "label" ? "rounded-control px-2 py-0.5" : "size-6 rounded-full",
      colorStyles[color],
      className,
    )}
  >
    {children}
  </span>
);
