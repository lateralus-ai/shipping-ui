import {
  FiltersBar,
  FilteredPill,
  FilterPill,
} from "../../domain/Filters";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const FiltersCanvas = () => (
  <FigmaPage title="Filters" width={FIGMA_WIDTHS.filters}>
    <FigmaContent>
      <FigmaSection label="Filter Pill">
        <FigmaGrid gap={16}>
          <FilterPill />
          <FilterPill indicator="on" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Filtered Pill">
        <FigmaGrid gap={16}>
          <FilteredPill />
          <FilteredPill label="Status: Open" count={5} />
          <FilteredPill label="Priority: High" count={2} state="hover" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Filters Bar">
        <div className="space-y-6">
          <FiltersBar />
          <FiltersBar filters="on" activeTab="Reports" />
          <FiltersBar tabs="off" searchPlaceholder="Search workflows..." />
        </div>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
