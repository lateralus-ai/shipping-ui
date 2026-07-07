import { cn } from "../../utils/cn";

export type InfoRowColumn = "on" | "off";

export type InfoRowProps = {
  label?: string;
  value?: string;
  column?: InfoRowColumn;
  className?: string;
};

export const InfoRow = ({
  label = "Vessel",
  value = "MV Atlantic Star",
  column = "off",
  className,
}: InfoRowProps) => (
  <div
    className={cn(
      "w-full rounded-control border border-divider-primary bg-background-primary p-4",
      column === "on" ? "flex flex-col gap-1" : "flex items-start justify-between gap-6",
      className,
    )}
  >
    <span className="text-caption-2 text-display-on-light-tertiary">{label}</span>
    <span
      className={cn(
        "text-body text-display-on-light-primary",
        column === "off" && "text-right",
      )}
    >
      {value}
    </span>
  </div>
);
