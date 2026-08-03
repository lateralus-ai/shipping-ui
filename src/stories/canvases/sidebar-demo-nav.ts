/**
 * The nav item set the Figma sidebar frames show, per product. Story fixture
 * only — the hrefs it drives are `#anchor`s. It used to live beside the
 * published components and be imported by `Sidebar`.
 */
import type { Chief } from "../../patterns/Sidebar";

export type DemoNavItemId =
  | "search"
  | "workflows"
  | "analytics"
  | "forms"
  | "ships"
  | "defectReports"
  | "tasks"
  | "knowledge"
  | "activity";

export type DemoCollapsedNavItem = {
  id: DemoNavItemId;
  unread?: boolean;
};

export type DemoSidebarNavConfig = {
  expandedItems: DemoNavItemId[];
  collapsedItems: DemoCollapsedNavItem[];
};

const technicalExpanded: DemoNavItemId[] = [
  "search",
  "workflows",
  "analytics",
  "ships",
  "defectReports",
  "knowledge",
  "activity",
];

const complianceExpanded: DemoNavItemId[] = [
  "search",
  "workflows",
  "forms",
  "ships",
  "tasks",
  "knowledge",
  "analytics",
  "activity",
];

const technicalCollapsed: DemoCollapsedNavItem[] = [
  { id: "search" },
  { id: "workflows" },
  { id: "analytics" },
  { id: "ships", unread: true },
  { id: "defectReports" },
  { id: "activity", unread: true },
];

const complianceCollapsed: DemoCollapsedNavItem[] = [
  { id: "search" },
  { id: "workflows", unread: true },
  { id: "ships" },
  { id: "tasks" },
  { id: "knowledge" },
  { id: "analytics" },
  { id: "activity", unread: true },
];

export const DEMO_NAV_LABELS: Record<DemoNavItemId, string> = {
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

export const getDemoSidebarNav = (chief: Chief): DemoSidebarNavConfig => ({
  expandedItems: chief === "compliance" ? complianceExpanded : technicalExpanded,
  collapsedItems: chief === "compliance" ? complianceCollapsed : technicalCollapsed,
});
