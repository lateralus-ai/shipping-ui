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
  <Tabs value="chats" className="w-[800px]">
    <TabsHeader>
      <Tab value="chats">Chats</Tab>
      <Tab value="issues">Issues</Tab>

      <button className="cursor-pointer mb-2 ml-auto rounded p-1 hover:bg-gray-100">
        <SettingsIcon className="size-4" />
      </button>
    </TabsHeader>

    <TabsBody>
      <TabPanel value="chats">
        Chats panel orem ipsum dolor sit, amet consectetur adipisicing elit.
        Saepe deserunt officiis tempora accusamus sunt illo quae placeat velit
        eius maiores, iste ipsa alias quos similique dolores odio? Magnam, quia
        deleniti?
      </TabPanel>
      <TabPanel value="issues">
        Issues panel orem ipsum dolor sit, amet consectetur adipisicing elit.
        Saepe deserunt officiis tempora accusamus sunt illo quae placeat velit
        eius maiores, iste ipsa alias quos similique dolores odio? Magnam, quia
        deleniti?
      </TabPanel>
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
