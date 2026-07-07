import { cn } from "../utils/cn";

export type CountProps = {
  value: number;
  className?: string;
};

export const Count = ({ value, className }: CountProps) => (
  <span
    className={cn(
      "inline-flex min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 py-0.5 text-footnote-em text-white",
      className,
    )}
    aria-label={`Count: ${value}`}
  >
    {value > 99 ? "99+" : value}
  </span>
);
