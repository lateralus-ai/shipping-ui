import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxItem } from "./Checkbox";

const meta = {
  title: "Design System/CheckboxItem",
  component: CheckboxItem,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CheckboxItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
