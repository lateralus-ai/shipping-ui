import {
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Icon } from "@iconify/react";

export const Dropdowns = () => (
  <div className="p-8 grid gap-4">
    <div className="flex gap-4">
      <Menu>
        <MenuHandler>
          <Button>Menu</Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuHandler>
          <Button color="blue">
            <Icon icon="hugeicons:menu-01" /> Menu
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuHandler>
          <IconButton color="neutral" variant="outlined">
            <Icon icon="hugeicons:menu-01" />
          </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>
      </Menu>
    </div>
  </div>
);
