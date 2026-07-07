import { BookIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type ReferenceProps = {
  title?: string;
  page?: string;
  className?: string;
};

export const Reference = ({
  title = "SOLAS Chapter II-1",
  page = "p. 42",
  className,
}: ReferenceProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex items-center gap-1.5 rounded-control bg-accent-bg-lighter px-2 py-1 text-footnote text-accent-on-light transition-colors hover:bg-accent-bg-light",
      className,
    )}
  >
    <BookIcon className="size-3.5 shrink-0" />
    <span className="truncate">{title}</span>
    {page && <span className="text-display-on-light-quaternary">{page}</span>}
  </button>
);
