import type { Meta, StoryObj } from "@storybook/react";
import { ModalPanel } from "../components/ModalPanel";

const meta: Meta<typeof ModalPanel.Header> = {
  title: "Design System/ModalPanel",
  component: ModalPanel.Header,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ModalPanel.Header>;

export const Default: Story = {
  args: {
    onClose: () => console.log("Close button clicked"),
    children: "Modal Panel Example",
  },
  decorators: [
    (Story) => (
      <div className="w-[500px] border border-gray-200 rounded-xl">
        <Story />
        <ModalPanel.Body className="h-64 p-4">
          <p className="text-body">
            This is the modal body content. The height is controlled by the h-64 class,
            and the width fills the container automatically.
          </p>
          <p className="text-body mt-4">
            You can add any content here and control the height through the className prop.
          </p>
        </ModalPanel.Body>
      </div>
    ),
  ],
};