import type { Meta, StoryObj } from "@storybook/react";
import { ReportCanvas } from "../canvases/ReportCanvas";

const meta: Meta = {
  title: "Components/Report",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ReportCanvas /> };

