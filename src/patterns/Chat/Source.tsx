import { DocumentIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type SourceProps = {
  title?: string;
  excerpt?: string;
  className?: string;
};

export const Source = ({
  title = "ISM Code Section 10",
  excerpt = "The company should establish procedures to ensure that the ship is maintained in conformity with the provisions of the relevant rules and regulations...",
  className,
}: SourceProps) => (
  <div
    className={cn(
      "rounded-control border border-divider-primary bg-background-primary p-3",
      className,
    )}
  >
    <div className="mb-1 flex items-center gap-2">
      <DocumentIcon className="size-4 shrink-0 text-display-on-light-tertiary" />
      <span className="text-caption-2-em text-display-on-light-primary">{title}</span>
    </div>
    <p className="line-clamp-2 text-caption-2 text-display-on-light-secondary">{excerpt}</p>
  </div>
);
