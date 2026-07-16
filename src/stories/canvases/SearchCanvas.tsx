import {
  Pill,
  PillInfo,
  ResultRow,
  SearchModalPanel,
  SectionHeader,
} from "../../patterns/Search";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

const recentItems = [
  { variant: "report" as const, title: "Engine Room Oil Leak" },
  { variant: "chat" as const, title: "Low Water Pressure on Board" },
  {
    variant: "chat" as const,
    title: "Generator Vibrating Excessively",
    state: "active" as const,
  },
  {
    variant: "issue" as const,
    title:
      "Intermittent Flickering of Navigation Lights Possibly Due to Bulb Failure or Signal Unit Errors",
  },
];

const resultItems = [
  {
    variant: "report" as const,
    title: "Persistent Engine Room Oil Leak",
    subtitle: (
      <>
        We’ve got a persistent oil leak from the{" "}
        <span className="text-caption-2-em text-display-on-light-primary">
          fuel pump
        </span>
        . I’ve tightened what I could, but it keeps seeping.
      </>
    ),
  },
  {
    variant: "chat" as const,
    title: "Ballast Pump Not Starting",
    subtitle: (
      <>
        The{" "}
        <span className="text-caption-2-em text-display-on-light-primary">
          fuel pump
        </span>{" "}
        won’t start consistently. Sometimes it works, sometimes it doesn’t.
      </>
    ),
  },
  {
    variant: "issue" as const,
    title:
      "Excessive Rust on Fuel Pump and Piping with Unclear Material Specifications and Corrosion Protection Measures",
    subtitle: "Created by Jake Silva on March 28",
    state: "active" as const,
  },
  {
    variant: "report" as const,
    title: "Engine Room Oil Leak",
    subtitle: (
      <>
        We’ve spotted a steady oil leak near the{" "}
        <span className="text-caption-2-em text-display-on-light-primary">
          fuel pump
        </span>
        . Not sure if it’s a gasket or a cracked line.
      </>
    ),
  },
];

export const SearchCanvas = () => (
  <FigmaPage title="Search" width={FIGMA_WIDTHS.search}>
    <FigmaContent>
      <FigmaSection label="Pill">
        <FigmaGrid gap={16}>
          <Pill>All</Pill>
          <Pill state="active">Reports</Pill>
          <Pill size="small">Issues</Pill>
          <Pill size="small" state="active">
            Chats
          </Pill>
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
          <ResultRow
            variant="chat"
            title="Port state control discussion"
            subtitle="2 days ago"
          />
          <ResultRow
            variant="issue"
            title="Critical valve malfunction"
            subtitle="Open · High priority"
          />
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
            <div className="w-[700px] overflow-hidden rounded-xl border border-divider-primary bg-background-primary shadow-raise3">
              <SearchModalPanel state="idle" recentItems={recentItems} />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Loading">
            <div className="w-[700px] overflow-hidden rounded-xl border border-divider-primary bg-background-primary shadow-raise3">
              <SearchModalPanel state="loading" query="fuel pump" />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Results">
            <div className="w-[700px] overflow-hidden rounded-xl border border-divider-primary bg-background-primary shadow-raise3">
              <SearchModalPanel
                state="results"
                query="fuel pump"
                filter="all"
                resultItems={resultItems}
              />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
