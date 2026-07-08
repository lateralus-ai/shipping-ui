import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

type IconButtonHierarchy = "tertiary" | "quaternary";
type IconButtonSize = "large" | "small";

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  hierarchy?: IconButtonHierarchy;
  size?: IconButtonSize;
  "aria-label": string;
  children: ReactNode;
};

const hierarchyStyles: Record<IconButtonHierarchy, string> = {
  tertiary:
    "bg-action-tertiary-idle text-action-tertiary-on-idle hover:bg-action-tertiary-hover hover:text-action-tertiary-on-hover disabled:bg-action-tertiary-disabled disabled:text-action-tertiary-on-disabled",
  quaternary:
    "bg-action-quaternary-idle text-action-quaternary-on-idle hover:bg-action-quaternary-hover hover:text-action-quaternary-on-hover disabled:bg-action-quaternary-disabled disabled:text-action-quaternary-on-disabled",
};

const sizeStyles: Record<IconButtonSize, string> = {
  large: "size-10 [&>svg]:size-6",
  small: "size-8 [&>svg]:size-4",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      hierarchy = "tertiary",
      size = "large",
      disabled = false,
      children,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-control transition-colors disabled:cursor-not-allowed",
        hierarchyStyles[hierarchy],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

IconButton.displayName = "IconButton";
