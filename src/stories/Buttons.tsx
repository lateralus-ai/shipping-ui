import { Button, IconButton } from "@material-tailwind/react";
import { Icon } from "@iconify/react";

export const Buttons = () => (
  <div className="p-8 grid gap-4">
    <div className="flex gap-4">
      <IconButton color="blue">
        <Icon icon="lucide:ship" />
      </IconButton>

      <IconButton color="green">
        <Icon icon="lucide:ship" />
      </IconButton>

      <IconButton color="gray" variant="text">
        <Icon icon="lucide:ship" />
      </IconButton>

      <IconButton color="orange">
        <Icon icon="lucide:ship" />
      </IconButton>

      <IconButton color="red">
        <Icon icon="lucide:ship" />
      </IconButton>

      <IconButton variant="outlined" color="gray">
        <Icon icon="lucide:ship" />
      </IconButton>
    </div>

    <div className="flex gap-4">
      <Button color="blue" className="tracking-[0.16px]">
        Lorem ipsum
      </Button>

      <Button color="green">Lorem ipsum</Button>

      <Button color="gray" variant="text">
        Lorem ipsum
      </Button>

      <Button color="orange">Lorem ipsum</Button>

      <Button color="red">Lorem ipsum</Button>

      <Button variant="outlined" color="gray">
        Lorem ipsum
      </Button>
    </div>
  </div>
);
