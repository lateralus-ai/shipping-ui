import { Button } from "../../primitives";
import { AddIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type NewChatProps = {
  collapsed?: boolean;
  className?: string;
};

export const NewChat = ({ collapsed = false, className }: NewChatProps) => (
  <div className={cn("px-2", className)} data-collapsed={collapsed}>
    <Button
      hierarchy="primary"
      startIcon={<AddIcon />}
      className={cn("w-full", collapsed && "size-10 min-h-10 px-0")}
      aria-label="New chat"
    >
      <span className={cn(collapsed && "sr-only")}>New chat</span>
    </Button>
  </div>
);
