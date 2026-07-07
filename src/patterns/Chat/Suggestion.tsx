import { BulbIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type SuggestionProps = {
  label?: string;
  className?: string;
};

export const Suggestion = ({
  label = "Summarize the latest inspection findings",
  className,
}: SuggestionProps) => (
  <button
    type="button"
    className={cn(
      "flex items-center gap-2 rounded-control border border-divider-primary bg-background-primary px-3 py-2 text-left text-caption-2 text-display-on-light-secondary transition-colors hover:border-divider-secondary hover:bg-background-hover hover:text-display-on-light-primary",
      className,
    )}
  >
    <BulbIcon className="size-4 shrink-0 text-display-on-light-tertiary" />
    <span>{label}</span>
  </button>
);
