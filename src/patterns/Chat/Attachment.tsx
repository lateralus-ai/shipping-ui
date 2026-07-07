import { FileIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type AttachmentProps = {
  name?: string;
  size?: string;
  className?: string;
};

export const Attachment = ({
  name = "inspection-report.pdf",
  size = "2.4 MB",
  className,
}: AttachmentProps) => (
  <div
    className={cn(
      "inline-flex items-center gap-2 rounded-control border border-divider-primary bg-background-secondary px-3 py-2",
      className,
    )}
  >
    <FileIcon className="size-5 shrink-0 text-display-on-light-tertiary" />
    <div className="min-w-0">
      <p className="truncate text-caption-2-em text-display-on-light-primary">{name}</p>
      <p className="text-footnote text-display-on-light-quaternary">{size}</p>
    </div>
  </div>
);
