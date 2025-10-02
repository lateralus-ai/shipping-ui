import { IconButton } from "@material-tailwind/react";
import XIcon from "./icons/XIcon";

interface HeaderProps {
  onClose: () => void;
  right?: React.ReactNode;
}

const Header = ({ onClose, right }: HeaderProps) => {
  return (
    <div className="bg-gray-50 flex gap-2 items-center px-2 py-3 rounded-t-xl">
      <div className="grow text-subheader-em">PDF Viewer</div>
      <div className="flex items-center gap-4">
        {right}
        <IconButton
          variant="text"
          size="sm"
          color="gray"
          className="rounded-full"
          onClick={onClose}
        >
          <XIcon className="size-4 text-gray-600" />
        </IconButton>
      </div>
    </div>
  );
};

export const ModalPanel = {
  Header,
};
