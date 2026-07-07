import type { Meta, StoryObj } from "@storybook/react";
import { ButtonsMatrixCanvas } from "../canvases/ButtonsMatrixCanvas";

const meta: Meta = {
  title: "Style Guide/Buttons",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ButtonsMatrixCanvas /> };

