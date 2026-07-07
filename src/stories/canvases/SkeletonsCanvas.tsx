import { Skeleton } from "../../patterns/Skeleton";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const SkeletonsCanvas = () => (
  <FigmaPage title="Skeletons" width={FIGMA_WIDTHS.skeletons}>
    <FigmaContent>
      <FigmaSection label="Skeleton">
        <FigmaGrid gap={32}>
          <FigmaVariant label="Content">
            <div className="w-80">
              <Skeleton variant="content" />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Search">
            <div className="w-80">
              <Skeleton variant="search" />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
