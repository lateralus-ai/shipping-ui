import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { FiltersIcon } from "../../icons/generated";
import { Badge } from "../../primitives/Badge";

export type FilterPillAppearance = "filled" | "ghost";

export type FilterPillProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  /** When > 0, shows the orange count badge. */
  activeFilterCount?: number;
  /**
   * `filled` — grey idle / blue when active (Figma default).
   * `ghost` — white idle and active; only hover changes surface color.
   */
  appearance?: FilterPillAppearance;
};

/**
 * Filter trigger — Figma Filter Pill (6154:149608 / 6154:149599).
 */
export const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
  (
    {
      activeFilterCount = 0,
      appearance = "filled",
      className,
      type = "button",
      "aria-label": ariaLabel = "Filters",
      ...props
    },
    ref,
  ) => {
    const active = activeFilterCount > 0;
    const ghost = appearance === "ghost";

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        aria-pressed={active}
        className={cn(
          "relative flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
          ghost
            ? "bg-white text-display-on-light-secondary hover:bg-grey-50 hover:text-display-on-light-primary"
            : active
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
            className={cn(
              "absolute -right-1 -top-2 border-2 text-display-on-light-primary",
              ghost ? "border-white" : "border-background-primary",
            )}
          >
            {activeFilterCount > 99 ? "99+" : activeFilterCount}
          </Badge>
        )}
      </button>
    );
  },
);

FilterPill.displayName = "FilterPill";
