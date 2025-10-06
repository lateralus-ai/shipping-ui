import React, { useState } from "react";
import "../styles/tabs.css";
import {
  Tabs,
  TabPanel,
  TabsBody,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import { cn } from "../utils/cn";
import { SettingsIcon } from "./icons/SettingsIcon";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export const TabsContainer: React.FC<TabsProps> = () => {
  return (
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
};
