import { cn } from "../../utils/cn";
import { FiltersIcon } from "../../icons/generated";
import { SearchIcon } from "../../icons/generated";

export type FiltersBarTabs = "on" | "off";
export type FiltersBarFilters = "on" | "off";

export type FiltersBarProps = {
  tabs?: FiltersBarTabs;
  filters?: FiltersBarFilters;
  tabLabels?: string[];
  activeTab?: string;
  searchPlaceholder?: string;
  filterChips?: string[];
  className?: string;
};

const defaultTabs = ["All", "Reports", "Chats", "Issues", "Forms", "Workflows"];

export const FiltersBar = ({
  tabs = "on",
  filters = "off",
  tabLabels = defaultTabs,
  activeTab = "All",
  searchPlaceholder = "Search",
  filterChips = ["Status", "Date", "Chief"],
  className,
}: FiltersBarProps) => (
  <div className={cn("flex w-full flex-col gap-3", className)}>
    <div className="flex items-center justify-between gap-4">
      {tabs === "on" && (
        <div className="flex flex-wrap gap-2">
          {tabLabels.map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "rounded-full px-3 py-1.5 text-caption-2-em transition-colors",
                tab === activeTab
                  ? "bg-background-selected text-display-on-dark-primary"
                  : "bg-background-secondary text-display-on-light-tertiary hover:text-display-on-light-primary",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
      <div className="flex shrink-0 items-center gap-4">
        <button
          type="button"
          aria-label="Open filters"
          className="flex size-9 items-center justify-center rounded-full bg-background-secondary text-display-on-light-secondary hover:text-display-on-light-primary"
        >
          <FiltersIcon size="small" />
        </button>
        <div className="flex w-[250px] items-center gap-2 rounded-md border border-divider-primary px-3 py-2">
          <span className="flex-1 text-body text-display-on-light-secondary">{searchPlaceholder}</span>
          <SearchIcon size="small" className="text-display-on-light-tertiary" />
        </div>
      </div>
    </div>
    {filters === "on" && (
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-background-secondary px-3 py-1.5 text-caption-2-em text-display-on-light-tertiary"
          >
            {chip}
          </span>
        ))}
      </div>
    )}
  </div>
);
