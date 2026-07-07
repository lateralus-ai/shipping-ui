import type { Meta, StoryObj } from "@storybook/react";
import { ColorsCanvas } from "../canvases/ColorsCanvas";

const meta: Meta = {
  title: "Style Guide/Colors",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ColorsCanvas /> };

