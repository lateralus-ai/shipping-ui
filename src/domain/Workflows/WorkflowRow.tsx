import { type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { WorkflowIcon } from "../../icons/generated";

export type WorkflowRowState = "idle" | "hover";

export type WorkflowRowProps = {
  name?: string;
  description?: string;
  state?: WorkflowRowState;
  icon?: ReactNode;
  className?: string;
};

const stateStyles: Record<WorkflowRowState, string> = {
  idle: "bg-background-primary",
  hover: "bg-background-secondary",
};

export const WorkflowRow = ({
  name = "Name",
  description = "Description",
  state = "idle",
  icon,
  className,
}: WorkflowRowProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-4 rounded-2xl border border-divider-primary p-3 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <span className="flex size-[46px] shrink-0 items-center justify-center rounded-control bg-background-secondary text-display-on-light-primary">
      {icon ?? <WorkflowIcon size="large" />}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-body-em text-display-on-light-primary">{name}</p>
      <p className="text-caption-2 text-display-on-light-secondary">{description}</p>
    </div>
  </div>
);
