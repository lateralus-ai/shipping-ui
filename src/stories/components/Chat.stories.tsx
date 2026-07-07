import type { Meta, StoryObj } from "@storybook/react";
import { ChatCanvas } from "../canvases/ChatCanvas";

const meta: Meta = {
  title: "Components/Chat",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <ChatCanvas /> };

