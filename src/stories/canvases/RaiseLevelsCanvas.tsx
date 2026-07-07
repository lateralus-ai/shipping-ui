import { elevation } from "../../tokens/elevation";
import { FigmaContent, FigmaGrid, FigmaPage } from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

const raiseLevels = [
  { label: "Raise 1", shadow: elevation.raise1 },
  { label: "Raise 2", shadow: elevation.raise2 },
  { label: "Raise 3", shadow: elevation.raise3 },
] as const;

export const RaiseLevelsCanvas = () => (
  <FigmaPage title="Raise Levels" width={FIGMA_WIDTHS.raiseLevels}>
    <FigmaContent>
      <FigmaGrid gap={24}>
        {raiseLevels.map((level) => (
          <div
            key={level.label}
            className="flex size-[200px] items-center justify-center rounded-control bg-white text-heading text-display-on-light-primary"
            style={{ boxShadow: level.shadow }}
          >
            {level.label}
          </div>
        ))}
      </FigmaGrid>
    </FigmaContent>
  </FigmaPage>
);
