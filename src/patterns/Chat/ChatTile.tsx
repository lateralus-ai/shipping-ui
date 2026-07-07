import { ChatIcon } from "../../icons";
import { Avatar } from "../../primitives";
import { cn } from "../../utils/cn";
import type { Chief } from "../Sidebar/Switcher";

export type ChatTileProps = {
  chief?: Chief;
  title?: string;
  preview?: string;
  timestamp?: string;
  className?: string;
};

export const ChatTile = ({
  chief = "technical",
  title = "Hull inspection report",
  preview = "Based on the inspection data, all critical systems are operating...",
  timestamp = "2h ago",
  className,
}: ChatTileProps) => (
  <button
    type="button"
    className={cn(
      "flex w-full items-start gap-3 rounded-control border border-divider-primary bg-background-primary p-3 text-left transition-colors hover:border-divider-secondary hover:bg-background-hover",
      className,
    )}
  >
    <Avatar chief={chief} size={32} />
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-caption-1-em text-display-on-light-primary">{title}</span>
        <span className="shrink-0 text-footnote text-display-on-light-quaternary">{timestamp}</span>
      </div>
      <p className="mt-0.5 line-clamp-2 text-caption-2 text-display-on-light-secondary">
        {preview}
      </p>
    </div>
    <ChatIcon className="size-4 shrink-0 text-display-on-light-quaternary" />
  </button>
);
