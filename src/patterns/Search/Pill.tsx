import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type PillState = "idle" | "active";
export type PillSize = "large" | "small";

export type PillProps = {
  state?: PillState;
  size?: PillSize;
  children: ReactNode;
  className?: string;
};

const stateStyles: Record<PillState, string> = {
  idle: "border-divider-primary bg-background-primary text-display-on-light-secondary hover:bg-background-hover",
  active: "border-blue-300 bg-blue-50 text-blue-700",
};

const sizeStyles: Record<PillSize, string> = {
  large: "px-4 py-2 text-caption-1",
  small: "px-3 py-1 text-caption-2",
};

export const Pill = ({
  state = "idle",
  size = "large",
  children,
  className,
}: PillProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex items-center rounded-full border transition-colors",
      stateStyles[state],
      sizeStyles[size],
      className,
    )}
    data-state={state}
    data-size={size}
    aria-pressed={state === "active"}
  >
    {children}
  </button>
);
