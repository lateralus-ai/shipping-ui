import { IconButton, Button, ButtonGroup } from "@material-tailwind/react";
import { ModalPanel } from "./ModalPanel";
import ExpandIcon from "./icons/ExpandIcon";
import { Icon } from "@iconify/react";

export const PDFViewer = ({ onClose }) => {
  const rightButtons = (
    <IconButton variant="text" color="gray">
      <ExpandIcon className="size-4" />
    </IconButton>
  );

  return (
    <div className="shadow rounded-t-lg">
      <ModalPanel.Header onClose={onClose} right={rightButtons} />
      <div className="grid">
        <div className="grid relative">
          <img
            src="https://placehold.co/1280x1600"
            className="col-start-1 row-start-1"
          />

          <div className="col-start-1 row-start-1 self-end justify-self-center p-4 flex gap-2 justify-between w-full">
            <ButtonGroup className="divide-x-0 h-[52px]">
              <IconButton variant="filled" color="white" className="py-[26px]">
                <Icon icon="ix:minus" />
              </IconButton>
              <button className="bg-white px-4 flex items-center">65%</button>
              <IconButton variant="filled" color="white" className="py-[26px]">
                <Icon icon="ix:plus" />
              </IconButton>
            </ButtonGroup>

            <ButtonGroup className="divide-x-0">
              <IconButton variant="filled" color="white" className="py-[26px]">
                <Icon icon="ix:chevron-left" />
              </IconButton>
              <input
                className="bg-white px-4 flex items-center w-[50px]"
                value={12}
              />
              <div className="flex items-center bg-white px-2">of 220</div>
              <IconButton variant="filled" color="white" className="py-[26px]">
                <Icon icon="ix:chevron-right" />
              </IconButton>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};