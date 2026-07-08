import { type ReactNode } from "react";
import { SidebarIcon } from "../../icons";
import { DropdownMenu, DropdownMenuItem, IconButton, Tooltip } from "../../primitives";
import { cn } from "../../utils/cn";
import { accountAvatar, accountAvatar24 } from "./figma-assets";
import { FIGMA_ACCOUNT_NAME } from "./figma-demo-content";
import {
  sidebarSectionContent,
  sidebarSectionIconClass,
  sidebarSectionLabelClass,
  sidebarSectionShell,
  sidebarSectionShellCollapsed,
  sidebarSurfaceHover,
  sidebarQuaternaryIconButton,
  sidebarRowInteractiveHover,
} from "./sidebar-styles";

export type AccountMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  onSelect: () => void;
};

export type AccountProps = {
  name?: string;
  avatarSrc?: string;
  collapsed?: boolean;
  /** Storybook / subcomponent grid forced state. */
  state?: "idle" | "hover";
  /** Composed sidebar: true when pointer is over collapsed sidebar (shipping-ai pattern). */
  sidebarHovered?: boolean;
  presentation?: boolean;
  menuItems?: AccountMenuItem[];
  onToggleCollapsed?: () => void;
  className?: string;
};

const defaultMenuItems: AccountMenuItem[] = [
  { id: "settings", label: "Settings", onSelect: () => undefined },
  { id: "logout", label: "Log out", destructive: true, onSelect: () => undefined },
];

const AccountAvatar = ({ src, className }: { src: string; className?: string }) => (
  <img src={src} alt="" className={cn("size-full object-cover", className)} />
);

const AccountRow = ({
  name,
  avatarSrc,
  collapsed,
  state,
  sidebarHovered = false,
  onToggleCollapsed,
  className,
}: Pick<
  AccountProps,
  | "name"
  | "avatarSrc"
  | "collapsed"
  | "state"
  | "sidebarHovered"
  | "onToggleCollapsed"
  | "className"
>) => {
  const showExpandIcon = collapsed && (sidebarHovered || state === "hover");

  if (showExpandIcon) {
    return (
      <div
        className={cn(sidebarSectionShellCollapsed, sidebarSurfaceHover, className)}
        data-collapsed={collapsed}
        data-state="hover"
      >
        <IconButton
          hierarchy="quaternary"
          size="small"
          aria-label="Expand sidebar"
          className={cn("size-6 p-1", sidebarQuaternaryIconButton)}
          onClick={onToggleCollapsed}
        >
          <SidebarIcon size="small" />
        </IconButton>
      </div>
    );
  }

  if (collapsed) {
    return (
      <div
        className={cn(
          sidebarSectionShellCollapsed,
          state === "idle" && sidebarRowInteractiveHover,
          className,
        )}
        data-collapsed={collapsed}
        data-state={state}
      >
        <span className="size-6 shrink-0 overflow-hidden rounded-2xl">
          <AccountAvatar src={avatarSrc ?? accountAvatar24} />
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn("flex h-9 w-full items-center gap-1 pr-2", className)}
      data-collapsed={collapsed}
      data-state={state}
    >
      <div
        className={cn(
          sidebarSectionShell,
          "min-w-0 flex-1",
          state === "hover" && sidebarSurfaceHover,
          state === "idle" && sidebarRowInteractiveHover,
        )}
      >
        <div className={sidebarSectionContent}>
          <span className={cn(sidebarSectionIconClass, "size-4 overflow-hidden rounded-full")}>
            <AccountAvatar src={avatarSrc ?? accountAvatar} />
          </span>
          <span className={sidebarSectionLabelClass}>{name}</span>
        </div>
      </div>
      <IconButton
        hierarchy="quaternary"
        size="small"
        aria-label="Collapse sidebar"
        className={cn("size-6 shrink-0 p-1", sidebarQuaternaryIconButton)}
        onClick={onToggleCollapsed}
      >
        <SidebarIcon size="small" />
      </IconButton>
    </div>
  );
};

export const Account = ({
  name = FIGMA_ACCOUNT_NAME,
  avatarSrc,
  collapsed = false,
  state = "idle",
  sidebarHovered = false,
  presentation = false,
  menuItems = defaultMenuItems,
  onToggleCollapsed,
  className,
}: AccountProps) => {
  const row = (
    <AccountRow
      name={name}
      avatarSrc={avatarSrc}
      collapsed={collapsed}
      state={state}
      sidebarHovered={sidebarHovered}
      onToggleCollapsed={onToggleCollapsed}
      className={className}
    />
  );

  if (presentation) return row;

  if (collapsed && !sidebarHovered && state !== "hover") {
    return (
      <Tooltip content={name} side="right" className="w-full">
        {row}
      </Tooltip>
    );
  }

  if (collapsed) return row;

  return (
    <DropdownMenu side="top" align="start" trigger={row}>
      {menuItems.map((item) => (
        <DropdownMenuItem
          key={item.id}
          className={cn(item.destructive && "text-red-500 hover:bg-red-50 hover:text-red-700")}
          onSelect={(event) => {
            event.preventDefault();
            item.onSelect();
          }}
        >
          {item.icon && <span className="shrink-0 [&>svg]:size-4">{item.icon}</span>}
          {item.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenu>
  );
};
