import { cn } from "../../utils/cn";
import { CheckboxIcon } from "../../icons/generated";
import { PlusIcon } from "../../icons/generated";

export type TaskRowVariant = "task" | "add-more";
export type TaskRowHover = "on" | "off";
export type TaskRowStrikethrough = "on" | "off";

export type TaskRowProps = {
  label?: string;
  variant?: TaskRowVariant;
  hover?: TaskRowHover;
  strikethrough?: TaskRowStrikethrough;
  className?: string;
};

const hoverStyles: Record<TaskRowHover, string> = {
  off: "bg-transparent",
  on: "bg-background-secondary",
};

export const TaskRow = ({
  label = "Complete safety inspection checklist",
  variant = "task",
  hover = "off",
  strikethrough = "off",
  className,
}: TaskRowProps) => {
  const isAddMore = variant === "add-more";
  const displayLabel = isAddMore ? "Add more" : label;

  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-control px-2 py-1 transition-colors",
        hoverStyles[hover],
        hover === "off" && "hover:bg-background-secondary",
        className,
      )}
    >
      {isAddMore ? (
        <PlusIcon size="small" className="text-display-on-light-tertiary" />
      ) : (
        <CheckboxIcon size="small" className="text-display-on-light-tertiary" />
      )}
      <span
        className={cn(
          "text-caption-1 text-display-on-light-primary",
          strikethrough === "on" && "text-display-on-light-quaternary line-through",
          isAddMore && hover === "on" && "text-action-tertiary-on-idle",
        )}
      >
        {displayLabel}
      </span>
    </div>
  );
};
