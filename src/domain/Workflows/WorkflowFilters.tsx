import { cn } from "../../utils/cn";
import { FiltersIcon } from "../../icons/generated";

export type WorkflowFiltersProps = {
  filters?: string[];
  activeFilter?: string;
  className?: string;
};

const defaultFilters = ["All", "Pending", "In review", "Completed"];

export const WorkflowFilters = ({
  filters = defaultFilters,
  activeFilter = "All",
  className,
}: WorkflowFiltersProps) => (
  <div className={cn("flex flex-wrap items-center gap-2", className)}>
    <span className="mr-1 flex size-9 items-center justify-center rounded-full bg-background-secondary text-display-on-light-secondary">
      <FiltersIcon size="small" />
    </span>
    {filters.map((filter) => {
      const isActive = filter === activeFilter;

      return (
        <button
          key={filter}
          type="button"
          className={cn(
            "rounded-full px-3 py-1.5 text-caption-2-em transition-colors",
            isActive
              ? "bg-background-selected text-display-on-dark-primary"
              : "bg-background-secondary text-display-on-light-tertiary hover:text-display-on-light-primary",
          )}
        >
          {filter}
        </button>
      );
    })}
  </div>
);
