import { type ReactNode } from "react";
import { Avatar, IconButton, ThinkingDot } from "../../primitives";
import {
  CriticalIcon,
  FormsIcon,
  InformationIcon,
  IssuesIcon,
  ReportIcon,
  SettingsIcon,
} from "../../icons";
import { cn } from "../../utils/cn";
import type { Chief } from "../Sidebar/Switcher";

export type ModalHeaderVariant =
  | "issue"
  | "thinking"
  | "generic"
  | "settings"
  | "audit"
  | "forms";

export type ModalHeaderProps = {
  variant?: ModalHeaderVariant;
  title?: string;
  chief?: Chief;
  onClose?: () => void;
  className?: string;
};

const variantConfig: Record<
  ModalHeaderVariant,
  { icon: ReactNode; defaultTitle: string }
> = {
  issue: { icon: <IssuesIcon className="size-5" />, defaultTitle: "Issue details" },
  thinking: { icon: <ThinkingDot />, defaultTitle: "Chief is thinking" },
  generic: { icon: <InformationIcon className="size-5" />, defaultTitle: "Information" },
  settings: { icon: <SettingsIcon className="size-5" />, defaultTitle: "Settings" },
  audit: { icon: <ReportIcon className="size-5" />, defaultTitle: "Audit trail" },
  forms: { icon: <FormsIcon className="size-5" />, defaultTitle: "Forms" },
};

export const ModalHeader = ({
  variant = "generic",
  title,
  chief,
  onClose,
  className,
}: ModalHeaderProps) => {
  const config = variantConfig[variant];
  const displayTitle = title ?? config.defaultTitle;

  return (
    <header
      className={cn(
        "flex items-center gap-3 border-b border-divider-primary bg-background-secondary px-4 py-3",
        className,
      )}
      data-variant={variant}
    >
      <span className="shrink-0 text-display-on-light-tertiary">
        {variant === "issue" ? <CriticalIcon className="size-5 text-meta-red" /> : config.icon}
      </span>

      {chief && <Avatar chief={chief} size={24} />}

      <h2 className="min-w-0 flex-1 truncate text-subheader-em text-display-on-light-primary">
        {displayTitle}
      </h2>

      {onClose && (
        <IconButton hierarchy="quaternary" size="small" aria-label="Close" onClick={onClose}>
          <span className="text-caption-1">✕</span>
        </IconButton>
      )}
    </header>
  );
};
