import { cn } from "../../utils/cn";
import { BulbIcon } from "../../icons/generated";
import { QualityIcon } from "../../icons/generated";
import { TickIcon } from "../../icons/generated";

export type GroupHeaderGroup = "validation-checks" | "quality-flags" | "ai-insights";

export type GroupHeaderProps = {
  group?: GroupHeaderGroup;
  title?: string;
  count?: number;
  className?: string;
};

const groupConfig: Record<
  GroupHeaderGroup,
  { title: string; icon: typeof TickIcon }
> = {
  "validation-checks": { title: "Validation Checks", icon: TickIcon },
  "quality-flags": { title: "Quality Flags", icon: QualityIcon },
  "ai-insights": { title: "AI Insights", icon: BulbIcon },
};

export const GroupHeader = ({
  group = "validation-checks",
  title,
  count = 4,
  className,
}: GroupHeaderProps) => {
  const config = groupConfig[group];
  const Icon = config.icon;
  const displayTitle = title ?? config.title;

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-control bg-background-secondary px-4 py-3",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Icon size="small" className="text-display-on-light-secondary" />
        <span className="text-caption-1-em text-display-on-light-primary">{displayTitle}</span>
      </div>
      <span className="text-caption-2 text-display-on-light-tertiary">{count} items</span>
    </div>
  );
};
