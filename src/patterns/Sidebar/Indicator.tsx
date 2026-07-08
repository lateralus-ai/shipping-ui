import { Logo } from "../../primitives";
import { cn } from "../../utils/cn";
import type { Chief } from "./Switcher";

export type IndicatorProps = {
  chief: Chief;
  className?: string;
};

export const Indicator = ({ chief, className }: IndicatorProps) => (
  <div className={cn("size-6 shrink-0", className)} aria-label={`Active chief: ${chief}`}>
    <Logo chief={chief} className="size-6" />
  </div>
);
