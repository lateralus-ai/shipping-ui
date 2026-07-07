import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonsCanvas } from "../canvases/SkeletonsCanvas";

const meta: Meta = {
  title: "Components/Skeletons",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <SkeletonsCanvas /> };

