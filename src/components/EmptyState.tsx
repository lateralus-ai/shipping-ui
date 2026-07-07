import { type ReactNode } from "react";
import { Button, type ButtonProps } from "../primitives";
import { cn } from "../utils/cn";

export type EmptyStateProps = {
  illustration?: ReactNode;
  title: string;
  description?: string;
  action?: Pick<ButtonProps, "children" | "onClick" | "hierarchy" | "startIcon" | "endIcon">;
  className?: string;
};

export const EmptyState = ({
  illustration,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => (
  <div
    className={cn(
      "flex max-w-sm flex-col items-center gap-4 px-6 py-10 text-center",
      className,
    )}
  >
    {illustration && <div className="shrink-0">{illustration}</div>}
    <div className="flex flex-col gap-1">
      <h3 className="text-subheader-em text-display-on-light-primary">{title}</h3>
      {description && (
        <p className="text-body text-display-on-light-secondary">{description}</p>
      )}
    </div>
    {action && (
      <Button
        hierarchy={action.hierarchy ?? "primary"}
        onClick={action.onClick}
        startIcon={action.startIcon}
        endIcon={action.endIcon}
      >
        {action.children}
      </Button>
    )}
  </div>
);
