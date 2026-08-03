export { Account, type AccountMenuItem, type AccountProps } from "./Account";
export { ActivityNavGroup, Activity, type ActivityEntry, type ActivityEntryIcon, type ActivityNavGroupProps, type ActivityProps } from "./ActivityNavGroup";
export { CollapsibleNavGroup, Ships, type CollapsibleNavGroupProps, type Ship, type ShipsProps } from "./CollapsibleNavGroup";
export { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from "./constants";
export { Entry, SidebarEntry, type EntryProps, type EntryState, type SidebarEntryMenuItem, type SidebarEntryProps, type SidebarEntryState } from "./SidebarEntry";
export { Heading, SidebarHeading, type HeadingProps, type SidebarHeadingProps } from "./SidebarHeading";
export { Indicator, type IndicatorProps } from "./Indicator";
export { NewChat, type NewChatProps } from "./NewChat";
export { Section, SidebarLink, type SectionProps, type SectionState, type SidebarLinkProps, type SidebarLinkState } from "./SidebarLink";
export { SidebarAction, type SidebarActionProps } from "./SidebarAction";
// `Sidebar` — the whole-sidebar Figma mirror — is deliberately NOT exported.
// It hardcoded `#search`/`#ships`/`#activity` anchors, a placeholder account
// photo and an "Example one / Example two" row menu, so no app could use it;
// it now lives with the stories as `SidebarDemo`. Compose `SidebarShell` with
// `SidebarLink`, `SidebarEntry`, `CollapsibleNavGroup`, `Switcher`, `NewChat`
// and `Account` instead — which is what the consuming app already does.
export { SidebarShell, type SidebarShellProps } from "./SidebarShell";
export { Switcher, type Chief, type SwitcherProps } from "./Switcher";
