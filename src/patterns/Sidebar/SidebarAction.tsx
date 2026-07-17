import { type ReactNode } from "react";
import { Tooltip } from "../../primitives";
import { cn } from "../../utils/cn";
import {
  sidebarLinkActive,
  sidebarLinkIdle,
  sidebarRowInteractiveHover,
  sidebarSectionIconClass,
  sidebarSectionShell,
  sidebarSectionShellCollapsed,
} from "./sidebar-styles";

export type SidebarActionProps = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  active?: boolean;
  collapsed?: boolean;
  tooltip?: string;
  className?: string;
};

export const SidebarAction = ({
  label,
  icon,
  onClick,
  active = false,
  collapsed = false,
  tooltip,
  className,
}: SidebarActionProps) => {
  const row = (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        collapsed ? sidebarSectionShellCollapsed : sidebarSectionShell,
        "cursor-pointer text-left",
        active ? sidebarLinkActive : sidebarLinkIdle,
        !active && sidebarRowInteractiveHover,
        !collapsed && "gap-2",
        className,
      )}
      data-active={active}
      data-collapsed={collapsed}
    >
      {icon && <span className={sidebarSectionIconClass}>{icon}</span>}
      {!collapsed && (
        <span className="min-w-0 flex-1 truncate text-caption-2 tracking-[0.01em]">
          {label}
        </span>
      )}
    </button>
  );

  if (!collapsed || !tooltip) return row;

  return (
    <Tooltip content={tooltip ?? label} side="right" className="w-full">
      {row}
    </Tooltip>
  );
};
