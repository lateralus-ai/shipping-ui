import { type ReactNode } from "react";
import { Tooltip } from "../../primitives";
import { cn } from "../../utils/cn";
import { sidebarLinkActive, sidebarLinkIdle, sidebarRowClass, sidebarRowInteractiveHover, sidebarSectionAnchorClass } from "./sidebar-styles";

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
    <div
      className={sidebarRowClass(
        cn(
          active ? sidebarLinkActive : sidebarLinkIdle,
          !active && sidebarRowInteractiveHover,
          className,
        ),
      )}
      data-active={active}
      data-collapsed={collapsed}
    >
      <button
        type="button"
        className={sidebarSectionAnchorClass(collapsed ? "justify-center" : undefined)}
        onClick={onClick}
      >
        {icon && <span className="shrink-0 [&>svg]:size-5">{icon}</span>}
        {!collapsed && <span className="truncate">{label}</span>}
      </button>
    </div>
  );

  if (!collapsed || !tooltip) return row;

  return (
    <Tooltip content={tooltip ?? label} side="right" className="w-full">
      {row}
    </Tooltip>
  );
};
