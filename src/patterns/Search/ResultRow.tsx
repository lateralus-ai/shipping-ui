import { type ReactNode } from "react";
import {
  Entry,
  type EntryProps,
  type EntryState,
  type EntryVariant,
} from "../../components/Entry";

/** @deprecated Prefer `EntryVariant`. */
export type ResultRowVariant = EntryVariant;
/** @deprecated Prefer `EntryState`. */
export type ResultRowState = EntryState;

export type ResultRowProps = {
  variant?: EntryVariant;
  state?: EntryState;
  title?: ReactNode;
  subtitle?: ReactNode;
  onClick?: () => void;
  className?: string;
};

/**
 * @deprecated Prefer `Entry` — ResultRow is a thin alias for search lists.
 */
export const ResultRow = ({
  variant = "report",
  state = "idle",
  title = "Search result",
  subtitle,
  onClick,
  className,
}: ResultRowProps) => (
  <Entry
    variant={variant}
    state={state}
    title={title}
    subtitle={subtitle}
    onClick={onClick}
    className={className}
  />
);

export type { EntryProps };
