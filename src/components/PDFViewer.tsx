import { IconButton, Button, ButtonGroup } from "@material-tailwind/react";
import { ModalPanel } from "./ModalPanel";
import ExpandIcon from "./icons/ExpandIcon";
import { Icon } from "@iconify/react";
import { useState } from "react";

const useZoom = (initialZoom = 100, minZoom = 50, maxZoom = 400, step = 10) => {
  const [zoom, setZoom] = useState(initialZoom);

  const actions = {
    zoomIn: () => setZoom(prev => Math.min(prev + step, maxZoom)),
    zoomOut: () => setZoom(prev => Math.max(prev - step, minZoom)),
    reset: () => setZoom(initialZoom)
  };

  return [zoom, actions];
};

const useRotation = () => {
  const [rotation, setRotation] = useState(0);

  const actions = {
    rotateClockwise: () => setRotation(prev => (prev + 90) % 360),
    rotateCounterClockwise: () => setRotation(prev => (prev - 90 + 360) % 360)
  };

  return [rotation, actions];
};

export const PDFViewer = ({ onClose }) => {
  const [zoom, zoomActions] = useZoom();
  const [rotation, rotationActions] = useRotation();

  const rightButtons = (
    <IconButton variant="text" color="gray">
      <ExpandIcon className="size-4" />
    </IconButton>
  );

  return (
    <div className="shadow rounded-t-lg">
      <ModalPanel.Header onClose={onClose} right={rightButtons}>
        PDF Viewer
      </ModalPanel.Header>

      <div className="grid">
        <div className="grid relative">
          <div className="overflow-auto col-start-1 row-start-1 bg-gray-200">
            <div style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease'
            }}>
              <img
                src="https://placehold.co/1280x1600"
              />
            </div>
          </div>

          <div className="col-start-1 row-start-1 self-end p-4 flex gap-2 justify-between w-full z-10">
          <ButtonGroup className="divide-x-0 h-[52px]">
            <IconButton
              variant="filled"
              color="white"
              className="py-[26px]"
              onClick={zoomActions.zoomOut}
            >
              <Icon icon="ix:minus" />
            </IconButton>
            <button
              className="!bg-white px-4 flex items-center cursor-pointer"
              onClick={zoomActions.reset}
            >
              {zoom}%
            </button>
            <IconButton
              variant="filled"
              color="white"
              className="py-[26px]"
              onClick={zoomActions.zoomIn}
            >
              <Icon icon="ix:plus" />
            </IconButton>
          </ButtonGroup>
          <ButtonGroup className="divide-x-0 h-[52px]">
            <IconButton
              variant="filled"
              color="white"
              className="py-[26px]"
              onClick={rotationActions.rotateClockwise}
            >
              <Icon icon="lucide:iteration-cw" />
            </IconButton>

            <IconButton
              variant="filled"
              color="white"
              className="py-[26px]"
              onClick={rotationActions.rotateCounterClockwise}
            >
              <Icon icon="lucide:iteration-ccw" />
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
