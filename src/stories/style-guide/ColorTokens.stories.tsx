import type { Meta, StoryObj } from "@storybook/react";
import { ColorTokensCanvas } from "../canvases/ColorTokensCanvas";

const meta: Meta = {
  title: "Style Guide/Color Tokens",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ColorTokensCanvas /> };

