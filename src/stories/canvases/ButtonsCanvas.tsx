import { AttachmentIcon } from "../../icons";
import { Button } from "../../primitives";
import { FigmaContent, FigmaPage, FigmaSection } from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";
import {
  BUTTON_VARIANT_SLOTS,
  FIGMA_BUTTON_SLOTS,
  FIGMA_BUTTONS_CANVAS,
  FIGMA_BUTTONS_GRID,
  type ButtonVisualState,
} from "./figma-buttons-layout";
import { IconButtonSnapshot } from "./helpers";

const demoDropdownOptions = [
  { label: "Option A", onSelect: () => undefined },
  { label: "Option B", onSelect: () => undefined },
];

const slotProps = (visualState: ButtonVisualState) => ({
  forcedState: visualState === "idle" ? undefined : visualState,
  disabled: visualState === "disabled",
});

export const ButtonsCanvas = () => (
  <FigmaPage title="Buttons" width={FIGMA_WIDTHS.buttons}>
    <FigmaContent padding={0}>
      <div className="px-8 pb-8 pt-6">
        <FigmaSection label="Button">
          <div
            className="relative"
            style={{
              width: FIGMA_BUTTONS_CANVAS.width,
              height: FIGMA_BUTTONS_CANVAS.height,
            }}
          >
            <div
              data-figma-buttons-grid
              className="absolute left-0 top-0"
              style={{
                width: FIGMA_BUTTONS_GRID.width,
                height: FIGMA_BUTTONS_GRID.height,
              }}
            >
              {FIGMA_BUTTON_SLOTS.map((slot) => (
                <div
                  key={`${slot.hierarchy}-${slot.visualState}`}
                  className="absolute"
                  style={{ left: slot.x, top: slot.y }}
                >
                  <Button
                    hierarchy={slot.hierarchy}
                    icon={AttachmentIcon}
                    dropdownOptions={demoDropdownOptions}
                    {...slotProps(slot.visualState)}
                  >
                    Button
                  </Button>
                </div>
              ))}
            </div>

            {BUTTON_VARIANT_SLOTS.map((slot) => (
              <div
                key={`${slot.hierarchy}-${slot.variant}`}
                data-visual-test-only
                className="absolute"
                style={{ left: slot.x, top: slot.y }}
              >
                {slot.variant === "noIcon" ? (
                  <Button
                    hierarchy={slot.hierarchy}
                    dropdownOptions={demoDropdownOptions}
                  >
                    Button
                  </Button>
                ) : (
                  <Button hierarchy={slot.hierarchy} icon={AttachmentIcon}>
                    Button
                  </Button>
                )}
              </div>
            ))}
          </div>
        </FigmaSection>

        <FigmaSection label="Icon Button" className="mt-8">
          <div className="flex flex-wrap items-center gap-6">
            <IconButtonSnapshot hierarchy="tertiary" visualState="idle" />
            <IconButtonSnapshot hierarchy="tertiary" visualState="hover" />
            <IconButtonSnapshot hierarchy="quaternary" visualState="idle" />
            <IconButtonSnapshot hierarchy="quaternary" visualState="hover" />
            <IconButtonSnapshot
              hierarchy="quaternary"
              visualState="idle"
              size="small"
            />
            <IconButtonSnapshot
              hierarchy="quaternary"
              visualState="hover"
              size="small"
            />
          </div>
        </FigmaSection>
      </div>
    </FigmaContent>
  </FigmaPage>
);
