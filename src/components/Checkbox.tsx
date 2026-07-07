import { type InputHTMLAttributes, useEffect, useId, useRef } from "react";
import { MinusIcon, TickIcon } from "../icons";
import { cn } from "../utils/cn";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> & {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
};

export const Checkbox = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  onChange,
  className,
  id: idProp,
  ...props
}: CheckboxProps) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const isActive = checked || indeterminate;

  return (
    <label
      htmlFor={id}
      data-checked={checked}
      data-indeterminate={indeterminate}
      data-disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            "flex size-4 items-center justify-center rounded-sm border transition-colors",
            "border-divider-secondary bg-white",
            "peer-hover:border-grey-400 peer-hover:bg-grey-50",
            isActive && "border-blue-600 bg-blue-600",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-accent-on-light peer-focus-visible:ring-offset-1",
            "peer-disabled:border-divider-primary peer-disabled:bg-grey-50",
          )}
        >
          {checked && !indeterminate && (
            <TickIcon size="xs" className="text-white" />
          )}
          {indeterminate && <MinusIcon size="small" className="text-white" />}
        </span>
      </span>
      {label && <span className="text-body text-display-on-light-primary">{label}</span>}
    </label>
  );
};
