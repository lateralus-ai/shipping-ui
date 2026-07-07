import { cn } from "../utils/cn";

export type InputTypeKind = "text" | "binary";
export type InputTypeState = "on" | "off";

export type InputTypeProps = {
  type: InputTypeKind;
  state: InputTypeState;
  onChange?: (state: InputTypeState) => void;
  disabled?: boolean;
  className?: string;
};

const labels: Record<InputTypeKind, { on: string; off: string }> = {
  text: { on: "On", off: "Off" },
  binary: { on: "Yes", off: "No" },
};

export const InputType = ({
  type,
  state,
  onChange,
  disabled = false,
  className,
}: InputTypeProps) => {
  const isOn = state === "on";
  const { on: onLabel, off: offLabel } = labels[type];

  const toggle = (next: InputTypeState) => {
    if (disabled) return;
    onChange?.(next);
  };

  return (
    <div
      role="group"
      aria-label={`${type} input type`}
      data-type={type}
      data-state={state}
      className={cn(
        "inline-flex rounded-control border border-divider-primary bg-white p-0.5",
        disabled && "opacity-50",
        className,
      )}
    >
      <button
        type="button"
        disabled={disabled}
        aria-pressed={!isOn}
        onClick={() => toggle("off")}
        className={cn(
          "min-w-12 rounded-[6px] px-3 py-1.5 text-caption-2 transition-colors",
          !isOn
            ? "bg-grey-900 text-display-on-dark-primary"
            : "text-display-on-light-secondary hover:bg-grey-100",
        )}
      >
        {offLabel}
      </button>
      <button
        type="button"
        disabled={disabled}
        aria-pressed={isOn}
        onClick={() => toggle("on")}
        className={cn(
          "min-w-12 rounded-[6px] px-3 py-1.5 text-caption-2 transition-colors",
          isOn
            ? "bg-grey-900 text-display-on-dark-primary"
            : "text-display-on-light-secondary hover:bg-grey-100",
        )}
      >
        {onLabel}
      </button>
    </div>
  );
};
