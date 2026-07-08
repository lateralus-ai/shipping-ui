import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export type DropdownMenuProps = {
  trigger: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
  contentClassName?: string;
};

export const DropdownMenu = ({
  trigger,
  children,
  side = "bottom",
  align = "start",
  open,
  onOpenChange,
  triggerClassName,
  contentClassName,
}: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange} modal={false}>
    <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        side={side}
        align={align}
        sideOffset={4}
        collisionPadding={8}
        className={cn(
          "z-[200] min-w-40 rounded-control border border-divider-primary bg-background-primary p-1 shadow-raise2",
          contentClassName,
        )}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);

export const DropdownMenuItem = ({
  className,
  ...props
}: DropdownMenuPrimitive.DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-control px-2 py-1.5 text-caption-1 text-display-on-light-primary outline-none transition-colors hover:bg-grey-100 focus:bg-grey-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  />
);

export const DropdownMenuSeparator = () => (
  <DropdownMenuPrimitive.Separator className="my-1 h-px bg-divider-primary" />
);
