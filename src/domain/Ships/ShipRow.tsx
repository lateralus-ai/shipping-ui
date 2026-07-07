import { cn } from "../../utils/cn";
import { Count } from "../../primitives/Count";

export type ShipRowState = "idle" | "hover";

export type ShipRowProps = {
  name?: string;
  chatCount?: number;
  issueCount?: number;
  unreadCount?: number;
  state?: ShipRowState;
  className?: string;
};

const stateStyles: Record<ShipRowState, string> = {
  idle: "bg-transparent",
  hover: "bg-background-secondary",
};

export const ShipRow = ({
  name = "Ship name",
  chatCount = 17,
  issueCount = 12,
  unreadCount = 8,
  state = "idle",
  className,
}: ShipRowProps) => (
  <div
    className={cn(
      "flex w-full flex-col rounded-control p-2 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <div className="flex items-center justify-between gap-2">
      <p className="min-w-0 flex-1 truncate text-body-em text-display-on-light-primary">{name}</p>
      {unreadCount > 0 && <Count value={unreadCount} className="bg-red-600" />}
    </div>
    <div className="mt-1 flex gap-4 text-caption-2 text-display-on-light-secondary">
      <span>
        <span className="text-caption-2-em">{chatCount}</span> Chats
      </span>
      <span>
        <span className="text-caption-2-em">{issueCount}</span> Issues
      </span>
    </div>
  </div>
);
