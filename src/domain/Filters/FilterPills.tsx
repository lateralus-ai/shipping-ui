import { cn } from "../../utils/cn";
import { FilteredPill, type FilteredPillProps } from "./FilteredPill";

export type FilterPillsItem = {
  key: string;
  label: string;
  onRemove: () => void;
  removeAriaLabel?: string;
  classNames?: FilteredPillProps["classNames"];
};

export type FilterPillsProps = {
  chips: FilterPillsItem[];
  className?: string;
};

/**
 * Partner row for FilterDropdown — active filter pills.
 * Always renders the row wrapper (even when empty) so sibling filter
 * triggers can stay pinned with `ml-auto` / flex layouts.
 */
export const FilterPills = ({ chips, className }: FilterPillsProps) => (
  <div className={cn("flex min-w-0 flex-wrap items-start gap-2", className)}>
    {chips.map((chip) => (
      <FilteredPill
        key={chip.key}
        label={chip.label}
        onRemove={chip.onRemove}
        removeAriaLabel={chip.removeAriaLabel}
        classNames={chip.classNames}
      />
    ))}
  </div>
);
