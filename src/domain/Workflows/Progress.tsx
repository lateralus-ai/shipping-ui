import { cn } from "../../utils/cn";

export type ProgressState = "0%" | "40%" | "54%" | "89%" | "all-done";

export type ProgressProps = {
  state?: ProgressState;
  label?: string;
  className?: string;
};

const progressValues: Record<ProgressState, number> = {
  "0%": 0,
  "40%": 40,
  "54%": 54,
  "89%": 89,
  "all-done": 100,
};

const defaultLabels: Record<ProgressState, string> = {
  "0%": "0% complete",
  "40%": "40% complete",
  "54%": "54% complete",
  "89%": "89% complete",
  "all-done": "All done!",
};

export const Progress = ({
  state = "0%",
  label,
  className,
}: ProgressProps) => {
  const value = progressValues[state];
  const displayLabel = label ?? defaultLabels[state];
  const isComplete = state === "all-done";

  return (
    <div className={cn("flex min-w-[212px] flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-caption-2-em text-display-on-light-primary">{displayLabel}</span>
        {!isComplete && (
          <span className="text-caption-2 text-display-on-light-tertiary">{value}%</span>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-grey-200">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isComplete ? "bg-meta-green" : "bg-blue-600",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
