import type { Meta, StoryObj } from "@storybook/react";
import { IconsCanvas } from "../canvases/IconsCanvas";

const meta: Meta = {
  title: "Components/Icons",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <IconsCanvas /> };

