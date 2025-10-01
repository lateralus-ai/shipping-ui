import { useContext, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { collapsedContext } from "./Provider";

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
