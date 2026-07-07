import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

type ButtonHierarchy = "primary" | "secondary" | "tertiary" | "quaternary";
type ButtonOutcome = "action" | "destructive";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  hierarchy?: ButtonHierarchy;
  outcome?: ButtonOutcome;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
};

const baseStyles =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-control px-2 text-caption-1 transition-colors disabled:cursor-not-allowed";

const actionStyles: Record<ButtonHierarchy, string> = {
  primary:
    "bg-action-primary-idle text-action-primary-on-idle hover:bg-action-primary-hover hover:text-action-primary-on-hover disabled:bg-action-primary-disabled disabled:text-action-primary-on-disabled",
  secondary:
    "border border-divider-primary bg-action-secondary-idle text-action-secondary-on-idle hover:bg-action-secondary-hover hover:text-action-secondary-on-hover disabled:bg-action-secondary-disabled disabled:text-action-secondary-on-disabled",
  tertiary:
    "bg-action-tertiary-idle text-action-tertiary-on-idle hover:bg-action-tertiary-hover hover:text-action-tertiary-on-hover disabled:bg-action-tertiary-disabled disabled:text-action-tertiary-on-disabled",
  quaternary:
    "bg-action-quaternary-idle text-action-quaternary-on-idle hover:bg-action-quaternary-hover hover:text-action-quaternary-on-hover disabled:bg-action-quaternary-disabled disabled:text-action-quaternary-on-disabled",
};

const destructiveStyles: Record<ButtonHierarchy, string> = {
  primary:
    "bg-action-destructive-idle text-action-destructive-on-idle hover:bg-action-destructive-hover hover:text-action-destructive-on-hover disabled:bg-action-destructive-disabled disabled:text-action-destructive-on-disabled",
  secondary:
    "border border-red-300 bg-grey-50 text-red-500 hover:bg-red-50 hover:text-red-700 disabled:bg-grey-50 disabled:text-red-300",
  tertiary:
    "bg-white text-red-500 hover:bg-red-50 hover:text-red-700 disabled:bg-white disabled:text-red-300",
  quaternary:
    "bg-white text-red-500 hover:bg-grey-100 hover:text-red-700 disabled:bg-white disabled:text-red-300",
};

export const Button = ({
  hierarchy = "primary",
  outcome = "action",
  disabled = false,
  startIcon,
  endIcon,
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  const variantStyles =
    outcome === "destructive" ? destructiveStyles[hierarchy] : actionStyles[hierarchy];

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variantStyles, className)}
      {...props}
    >
      {startIcon && <span className="shrink-0 [&>svg]:size-4">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className="shrink-0 [&>svg]:size-4">{endIcon}</span>}
    </button>
  );
};
