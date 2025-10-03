import { useRef } from "react";
import { IconButton } from "@material-tailwind/react";
import { ModalPanel } from "../ModalPanel";
import ExpandIcon from "../icons/ExpandIcon";
import { useRefDimensions } from "./useRefDimensions";
import { cn } from "../../utils/cn";

interface PdfViewerProps {
  onClose: () => void;
  src: string;
  title?: string;
}

export const PdfViewer = ({
  onClose,
  src,
  title = "PDF Viewer",
  className,
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
    <div className={cn("shadow rounded-t-lg flex flex-col h-full", className)}>
      <ModalPanel.Header onClose={onClose} right={rightButtons}>
        {title}
      </ModalPanel.Header>

      <div className="flex-1 grid">
        <div className="grid relative">
          <div
            ref={containerRef}
            className="overflow-hidden col-start-1 row-start-1 bg-gray-200 h-full relative"
          >
            <embed
              src={`${src}#view=FitH&navpanes=0&scrollbar=0`}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
