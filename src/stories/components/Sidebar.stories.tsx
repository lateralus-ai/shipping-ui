import type { Meta, StoryObj } from "@storybook/react";
import { SidebarCanvas } from "../canvases/SidebarCanvas";
import { SidebarPlayground } from "../canvases/SidebarPlayground";

const meta: Meta = {
  title: "Components/Sidebar",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

/** Static Figma subcomponent grid — used by visual regression tests. */
export const Canvas: Story = { render: () => <SidebarCanvas /> };

/** Interactive sidebar — toggle Ships, collapse/expand the shell. */
export const Playground: Story = {
  argTypes: {
    chief: { control: "select", options: ["technical", "compliance"] },
    activity: { control: "boolean" },
    ships: {
      control: "boolean",
      description: "Whether Ships starts expanded",
    },
    collapsed: {
      control: "boolean",
      description: "Whether the sidebar starts collapsed",
    },
  },
  args: {
    chief: "technical",
    activity: true,
    ships: true,
    collapsed: false,
  },
  render: (args) => <SidebarPlayground {...args} />,
};
