import type { Meta, StoryObj } from "@storybook/react";
import { TypographyCanvas } from "../canvases/TypographyCanvas";

const meta: Meta = {
  title: "Style Guide/Typography",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <TypographyCanvas /> };

