import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { FiltersIcon } from "../../icons/generated";
import { Badge } from "../../primitives/Badge";

export type FilterPillProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** When > 0, trigger uses active (blue) fill and shows a count badge. */
  activeFilterCount?: number;
};

/**
 * Filter trigger — Figma Filter Pill (6154:149608 / 6154:149599).
 * Idle: grey-100. Active: accent blue-100 + orange count badge.
 */
export const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
  (
    {
      activeFilterCount = 0,
      className,
      type = "button",
      "aria-label": ariaLabel = "Filters",
      ...props
    },
    ref,
  ) => {
    const active = activeFilterCount > 0;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        aria-pressed={active}
        className={cn(
          "relative flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
          active
            ? "bg-accent-bg-light text-display-on-light-secondary hover:text-display-on-light-primary"
            : "bg-background-secondary text-display-on-light-secondary hover:text-display-on-light-primary",
          className,
        )}
        {...props}
      >
        <FiltersIcon size="small" />
        {active && (
          <Badge
            color="orange"
            type="icon"
            className="absolute -right-1 -top-2 border-2 border-background-primary text-display-on-light-primary"
          >
            {activeFilterCount > 99 ? "99+" : activeFilterCount}
          </Badge>
        )}
      </button>
    );
  },
);

FilterPill.displayName = "FilterPill";
