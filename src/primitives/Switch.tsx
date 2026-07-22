import { type ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

/**
 * On/off control — Figma Switch (3068:65681).
 * Track: 36×16 (grey-400 off / grey-900 on). Thumb: 24×24 white (grey-50 off),
 * 1px border matching track, Raise-2 shadow. Off left / on right, edges flush.
 */
export const Switch = ({
  checked,
  onChange,
  disabled = false,
  className,
  ...props
}: SwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={(event) => {
      event.stopPropagation();
      onChange(!checked);
    }}
    className={cn(
      "relative inline-flex h-6 w-9 shrink-0 items-center",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 rounded-full transition-colors",
        checked ? "bg-grey-900" : "bg-grey-400",
      )}
    />
    <span
      aria-hidden
      className={cn(
        "relative inline-block size-6 rounded-full border border-solid shadow-raise2 transition-[transform,border-color,background-color]",
        checked
          ? "translate-x-3 border-grey-900 bg-white"
          : "translate-x-0 border-grey-400 bg-grey-50",
      )}
    />
  </button>
);
