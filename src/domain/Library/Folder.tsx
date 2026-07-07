import { cn } from "../../utils/cn";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { FolderIcon } from "../../icons/generated";

export type FolderState = "idle" | "hover" | "selected";

export type FolderProps = {
  name?: string;
  fileCount?: number;
  state?: FolderState;
  className?: string;
};

const stateStyles: Record<FolderState, string> = {
  idle: "bg-transparent text-display-on-light-primary",
  hover: "bg-background-secondary text-display-on-light-primary",
  selected: "bg-background-selected text-display-on-dark-primary",
};

export const Folder = ({
  name = "Certificates",
  fileCount = 24,
  state = "idle",
  className,
}: FolderProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-3 rounded-control px-3 py-3 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    <FolderIcon
      size="small"
      className={state === "selected" ? "text-white" : "text-display-on-light-secondary"}
    />
    <div className="min-w-0 flex-1">
      <p className="truncate text-caption-1-em">{name}</p>
      <p
        className={cn(
          "text-caption-2",
          state === "selected" ? "text-display-on-dark-secondary" : "text-display-on-light-tertiary",
        )}
      >
        {fileCount} files
      </p>
    </div>
    <ChevronIcon
      size="small"
      direction="right"
      className={state === "selected" ? "text-display-on-dark-tertiary" : "text-display-on-light-quaternary"}
    />
  </div>
);
