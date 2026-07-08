import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export type TooltipSide = "top" | "right" | "bottom" | "left";

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  hint?: boolean;
  side?: TooltipSide;
  className?: string;
};

export const TooltipProvider = TooltipPrimitive.Provider;

export const Tooltip = ({
  children,
  content,
  hint = false,
  side = "top",
  className,
}: TooltipProps) => (
  <TooltipPrimitive.Root>
    <TooltipPrimitive.Trigger asChild>
      <span className={cn("inline-flex", className)}>{children}</span>
    </TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        sideOffset={6}
        collisionPadding={8}
        className={cn(
          "z-[300] max-w-xs rounded-control bg-grey-900 px-2 py-1 text-footnote text-white shadow-raise2",
          hint ? "whitespace-normal text-center leading-snug" : "whitespace-nowrap",
        )}
      >
        {content}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
);
