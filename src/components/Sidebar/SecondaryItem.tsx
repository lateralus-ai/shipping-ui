import { useContext, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { collapsedContext } from "./Provider";

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
