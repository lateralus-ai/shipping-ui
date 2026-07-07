import { type TextareaHTMLAttributes, useId } from "react";
import { cn } from "../utils/cn";

export type ReportInputState = "idle" | "hover" | "edit";

export type ReportInputProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> & {
  label?: string;
  value?: string;
  placeholder?: string;
  state?: ReportInputState;
  onChange?: (value: string) => void;
};

const fieldStyles: Record<ReportInputState, string> = {
  idle: "border-divider-primary bg-white",
  hover: "border-grey-300 bg-white",
  edit: "border-accent-on-light bg-white ring-1 ring-accent-on-light",
};

export const ReportInput = ({
  label,
  value = "",
  placeholder,
  state = "idle",
  onChange,
  disabled,
  className,
  id: idProp,
  rows = 4,
  ...props
}: ReportInputProps) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="text-caption-2-em text-display-on-light-secondary">
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        data-state={state}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "min-h-[96px] w-full resize-y rounded-control border px-3 py-2 text-body text-display-on-light-primary outline-none transition-colors placeholder:text-display-on-light-quaternary",
          "hover:border-grey-300 focus:border-accent-on-light focus:ring-1 focus:ring-accent-on-light",
          "data-[state=hover]:border-grey-300",
          "data-[state=edit]:border-accent-on-light data-[state=edit]:ring-1 data-[state=edit]:ring-accent-on-light",
          disabled && "cursor-not-allowed border-divider-primary bg-grey-50 text-display-on-light-quaternary",
          !disabled && fieldStyles[state],
        )}
        {...props}
      />
    </div>
  );
};
