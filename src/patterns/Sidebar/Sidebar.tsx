import { IconButton } from "../../primitives";
import { SidebarIcon } from "../../icons";
import { cn } from "../../utils/cn";
import { Account } from "./Account";
import { Activity } from "./Activity";
import { Entry } from "./Entry";
import { Heading } from "./Heading";
import { NewChat } from "./NewChat";
import { Ships } from "./Ships";
import { Switcher, type Chief } from "./Switcher";

export type SidebarProps = {
  chief?: Chief;
  activity?: boolean;
  ships?: boolean;
  collapsed?: boolean;
  className?: string;
};

const placeholderChats = [
  "Hull inspection report review",
  "Port state control checklist",
  "Engine maintenance schedule",
];

export const Sidebar = ({
  chief = "technical",
  activity = true,
  ships = true,
  collapsed = false,
  className,
}: SidebarProps) => (
  <aside
    className={cn(
      "flex h-full flex-col gap-3 border-r border-divider-primary bg-background-primary py-3",
      collapsed ? "w-16" : "w-64",
      className,
    )}
    data-collapsed={collapsed}
    aria-label="Sidebar navigation"
  >
    <div className="flex items-center justify-between px-2">
      <Switcher chief={chief} expanded={!collapsed} />
      {!collapsed && (
        <IconButton hierarchy="quaternary" size="small" aria-label="Toggle sidebar">
          <SidebarIcon />
        </IconButton>
      )}
    </div>

    <NewChat collapsed={collapsed} />

    <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-1">
      <Heading title="Recent chats" collapsed={collapsed} />

      {placeholderChats.map((label, index) => (
        <Entry key={label} state={index === 0 ? "selected" : "idle"} label={label} />
      ))}

      {activity && (
        <>
          <Heading title="Activity" collapsed={collapsed} />
          <Activity chief={chief} empty={false} />
        </>
      )}

      {ships && (
        <>
          <Heading title="Fleet" collapsed={collapsed} collapsible />
          <Ships state={collapsed ? "collapsed" : "expanded"} />
        </>
      )}
    </div>

    <div className="mt-auto border-t border-divider-primary px-1 pt-2">
      <Account collapsed={collapsed} />
    </div>
  </aside>
);
