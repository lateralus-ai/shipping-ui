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
      isHovered: boolean;
      setIsHovered: (value: boolean) => void;
    }
  | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
  isCollapsed?: boolean;
  onSwitchLayout?: (isCollapsed: boolean) => void;
}

export const Provider = ({
  children,
  isCollapsed: controlledIsCollapsed,
  onSwitchLayout,
}: ProviderProps) => {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isCollapsed =
    controlledIsCollapsed !== undefined
      ? controlledIsCollapsed
      : internalIsCollapsed;

  const toggleCollapsed = (value?: boolean) => {
    const newValue = value ?? !isCollapsed;

    if (controlledIsCollapsed === undefined) {
      setInternalIsCollapsed(newValue);
    }

    onSwitchLayout?.(newValue);
  };

  return (
    <collapsedContext.Provider
      value={{ isCollapsed, toggleCollapsed, isHovered, setIsHovered }}
    >
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
  const { isCollapsed, isHovered, setIsHovered } =
    useContext(collapsedContext)!;

  return (
    <div
      className={cn(
        className,
        isCollapsed && "shadow-lg",
        isCollapsed && !isHovered ? "w-auto" : "w-[280px]",
        "bg-gray-50 p-2 flex flex-col justify-between items-center rounded-lg",
      )}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarProps extends ContainerProps {
  isCollapsed?: boolean;
  onSwitchLayout?: (isCollapsed: boolean) => void;
}

export const Sidebar = ({
  className,
  children,
  isCollapsed,
  onSwitchLayout,
  ...props
}: SidebarProps) => {
  return (
    <Provider isCollapsed={isCollapsed} onSwitchLayout={onSwitchLayout}>
      <Container className={className} {...props}>
        {children}
      </Container>
    </Provider>
  );
};

export const Layout = ({
  className,
  children,
  isCollapsed,
  onSwitchLayout,
  ...props
}: SidebarProps) => {
  return (
    <Provider isCollapsed={isCollapsed} onSwitchLayout={onSwitchLayout}>
      <Container className={className} {...props}>
        {children}
      </Container>
    </Provider>
  );
};

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
}

export const Button = ({ icon, children, ...props }: ButtonProps) => {
  const { isCollapsed, isHovered } = useContext(collapsedContext)!;

  return (
    <button
      className="flex items-center gap-2 w-full hover:bg-gray-100 text-caption-1-em text-gray-600 hover:text-gray-900 h-[38px] rounded-lg px-2"
      {...props}
    >
      {icon} {(!isCollapsed || isHovered) && children}
    </button>
  );
};

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

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  icon?: ReactNode;
  isActive?: boolean;
  trailing?: ReactNode;
}

export const Item = ({
  children,
  className,
  icon,
  isActive,
  trailing,
  ...props
}: ItemProps) => {
  const { isCollapsed, isHovered } = useContext(collapsedContext)!;

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
        {(!isCollapsed || isHovered) && children}
      </div>

      {(!isCollapsed || isHovered) && trailing}
    </div>
  );
};

interface SecondaryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  icon?: ReactNode;
  isActive?: boolean;
  trailing?: ReactNode;
}

export const SecondaryItem = ({
  children,
  className,
  isActive,
  trailing,
  icon,
  ...props
}: SecondaryItemProps) => {
  const { isCollapsed, isHovered } = useContext(collapsedContext)!;

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
        {icon} {(!isCollapsed || isHovered) && children}
      </div>

      {(!isCollapsed || isHovered) && trailing}
    </div>
  );
};
