import { type MouseEvent, type ReactNode, useState } from "react";
import {
  ActivityIcon,
  AnalyticsIcon,
  BookIcon,
  DefectReportIcon,
  FormsIcon,
  SearchIcon,
  ShipIcon,
  TasksIcon,
  WorkflowIcon,
} from "../../icons";
import { cn } from "../../utils/cn";import { Account } from "./Account";
import { ActivityNavGroup } from "./ActivityNavGroup";
import { CollapsibleNavGroup } from "./CollapsibleNavGroup";
import { DEMO_SIDEBAR_ENTRY_MENU_ITEMS } from "./figma-demo-content";
import {
  FIGMA_NAV_LABELS,
  getFigmaSidebarNav,
  type FigmaNavItemId,
} from "./figma-sidebar-nav";
import { NewChat } from "./NewChat";
import { SidebarLink } from "./SidebarLink";
import { Switcher, type Chief } from "./Switcher";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from "./constants";
import { sidebarBlockGap, sidebarScrollRegion } from "./sidebar-styles";
import type { SidebarEntryMenuItem } from "./SidebarEntry";

export type SidebarProps = {
  chief?: Chief;
  activity?: boolean;
  /** Figma layouts: initial ships expanded. Interactive: toggles via chevron. */
  ships?: boolean;
  collapsed?: boolean;
  showSearch?: boolean;
  /** Frozen Figma grid — no toggles or menus. */
  presentation?: boolean;
  className?: string;
};

const navHref = (id: FigmaNavItemId) =>
  `#${id.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

const navIcons: Record<FigmaNavItemId, ReactNode> = {
  search: <SearchIcon size="small" className="text-display-on-light-primary" />,
  workflows: <WorkflowIcon size="small" className="text-display-on-light-primary" />,
  analytics: <AnalyticsIcon size="small" className="text-display-on-light-primary" />,
  forms: <FormsIcon size="small" className="text-display-on-light-primary" />,
  ships: <ShipIcon size="small" className="text-display-on-light-primary" />,
  defectReports: <DefectReportIcon size="small" className="text-display-on-light-primary" />,
  tasks: <TasksIcon size="small" className="text-display-on-light-primary" />,
  knowledge: <BookIcon size="small" className="text-display-on-light-primary" />,
  activity: <ActivityIcon size="small" className="text-display-on-light-tertiary" />,
};

const collapsedNavIcons: Record<FigmaNavItemId, ReactNode> = {
  search: <SearchIcon size="small" />,
  workflows: <WorkflowIcon size="small" />,
  analytics: <AnalyticsIcon size="small" />,
  forms: <FormsIcon size="small" />,
  ships: <ShipIcon size="small" />,
  defectReports: <DefectReportIcon size="small" />,
  tasks: <TasksIcon size="small" />,
  knowledge: <BookIcon size="small" />,
  activity: <ActivityIcon size="small" />,
};

type RenderNavOptions = {
  chief: Chief;
  activity: boolean;
  shipsExpanded: boolean;
  onShipsExpandedChange: (expanded: boolean) => void;
  presentation: boolean;
  showSearch: boolean;
  entryMenuItems?: SidebarEntryMenuItem[];
};

const renderShipsItem = (
  label: string,
  href: string,
  icon: ReactNode,
  { shipsExpanded, onShipsExpandedChange, presentation, entryMenuItems }: RenderNavOptions,
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void,
) => (
  <CollapsibleNavGroup
    href={href}
    label={label}
    icon={icon}
    expanded={shipsExpanded}
    onNavigate={onNavigate}
    onExpandedChange={presentation ? () => undefined : onShipsExpandedChange}
    entryMenuItems={entryMenuItems}
  />
);

const renderActivityItem = (
  href: string,
  label: string,
  icon: ReactNode,
  { chief, activity, entryMenuItems }: RenderNavOptions,
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void,
) => {
  if (activity) {
    return (
      <ActivityNavGroup
        href={href}
        chief={chief}
        icon={icon}
        onNavigate={onNavigate}
        entryMenuItems={entryMenuItems}
      />
    );
  }

  return (
    <SidebarLink href={href} label={label} icon={icon} onNavigate={onNavigate} />
  );
};

const renderFigmaExpandedItem = (
  id: FigmaNavItemId,
  options: RenderNavOptions,
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void,
) => {
  const label = FIGMA_NAV_LABELS[id];

  if (id === "ships") {
    return (
      <div key={id}>
        {renderShipsItem(label, navHref(id), navIcons.ships, options, onNavigate)}
      </div>
    );
  }

  if (id === "activity") {
    return (
      <div key={id}>
        {renderActivityItem(navHref(id), label, navIcons.activity, options, onNavigate)}
      </div>
    );
  }

  return (
    <SidebarLink
      key={id}
      href={navHref(id)}
      label={label}
      icon={navIcons[id]}
      onNavigate={onNavigate}
    />
  );
};

const renderDefaultExpandedNav = (
  options: RenderNavOptions,
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void,
) => (
  <>
    {options.showSearch && (
      <SidebarLink
        href="#search"
        label="Search"
        icon={navIcons.search}
        onNavigate={onNavigate}
      />
    )}

    <SidebarLink
      href="#workflows"
      label="Workflows"
      icon={navIcons.workflows}
      onNavigate={onNavigate}
    />

    <SidebarLink
      href="#analytics"
      label="Analytics"
      icon={navIcons.analytics}
      onNavigate={onNavigate}
    />

    {renderShipsItem("Ships", "#ships", navIcons.ships, options, onNavigate)}

    <SidebarLink
      href="#defect-reports"
      label="Defect Reports"
      icon={navIcons.defectReports}
      onNavigate={onNavigate}
    />

    <SidebarLink
      href="#knowledge"
      label="Knowledge"
      icon={navIcons.knowledge}
      onNavigate={onNavigate}
    />

    {renderActivityItem("#activity", "Activity", navIcons.activity, options, onNavigate)}
  </>
);

export const Sidebar = ({
  chief = "technical",
  activity = true,
  ships = true,
  collapsed = false,
  showSearch = true,
  presentation = false,
  className,
}: SidebarProps) => {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [shipsExpanded, setShipsExpanded] = useState(ships);
  const [activeChief, setActiveChief] = useState(chief);
  const figmaNav = getFigmaSidebarNav(activeChief);

  const isSidebarCollapsed = presentation ? collapsed : isCollapsed;
  const isShipsExpanded = presentation ? ships : shipsExpanded;
  const resolvedChief = presentation ? chief : activeChief;

  const entryMenuItems = presentation
    ? undefined
    : [...DEMO_SIDEBAR_ENTRY_MENU_ITEMS];

  const navOptions: RenderNavOptions = {
    chief: resolvedChief,
    activity,
    shipsExpanded: isShipsExpanded,
    onShipsExpandedChange: setShipsExpanded,
    presentation,
    showSearch,
    entryMenuItems,
  };

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const handleCollapsedExpandClick = (event: MouseEvent<HTMLDivElement>) => {
    if (presentation || !isSidebarCollapsed) return;

    const target = event.target as HTMLElement;
    const isInteractive =
      target.closest('button, a, [role="button"], [role="menuitem"]') !== null;

    if (isInteractive) return;

    setIsCollapsed(false);
  };

  const renderCollapsedNav = () => {
    const items = presentation
      ? figmaNav.collapsedItems
      : figmaNav.collapsedItems.filter(({ id }) => {
          if (id === "activity") return activity;
          if (id === "ships") return true;
          return showSearch || id !== "search";
        });

    return items.map(({ id, unread }) => (
      <SidebarLink
        key={id}
        href={navHref(id)}
        label={FIGMA_NAV_LABELS[id]}
        icon={collapsedNavIcons[id]}
        collapsed
        unread={unread}
        presentation={presentation}
        tooltip={presentation ? undefined : FIGMA_NAV_LABELS[id]}
        onNavigate={handleNavigate}
      />
    ));
  };

  const renderExpandedNav = () => {
    if (presentation) {
      return figmaNav.expandedItems.map((id) =>
        renderFigmaExpandedItem(id, navOptions, handleNavigate),
      );
    }

    if (chief === "compliance") {
      return figmaNav.expandedItems.map((id) =>
        renderFigmaExpandedItem(id, navOptions, handleNavigate),
      );
    }

    return renderDefaultExpandedNav(navOptions, handleNavigate);
  };

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col overflow-hidden border-r border-divider-primary bg-background-secondary",
        "transition-[width,padding] duration-200 ease-in-out",
        isSidebarCollapsed ? "p-2" : "p-4",
        className,
      )}
      style={{
        width: isSidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
      }}
      data-collapsed={isSidebarCollapsed}
      data-chief={resolvedChief}
      aria-label="Sidebar navigation"
      onMouseEnter={() => isSidebarCollapsed && setSidebarHovered(true)}
      onMouseLeave={() => isSidebarCollapsed && setSidebarHovered(false)}
    >
      <div className={cn("flex min-h-0 flex-1 flex-col", sidebarBlockGap)}>
        <div className={cn("flex shrink-0 flex-col", sidebarBlockGap)}>
          <Switcher
            chief={resolvedChief}
            expanded={!isSidebarCollapsed}
            onChiefChange={presentation ? undefined : setActiveChief}
          />

          <NewChat
            collapsed={isSidebarCollapsed}
            presentation={presentation}
            onNavigate={handleNavigate}
          />
        </div>

        <div
          className={cn(
            sidebarScrollRegion,
            sidebarBlockGap,
            isSidebarCollapsed ? "-mr-2 pr-2" : "-mr-4 pr-4",
          )}
        >
          {!isSidebarCollapsed && (
            <div className={cn("flex flex-col", sidebarBlockGap)}>{renderExpandedNav()}</div>
          )}

          {isSidebarCollapsed && (
            <div
              className={cn(
                "flex min-h-0 flex-1 flex-col",
                !presentation && "cursor-col-resize",
              )}
              onClick={handleCollapsedExpandClick}
            >
              <div className={cn("flex w-full flex-col", sidebarBlockGap)}>
                {renderCollapsedNav()}
              </div>
              <div className="min-h-0 flex-1" aria-hidden />
            </div>
          )}
        </div>

        <div className="shrink-0">
          <Account
            collapsed={isSidebarCollapsed}
            sidebarHovered={sidebarHovered}
            presentation={presentation}
            onToggleCollapsed={
              presentation ? undefined : () => setIsCollapsed((value) => !value)
            }
          />
        </div>
      </div>
    </aside>
  );
};
