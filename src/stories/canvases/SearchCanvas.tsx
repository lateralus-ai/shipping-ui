import { Pill, PillInfo, ResultRow, SearchModal, SectionHeader } from "../../patterns/Search";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const SearchCanvas = () => (
  <FigmaPage title="Search" width={FIGMA_WIDTHS.search}>
    <FigmaContent>
      <FigmaSection label="Pill">
        <FigmaGrid gap={16}>
          <Pill>All</Pill>
          <Pill state="active">Reports</Pill>
          <Pill size="small">Issues</Pill>
          <Pill size="small" state="active">Chats</Pill>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Pill Info">
        <FigmaGrid gap={16}>
          <PillInfo />
          <PillInfo type="completed" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Result Row">
        <div className="max-w-xl space-y-2">
          <ResultRow />
          <ResultRow variant="chat" title="Port state control discussion" subtitle="2 days ago" />
          <ResultRow variant="issue" title="Critical valve malfunction" subtitle="Open · High priority" />
        </div>
      </FigmaSection>

      <FigmaSection label="Section Header">
        <div className="max-w-xl">
          <SectionHeader label="Reports" />
        </div>
      </FigmaSection>

      <FigmaSection label="Search Modal">
        <FigmaGrid gap={32}>
          <FigmaVariant label="Idle">
            <div className="w-[480px]">
              <SearchModal state="idle" />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Loading">
            <div className="w-[480px]">
              <SearchModal state="loading" />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Results">
            <div className="w-[480px]">
              <SearchModal state="results" />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
