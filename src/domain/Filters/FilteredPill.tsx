import { cn } from "../../utils/cn";
import { ClearIcon } from "../../icons";

export type FilteredPillProps = {
  label: string;
  onRemove: () => void;
  removeAriaLabel?: string;
  className?: string;
  /** Optional tone overrides (e.g. criticality-colored chips). */
  classNames?: {
    root?: string;
    label?: string;
    remove?: string;
  };
};

/**
 * Active filter value pill — Figma Filtered (6154:149787).
 * Clear control on the left, label on the right. Partner to FilterDropdown;
 * render via FilterPills outside the dropdown DOM.
 */
export const FilteredPill = ({
  label,
  onRemove,
  removeAriaLabel,
  className,
  classNames,
}: FilteredPillProps) => (
  <div
    className={cn(
      "inline-flex min-h-9 items-center justify-center gap-2.5 rounded-full bg-background-secondary px-3 py-1",
      classNames?.root,
      className,
    )}
  >
    <button
      type="button"
      onClick={onRemove}
      aria-label={removeAriaLabel ?? `Remove ${label} filter`}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-control text-display-on-light-secondary transition-colors hover:text-display-on-light-primary",
        classNames?.remove,
      )}
    >
      <ClearIcon size="xs" />
    </button>
    <span
      className={cn(
        "text-caption-2-em text-display-on-light-primary whitespace-nowrap",
        classNames?.label,
      )}
    >
      {label}
    </span>
  </div>
);
