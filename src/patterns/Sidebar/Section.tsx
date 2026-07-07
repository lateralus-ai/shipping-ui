import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type SectionState = "idle" | "active";

export type SectionProps = {
  state?: SectionState;
  collapsed?: boolean;
  icon?: ReactNode;
  label: string;
  className?: string;
};

const stateStyles: Record<SectionState, string> = {
  idle: "text-display-on-light-secondary hover:bg-background-hover hover:text-display-on-light-primary",
  active: "bg-background-selected text-display-on-light-primary",
};

export const Section = ({
  state = "idle",
  collapsed = false,
  icon,
  label,
  className,
}: SectionProps) => (
  <button
    type="button"
    className={cn(
      "group flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left text-caption-1-em transition-colors",
      stateStyles[state],
      className,
    )}
    data-collapsed={collapsed}
    data-state={state}
    aria-current={state === "active" ? "page" : undefined}
  >
    {icon && <span className="shrink-0 [&>svg]:size-5">{icon}</span>}
    <span className="truncate group-data-[collapsed=true]:sr-only">{label}</span>
  </button>
);
