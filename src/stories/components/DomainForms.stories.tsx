import type { Meta, StoryObj } from "@storybook/react";
import { DomainFormsCanvas } from "../canvases/DomainFormsCanvas";

const meta: Meta = {
  title: "Components/Domain Forms",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;
export const Canvas: Story = { render: () => <DomainFormsCanvas /> };

