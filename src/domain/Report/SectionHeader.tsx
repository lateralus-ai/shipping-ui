import { type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { ChevronIcon } from "../../icons/ChevronIcon";

export type SectionHeaderCollapsed = "on" | "off";

export type SectionHeaderProps = {
  title?: string;
  subtitle?: string;
  collapsed?: SectionHeaderCollapsed;
  className?: string;
  children?: ReactNode;
};

export const SectionHeader = ({
  title = "Section title",
  subtitle = "3 tasks remaining",
  collapsed = "off",
  className,
  children,
}: SectionHeaderProps) => (
  <div
    className={cn(
      "flex w-full items-start justify-between gap-4 rounded-control border border-divider-primary bg-background-primary p-4",
      className,
    )}
  >
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <ChevronIcon
          size="small"
          direction={collapsed === "on" ? "right" : "down"}
          className="text-display-on-light-tertiary"
        />
        <p className="text-body-em text-display-on-light-primary">{title}</p>
      </div>
      {collapsed === "off" && (
        <p className="mt-1 pl-6 text-caption-2 text-display-on-light-tertiary">{subtitle}</p>
      )}
      {collapsed === "off" && children && <div className="mt-3 pl-6">{children}</div>}
    </div>
  </div>
);
