import { type MouseEvent, type ReactNode } from "react";
import { Tooltip } from "../../primitives";
import { cn } from "../../utils/cn";
import {
  sidebarLinkActive,
  sidebarLinkHover,
  sidebarLinkIdle,
  sidebarRowInteractiveHover,
  sidebarSectionContent,
  sidebarSectionIconClass,
  sidebarSectionLabelClass,
  sidebarSectionShell,
  sidebarSectionShellCollapsed,
  sidebarSectionShellTall,
  sidebarUnreadDot,
  sidebarUnreadOverlay,
} from "./sidebar-styles";

export type SidebarLinkState = "idle" | "hover" | "active";

export type SidebarLinkProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  state?: SidebarLinkState;
  collapsed?: boolean;
  tall?: boolean;
  badge?: ReactNode;
  trailing?: ReactNode;
  tooltip?: string;
  presentation?: boolean;
  unread?: boolean;
  className?: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const stateStyles: Record<SidebarLinkState, string> = {
  idle: sidebarLinkIdle,
  hover: sidebarLinkHover,
  active: sidebarLinkActive,
};

export const SidebarLink = ({
  href,
  label,
  icon,
  state = "idle",
  collapsed = false,
  tall = false,
  badge,
  trailing,
  tooltip,
  presentation = false,
  unread = false,
  className,
  onNavigate,
}: SidebarLinkProps) => {
  const row = collapsed ? (
    <div
      className={cn(
        "relative",
        sidebarSectionShellCollapsed,
        stateStyles[state],
        state === "idle" && sidebarRowInteractiveHover,
        className,
      )}
      data-state={state}
      data-collapsed={collapsed}
    >
      <a
        href={href}
        className="absolute inset-0 z-0 rounded-control"
        aria-current={state === "active" ? "page" : undefined}
        aria-label={label}
        onClick={onNavigate}
      />
      <span className="pointer-events-none relative z-10 inline-flex shrink-0 items-center">
        {icon && <span className={sidebarSectionIconClass}>{icon}</span>}
        {unread && (
          <span aria-hidden className={sidebarUnreadOverlay}>
            <span className={sidebarUnreadDot} />
          </span>
        )}
      </span>
    </div>
  ) : (
    <div
      className={cn(
        "relative",
        tall ? sidebarSectionShellTall : sidebarSectionShell,
        stateStyles[state],
        state === "idle" && sidebarRowInteractiveHover,
        className,
      )}
      data-state={state}
      data-collapsed={collapsed}
    >
      <a
        href={href}
        className="absolute inset-0 z-0 rounded-control"
        aria-current={state === "active" ? "page" : undefined}
        aria-label={label}
        onClick={onNavigate}
      />
      <div
        className={cn(
          sidebarSectionContent,
          "pointer-events-none relative z-10",
        )}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-left">
          {icon && <span className={sidebarSectionIconClass}>{icon}</span>}
          <span className={sidebarSectionLabelClass}>{label}</span>
          {badge}
        </span>
        {trailing != null && (
          <span className="pointer-events-auto shrink-0">{trailing}</span>
        )}
      </div>
    </div>
  );

  if (presentation || !collapsed || !tooltip) return row;

  return (
    <Tooltip content={tooltip ?? label} side="right" className="w-full">
      {row}
    </Tooltip>
  );
};

/** @deprecated Use SidebarLink */
export const Section = SidebarLink;
export type SectionProps = SidebarLinkProps;
export type SectionState = SidebarLinkState;
