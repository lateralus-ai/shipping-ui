import { ArchiveIcon, PenIcon, SearchIcon, TrashIcon } from "../../icons";
import {
  Account,
  ActivityNavGroup,
  CollapsibleNavGroup,
  Indicator,
  NewChat,
  SidebarEntry,
  SidebarHeading,
  SidebarLink,
} from "../../patterns/Sidebar";
import { FigmaContent, FigmaPage } from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";
import {
  DEMO_ACCOUNT_NAME,
  DEMO_ACTIVITY_ENTRIES,
  DEMO_ENTRY_LABEL,
  DEMO_HEADING_LABEL,
  DEMO_SECTION_LABEL,
  DEMO_SHIP_ENTRIES,
} from "./sidebar-demo-content";
import {
  FIGMA_SIDEBAR_CONTENT,
  FIGMA_SIDEBAR_FRAMES,
  type SidebarSubcomponentSlot,
} from "./figma-sidebar-layout";

const demoMenuItems = [
  { id: "rename", label: "Rename", icon: <PenIcon size="small" />, onSelect: () => undefined },
  { id: "archive", label: "Archive", icon: <ArchiveIcon size="small" />, onSelect: () => undefined },
  {
    id: "delete",
    label: "Delete",
    icon: <TrashIcon size="small" />,
    destructive: true,
    onSelect: () => undefined,
  },
];

const renderSlot = (slot: SidebarSubcomponentSlot) => {
  if (slot.kind === "newChat") {
    return <NewChat collapsed={slot.collapsed} state={slot.state} presentation className="h-full w-full" />;
  }

  if (slot.kind === "indicator") {
    return <Indicator chief={slot.chief} />;
  }

  if (slot.kind === "sidebarLink") {
    return (
      <SidebarLink
        href="#section"
        label={DEMO_SECTION_LABEL}
        icon={<SearchIcon size="small" className="text-display-on-light-primary" />}
        state={slot.state}
        collapsed={slot.collapsed}
        presentation
        tooltip={DEMO_SECTION_LABEL}
      />
    );
  }

  if (slot.kind === "sidebarHeading") {
    return (
      <SidebarHeading
        title={DEMO_HEADING_LABEL}
        state={slot.state}
        collapsed={slot.collapsed}
      />
    );
  }

  if (slot.kind === "sidebarEntry") {
    return (
      <SidebarEntry
        href="#chat-1"
        label={DEMO_ENTRY_LABEL}
        state={slot.state}
        forceMenuVisible={slot.showMenu}
        menuItems={slot.showMenu ? demoMenuItems : undefined}
      />
    );
  }

  if (slot.kind === "ships") {
    return (
      <CollapsibleNavGroup
        href="#ships"
        expanded={slot.expanded ?? false}
        ships={DEMO_SHIP_ENTRIES}
        onExpandedChange={() => undefined}
      />
    );
  }

  if (slot.kind === "activity") {
    return (
      <ActivityNavGroup
        href="#activity"
        chief={slot.chief}
        entries={DEMO_ACTIVITY_ENTRIES}
        empty={slot.empty}
      />
    );
  }

  if (slot.kind === "account") {
    return (
      <Account
        name={DEMO_ACCOUNT_NAME}
        collapsed={slot.collapsed}
        state={slot.state}
        presentation
      />
    );
  }

  return null;
};

export const SidebarCanvas = () => (
  <FigmaPage title="Sidebar" width={FIGMA_WIDTHS.sidebar}>
    <FigmaContent padding={0}>
      <div
        data-figma-sidebar-grid
        className="relative overflow-hidden"
        style={{
          width: FIGMA_SIDEBAR_CONTENT.width,
          height: FIGMA_SIDEBAR_CONTENT.height,
        }}
      >
        <div
          className="relative"
          style={{
            width: FIGMA_SIDEBAR_CONTENT.width,
            height: FIGMA_SIDEBAR_CONTENT.height,
          }}
        >
          {FIGMA_SIDEBAR_FRAMES.map((frame) => (
            <div
              key={frame.name}
              className="absolute rounded border border-dashed border-[#9747FF]"
              style={{
                left: frame.x,
                top: frame.y,
                width: frame.width,
                height: frame.height,
              }}
            >
              {frame.slots.map((slot, index) => (
                <div
                  key={`${frame.name}-${index}`}
                  className="absolute"
                  style={{ left: slot.x, top: slot.y, width: slot.width, height: slot.height }}
                >
                  {renderSlot(slot)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </FigmaContent>
  </FigmaPage>
);
