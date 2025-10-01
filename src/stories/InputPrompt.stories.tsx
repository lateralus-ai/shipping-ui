import type { Meta, StoryObj } from "@storybook/react";
import { InputPrompts } from "./InputPrompt";

const meta = {
  title: "Design System/InputPrompts",
  component: InputPrompts,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof InputPrompts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
