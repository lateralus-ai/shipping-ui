import { ChevronIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type HeadingProps = {
  title: string;
  collapsed?: boolean;
  collapsible?: boolean;
  className?: string;
};

export const Heading = ({
  title,
  collapsed = false,
  collapsible = false,
  className,
}: HeadingProps) => (
  <div
    className={cn(
      "group flex items-center justify-between px-2 py-1",
      className,
    )}
    data-collapsed={collapsed}
  >
    <span
      className={cn(
        "text-footnote-em text-display-on-light-tertiary uppercase tracking-wide",
        "group-data-[collapsed=true]:sr-only",
      )}
    >
      {title}
    </span>
    {collapsible && !collapsed && (
      <button type="button" className="text-display-on-light-quaternary" aria-label={`Collapse ${title}`}>
        <ChevronIcon direction="up" className="size-4" />
      </button>
    )}
  </div>
);
