import type { Meta, StoryObj } from "@storybook/react";
import { RaiseLevelsCanvas } from "../canvases/RaiseLevelsCanvas";

const meta: Meta = {
  title: "Style Guide/Raise Levels",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <RaiseLevelsCanvas /> };

