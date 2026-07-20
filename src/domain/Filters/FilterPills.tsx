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
 * Lives outside the dropdown DOM so callers can place it anywhere
 * (same row, new row, sticky footer, etc.).
 *
 * Multi-select chip *content* (when to show, label format) is owned by the
 * consumer; use `formatActiveFilterChipLabel` for audit-prep-style labels.
 */
export const FilterPills = ({ chips, className }: FilterPillsProps) => {
  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-start gap-2", className)}>
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
};
