import { cn } from "../../utils/cn";
import { Badge } from "../../primitives/Badge";
import { WorkflowIcon } from "../../icons/generated";

export type WorkflowHeaderWorkflow = "audit-response" | "audit-preparation" | "monthly-forms";
export type WorkflowHeaderVariant = "created" | "pending";

export type WorkflowHeaderProps = {
  workflow?: WorkflowHeaderWorkflow;
  variant?: WorkflowHeaderVariant;
  title?: string;
  description?: string;
  dueDate?: string;
  className?: string;
};

const workflowTitles: Record<WorkflowHeaderWorkflow, string> = {
  "audit-response": "Audit Response",
  "audit-preparation": "Audit Preparation",
  "monthly-forms": "Monthly Forms",
};

export const WorkflowHeader = ({
  workflow = "audit-response",
  variant = "created",
  title,
  description = "Prepare documentation and assign tasks for the upcoming inspection.",
  dueDate = "Due 14 Jul 2026",
  className,
}: WorkflowHeaderProps) => {
  const displayTitle = title ?? workflowTitles[workflow];
  const isPending = variant === "pending";

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-divider-primary bg-background-primary p-4",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="flex size-[46px] shrink-0 items-center justify-center rounded-control bg-background-secondary">
          <WorkflowIcon size="large" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-body-em text-display-on-light-primary">{displayTitle}</h3>
            <Badge color={isPending ? "orange" : "green"}>
              {isPending ? "Pending" : "Created"}
            </Badge>
          </div>
          {!isPending && (
            <>
              <p className="mt-1 text-caption-2 text-display-on-light-secondary">{description}</p>
              <p className="mt-2 text-caption-2-em text-display-on-light-tertiary">{dueDate}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
