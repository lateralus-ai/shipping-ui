import { useContext } from "react";
import { IconButton } from "@material-tailwind/react";
import { collapsedContext } from "./Provider";
import CloseSidebarIcon from "../icons/CloseSidebarIcon";
import CloseSidebarMidIcon from "../icons/CloseSidebarMidIcon";

export const ToggleCollapseButton = () => {
  const { isCollapsed, isHovered, toggleCollapsed } =
    useContext(collapsedContext)!;

  if (isCollapsed && !isHovered) {
    return null;
  }

  return (
    <IconButton variant="text" color="gray" onClick={() => toggleCollapsed()}>
      {isCollapsed ? (
        <CloseSidebarIcon className="size-4" />
      ) : (
        <CloseSidebarMidIcon className="size-4" />
      )}
    </IconButton>
  );
};
