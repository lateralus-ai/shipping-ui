import { cn } from "../../utils/cn";

export type InfoHeadingEmphasis = "on" | "off";

export type InfoHeadingProps = {
  title?: string;
  emphasis?: InfoHeadingEmphasis;
  className?: string;
};

export const InfoHeading = ({
  title = "Inspection details",
  emphasis = "on",
  className,
}: InfoHeadingProps) => (
  <p
    className={cn(
      "w-full text-display-on-light-primary",
      emphasis === "on" ? "text-body-em" : "text-caption-1",
      className,
    )}
  >
    {title}
  </p>
);
