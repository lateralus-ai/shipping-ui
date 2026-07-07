import { type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { InfoHeading } from "./InfoHeading";
import { InfoRow } from "./InfoRow";
import { SectionHeader } from "./SectionHeader";
import { TaskRow } from "./TaskRow";

export type ReportProps = {
  title?: string;
  className?: string;
  children?: ReactNode;
};

export const Report = ({
  title = "Port State Control Report",
  className,
  children,
}: ReportProps) => (
  <article
    className={cn(
      "w-full rounded-lg border border-divider-primary bg-background-primary p-6",
      className,
    )}
  >
    <header className="border-b border-divider-primary pb-4">
      <h2 className="font-heading text-heading text-display-on-light-primary">{title}</h2>
      <p className="mt-1 text-caption-2 text-display-on-light-tertiary">
        Generated on 7 Jul 2026 · Chief Technical
      </p>
    </header>

    <div className="mt-6 space-y-6">
      {children ?? (
        <>
          <InfoHeading title="Vessel information" />
          <div className="space-y-3">
            <InfoRow label="Vessel" value="MV Atlantic Star" />
            <InfoRow label="IMO" value="9876543" column="on" />
            <InfoRow label="Flag" value="Marshall Islands" />
          </div>

          <SectionHeader title="Outstanding actions" subtitle="2 tasks remaining">
            <div className="space-y-1">
              <TaskRow label="Review fire safety documentation" />
              <TaskRow label="Confirm crew certification records" strikethrough="on" />
              <TaskRow variant="add-more" />
            </div>
          </SectionHeader>
        </>
      )}
    </div>
  </article>
);
