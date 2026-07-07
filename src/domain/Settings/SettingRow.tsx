import { cn } from "../../utils/cn";
import { Avatar } from "../../primitives/Avatar";
import { ShipIcon } from "../../icons/generated";

export type SettingRowState = "idle" | "hover" | "selected";
export type SettingRowVariant = "ship" | "user";

export type SettingRowProps = {
  label?: string;
  subtitle?: string;
  state?: SettingRowState;
  variant?: SettingRowVariant;
  className?: string;
};

const stateStyles: Record<SettingRowState, string> = {
  idle: "bg-transparent text-display-on-light-primary",
  hover: "bg-background-secondary text-display-on-light-primary",
  selected: "bg-background-selected text-display-on-dark-primary",
};

export const SettingRow = ({
  label = "MV Atlantic Star",
  subtitle = "Active vessel",
  state = "idle",
  variant = "ship",
  className,
}: SettingRowProps) => (
  <div
    className={cn(
      "flex w-full items-center gap-3 rounded-control px-3 py-2 transition-colors",
      stateStyles[state],
      state === "idle" && "hover:bg-background-secondary",
      className,
    )}
  >
    {variant === "ship" ? (
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full",
          state === "selected" ? "bg-white/20 text-white" : "bg-grey-100 text-display-on-light-secondary",
        )}
      >
        <ShipIcon size="small" />
      </span>
    ) : (
      <Avatar
        chief="initials"
        size={24}
        initials="JD"
        className={state === "selected" ? "bg-white/20 text-white" : undefined}
      />
    )}
    <div className="min-w-0 flex-1">
      <p className="truncate text-caption-1-em">{label}</p>
      <p
        className={cn(
          "truncate text-caption-2",
          state === "selected" ? "text-display-on-dark-secondary" : "text-display-on-light-tertiary",
        )}
      >
        {subtitle}
      </p>
    </div>
  </div>
);
