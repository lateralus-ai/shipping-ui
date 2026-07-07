import { type ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

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
    onClick={() => onChange(!checked)}
    className={cn(
      "relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed",
      checked ? "bg-blue-600" : "bg-grey-200",
      disabled && "opacity-50",
      className,
    )}
    {...props}
  >
    <span
      className={cn(
        "inline-block size-5 rounded-full bg-white shadow-raise1 transition-transform",
        checked ? "translate-x-[18px]" : "translate-x-0.5",
      )}
    />
  </button>
);
