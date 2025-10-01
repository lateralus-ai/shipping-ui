import { createContext, useContext, useState, type ReactNode } from "react";
import { IconButton } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import { cn } from "../utils/cn";
import ExpandIcon from "./icons/ExpandIcon";
import CloseSidebarIcon from "./icons/CloseSidebarIcon";
import CloseSidebarMidIcon from "./icons/CloseSidebarMidIcon";

const collapsedContext = createContext<
  | {
      isCollapsed: boolean;
      toggleCollapsed: () => void;
    }
  | undefined
>(undefined);

export const Provider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = (value?: boolean) => {
    setIsCollapsed((c) => value ?? !c);
  };

  return (
    <collapsedContext.Provider value={{ isCollapsed, toggleCollapsed }}>
      {children}
    </collapsedContext.Provider>
  );
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Container = ({
  className,
  children,
  ...props
}: ContainerProps) => {
  const { isCollapsed } = useContext(collapsedContext);

  return (
    <div
      className={cn(
        className,
        isCollapsed && "shadow-lg",
        "bg-gray-50 p-2 flex flex-col justify-between items-center rounded-lg w-[280px]",
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ icon, children, ...props }: ButtonProps) => {
  return (
    <button
      className="flex items-center gap-2 w-full hover:bg-gray-100 text-caption-1-em text-gray-600 hover:text-gray-900 h-[38px] rounded-lg px-2"
      {...props}
    >
      {icon} {children}
    </button>
  );
};

export const ToggleCollapseButton = () => {
  const { isCollapsed, toggleCollapsed } = useContext(collapsedContext)!;

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

export const Item = ({
  children,
  className,
  icon,
  isActive,
  trailing,
  ...props
}) => {
  const { isCollapsed } = useContext(collapsedContext);

  return (
    <div
      className={cn(
        isActive ? "!text-gray-900" : "!text-gray-600",
        "flex items-center justify-between w-full hover:bg-gray-100 text-caption-1-em hover:text-gray-900 h-[38px] rounded-lg px-2 cursor-pointer group",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon}
        {children}
      </div>

      {trailing}
    </div>
  );
};

export const SecondaryItem = ({
  children,
  className,
  isActive,
  trailing,
  icon,
  ...props
}) => {
  return (
    <div
      className={cn(
        isActive ? "!text-gray-900" : "!text-gray-600",
        "flex items-center justify-between w-full hover:bg-gray-100 text-caption-1-em hover:text-gray-900 h-[38px] rounded-lg pr-2 pl-3 cursor-pointer group text-sm",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 overflow-auto">
        {icon} {children}
      </div>

      {trailing}
    </div>
  );
};
