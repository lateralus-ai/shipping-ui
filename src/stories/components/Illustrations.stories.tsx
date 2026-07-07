import type { Meta, StoryObj } from "@storybook/react";
import { IllustrationsCanvas } from "../canvases/IllustrationsCanvas";

const meta: Meta = {
  title: "Components/Illustrations",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <IllustrationsCanvas /> };

