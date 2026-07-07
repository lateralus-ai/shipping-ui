import { type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../../primitives/Badge";
import { IconButton } from "../../primitives/IconButton";
import { FormsIcon } from "../../icons/generated";
import { PlusIcon } from "../../icons/generated";

export type FormCardState = "idle" | "hover";

export type FormCardProps = {
  name?: string;
  description?: string;
  formCount?: number;
  pendingCount?: number;
  state?: FormCardState;
  icon?: ReactNode;
  className?: string;
};

const stateStyles: Record<FormCardState, string> = {
  idle: "bg-background-primary",
  hover: "bg-background-secondary",
};

export const FormCard = ({
  name = "Name",
  description = "Description",
  formCount = 4,
  pendingCount = 7,
  state = "idle",
  icon,
  className,
}: FormCardProps) => (
  <div
    className={cn(
      "flex w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-divider-primary transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <div className="flex items-center gap-4 p-4">
      <span className="flex size-[46px] shrink-0 items-center justify-center rounded-control bg-background-secondary">
        {icon ?? <FormsIcon size="large" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-body-em text-display-on-light-primary">{name}</p>
        <p className="text-caption-2 text-display-on-light-secondary">{description}</p>
      </div>
    </div>
    <div className="flex items-center justify-between border-t border-divider-primary px-4 py-4">
      <div className="flex flex-wrap gap-2">
        <Badge color="grey">{formCount} Forms</Badge>
        {pendingCount > 0 && <Badge color="orange">{pendingCount} Pending</Badge>}
      </div>
      <IconButton hierarchy="tertiary" size="small" aria-label="Add form">
        <PlusIcon size="small" />
      </IconButton>
    </div>
  </div>
);
