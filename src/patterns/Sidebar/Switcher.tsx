import { Avatar } from "../../primitives";
import { ChevronIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type Chief = "technical" | "compliance";

export type SwitcherProps = {
  chief: Chief;
  expanded?: boolean;
  className?: string;
};

const chiefLabels: Record<Chief, string> = {
  technical: "Technical Chief",
  compliance: "Compliance Chief",
};

export const Switcher = ({ chief, expanded = true, className }: SwitcherProps) => (
  <button
    type="button"
    className={cn(
      "group flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left transition-colors hover:bg-background-hover",
      className,
    )}
    data-expanded={expanded}
    aria-label={`Switch chief: ${chiefLabels[chief]}`}
  >
    <Avatar chief={chief} size={32} />
    <span
      className={cn(
        "min-w-0 flex-1 truncate text-caption-1-em text-display-on-light-primary",
        "group-data-[expanded=false]:sr-only",
      )}
    >
      {chiefLabels[chief]}
    </span>
    <ChevronIcon
      direction="down"
      className={cn(
        "size-4 shrink-0 text-display-on-light-tertiary",
        "group-data-[expanded=false]:hidden",
      )}
    />
  </button>
);
