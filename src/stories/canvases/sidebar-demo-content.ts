/**
 * Sample sidebar content for the Figma story canvases only.
 *
 * This file used to sit in `src/patterns/Sidebar` and be imported by the
 * published `Account`, `ActivityNavGroup`, `CollapsibleNavGroup` and `Sidebar`
 * components as their prop defaults. Nothing under `src/patterns`, `src/domain`
 * or `src/components` may import it — demo data belongs to stories.
 *
 * The `as const` tuples are gone on purpose: they were what made the component
 * defaults fail to type-check against the mutable `Ship[]` / entry props.
 */
import type { ActivityEntry, Ship } from "../../patterns/Sidebar";

export const DEMO_ACTIVITY_ENTRIES: ActivityEntry[] = [
  { id: "1", label: "Winch Slipping Under Load", href: "#chat-1", count: 1, icon: "status" },
  { id: "2", label: "Excessive Vibration Propeller Shaft", href: "#chat-2", icon: "chatPro" },
  { id: "3", label: "Winch Slipping Under Load", href: "#chat-3", icon: "chat" },
  { id: "4", label: "Freshwater Pressure Drop Causes", href: "#chat-4", icon: "chat" },
  { id: "5", label: "Excessive Vibration Propeller Shaft", href: "#chat-5", icon: "status" },
  { id: "6", label: "Freshwater Pressure Drop Causes", href: "#chat-6", icon: "statusClosed" },
  { id: "7", label: "Rust Prevention On Deck Fittings", href: "#chat-7", icon: "chatPro" },
  { id: "8", label: "Persistent Engine Room Oil Leak", href: "#chat-8", icon: "chat" },
];

export const DEMO_SHIP_ENTRIES: Ship[] = [
  { id: "1", name: "The Coral Explorer", href: "#ship-1", count: 3 },
  { id: "2", name: "Silver Wave", href: "#ship-2", count: 1 },
  { id: "3", name: "Ocean Voyager", href: "#ship-3" },
  { id: "4", name: "Albatross Wind", href: "#ship-4" },
];

export const DEMO_ACCOUNT_NAME = "Panos Tsamoudakis";

export const DEMO_SECTION_LABEL = "Name";
export const DEMO_HEADING_LABEL = "Label";
export const DEMO_ENTRY_LABEL = "New chat";

export const DEMO_SIDEBAR_ENTRY_MENU_ITEMS = [
  { id: "example-1", label: "Example one", onSelect: () => undefined },
  { id: "example-2", label: "Example two", onSelect: () => undefined },
];
