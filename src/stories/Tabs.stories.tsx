import type { Meta, StoryObj } from "@storybook/react";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { SettingsIcon } from "../components/icons/SettingsIcon";

const TabsComponent = () => (
  <Tabs className="w-[800px]">
    <TabsHeader>
      <Tab value="chats">Chats</Tab>
      <Tab value="issues">Issues</Tab>

      <button className="cursor-pointer mb-2 ml-auto rounded p-1 hover:bg-gray-100">
        <SettingsIcon className="size-4" />
      </button>
    </TabsHeader>

    <TabsBody>
      <TabPanel value="chats">ChatsPanel</TabPanel>
      <TabPanel value="issues">IssuesPanel</TabPanel>
    </TabsBody>
  </Tabs>
);

const meta = {
  title: "Design System/Tabs",
  component: TabsComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TabsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
