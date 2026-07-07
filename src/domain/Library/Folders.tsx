import { cn } from "../../utils/cn";
import { Folder } from "./Folder";

export type FoldersLayout = "collapsed" | "expanded";

export type FoldersProps = {
  layout?: FoldersLayout;
  folders?: { name: string; fileCount: number; selected?: boolean }[];
  className?: string;
};

const defaultFolders = [
  { name: "Certificates", fileCount: 24, selected: true },
  { name: "Crew documents", fileCount: 12 },
  { name: "Inspection reports", fileCount: 8 },
  { name: "Maintenance logs", fileCount: 31 },
];

export const Folders = ({
  layout = "expanded",
  folders = defaultFolders,
  className,
}: FoldersProps) => {
  const visibleFolders = layout === "collapsed" ? folders.slice(0, 1) : folders;

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-divider-primary bg-background-primary p-2",
        className,
      )}
    >
      {visibleFolders.map((folder) => (
        <Folder
          key={folder.name}
          name={folder.name}
          fileCount={folder.fileCount}
          state={folder.selected ? "selected" : "idle"}
        />
      ))}
    </div>
  );
};
