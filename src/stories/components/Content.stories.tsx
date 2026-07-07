import type { Meta, StoryObj } from "@storybook/react";
import { ContentCanvas } from "../canvases/ContentCanvas";

const meta: Meta = {
  title: "Components/Content",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ContentCanvas /> };

