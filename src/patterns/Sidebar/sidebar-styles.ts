import { cn } from "../../utils/cn";

/** Figma sidebar surfaces use translucent grey overlays, not solid background-hover tokens. */
export const sidebarSurfaceHover = "bg-[rgba(38,36,32,0.04)]";
export const sidebarSurfaceSelected = "bg-[rgba(38,36,32,0.08)]";

/** 8px between top-level sidebar blocks (Figma Top gap). */
export const sidebarBlockGap = "gap-2";

/** 4px between entries inside a group (Activity, Ships). */
export const sidebarGroupGap = "gap-1";

/** Section row shell — 36px total (Figma Section symbols). */
export const sidebarSectionShell =
  "box-border flex h-9 w-full items-center rounded-control p-2";

/** Taller section row — 40px (New chat, Ships header). */
export const sidebarSectionShellTall =
  "box-border flex h-10 w-full items-center rounded-control p-2";

/** Collapsed icon-only section — Figma Section/Collapsed On: w-full, p-2, 16px icon. */
export const sidebarSectionShellCollapsed =
  "relative box-border flex w-full flex-col items-center justify-center rounded-control p-2";

/** Figma Indicator overlay — 24×24 anchored top-left of icon content. */
export const sidebarUnreadOverlay =
  "pointer-events-none absolute left-0 top-0 size-6";

/** Figma unread dot — ~6px, top-right of the 24px indicator overlay. */
export const sidebarUnreadDot =
  "absolute right-0 top-0 size-1.5 rounded-full bg-[#802c20]";

/** Icon + label row inside a section shell — no extra inset (shell already has p-2). */
export const sidebarSectionContent = "flex w-full min-w-0 items-center gap-2";

export const sidebarSectionIconClass = "shrink-0 [&>svg]:size-4";

export const sidebarSectionLabelClass =
  "min-w-0 flex-1 truncate text-caption-2 tracking-[0.01em]";

/** Figma sidebar icon buttons — transparent idle, grey hover (no white fill). */
export const sidebarQuaternaryIconButton =
  "bg-transparent text-action-quaternary-on-idle hover:bg-[rgba(38,36,32,0.04)] hover:text-action-quaternary-on-hover disabled:bg-transparent disabled:opacity-50";

/** Scrollable nav region — thin thumb flush to the right edge (matches shipping-ai). */
export const sidebarScrollRegion =
  "sidebar-scroll flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto";

/** Nav row — grey hover surface (Section, Entry, collapsed + expanded). */
export const sidebarRowInteractiveHover =
  "transition-colors hover:bg-[rgba(38,36,32,0.04)] hover:text-display-on-light-primary";

/** @deprecated Use sidebarRowInteractiveHover */
export const sidebarCollapsedRowHover = sidebarRowInteractiveHover;

/** New chat — primary blue hover (Figma New chat Hover variant). */
export const sidebarNewChatInteractiveHover =
  "group/newchat transition-colors hover:bg-action-primary-hover hover:text-action-primary-on-hover";

export const sidebarNewChatIconHover =
  "group-hover/newchat:text-action-primary-on-hover";

export const sidebarLinkIdle = "text-display-on-light-secondary";

export const sidebarLinkHover =
  cn(sidebarSurfaceHover, "text-display-on-light-primary");

export const sidebarLinkActive =
  cn(sidebarSurfaceSelected, "text-display-on-light-primary");

export const sidebarEntryIdle = "text-display-on-light-secondary";
export const sidebarEntryHover = cn(sidebarSurfaceHover, "text-display-on-light-primary");
export const sidebarEntrySelected = cn(sidebarSurfaceSelected, "text-display-on-light-primary");

/** Entry row — Figma min-h-[36px] px-[8px] py-[6px]. */
export const sidebarEntryShell =
  "box-border flex h-9 w-full items-center gap-1 rounded-control px-2 py-1.5";

export const sidebarRowPadding = "px-2 py-1.5";
export const sidebarRowMinHeight = "min-h-9";
export const sidebarRowRadius = "rounded-control";

export const sidebarRowClass = (className?: string) =>
  cn(
    "group/row relative flex w-full items-center gap-1",
    sidebarRowPadding,
    sidebarRowMinHeight,
    sidebarRowRadius,
    className,
  );

export const sidebarAnchorClass = (className?: string) =>
  cn(
    "flex min-w-0 flex-1 items-center gap-2 truncate text-left text-caption-2 transition-colors",
    className,
  );

export const sidebarSectionAnchorClass = (className?: string) =>
  cn(
    "flex min-w-0 flex-1 items-center gap-2 truncate text-left text-caption-2 transition-colors",
    className,
  );
