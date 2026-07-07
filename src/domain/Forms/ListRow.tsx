import { cn } from "../../utils/cn";
import { FormIcon } from "../../icons/generated";

export type ListRowState = "idle" | "hover";

export type ListRowProps = {
  name?: string;
  subtitle?: string;
  state?: ListRowState;
  className?: string;
};

const stateStyles: Record<ListRowState, string> = {
  idle: "bg-transparent",
  hover: "bg-background-secondary",
};

export const ListRow = ({
  name = "ISM Code checklist",
  subtitle = "Last updated 3 days ago",
  state = "idle",
  className,
}: ListRowProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-3 rounded-control px-3 py-2 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-background-secondary">
      <FormIcon size="small" />
    </span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-caption-1-em text-display-on-light-primary">{name}</p>
      <p className="truncate text-caption-2 text-display-on-light-tertiary">{subtitle}</p>
    </div>
  </div>
);
