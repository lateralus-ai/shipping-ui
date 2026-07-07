import { Count } from "../../primitives";
import { ChevronIcon, TickIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type PillInfoType = "count" | "completed" | "dropdown";

export type PillInfoProps = {
  type?: PillInfoType;
  value?: number;
  label?: string;
  className?: string;
};

export const PillInfo = ({
  type = "count",
  value = 5,
  label = "Filters",
  className,
}: PillInfoProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 text-footnote text-display-on-light-tertiary",
      className,
    )}
    data-type={type}
  >
    {type === "count" && <Count value={value} />}
    {type === "completed" && (
      <>
        <TickIcon className="size-3.5 text-meta-green" />
        <span>Completed</span>
      </>
    )}
    {type === "dropdown" && (
      <>
        <span>{label}</span>
        <ChevronIcon direction="down" className="size-3.5" />
      </>
    )}
  </span>
);
