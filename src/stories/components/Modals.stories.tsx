import type { Meta, StoryObj } from "@storybook/react";
import { ModalsCanvas } from "../canvases/ModalsCanvas";

const meta: Meta = {
  title: "Components/Modals",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ModalsCanvas /> };

