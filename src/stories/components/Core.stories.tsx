import type { Meta, StoryObj } from "@storybook/react";
import { CoreCanvas } from "../canvases/CoreCanvas";

const meta: Meta = {
  title: "Components/Core",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <CoreCanvas /> };

