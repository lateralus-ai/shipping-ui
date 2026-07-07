import type { Meta, StoryObj } from "@storybook/react";
import { FormsCanvas } from "../canvases/FormsCanvas";

const meta: Meta = {
  title: "Components/Forms",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <FormsCanvas /> };

