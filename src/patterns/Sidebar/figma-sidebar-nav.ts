import type { Chief } from "./Switcher";

export type FigmaNavItemId =
  | "search"
  | "workflows"
  | "analytics"
  | "forms"
  | "ships"
  | "defectReports"
  | "tasks"
  | "knowledge"
  | "activity";

export type FigmaCollapsedNavItem = {
  id: FigmaNavItemId;
  unread?: boolean;
};

export type FigmaSidebarNavConfig = {
  expandedItems: FigmaNavItemId[];
  collapsedItems: FigmaCollapsedNavItem[];
};

const technicalExpanded: FigmaNavItemId[] = [
  "search",
  "workflows",
  "analytics",
  "ships",
  "defectReports",
  "knowledge",
  "activity",
];

const complianceExpanded: FigmaNavItemId[] = [
  "search",
  "workflows",
  "forms",
  "ships",
  "tasks",
  "knowledge",
  "analytics",
  "activity",
];

const technicalCollapsed: FigmaCollapsedNavItem[] = [
  { id: "search" },
  { id: "workflows" },
  { id: "analytics" },
  { id: "ships", unread: true },
  { id: "defectReports" },
  { id: "activity", unread: true },
];

const complianceCollapsed: FigmaCollapsedNavItem[] = [
  { id: "search" },
  { id: "workflows", unread: true },
  { id: "ships" },
  { id: "tasks" },
  { id: "knowledge" },
  { id: "analytics" },
  { id: "activity", unread: true },
];

export const FIGMA_NAV_LABELS: Record<FigmaNavItemId, string> = {
  search: "Search",
  workflows: "Workflows",
  analytics: "Analytics",
  forms: "Forms",
  ships: "Ships",
  defectReports: "Defect Reports",
  tasks: "Tasks",
  knowledge: "Knowledge",
  activity: "Activity",
};

export const getFigmaSidebarNav = (chief: Chief): FigmaSidebarNavConfig => ({
  expandedItems: chief === "compliance" ? complianceExpanded : technicalExpanded,
  collapsedItems: chief === "compliance" ? complianceCollapsed : technicalCollapsed,
});
