import { type ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type TabState = "idle" | "active";

export type TabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  state?: TabState;
};

export const Tab = ({ label, state = "idle", className, ...props }: TabProps) => (
  <button
    type="button"
    role="tab"
    aria-selected={state === "active"}
    data-state={state}
    className={cn(
      "relative inline-flex items-center px-3 py-2 text-caption-2 transition-colors",
      "text-display-on-light-secondary hover:text-display-on-light-primary",
      "data-[state=active]:text-display-on-light-primary data-[state=active]:text-caption-2-em",
      className,
    )}
    {...props}
  >
    {label}
    {state === "active" && (
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-grey-900"
      />
    )}
  </button>
);
