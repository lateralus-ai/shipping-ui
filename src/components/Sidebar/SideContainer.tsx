import { useContext, type ReactNode } from "react"
import { cn } from "../../utils/cn"
import { collapsedContext } from "./Provider"

export interface SideContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const SideContainer = ({
  className,
  children,
  ...props
}: SideContainerProps) => {
  const { isCollapsed, setIsHovered } = useContext(collapsedContext)!

  return (
    <div
      className={cn(
        className,
        isCollapsed && "!hidden",
        "p-2 flex flex-col gap-2 items-center rounded-tl-lg rounded-bl-lg w-16"
      )}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  )
}
