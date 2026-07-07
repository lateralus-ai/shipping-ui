import { cn } from "../../utils/cn";

export type RiskMeterLevel = "high" | "medium" | "low";

export type RiskMeterProps = {
  level?: RiskMeterLevel;
  label?: string;
  score?: number;
  className?: string;
};

const levelConfig: Record<
  RiskMeterLevel,
  { label: string; score: number; bar: string; text: string }
> = {
  high: { label: "High risk", score: 85, bar: "bg-red-500", text: "text-red-600" },
  medium: { label: "Medium risk", score: 52, bar: "bg-orange-700", text: "text-orange-700" },
  low: { label: "Low risk", score: 18, bar: "bg-meta-green", text: "text-green-700" },
};

export const RiskMeter = ({
  level = "high",
  label,
  score,
  className,
}: RiskMeterProps) => {
  const config = levelConfig[level];
  const displayLabel = label ?? config.label;
  const displayScore = score ?? config.score;

  return (
    <div
      className={cn(
        "w-full max-w-[480px] rounded-control border border-divider-primary bg-background-primary p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={cn("text-body-em", config.text)}>{displayLabel}</span>
        <span className="text-caption-1-em text-display-on-light-primary">{displayScore}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-grey-200">
        <div
          className={cn("h-full rounded-full", config.bar)}
          style={{ width: `${displayScore}%` }}
        />
      </div>
    </div>
  );
};
