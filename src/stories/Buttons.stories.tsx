import type { Meta, StoryObj } from "@storybook/react";
import { Buttons } from "./Buttons";

const meta = {
  title: "Design System/Buttons",
  component: Buttons,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Buttons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
