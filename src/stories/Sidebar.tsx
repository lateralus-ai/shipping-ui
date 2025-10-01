import { Icon } from "@iconify/react";
import * as Sidebar from "../components/Sidebar";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

const menuExample = (
  <div className="opacity-0 group-hover:opacity-100">
    <Menu placement="right" offset={{ mainAxis: -40 }}>
      <MenuHandler>
        <IconButton color="gray" size="sm" variant="text">
          <Icon icon="lucide:ellipsis" className="size-4" />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem className="text-red-500">Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  </div>
);

const arrowExample = (
  <IconButton color="gray" size="sm" variant="text">
    <Icon icon="mage:caret-right" className="size-4" />
  </IconButton>
);

export const SidebarScreen = () => (
  <div className="p-8 gap-4 ">
    <Sidebar.Provider>
      <Sidebar.Container className="h-[800px]">
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between pr-1">
            <Sidebar.Button
              onClick={() => alert("click")}
              icon={<Icon icon="mage:box-check" className="size-6" />}
            >
              {" "}
              Lorem ipsum
            </Sidebar.Button>

            <Sidebar.ToggleCollapseButton />
          </div>

          <Sidebar.Item
            icon={<Icon icon="mage:book" className="size-6" />}
            trailing={arrowExample}
          >
            Dorcet sit amet
          </Sidebar.Item>

          <Sidebar.Item
            icon={<Icon icon="mage:calendar" className="size-6" />}
            isActive
          >
            Tempore ipsa
          </Sidebar.Item>

          <Sidebar.Item icon={<Icon icon="mage:email" className="size-6" />}>
            {" "}
            Duis ditarcher
          </Sidebar.Item>

          <div className="w-full flex flex-col gap-1 relative">
            <Sidebar.SecondaryItem
              trailing={menuExample}
              icon={
                <Icon icon="mage:message" className="size-5 text-orange-400" />
              }
            >
              {" "}
              Dolore eu fugiat nulla
            </Sidebar.SecondaryItem>

            <Sidebar.SecondaryItem
              trailing={menuExample}
              icon={<Icon icon="mage:message" className="size-5" />}
            >
              Lorem ipsum dorcet sit
            </Sidebar.SecondaryItem>

            <Sidebar.SecondaryItem>Show all</Sidebar.SecondaryItem>
          </div>
        </div>

        <div className="h-20 bg-gray-100 w-full rounded-xl"></div>
      </Sidebar.Container>
    </Sidebar.Provider>
  </div>
);
