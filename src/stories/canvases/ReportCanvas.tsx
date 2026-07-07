import { SectionHeader, TaskRow } from "../../domain/Report";
import {
  FigmaContent,
  FigmaPage,
  FigmaSection,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const ReportCanvas = () => (
  <FigmaPage title="Report" width={FIGMA_WIDTHS.report}>
    <FigmaContent>
      <FigmaSection label="Section Header">
        <div className="max-w-xl space-y-4">
          <SectionHeader />
          <SectionHeader title="Outstanding actions" subtitle="2 tasks remaining">
            <TaskRow label="Review fire safety documentation" />
            <TaskRow label="Confirm crew certification records" />
          </SectionHeader>
          <SectionHeader title="Completed" collapsed="on" />
        </div>
      </FigmaSection>

      <FigmaSection label="Task Row">
        <div className="max-w-xl space-y-2">
          <TaskRow />
          <TaskRow label="Confirm crew certification records" strikethrough="on" />
          <TaskRow variant="add-more" />
          <TaskRow hover="on" />
        </div>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
