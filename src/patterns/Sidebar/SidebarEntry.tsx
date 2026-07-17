import { type MouseEvent, type ReactNode, useState } from "react";
import { DropdownMenu, DropdownMenuItem, IconButton } from "../../primitives";
import { MoreIcon } from "../../icons";
import { cn } from "../../utils/cn";
import {
  sidebarEntryHover,
  sidebarEntryIdle,
  sidebarEntrySelected,
  sidebarEntryShell,
  sidebarQuaternaryIconButton,
  sidebarRowInteractiveHover,
} from "./sidebar-styles";

export type SidebarEntryMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  onSelect: () => void;
};

export type SidebarEntryState = "idle" | "hover" | "selected";

export type SidebarEntryProps = {
  href: string;
  label: string;
  state?: SidebarEntryState;
  icon?: ReactNode;
  badge?: ReactNode;
  menuItems?: SidebarEntryMenuItem[];
  forceMenuVisible?: boolean;
  className?: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

const stateStyles: Record<SidebarEntryState, string> = {
  idle: sidebarEntryIdle,
  hover: sidebarEntryHover,
  selected: sidebarEntrySelected,
};

export const SidebarEntry = ({
  href,
  label,
  state = "idle",
  icon,
  badge,
  menuItems,
  forceMenuVisible = false,
  className,
  onNavigate,
}: SidebarEntryProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const showMenu = Boolean(menuItems?.length);
  const menuVisible = forceMenuVisible || menuOpen;

  return (
    <div
      className={cn(
        "group/row relative w-full",
        sidebarEntryShell,
        stateStyles[state],
        state === "idle" && sidebarRowInteractiveHover,
        className,
      )}
      data-state={state}
    >
      {/* Stretch hit target over shell padding (hover was on the shell, link was content-only). */}
      <a
        href={href}
        className="absolute inset-0 z-0 rounded-control"
        aria-label={label}
        aria-current={state === "selected" ? "true" : undefined}
        onClick={onNavigate}
      />

      <div className="pointer-events-none relative z-10 flex min-w-0 flex-1 items-center gap-2 text-caption-2">
        {icon && (
          <span className="shrink-0 px-1 py-0.5 [&>svg]:size-4">{icon}</span>
        )}
        <span className="truncate">{label}</span>
      </div>

      {badge && !(showMenu && menuVisible) && (
        <span
          className={cn(
            "pointer-events-none relative z-10 shrink-0",
            showMenu && !forceMenuVisible && "group-hover/row:hidden",
          )}
        >
          {badge}
        </span>
      )}

      {showMenu && (
        <div className="relative z-10 shrink-0">
          <DropdownMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            align="end"
            trigger={
              <IconButton
                hierarchy="quaternary"
                size="small"
                aria-label={`Actions for ${label}`}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className={cn(
                  "size-6 min-h-6 shrink-0 p-1",
                  sidebarQuaternaryIconButton,
                  !forceMenuVisible &&
                    !menuOpen &&
                    "hidden group-hover/row:inline-flex",
                  (forceMenuVisible || menuOpen) && "inline-flex",
                )}
              >
                <MoreIcon size="small" />
              </IconButton>
            }
          >
            {menuItems?.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className={cn(
                  item.destructive &&
                    "text-red-500 hover:bg-red-50 hover:text-red-700",
                )}
                onSelect={() => item.onSelect()}
              >
                {item.icon && (
                  <span className="shrink-0 [&>svg]:size-4">{item.icon}</span>
                )}
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

/** @deprecated Use SidebarEntry */
export const Entry = SidebarEntry;
export type EntryProps = SidebarEntryProps;
export type EntryState = SidebarEntryState;
