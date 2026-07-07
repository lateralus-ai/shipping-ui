import { cn } from "../../utils/cn";

export type DraftProps = {
  content?: string;
  className?: string;
};

export const Draft = ({
  content = "Based on the inspection report, I recommend scheduling a follow-up survey within 30 days...",
  className,
}: DraftProps) => (
  <div
    className={cn(
      "rounded-control border border-divider-primary bg-background-secondary px-4 py-3",
      className,
    )}
    role="region"
    aria-label="Draft response"
  >
    <p className="mb-2 text-footnote-em text-display-on-light-tertiary">Draft</p>
    <p className="text-body text-display-on-light-primary">{content}</p>
  </div>
);
