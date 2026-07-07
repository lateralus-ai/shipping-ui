import type { Meta, StoryObj } from "@storybook/react";
import { ShipsCanvas } from "../canvases/ShipsCanvas";

const meta: Meta = {
  title: "Components/Ships",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ShipsCanvas /> };

