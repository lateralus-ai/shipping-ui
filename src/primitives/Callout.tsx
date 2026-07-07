import { type ReactNode } from "react";
import { cn } from "../utils/cn";

export type CalloutProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export const Callout = ({ children, icon, className }: CalloutProps) => (
  <div
    className={cn(
      "flex items-start gap-2 rounded-control bg-meta-blue px-3 py-2 text-caption-2 text-meta-on-blue",
      className,
    )}
    role="note"
  >
    {icon && <span className="shrink-0 pt-0.5 [&>svg]:size-4">{icon}</span>}
    <span>{children}</span>
  </div>
);
