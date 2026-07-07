import { Avatar } from "../../primitives";
import { cn } from "../../utils/cn";
import type { Chief } from "./Switcher";

export type IndicatorProps = {
  chief: Chief;
  className?: string;
};

export const Indicator = ({ chief, className }: IndicatorProps) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-control bg-background-secondary p-1",
      className,
    )}
    aria-label={`Active chief: ${chief}`}
  >
    <Avatar chief={chief} size={24} />
  </div>
);
