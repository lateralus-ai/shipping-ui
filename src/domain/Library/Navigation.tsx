import { cn } from "../../utils/cn";
import { ChevronIcon } from "../../icons/ChevronIcon";

export type NavigationNested = "on" | "off";

export type NavigationProps = {
  label?: string;
  nested?: NavigationNested;
  className?: string;
};

export const Navigation = ({
  label = "Library",
  nested = "off",
  className,
}: NavigationProps) => (
  <nav
    className={cn(
      "flex items-center gap-1 text-caption-2",
      nested === "on" && "pl-4",
      className,
    )}
    aria-label="Library navigation"
  >
    <button type="button" className="text-display-on-light-tertiary hover:text-display-on-light-primary">
      Documents
    </button>
    <ChevronIcon size="small" direction="right" className="text-display-on-light-quaternary" />
    <span className="text-caption-2-em text-display-on-light-primary">{label}</span>
  </nav>
);
