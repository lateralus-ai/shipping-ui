import { cn } from "../../utils/cn";

export type SectionHeaderProps = {
  label?: string;
  className?: string;
};

export const SectionHeader = ({
  label = "Recently viewed",
  className,
}: SectionHeaderProps) => (
  <p
    className={cn(
      "px-2 py-1.5 text-footnote-em text-display-on-light-tertiary uppercase tracking-wide",
      className,
    )}
  >
    {label}
  </p>
);
