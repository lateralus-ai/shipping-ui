import type { Meta, StoryObj } from "@storybook/react";
import { WorkflowsCanvas } from "../canvases/WorkflowsCanvas";

const meta: Meta = {
  title: "Components/Workflows",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <WorkflowsCanvas /> };

