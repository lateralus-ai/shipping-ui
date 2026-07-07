import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  hint?: boolean;
  className?: string;
};

export const Tooltip = ({ children, content, hint = false, className }: TooltipProps) => (
  <span className={cn("group/tooltip relative inline-flex", className)}>
    {children}
    <span
      role="tooltip"
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-control bg-grey-900 px-2 py-1 text-footnote text-white opacity-0 shadow-raise2 transition-opacity group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
        hint && "whitespace-normal text-center leading-snug",
      )}
    >
      {content}
    </span>
  </span>
);
