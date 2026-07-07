import { cn } from "../../utils/cn";
import { FileIcon } from "../../icons/generated";
import { SpinnerIcon } from "../../icons/generated";

export type FileState = "idle" | "uploaded" | "uploading" | "waiting" | "huge";

export type FileProps = {
  name?: string;
  meta?: string;
  state?: FileState;
  className?: string;
};

const stateMeta: Record<FileState, string> = {
  idle: "PDF · 2.4 MB",
  uploaded: "Uploaded just now",
  uploading: "Uploading… 64%",
  waiting: "Waiting for upload",
  huge: "PDF · 18.6 MB",
};

export const File = ({
  name = "Safety certificate.pdf",
  meta,
  state = "idle",
  className,
}: FileProps) => {
  const displayMeta = meta ?? stateMeta[state];
  const isHuge = state === "huge";

  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-control px-3 transition-colors",
        isHuge ? "py-3" : "py-2",
        state === "uploading" && "bg-blue-50",
        state === "waiting" && "bg-orange-50",
        className,
      )}
    >
      {state === "uploading" ? (
        <SpinnerIcon size="small" className="text-blue-600" />
      ) : (
        <FileIcon size={isHuge ? "large" : "small"} className="text-display-on-light-secondary" />
      )}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-display-on-light-primary",
            isHuge ? "text-body-em" : "text-caption-1",
          )}
        >
          {name}
        </p>
        <p className="truncate text-caption-2 text-display-on-light-tertiary">{displayMeta}</p>
      </div>
    </div>
  );
};
