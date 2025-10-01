import { useContext, type ReactNode } from "react";
import { collapsedContext } from "./Provider";

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
