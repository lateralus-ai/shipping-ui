import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export type HeaderVariant = "standard" | "nested";

export type HeaderProps = {
  variant?: HeaderVariant;
  title: string;
  actions?: ReactNode;
  className?: string;
};

export const Header = ({
  variant = "standard",
  title,
  actions,
  className,
}: HeaderProps) => (
  <header
    data-variant={variant}
    className={cn(
      "flex w-full items-center justify-between gap-4",
      variant === "standard" && "border-b border-divider-primary px-6 py-4",
      variant === "nested" && "px-4 py-3",
      className,
    )}
  >
    <h2
      className={cn(
        "text-display-on-light-primary",
        variant === "standard" && "font-heading text-heading",
        variant === "nested" && "text-subheader-em",
      )}
    >
      {title}
    </h2>
    {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
  </header>
);
