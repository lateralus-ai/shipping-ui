import type { Meta, StoryObj } from "@storybook/react";
import { SidebarLayoutsCanvas } from "../canvases/SidebarLayoutsCanvas";

const meta: Meta = {
  title: "Components/Sidebar Layouts",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <SidebarLayoutsCanvas /> };

