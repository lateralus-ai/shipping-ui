import { AddIcon } from "../../icons";
import { Button } from "../../primitives";
import {
  FigmaContent,
  FigmaPage,
  FigmaRow,
  FigmaSection,
} from "../_layout";
import { ButtonSnapshot } from "./helpers";
import { FIGMA_WIDTHS } from "./figma-widths";

const hierarchies = ["primary", "secondary", "tertiary", "quaternary"] as const;
const columnLabels = ["Primary", "Secondary", "Tertiary", "Quaternary", "Destructive"];
const rowLabels = ["Idle", "Hover", "Disabled"];

export const ButtonsMatrixCanvas = () => (
  <FigmaPage title="Buttons" width={FIGMA_WIDTHS.buttonsMatrix}>
    <FigmaContent>
      <FigmaSection>
        <div className="mb-4 grid grid-cols-[104px_repeat(5,1fr)] gap-4">
          <div />
          {columnLabels.map((label) => (
            <p key={label} className="text-center text-caption-1 text-display-on-light-secondary">
              {label}
            </p>
          ))}
        </div>

        {rowLabels.map((rowLabel) => (
          <FigmaRow key={rowLabel} label={rowLabel} gap={24}>
            <div className="w-24" />
            {hierarchies.map((hierarchy) => (
              <ButtonSnapshot
                key={hierarchy}
                hierarchy={hierarchy}
                visualState={rowLabel.toLowerCase() as "idle" | "hover" | "disabled"}
              />
            ))}
            <ButtonSnapshot
              hierarchy="primary"
              outcome="destructive"
              visualState={rowLabel.toLowerCase() as "idle" | "hover" | "disabled"}
            />
          </FigmaRow>
        ))}

        <FigmaRow label="Idle" gap={24}>
          <div className="w-24" />
          <Button startIcon={<AddIcon />} className="min-w-[304px]">
            New chat
          </Button>
        </FigmaRow>

        <FigmaRow label="Hover" gap={24}>
          <div className="w-24" />
          <span className="inline-flex min-h-10 min-w-[304px] items-center justify-center gap-2 rounded-control bg-action-primary-hover px-2 text-caption-1 text-action-primary-on-hover">
            <AddIcon />
            New chat
          </span>
        </FigmaRow>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
