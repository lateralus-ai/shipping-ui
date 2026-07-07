import { type ReactNode } from "react";
import { ChatIcon, IssuesIcon, ReportIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type ResultRowVariant = "report" | "chat" | "issue";
export type ResultRowState = "idle";

export type ResultRowProps = {
  variant?: ResultRowVariant;
  state?: ResultRowState;
  title?: string;
  subtitle?: string;
  className?: string;
};

const variantIcons: Record<ResultRowVariant, ReactNode> = {
  report: <ReportIcon className="size-5" />,
  chat: <ChatIcon className="size-5" />,
  issue: <IssuesIcon className="size-5" />,
};

const variantColors: Record<ResultRowVariant, string> = {
  report: "text-meta-blue",
  chat: "text-meta-purple",
  issue: "text-meta-red",
};

export const ResultRow = ({
  variant = "report",
  state = "idle",
  title = "Search result",
  subtitle,
  className,
}: ResultRowProps) => (
  <button
    type="button"
    className={cn(
      "flex w-full items-center gap-3 rounded-control px-3 py-2 text-left transition-colors hover:bg-background-hover",
      className,
    )}
    data-variant={variant}
    data-state={state}
  >
    <span className={cn("shrink-0", variantColors[variant])}>{variantIcons[variant]}</span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-caption-1-em text-display-on-light-primary">{title}</p>
      {subtitle && (
        <p className="truncate text-caption-2 text-display-on-light-tertiary">{subtitle}</p>
      )}
    </div>
  </button>
);
