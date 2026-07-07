import { Sidebar } from "../../patterns/Sidebar";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const SidebarLayoutsCanvas = () => (
  <FigmaPage title="Sidebar Layouts" width={FIGMA_WIDTHS.sidebarLayouts}>
    <FigmaContent>
      <FigmaSection label="Expanded">
        <FigmaGrid gap={32}>
          <FigmaVariant label="Technical">
            <div className="h-[640px] overflow-hidden rounded-control border border-divider-primary">
              <Sidebar chief="technical" />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Compliance">
            <div className="h-[640px] overflow-hidden rounded-control border border-divider-primary">
              <Sidebar chief="compliance" />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Collapsed">
        <FigmaGrid gap={32}>
          <FigmaVariant label="Technical">
            <div className="h-[640px] overflow-hidden rounded-control border border-divider-primary">
              <Sidebar chief="technical" collapsed />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Compliance">
            <div className="h-[640px] overflow-hidden rounded-control border border-divider-primary">
              <Sidebar chief="compliance" collapsed />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Without ships">
        <div className="h-[640px] w-64 overflow-hidden rounded-control border border-divider-primary">
          <Sidebar ships={false} />
        </div>
      </FigmaSection>

      <FigmaSection label="Without activity">
        <div className="h-[640px] w-64 overflow-hidden rounded-control border border-divider-primary">
          <Sidebar activity={false} />
        </div>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
