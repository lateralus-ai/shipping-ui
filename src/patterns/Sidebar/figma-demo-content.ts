export type FigmaActivityIcon = "status" | "statusClosed" | "chat" | "chatPro";

export const FIGMA_ACTIVITY_ENTRIES = [
  { id: "1", label: "Winch Slipping Under Load", href: "#chat-1", count: 1, icon: "status" as const },
  { id: "2", label: "Excessive Vibration Propeller Shaft", href: "#chat-2", icon: "chatPro" as const },
  { id: "3", label: "Winch Slipping Under Load", href: "#chat-3", icon: "chat" as const },
  { id: "4", label: "Freshwater Pressure Drop Causes", href: "#chat-4", icon: "chat" as const },
  { id: "5", label: "Excessive Vibration Propeller Shaft", href: "#chat-5", icon: "status" as const },
  { id: "6", label: "Freshwater Pressure Drop Causes", href: "#chat-6", icon: "statusClosed" as const },
  { id: "7", label: "Rust Prevention On Deck Fittings", href: "#chat-7", icon: "chatPro" as const },
  { id: "8", label: "Persistent Engine Room Oil Leak", href: "#chat-8", icon: "chat" as const },
] as const;

export const FIGMA_SHIP_ENTRIES = [
  { id: "1", name: "The Coral Explorer", href: "#ship-1", count: 3 },
  { id: "2", name: "Silver Wave", href: "#ship-2", count: 1 },
  { id: "3", name: "Ocean Voyager", href: "#ship-3" },
  { id: "4", name: "Albatross Wind", href: "#ship-4" },
] as const;

export const FIGMA_ACCOUNT_NAME = "Panos Tsamoudakis";

export const FIGMA_SECTION_LABEL = "Name";
export const FIGMA_HEADING_LABEL = "Label";
export const FIGMA_ENTRY_LABEL = "New chat";

export const DEMO_SIDEBAR_ENTRY_MENU_ITEMS = [
  { id: "example-1", label: "Example one", onSelect: () => undefined },
  { id: "example-2", label: "Example two", onSelect: () => undefined },
] as const;
