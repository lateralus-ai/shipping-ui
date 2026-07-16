import { type ReactNode } from "react";
import { ChatIcon, IssuesIcon, ReportIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type ResultRowVariant = "report" | "chat" | "issue";
export type ResultRowState = "idle" | "active";

export type ResultRowProps = {
  variant?: ResultRowVariant;
  state?: ResultRowState;
  title?: ReactNode;
  /** Secondary line — excerpt, metadata, or highlighted query match. */
  subtitle?: ReactNode;
  onClick?: () => void;
  className?: string;
};

const variantIcons: Record<ResultRowVariant, ReactNode> = {
  report: <ReportIcon className="size-4" />,
  chat: <ChatIcon className="size-4" />,
  issue: <IssuesIcon className="size-4" />,
};

export const ResultRow = ({
  variant = "report",
  state = "idle",
  title = "Search result",
  subtitle,
  onClick,
  className,
}: ResultRowProps) => (
  <button
    type="button"
    className={cn(
      "flex w-full items-center gap-4 rounded-control px-3 py-2.5 text-left transition-colors",
      "hover:bg-[rgba(38,36,32,0.04)]",
      state === "active" && "bg-[rgba(38,36,32,0.04)]",
      className,
    )}
    data-variant={variant}
    data-state={state}
    onClick={onClick}
  >
    <span className="shrink-0 text-display-on-light-secondary">
      {variantIcons[variant]}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-caption-1-em text-display-on-light-primary">
        {title}
      </span>
      {subtitle != null && subtitle !== false && (
        <span className="mt-0.5 block truncate text-caption-2 text-display-on-light-secondary">
          {subtitle}
        </span>
      )}
    </span>
  </button>
);
