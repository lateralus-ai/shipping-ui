import type { Meta, StoryObj } from "@storybook/react";
import { LibraryCanvas } from "../canvases/LibraryCanvas";

const meta: Meta = {
  title: "Components/Library",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <LibraryCanvas /> };

