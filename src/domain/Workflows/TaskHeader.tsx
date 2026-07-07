import { cn } from "../../utils/cn";
import { Badge } from "../../primitives/Badge";
import { Button } from "../../primitives/Button";
import { Progress } from "./Progress";

export type TaskHeaderProperty = "pending" | "in-review";

export type TaskHeaderProps = {
  property?: TaskHeaderProperty;
  title?: string;
  subtitle?: string;
  progressState?: "40%" | "54%" | "89%";
  className?: string;
};

export const TaskHeader = ({
  property = "pending",
  title = "Fire safety inspection",
  subtitle = "Assigned to Chief Technical · 3 forms remaining",
  progressState = "54%",
  className,
}: TaskHeaderProps) => {
  const isInReview = property === "in-review";

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-divider-primary bg-background-primary p-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-subheader-em text-display-on-light-primary">{title}</h3>
            <Badge color={isInReview ? "blue" : "orange"}>
              {isInReview ? "In review" : "Pending"}
            </Badge>
          </div>
          <p className="mt-1 text-caption-2 text-display-on-light-tertiary">{subtitle}</p>
        </div>
        <Button hierarchy="secondary" className="shrink-0">
          View details
        </Button>
      </div>
      <div className="mt-4">
        <Progress state={progressState} />
      </div>
    </div>
  );
};
