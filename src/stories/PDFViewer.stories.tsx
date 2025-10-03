import type { Meta, StoryObj } from "@storybook/react";
import { ImageViewer, PdfViewer } from "../components";

const StoryPage = () => {
  return (
    <div className="flex gap-16">
      <div className="w-[600px] h-[800px] p-8">
        <ImageViewer
          totalPages={100}
          title="Image Viewer"
          getImageSrc={(page) =>
            `https://placehold.co/600x400?text=page-${page}`
          }
        />
      </div>
      <div
        className="w-[600px] h-[800px] p-8 flex flex-col"
        title="Document Viewer"
      >
        <PdfViewer src="https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf" />
      </div>
    </div>
  );
};

const meta = {
  title: "Design System/PDFViewer",
  component: StoryPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof StoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
