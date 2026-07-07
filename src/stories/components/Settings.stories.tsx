import type { Meta, StoryObj } from "@storybook/react";
import { SettingsCanvas } from "../canvases/SettingsCanvas";

const meta: Meta = {
  title: "Components/Settings",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <SettingsCanvas /> };

