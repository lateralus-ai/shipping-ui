import { Sidebar, Switcher } from "../../patterns/Sidebar";
import { FigmaContent, FigmaPage } from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";
import {
  FIGMA_SIDEBAR_LAYOUTS_CONTENT,
  FIGMA_SIDEBAR_LAYOUTS_FRAMES,
  type SidebarLayoutsFrameSlot,
} from "./figma-sidebar-layouts-layout";

const renderSlot = (slot: SidebarLayoutsFrameSlot) => {
  if (slot.kind === "switcher") {
    return <Switcher chief={slot.chief} expanded={slot.expanded} />;
  }

  return (
    <Sidebar
      chief={slot.chief}
      activity={slot.activity}
      ships={slot.ships}
      collapsed={slot.collapsed}
      presentation
      className="h-full"
    />
  );
};

export const SidebarLayoutsCanvas = () => (
  <FigmaPage title="Sidebar Layouts" width={FIGMA_WIDTHS.sidebarLayouts}>
    <FigmaContent padding={0}>
      <div
        data-figma-sidebar-layouts-grid
        className="relative overflow-hidden"
        style={{
          width: FIGMA_SIDEBAR_LAYOUTS_CONTENT.width,
          height: FIGMA_SIDEBAR_LAYOUTS_CONTENT.height,
        }}
      >
        <div
          className="relative"
          style={{
            width: FIGMA_SIDEBAR_LAYOUTS_CONTENT.width,
            height: FIGMA_SIDEBAR_LAYOUTS_CONTENT.height,
          }}
        >
          {FIGMA_SIDEBAR_LAYOUTS_FRAMES.map((frame) => (
            <div
              key={frame.name}
              className="absolute rounded border border-dashed border-[#9747FF]"
              style={{
                left: frame.x,
                top: frame.y,
                width: frame.width,
                height: frame.height,
              }}
            >
              {frame.slots.map((slot, index) => (
                <div
                  key={`${frame.name}-${index}`}
                  className="absolute overflow-hidden"
                  style={{ left: slot.x, top: slot.y, width: slot.width, height: slot.height }}
                >
                  {renderSlot(slot)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </FigmaContent>
  </FigmaPage>
);
