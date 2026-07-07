import { cn } from "../../utils/cn";

export type EntryState = "idle" | "selected";

export type EntryProps = {
  state?: EntryState;
  label: string;
  className?: string;
};

const stateStyles: Record<EntryState, string> = {
  idle: "text-display-on-light-secondary hover:bg-background-hover hover:text-display-on-light-primary",
  selected: "bg-background-selected text-display-on-light-primary",
};

export const Entry = ({ state = "idle", label, className }: EntryProps) => (
  <button
    type="button"
    className={cn(
      "flex w-full items-center rounded-control px-2 py-1.5 text-left text-caption-2 transition-colors",
      stateStyles[state],
      className,
    )}
    data-state={state}
    aria-current={state === "selected" ? "true" : undefined}
  >
    <span className="truncate">{label}</span>
  </button>
);
