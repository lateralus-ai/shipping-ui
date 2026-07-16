import { type ReactNode } from "react";
import { ChatIcon, IssuesIcon, ReportIcon, StatusIcon } from "../icons";
import { cn } from "../utils/cn";

export type EntryVariant = "chat" | "issue" | "report";
/** @deprecated Prefer `EntryVariant`. */
export type EntryType = EntryVariant;
export type EntryState = "idle" | "active";

export type EntryProps = {
  /** Visual type — drives the default leading icon. */
  variant?: EntryVariant;
  /** @deprecated Use `variant`. */
  type?: EntryVariant;
  state?: EntryState;
  title?: ReactNode;
  /** Secondary line — excerpt, metadata, or highlighted query match. */
  subtitle?: ReactNode;
  /** Unread count badge in the title row (Figma red pill). */
  count?: number;
  /** Trailing actions (e.g. ellipsis menu). Shown on hover / when forced. */
  trailing?: ReactNode;
  /** Override the default variant icon. */
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  /** @deprecated Use `count` or `trailing`. */
  meta?: ReactNode;
};

const variantIcons: Record<EntryVariant, ReactNode> = {
  chat: <ChatIcon className="size-4" />,
  issue: <StatusIcon className="size-4" />,
  report: <ReportIcon className="size-4" />,
};

/**
 * List entry row — Figma `Entry` (389:10001).
 * Shared by search results and activity lists.
 */
export const Entry = ({
  variant,
  type,
  state = "idle",
  title = "Title",
  subtitle,
  count,
  trailing,
  icon,
  onClick,
  className,
  meta,
}: EntryProps) => {
  const resolvedVariant: EntryVariant = variant ?? type ?? "chat";
  const isInteractive = typeof onClick === "function";
  const Comp = isInteractive ? "button" : "div";

  return (
    <Comp
      {...(isInteractive ? { type: "button" as const } : {})}
      data-variant={resolvedVariant}
      data-state={state}
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-4 rounded-control p-2 text-left transition-colors",
        "hover:bg-[rgba(38,36,32,0.04)]",
        state === "active" && "bg-[rgba(38,36,32,0.04)]",
        className,
      )}
    >
      <span className="shrink-0 text-display-on-light-secondary">
        {icon ?? variantIcons[resolvedVariant] ?? (
          <IssuesIcon className="size-4" />
        )}
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-h-6 w-full items-center gap-4">
          <span className="min-w-0 flex-1 truncate text-caption-1-em text-display-on-light-primary">
            {title}
          </span>
          {typeof count === "number" && count > 0 && (
            <span
              className="inline-flex min-h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-600 px-0.5 text-footnote-em text-white"
              aria-label={`${count} unread`}
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
          {meta != null && typeof count !== "number" && (
            <span className="shrink-0 text-footnote text-display-on-light-quaternary">
              {meta}
            </span>
          )}
        </span>

        {(subtitle != null && subtitle !== false) || trailing ? (
          <span className="flex min-h-6 w-full items-center gap-4">
            {subtitle != null && subtitle !== false && (
              <span className="min-w-0 flex-1 truncate text-caption-2 text-display-on-light-secondary">
                {subtitle}
              </span>
            )}
            {trailing != null && (
              <span
                className="shrink-0"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => event.stopPropagation()}
              >
                {trailing}
              </span>
            )}
          </span>
        ) : null}
      </span>
    </Comp>
  );
};
