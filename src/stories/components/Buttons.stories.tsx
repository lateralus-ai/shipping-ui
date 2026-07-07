import type { Meta, StoryObj } from "@storybook/react";
import { ButtonsCanvas } from "../canvases/ButtonsCanvas";

const meta: Meta = {
  title: "Components/Buttons",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ButtonsCanvas /> };

