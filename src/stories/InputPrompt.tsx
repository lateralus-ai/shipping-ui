import { Button, IconButton } from "@material-tailwind/react";
import { InputPrompt } from "../components/";
import { Icon } from "@iconify/react";

export const InputPrompts = () => {
  const bottomButtons = (
    <div>
      <Button variant="text" color="gray">
        Select ship
      </Button>
    </div>
  );

  const rightButtons = (
    <div className="flex gap-2">
      <IconButton variant="text" color="gray">
        <Icon icon="material-symbols:attach-file-rounded" className="size-6" />
      </IconButton>
      <InputPrompt.SubmitButton onClick={() => alert("Click")} />
    </div>
  );

  const topContent = (
    <div className="p-2 mt-2 mx-2 rounded bg-orange-50">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex minima hic
      qui! Ipsum et, perferendis molestias ut voluptatum laborum id similique.
    </div>
  );

  return (
    <div className="w-[650px] grid gap-8 p-4">
      <InputPrompt.Container right={rightButtons} />
      <InputPrompt.Container right={rightButtons} bottom={bottomButtons} />
      <InputPrompt.Container right={rightButtons} top={topContent} />

      <div className="border rounded-lg">
        <div className="border-b p-4">Lorem Ipsum dorcet sit amet</div>
        <div className="p-4 border-b">
          <div className="h-[650px] text-gray-400 font-semibold bg-gray-100 rounded-2xl items-center justify-center flex">
            Content placeholder
          </div>
        </div>
        <InputPrompt.Container
          right={rightButtons}
          className="border-none shadow-none"
        />
      </div>
    </div>
  );
};
