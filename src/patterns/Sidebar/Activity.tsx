import { ActivityIcon } from "../../icons";
import { Count } from "../../primitives";
import { cn } from "../../utils/cn";
import type { Chief } from "./Switcher";

export type ActivityProps = {
  chief: Chief;
  empty?: boolean;
  className?: string;
};

const chiefLabels: Record<Chief, string> = {
  technical: "Technical activity",
  compliance: "Compliance activity",
};

export const Activity = ({ chief, empty = false, className }: ActivityProps) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-control px-2 py-1.5",
      className,
    )}
    data-chief={chief}
    data-empty={empty}
  >
    <ActivityIcon className="size-5 shrink-0 text-display-on-light-tertiary" />
    <span className="flex-1 truncate text-caption-2 text-display-on-light-secondary">
      {empty ? "No recent activity" : chiefLabels[chief]}
    </span>
    {!empty && <Count value={3} />}
  </div>
);
