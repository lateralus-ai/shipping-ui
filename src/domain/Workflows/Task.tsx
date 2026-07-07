import { cn } from "../../utils/cn";
import { Importance } from "./Importance";

export type TaskState = "idle" | "hover";
export type TaskStatus = "uncompleted" | "completed";

export type TaskProps = {
  label?: string;
  state?: TaskState;
  status?: TaskStatus;
  className?: string;
};

const stateStyles: Record<TaskState, string> = {
  idle: "bg-transparent",
  hover: "bg-background-secondary",
};

export const Task = ({
  label = "Verify fire pump maintenance records",
  state = "idle",
  status = "uncompleted",
  className,
}: TaskProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-3 rounded-control px-3 py-2 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <Importance
      importance={status === "completed" ? "normal" : "critical"}
      status={status === "completed" ? "approved" : "uncompleted"}
    />
    <span
      className={cn(
        "text-caption-1 text-display-on-light-primary",
        status === "completed" && "text-display-on-light-quaternary line-through",
      )}
    >
      {label}
    </span>
  </div>
);
