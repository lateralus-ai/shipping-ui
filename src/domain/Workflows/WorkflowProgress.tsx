import { cn } from "../../utils/cn";

export type WorkflowProgressValue = "7%" | "37%" | "54%" | "91%" | "100%";

export type WorkflowProgressProps = {
  progress?: WorkflowProgressValue;
  className?: string;
};

const progressValues: Record<WorkflowProgressValue, number> = {
  "7%": 7,
  "37%": 37,
  "54%": 54,
  "91%": 91,
  "100%": 100,
};

export const WorkflowProgress = ({
  progress = "7%",
  className,
}: WorkflowProgressProps) => {
  const value = progressValues[progress];
  const isComplete = progress === "100%";

  return (
    <div className={cn("flex w-full max-w-[200px] flex-col gap-1", className)}>
      <div className="h-1.5 overflow-hidden rounded-full bg-grey-200">
        <div
          className={cn("h-full rounded-full", isComplete ? "bg-meta-green" : "bg-blue-600")}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-footnote text-display-on-light-tertiary">{value}%</span>
    </div>
  );
};
