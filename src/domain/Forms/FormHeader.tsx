import { cn } from "../../utils/cn";
import { Badge } from "../../primitives/Badge";

export type FormHeaderProps = {
  title?: string;
  subtitle?: string;
  status?: string;
  dueDate?: string;
  className?: string;
};

export const FormHeader = ({
  title = "Safety Management System Review",
  subtitle = "MV Atlantic Star · Chief Technical",
  status = "In progress",
  dueDate = "Due 21 Jul 2026",
  className,
}: FormHeaderProps) => (
  <header
    className={cn(
      "w-full rounded-2xl border border-divider-primary bg-background-primary p-6",
      className,
    )}
  >
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-subheader-em text-display-on-light-primary">{title}</h2>
        <p className="mt-1 text-caption-2 text-display-on-light-tertiary">{subtitle}</p>
      </div>
      <Badge color="blue">{status}</Badge>
    </div>
    <p className="mt-4 text-caption-2-em text-display-on-light-secondary">{dueDate}</p>
  </header>
);
