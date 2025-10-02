import { Checkbox } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

export const CheckboxItem = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="p-8 grid gap-4">
      <div className="flex flex-col gap-2">
        <div className="font-medium text-lg">Default</div>
        <Checkbox
          checked={isChecked}
          icon={<Icon icon="lucide:check" className="w-3.5 h-3.5" />}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
          containerProps={{
            className: "pl-1 pr-2 pb-0 pt-1",
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-medium text-lg">With label</div>
        <Checkbox
          label="Remember Me"
          checked={isChecked}
          icon={<Icon icon="lucide:check" className="w-3.5 h-3.5" />}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
          containerProps={{
            className: "pl-1 pr-2 pb-0 pt-1",
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="font-medium text-lg">Disabled</div>
        <Checkbox
          label="Remember Me"
          checked={isChecked}
          disabled={true}
          icon={<Icon icon="lucide:check" className="w-3.5 h-3.5" />}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
          containerProps={{
            className: "pl-1 pr-2 pb-0 pt-1",
          }}
        />
      </div>
    </div>
  );
};
