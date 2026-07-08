import { type MouseEvent } from "react";
import { AddIcon } from "../../icons";
import { Tooltip } from "../../primitives";
import { cn } from "../../utils/cn";
import {
  sidebarNewChatIconHover,
  sidebarNewChatInteractiveHover,
} from "./sidebar-styles";

export type NewChatProps = {
  href?: string;
  collapsed?: boolean;
  state?: "idle" | "hover";
  className?: string;
  presentation?: boolean;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const NewChat = ({
  href = "#new-chat",
  collapsed = false,
  state = "idle",
  presentation = false,
  className,
  onNavigate,
}: NewChatProps) => {
  const isForcedHover = state === "hover";

  const link = (
    <a
      href={href}
      aria-label="New chat"
      onClick={onNavigate}
      className={cn(
        "box-border flex w-full flex-col rounded-control p-2 text-display-on-light-primary",
        collapsed && "items-center justify-center",
        state === "idle" && sidebarNewChatInteractiveHover,
        isForcedHover && "bg-action-primary-hover text-action-primary-on-hover",
        className,
      )}
      data-collapsed={collapsed}
      data-state={state}
    >
      <span className={cn("flex w-full items-center", collapsed ? "justify-center" : "gap-2")}>
        <AddIcon
          size="large"
          filled
          className={cn(
            "size-6 shrink-0",
            isForcedHover
              ? "text-action-primary-on-hover"
              : cn("text-display-on-light-primary", sidebarNewChatIconHover),
          )}
        />
        {!collapsed && (
          <span className="min-w-0 flex-1 truncate text-left text-caption-2 tracking-[0.01em]">
            New chat
          </span>
        )}
      </span>
    </a>
  );

  if (presentation || !collapsed) return link;

  return (
    <Tooltip content="New chat" side="right" className="w-full">
      {link}
    </Tooltip>
  );
};
