import { Report } from "../../domain/Report";
import {
  FigmaContent,
  FigmaPage,
  FigmaSection,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const ReportLayoutCanvas = () => (
  <FigmaPage title="Report Layout" width={FIGMA_WIDTHS.reportLayout}>
    <FigmaContent>
      <FigmaSection label="Report">
        <div className="max-w-3xl">
          <Report title="Internal Audit Report" />
        </div>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
