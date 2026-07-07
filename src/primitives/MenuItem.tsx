import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

export type MenuItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  header?: boolean;
  destructive?: boolean;
  children: ReactNode;
};

export const MenuItem = ({
  header = false,
  destructive = false,
  children,
  className,
  type = "button",
  ...props
}: MenuItemProps) => (
  <button
    type={type}
    className={cn(
      "flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left text-caption-1 transition-colors",
      header
        ? "cursor-default text-caption-1-em text-display-on-light-tertiary hover:bg-transparent"
        : destructive
          ? "text-red-500 hover:bg-red-50 hover:text-red-700 disabled:text-red-300"
          : "text-display-on-light-primary hover:bg-grey-100 disabled:text-display-on-light-quaternary",
      "disabled:cursor-not-allowed",
      className,
    )}
    disabled={header || props.disabled}
    {...props}
  >
    {children}
  </button>
);
