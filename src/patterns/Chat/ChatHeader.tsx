import { Avatar, IconButton } from "../../primitives";
import { MoreIcon } from "../../icons";
import { cn } from "../../utils/cn";
import type { Chief } from "../Sidebar/Switcher";

export type ChatHeaderProps = {
  chief?: Chief;
  title?: string;
  className?: string;
};

const chiefTitles: Record<Chief, string> = {
  technical: "Technical Chief",
  compliance: "Compliance Chief",
};

export const ChatHeader = ({
  chief = "technical",
  title = "Hull inspection report",
  className,
}: ChatHeaderProps) => (
  <header
    className={cn(
      "flex items-center gap-3 border-b border-divider-primary px-4 py-3",
      className,
    )}
  >
    <Avatar chief={chief} size={32} />
    <div className="min-w-0 flex-1">
      <p className="truncate text-caption-2 text-display-on-light-tertiary">
        {chiefTitles[chief]}
      </p>
      <h2 className="truncate text-subheader-em text-display-on-light-primary">{title}</h2>
    </div>
    <IconButton hierarchy="quaternary" size="small" aria-label="More options">
      <MoreIcon />
    </IconButton>
  </header>
);
