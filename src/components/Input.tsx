import { type InputHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

export type InputState = "idle" | "hover" | "disabled" | "edit";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  state?: InputState;
  onChange?: (value: string) => void;
};

const fieldStyles: Record<InputState, string> = {
  idle: "border-divider-primary bg-white",
  hover: "border-grey-300 bg-white",
  disabled: "border-divider-primary bg-grey-50 text-display-on-light-quaternary cursor-not-allowed",
  edit: "border-accent-on-light bg-white ring-1 ring-accent-on-light",
};

export const Input = ({
  label,
  value = "",
  placeholder,
  error,
  state = "idle",
  onChange,
  disabled,
  className,
  id: idProp,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const isDisabled = disabled ?? state === "disabled";
  const visualState = isDisabled ? "disabled" : state;
  const hasError = Boolean(error);

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="text-caption-2-em text-display-on-light-secondary">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        data-state={visualState}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "h-10 w-full rounded-control border px-3 text-body text-display-on-light-primary outline-none transition-colors placeholder:text-display-on-light-quaternary",
          "hover:border-grey-300 focus:border-accent-on-light focus:ring-1 focus:ring-accent-on-light",
          "data-[state=hover]:border-grey-300",
          "data-[state=edit]:border-accent-on-light data-[state=edit]:ring-1 data-[state=edit]:ring-accent-on-light",
          "data-[state=disabled]:border-divider-primary data-[state=disabled]:bg-grey-50 data-[state=disabled]:text-display-on-light-quaternary",
          hasError && "border-red-500 ring-1 ring-red-500",
          !hasError && fieldStyles[visualState],
        )}
        {...props}
      />
      {error && <span className="text-footnote text-red-500">{error}</span>}
    </div>
  );
};
