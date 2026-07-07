import type { ComponentType, SVGProps } from "react";
import { ArrowIcon, ChevronIcon, iconRegistry } from "../../icons";
import type { IconProps } from "../../icons";
import { FigmaContent, FigmaPage } from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";
import {
  FIGMA_ICONS_CONTENT,
  FIGMA_ICON_FRAMES,
  FIGMA_ICONS_GRID_HEIGHT,
  FIGMA_ICONS_GRID_TOP,
  FIGMA_ICON_RENDER_OFFSET,
  type IconFrameSlot,
} from "./figma-icons-layout";

const renderSlot = (slot: IconFrameSlot, key: string) => {
  if (slot.kind === "arrow") {
    return (
      <ArrowIcon
        key={key}
        direction={slot.direction}
        size="large"
        className="block text-display-on-light-primary"
      />
    );
  }

  if (slot.kind === "chevron") {
    return (
      <ChevronIcon
        key={key}
        direction={slot.direction}
        size="small"
        className="block text-display-on-light-primary"
      />
    );
  }

  const IconComponent = iconRegistry[slot.name] as ComponentType<
    IconProps & SVGProps<SVGSVGElement>
  >;

  return (
    <IconComponent
      key={key}
      size={slot.size}
      filled={slot.filled}
      variant={slot.variant}
      className="block text-display-on-light-primary"
    />
  );
};

export const IconsCanvas = () => (
  <FigmaPage title="Icons" width={FIGMA_WIDTHS.icons}>
    <FigmaContent padding={0}>
      <div
        data-figma-icons-grid
        className="relative overflow-hidden"
        style={{
          width: FIGMA_ICONS_CONTENT.width,
          height: FIGMA_ICONS_GRID_HEIGHT,
        }}
      >
        <div
          className="relative"
          style={{
            width: FIGMA_ICONS_CONTENT.width,
            height: FIGMA_ICONS_CONTENT.height,
            marginTop: -FIGMA_ICONS_GRID_TOP,
            transform: `translate(${FIGMA_ICON_RENDER_OFFSET.x}px, ${FIGMA_ICON_RENDER_OFFSET.y}px)`,
          }}
        >
          {FIGMA_ICON_FRAMES.map((frame, frameIndex) => (
            <div
              key={frameIndex}
              className="absolute rounded border border-dashed border-[#9747FF]"
              style={{
                left: frame.x,
                top: frame.y,
                width: frame.width,
                height: frame.height,
              }}
            >
              {frame.slots.map((slot, slotIndex) => (
                <div
                  key={slotIndex}
                  className="absolute"
                  style={{ left: slot.x, top: slot.y }}
                >
                  {renderSlot(slot, `${frameIndex}-${slotIndex}`)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </FigmaContent>
  </FigmaPage>
);
