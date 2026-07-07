import type { Meta, StoryObj } from "@storybook/react";
import { SearchCanvas } from "../canvases/SearchCanvas";

const meta: Meta = {
  title: "Components/Search",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <SearchCanvas /> };

