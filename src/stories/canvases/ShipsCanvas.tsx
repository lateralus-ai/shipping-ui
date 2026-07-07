import { ShipRow } from "../../domain/Ships";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const ShipsCanvas = () => (
  <FigmaPage title="Ships" width={FIGMA_WIDTHS.ships}>
    <FigmaContent>
      <FigmaSection label="Ship Row">
        <div className="max-w-xl space-y-2">
          <ShipRow />
          <ShipRow name="MV Atlantic Star" chatCount={5} issueCount={2} unreadCount={3} />
          <ShipRow name="MV Pacific Dawn" state="hover" chatCount={1} issueCount={0} />
        </div>
      </FigmaSection>

      <FigmaSection label="Variants">
        <FigmaGrid gap={24}>
          <FigmaVariant label="Idle">
            <div className="w-80">
              <ShipRow name="MV Nordic Wind" />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Hover">
            <div className="w-80">
              <ShipRow name="MV Nordic Wind" state="hover" />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
