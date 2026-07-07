import { cn } from "../../utils/cn";
import { CriticalIcon } from "../../icons/generated";
import { DoneIcon } from "../../icons/generated";
import { MenuItem } from "../../primitives/MenuItem";

export type StatusPopoverState = "critical-done" | "critical-pending";

export type StatusPopoverProps = {
  state?: StatusPopoverState;
  title?: string;
  className?: string;
};

export const StatusPopover = ({
  state = "critical-pending",
  title = "Critical items",
  className,
}: StatusPopoverProps) => {
  const isDone = state === "critical-done";

  return (
    <div
      className={cn(
        "w-full max-w-[268px] overflow-hidden rounded-control border border-divider-primary bg-background-primary shadow-raise2",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-divider-primary px-3 py-2">
        <CriticalIcon size="small" className="text-red-500" />
        <span className="text-caption-1-em text-display-on-light-primary">{title}</span>
      </div>
      <div className="p-1">
        <MenuItem>
          <DoneIcon size="small" className={isDone ? "text-meta-green" : "text-display-on-light-quaternary"} />
          Fire pump inspection
        </MenuItem>
        <MenuItem>
          <DoneIcon size="small" className={isDone ? "text-meta-green" : "text-display-on-light-quaternary"} />
          Emergency generator test
        </MenuItem>
        <MenuItem>
          <DoneIcon size="small" className="text-display-on-light-quaternary" />
          Liferaft servicing
        </MenuItem>
      </div>
      {isDone && (
        <p className="border-t border-divider-primary px-3 py-2 text-caption-2 text-meta-green">
          Critical done!
        </p>
      )}
    </div>
  );
};
