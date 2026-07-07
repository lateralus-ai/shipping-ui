import { cn } from "../../utils/cn";
import { Suggestion } from "./Suggestion";

export type SuggestionsProps = {
  className?: string;
};

const placeholderSuggestions = [
  "Summarize the latest inspection findings",
  "What actions are required before next port call?",
  "Compare with previous survey results",
];

export const Suggestions = ({ className }: SuggestionsProps) => (
  <div className={cn("flex flex-col gap-2", className)} role="group" aria-label="Suggestions">
    <p className="text-footnote-em text-display-on-light-tertiary">Suggested prompts</p>
    {placeholderSuggestions.map((label) => (
      <Suggestion key={label} label={label} />
    ))}
  </div>
);
