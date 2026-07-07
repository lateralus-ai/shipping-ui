import { cn } from "../../utils/cn";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { Importance } from "./Importance";

export type QuestionState = "idle" | "hover";
export type QuestionExpanded = "on" | "off";

export type QuestionProps = {
  label?: string;
  state?: QuestionState;
  expanded?: QuestionExpanded;
  className?: string;
};

const stateStyles: Record<QuestionState, string> = {
  idle: "bg-transparent",
  hover: "bg-background-secondary",
};

export const Question = ({
  label = "Are all fire dampers operational and tested within the last 12 months?",
  state = "idle",
  expanded = "on",
  className,
}: QuestionProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-3 rounded-control px-3 py-2 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <Importance importance="normal" status="uncompleted" />
    <p className="min-w-0 flex-1 text-caption-1 text-display-on-light-primary">{label}</p>
    <ChevronIcon
      size="small"
      direction={expanded === "on" ? "down" : "right"}
      className="shrink-0 text-display-on-light-tertiary"
    />
  </div>
);
