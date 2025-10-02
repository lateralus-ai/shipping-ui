import type { Meta, StoryObj } from "@storybook/react";
import { PDFViewer } from "../components/PDFViewer";

const StoryPage = () => {
  return (
    <div className="w-[600px] h-[800px] p-8">
      <PDFViewer />
    </div>
  );
};

const meta = {
  title: "Design System/PDFViewer",
  component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PDFViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
