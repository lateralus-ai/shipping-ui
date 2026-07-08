import { ChevronIcon } from "../../icons";
import { cn } from "../../utils/cn";
import { sidebarRowInteractiveHover, sidebarSurfaceHover } from "./sidebar-styles";

export type SidebarHeadingProps = {
  title: string;
  /** Figma Collapsed=On — section label with trailing chevron */
  collapsed?: boolean;
  state?: "idle" | "hover";
  className?: string;
};

export const SidebarHeading = ({
  title,
  collapsed = false,
  state = "idle",
  className,
}: SidebarHeadingProps) => (
  <div
    className={cn(
      "flex w-full items-center justify-between rounded-control px-2 py-1",
      state === "hover" && sidebarSurfaceHover,
      state === "idle" && sidebarRowInteractiveHover,
      className,
    )}
    data-collapsed={collapsed}
    data-state={state}
  >
    <span className="truncate text-caption-2 text-display-on-light-secondary">{title}</span>
    {collapsed && (
      <ChevronIcon direction="right" className="size-4 shrink-0 text-display-on-light-primary" />
    )}
  </div>
);

/** @deprecated Use SidebarHeading */
export const Heading = SidebarHeading;
export type HeadingProps = SidebarHeadingProps;
