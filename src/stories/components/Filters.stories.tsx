import type { Meta, StoryObj } from "@storybook/react";
import { FiltersCanvas } from "../canvases/FiltersCanvas";

const meta: Meta = {
  title: "Components/Filters",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <FiltersCanvas /> };

