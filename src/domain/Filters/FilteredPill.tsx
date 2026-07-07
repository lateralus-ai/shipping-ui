import { cn } from "../../utils/cn";
import { ClearIcon } from "../../icons";

export type FilteredPillState = "idle" | "hover";

export type FilteredPillProps = {
  label?: string;
  count?: number;
  state?: FilteredPillState;
  className?: string;
};

const stateStyles: Record<FilteredPillState, string> = {
  idle: "bg-background-secondary text-display-on-light-tertiary",
  hover: "bg-grey-200 text-display-on-light-primary",
};

export const FilteredPill = ({
  label = "Filtered",
  count = 12,
  state = "idle",
  className,
}: FilteredPillProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex min-h-9 items-center gap-2 rounded-full px-3 py-1 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-grey-200 hover:text-display-on-light-primary",
      className,
    )}
  >
    <span className="text-caption-2-em">{label}</span>
    <span className="flex size-6 items-center justify-center rounded-full bg-background-primary text-footnote-em">
      {count}
    </span>
    <ClearIcon size="xs" />
  </button>
);
