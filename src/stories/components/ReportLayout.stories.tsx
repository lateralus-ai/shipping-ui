import type { Meta, StoryObj } from "@storybook/react";
import { ReportLayoutCanvas } from "../canvases/ReportLayoutCanvas";

const meta: Meta = {
  title: "Components/Report Layout",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ReportLayoutCanvas /> };

