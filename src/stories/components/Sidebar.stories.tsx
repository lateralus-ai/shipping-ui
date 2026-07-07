import type { Meta, StoryObj } from "@storybook/react";
import { SidebarCanvas } from "../canvases/SidebarCanvas";

const meta: Meta = {
  title: "Components/Sidebar",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <SidebarCanvas /> };

