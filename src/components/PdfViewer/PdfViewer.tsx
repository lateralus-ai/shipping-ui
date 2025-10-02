import { useRef } from "react";
import { IconButton } from "@material-tailwind/react";
import { ModalPanel } from "../ModalPanel";
import ExpandIcon from "../icons/ExpandIcon";
import { useRefDimensions } from "./useRefDimensions";

interface PdfViewerProps {
  onClose: () => void;
  src: string;
  title: string;
}

export const PdfViewer = ({
  onClose,
  src,
  title = "PDF Viewer",
}: PdfViewerProps) => {
  const containerRef = useRef(null);
  const dimensions = useRefDimensions(containerRef);

  const rightButtons = (
    <IconButton variant="text" color="gray">
      <a href={src} target="_blank" rel="noopener noreferrer">
        <ExpandIcon className="size-4" />
      </a>
    </IconButton>
  );

  return (
    <div className="shadow rounded-t-lg">
      <ModalPanel.Header onClose={onClose} right={rightButtons}>
        {title}
      </ModalPanel.Header>

      <div className="grid">
        <div className="grid relative">
          <div
            ref={containerRef}
            className="overflow-hidden col-start-1 row-start-1 bg-gray-200 h-[600px] relative"
          >
            <embed
              src={`${src}#view=FitH&navpanes=0&scrollbar=0`}
              type="application/pdf"
              width={dimensions.width}
              height={dimensions.height}
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
