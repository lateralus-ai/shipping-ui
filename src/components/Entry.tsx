import { type ReactNode } from "react";
import { ChatIcon, IssuesIcon } from "../icons";
import { cn } from "../utils/cn";

export type EntryType = "chat" | "issue";
export type EntryState = "idle" | "selected";

export type EntryProps = {
  type: EntryType;
  state?: EntryState;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  onClick?: () => void;
  className?: string;
};

const typeIcons: Record<EntryType, ReactNode> = {
  chat: <ChatIcon size="small" />,
  issue: <IssuesIcon size="small" />,
};

export const Entry = ({
  type,
  state = "idle",
  title,
  subtitle,
  meta,
  onClick,
  className,
}: EntryProps) => (
  <button
    type="button"
    data-type={type}
    data-state={state}
    onClick={onClick}
    className={cn(
      "flex w-full items-start gap-3 rounded-control px-3 py-2.5 text-left transition-colors",
      "hover:bg-background-secondary",
      "data-[state=selected]:bg-background-selected data-[state=selected]:text-display-on-dark-primary",
      "data-[state=selected]:[&_.entry-subtitle]:text-display-on-dark-secondary",
      "data-[state=selected]:[&_.entry-meta]:text-display-on-dark-tertiary",
      "data-[state=selected]:[&_.entry-icon]:text-display-on-dark-secondary",
      className,
    )}
  >
    <span className="entry-icon mt-0.5 shrink-0 text-display-on-light-secondary">
      {typeIcons[type]}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block truncate text-caption-2-em">{title}</span>
      {subtitle && (
        <span className="entry-subtitle mt-0.5 block truncate text-footnote text-display-on-light-tertiary">
          {subtitle}
        </span>
      )}
    </span>
    {meta && (
      <span className="entry-meta shrink-0 text-footnote text-display-on-light-quaternary">
        {meta}
      </span>
    )}
  </button>
);
