import { cn } from "../../utils/cn";
import { ClearIcon } from "../../icons";
import { Tooltip } from "../../primitives/Tooltip";

export type FilteredPillProps = {
  label: string;
  onRemove: () => void;
  removeAriaLabel?: string;
  className?: string;
  /** Optional tone overrides. Prefer default beige unless a product needs a custom tone. */
  classNames?: {
    root?: string;
    label?: string;
    remove?: string;
  };
};

/**
 * Active filter value pill — Figma Filtered (6154:149787).
 * Clear control on the left, label on the right. Max 300px with ellipsis;
 * full label in a tooltip on hover.
 */
export const FilteredPill = ({
  label,
  onRemove,
  removeAriaLabel,
  className,
  classNames,
}: FilteredPillProps) => (
  <Tooltip content={label} hint side="top">
    <div
      className={cn(
        "inline-flex max-w-[300px] min-h-9 items-center justify-center gap-2.5 rounded-full bg-background-secondary px-3 py-1",
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
          "min-w-0 truncate text-caption-2-em text-display-on-light-primary",
          classNames?.label,
        )}
      >
        {label}
      </span>
    </div>
  </Tooltip>
);
