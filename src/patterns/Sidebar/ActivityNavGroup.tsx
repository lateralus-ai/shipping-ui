import { type MouseEvent, type ReactNode } from "react";
import { ActivityIcon, ChatIcon, ChatProIcon, StatusIcon } from "../../icons";
import { Count } from "../../primitives";
import { cn } from "../../utils/cn";
import { FIGMA_ACTIVITY_ENTRIES, type FigmaActivityIcon } from "./figma-demo-content";
import { sidebarGroupGap } from "./sidebar-styles";
import { SidebarEntry, type SidebarEntryMenuItem } from "./SidebarEntry";
import { SidebarLink } from "./SidebarLink";
import type { Chief } from "./Switcher";

export type ActivityNavGroupProps = {
  href: string;
  chief: Chief;
  empty?: boolean;
  label?: string;
  icon?: ReactNode;
  className?: string;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
  entryMenuItems?: SidebarEntryMenuItem[];
};

const activityEntryIcon = (icon: FigmaActivityIcon) => {
  if (icon === "status") return <StatusIcon size="small" />;
  if (icon === "statusClosed") return <StatusIcon size="small" variant="closed" />;
  if (icon === "chatPro") return <ChatProIcon size="small" />;
  return <ChatIcon size="small" />;
};

export const ActivityNavGroup = ({
  href,
  chief,
  empty = false,
  label = "Activity",
  icon = <ActivityIcon size="small" className="text-display-on-light-tertiary" />,
  className,
  onNavigate,
  entryMenuItems,
}: ActivityNavGroupProps) => (
  <div
    className={cn("flex w-full max-w-[248px] flex-col", sidebarGroupGap, className)}
    data-chief={chief}
    data-empty={empty}
  >
    <SidebarLink href={href} label={label} icon={icon} onNavigate={onNavigate} />

    {!empty &&
      FIGMA_ACTIVITY_ENTRIES.map((entry) => (
        <SidebarEntry
          key={entry.id}
          href={entry.href}
          label={entry.label}
          icon={activityEntryIcon(entry.icon)}
          badge={
            entry.count ? (
              <Count
                value={entry.count}
                className="min-h-5 min-w-5 bg-red-600 px-0.5 py-0.5 text-[13px] font-medium leading-4 tracking-[0.02em] text-white"
              />
            ) : undefined
          }
          menuItems={entryMenuItems}
        />
      ))}

    {!empty && <SidebarEntry href={href} label="Show all" onNavigate={onNavigate} />}
  </div>
);

/** @deprecated Use ActivityNavGroup */
export const Activity = ActivityNavGroup;
export type ActivityProps = ActivityNavGroupProps;
