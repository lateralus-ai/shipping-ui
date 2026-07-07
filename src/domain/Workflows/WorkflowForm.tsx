import { cn } from "../../utils/cn";
import { FormIcon } from "../../icons/generated";

export type WorkflowFormState = "idle" | "hover";

export type WorkflowFormProps = {
  name?: string;
  description?: string;
  state?: WorkflowFormState;
  className?: string;
};

const stateStyles: Record<WorkflowFormState, string> = {
  idle: "bg-background-primary",
  hover: "bg-background-secondary",
};

export const WorkflowForm = ({
  name = "Safety Management Form",
  description = "ISM Code compliance checklist",
  state = "idle",
  className,
}: WorkflowFormProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-4 rounded-control border border-divider-primary px-4 py-3 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-background-secondary">
      <FormIcon size="small" />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-caption-1-em text-display-on-light-primary">{name}</p>
      <p className="text-caption-2 text-display-on-light-tertiary">{description}</p>
    </div>
  </div>
);
