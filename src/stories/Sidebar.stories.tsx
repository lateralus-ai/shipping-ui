import type { Meta, StoryObj } from "@storybook/react";
import { SidebarScreen as Sidebar } from "./Sidebar";

const meta = {
  title: "Design System/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
