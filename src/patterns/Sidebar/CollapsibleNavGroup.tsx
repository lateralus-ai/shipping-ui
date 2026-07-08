import { type MouseEvent, type ReactNode } from "react";
import { ChevronIcon, ShipIcon } from "../../icons";
import { Count, IconButton } from "../../primitives";
import { cn } from "../../utils/cn";
import { FIGMA_SHIP_ENTRIES } from "./figma-demo-content";
import { sidebarGroupGap, sidebarQuaternaryIconButton } from "./sidebar-styles";
import { SidebarEntry, type SidebarEntryMenuItem } from "./SidebarEntry";
import { SidebarLink } from "./SidebarLink";

export type Ship = {
  id: string;
  name: string;
  href?: string;
  count?: number;
};

export type CollapsibleNavGroupProps = {
  href: string;
  label?: string;
  icon?: ReactNode;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  ships?: Ship[];
  className?: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
  entryMenuItems?: SidebarEntryMenuItem[];
};

export const CollapsibleNavGroup = ({
  href,
  label = "Ships",
  icon = <ShipIcon size="small" className="text-display-on-light-primary" />,
  expanded,
  onExpandedChange,
  ships = FIGMA_SHIP_ENTRIES,
  className,
  onNavigate,
  entryMenuItems,
}: CollapsibleNavGroupProps) => (
  <div
    className={cn("flex w-full max-w-[264px] flex-col", sidebarGroupGap, className)}
    data-expanded={expanded}
  >
    <SidebarLink
      href={href}
      label={label}
      icon={icon}
      tall
      onNavigate={onNavigate}
      trailing={
        <IconButton
          hierarchy="quaternary"
          size="small"
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${label}` : `Expand ${label}`}
          className={cn("size-6 shrink-0 p-1", sidebarQuaternaryIconButton)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onExpandedChange(!expanded);
          }}
        >
          <ChevronIcon
            direction="right"
            className={cn(
              "size-4 transition-transform duration-200 ease-in-out",
              expanded && "rotate-90",
            )}
          />
        </IconButton>
      }
    />

    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className={cn("flex min-h-0 flex-col overflow-hidden", sidebarGroupGap)}>
        {ships.map((ship) => (
          <SidebarEntry
            key={ship.id}
            href={ship.href ?? `#${ship.id}`}
            label={ship.name}
            icon={<ShipIcon size="small" className="text-display-on-light-primary" />}
            badge={
              ship.count ? (
                <Count
                  value={ship.count}
                  className="min-h-5 min-w-5 bg-red-600 px-0.5 py-0.5 text-[13px] font-medium leading-4 tracking-[0.02em] text-white"
                />
              ) : undefined
            }
            menuItems={entryMenuItems}
          />
        ))}
      </div>
    </div>
  </div>
);

/** @deprecated Use CollapsibleNavGroup */
export const Ships = CollapsibleNavGroup;
export type ShipsProps = CollapsibleNavGroupProps;
export type ShipsState = "collapsed" | "expanded";
