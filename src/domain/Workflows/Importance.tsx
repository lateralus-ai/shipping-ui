import { cn } from "../../utils/cn";
import { CriticalIcon } from "../../icons/generated";
import { DoneIcon } from "../../icons/generated";
import { StatusIcon } from "../../icons/generated";

export type ImportanceLevel = "critical" | "normal" | "low" | "pending";
export type ImportanceStatus = "uncompleted" | "approved" | "reviewed";

export type ImportanceProps = {
  importance?: ImportanceLevel;
  status?: ImportanceStatus;
  className?: string;
};

const levelStyles: Record<ImportanceLevel, string> = {
  critical: "bg-red-100 text-red-600",
  normal: "bg-blue-100 text-blue-700",
  low: "bg-grey-100 text-display-on-light-secondary",
  pending: "bg-orange-50 text-orange-700",
};

export const Importance = ({
  importance = "critical",
  status = "uncompleted",
  className,
}: ImportanceProps) => {
  const isApproved = status === "approved";
  const isReviewed = status === "reviewed";

  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full",
        isApproved || isReviewed ? "bg-meta-green text-meta-on-green" : levelStyles[importance],
        className,
      )}
      aria-label={`${importance} importance, ${status}`}
    >
      {isApproved || isReviewed ? (
        <DoneIcon size="small" />
      ) : importance === "critical" ? (
        <CriticalIcon size="small" />
      ) : (
        <StatusIcon size="small" />
      )}
    </span>
  );
};
