import type { Meta, StoryObj } from "@storybook/react";
import { PdfViewer } from "../components/PdfViewer";

const StoryPage = () => {
  return (
    <div className="w-[600px] h-[800px] p-8">
      <PdfViewer totalPages={100} getImageSrc={(page) => `https://placehold.co/600x400?text=page-${page}` } />
    </div>
  );
};

const meta = {
  title: "Design System/PDFViewer",
  component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PdfViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
