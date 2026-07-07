import { cn } from "../../utils/cn";
import { Avatar } from "../../primitives/Avatar";
import { WorkflowProgress } from "./WorkflowProgress";

export type WorkflowListItemHover = "on" | "off";
export type WorkflowListItemChief = "technical" | "compliance";

export type WorkflowListItemProps = {
  title?: string;
  subtitle?: string;
  chief?: WorkflowListItemChief;
  hover?: WorkflowListItemHover;
  progress?: "37%" | "54%" | "91%";
  className?: string;
};

const hoverStyles: Record<WorkflowListItemHover, string> = {
  off: "bg-transparent",
  on: "bg-background-secondary",
};

export const WorkflowListItem = ({
  title = "Monthly safety review",
  subtitle = "Updated 2 hours ago",
  chief = "technical",
  hover = "off",
  progress = "37%",
  className,
}: WorkflowListItemProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-4 rounded-control px-3 py-2 transition-colors",
      hoverStyles[hover],
      hover === "off" && "hover:bg-background-secondary",
      className,
    )}
  >
    <Avatar chief={chief} size={32} />
    <div className="min-w-0 flex-1">
      <p className="truncate text-caption-1-em text-display-on-light-primary">{title}</p>
      <p className="truncate text-caption-2 text-display-on-light-tertiary">{subtitle}</p>
    </div>
    <WorkflowProgress progress={progress} />
  </div>
);
