import { cn } from "../../utils/cn";
import { FiltersIcon } from "../../icons/generated";

export type FilterPillIndicator = "on" | "off";

export type FilterPillProps = {
  indicator?: FilterPillIndicator;
  className?: string;
};

export const FilterPill = ({ indicator = "off", className }: FilterPillProps) => (
  <button
    type="button"
    aria-label="Filters"
    className={cn(
      "relative flex size-9 items-center justify-center rounded-full bg-background-secondary text-display-on-light-secondary transition-colors hover:text-display-on-light-primary",
      className,
    )}
  >
    <FiltersIcon size="small" />
    {indicator === "on" && (
      <span className="absolute right-1 top-1 size-2 rounded-full bg-blue-600" aria-hidden />
    )}
  </button>
);
