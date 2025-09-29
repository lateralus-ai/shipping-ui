import type { Meta, StoryObj } from "@storybook/react";
import { Dropdowns } from "./Dropdowns";

const meta = {
  title: "Design System/Dropdowns",
  component: Dropdowns,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Dropdowns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
