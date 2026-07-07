import { cn } from "../../utils/cn";
import { Avatar } from "../../primitives/Avatar";
import { Button } from "../../primitives/Button";

export type MemberRowState = "idle" | "hover";
export type MemberRowAction = "label" | "button";

export type MemberRowProps = {
  name?: string;
  role?: string;
  state?: MemberRowState;
  action?: MemberRowAction;
  actionLabel?: string;
  className?: string;
};

const stateStyles: Record<MemberRowState, string> = {
  idle: "bg-transparent",
  hover: "bg-background-secondary",
};

export const MemberRow = ({
  name = "Jane Doe",
  role = "Chief Engineer",
  state = "idle",
  action = "label",
  actionLabel = "Admin",
  className,
}: MemberRowProps) => (
  <div
    className={cn(
      "flex w-full items-center justify-between gap-4 rounded-control px-3 py-3 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <div className="flex min-w-0 items-center gap-3">
      <Avatar chief="initials" size={32} initials={name} />
      <div className="min-w-0">
        <p className="truncate text-body-em text-display-on-light-primary">{name}</p>
        <p className="truncate text-caption-2 text-display-on-light-tertiary">{role}</p>
      </div>
    </div>
    {action === "label" ? (
      <span className="shrink-0 text-caption-2-em text-display-on-light-tertiary">{actionLabel}</span>
    ) : (
      <Button hierarchy="tertiary" className="min-h-8 shrink-0 px-3 py-1 text-caption-2">
        Remove
      </Button>
    )}
  </div>
);
