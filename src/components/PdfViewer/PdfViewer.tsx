import { IconButton, ButtonGroup, Tooltip } from "@material-tailwind/react";
import { Document, Page, pdfjs } from "react-pdf";
import { ModalPanel } from "../ModalPanel";
import ExpandIcon from "../icons/ExpandIcon";
import { Icon } from "@iconify/react";
import { cn } from "../../utils/cn";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState, ChangeEvent, useMemo, MouseEvent as ReactMouseEvent } from "react";
import { useZoom } from "./useZoom";
import { useRotation } from "./useRotation";
import { usePageManagement } from "./usePageManagement";
import { usePanning } from "./usePanning";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps extends React.HTMLProps<HTMLDivElement> {
  onClose: () => void;
  src: string;
  title?: string;
  onOpen?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

export const PdfViewer = ({
  onClose,
  src,
  title = "PDF Viewer",
  className,
  onOpen,
}: PdfViewerProps) => {
  const [zoom, zoomActions] = useZoom();
  const [rotation, rotationActions] = useRotation();
  const [{ currentPage, totalPages }, pageActions] = usePageManagement();
  const [{ pan, isDragging }, panActions] = usePanning();

  const handleOpen = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (onOpen) {
      console.debug("[PdfViewer] onOpen callback triggered", {
        hasHandler: true,
      });
      onOpen(event);
    } else {
      console.debug("[PdfViewer] open button clicked", {
        hasHandler: false,
      });
    }
    if (event.defaultPrevented) {
      return;
    }

    if (!src) {
      event.preventDefault();
      return;
    }

    window.open(src, "_blank", "noopener,noreferrer");
  };

  const rightButtons = (
    <IconButton variant="text" color="gray" onClick={handleOpen}>
      <ExpandIcon className="size-4" />
    </IconButton>
  );

  return (
    <div className={cn("shadow rounded-t-lg flex flex-col h-full", className)}>
      <ModalPanel.Header onClose={onClose} right={rightButtons}>
        {title}
      </ModalPanel.Header>

      <div className="grid grow h-full overflow-hidden">
        <div
          className={cn(
            "col-start-1 row-start-1 bg-gray-200 h-full overflow-hidden select-none p-8",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          onMouseDown={panActions.handleMouseDown}
          onMouseMove={panActions.handleMouseMove}
          onMouseUp={panActions.handleMouseUp}
          onMouseLeave={panActions.handleMouseUp}
          style={{
            userSelect: 'none',
          }}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s',
              pointerEvents: 'none',
            }}
          >
            <Document
              externalLinkRel="noopener noreferrer"
              externalLinkTarget="_blank"
              file={src}
              onLoadSuccess={({ numPages }) => {
                pageActions.setTotalPages(numPages);
              }}
              scale={zoom / 100}
              rotate={rotation}
            >
              <Page
                pageNumber={currentPage}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
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
              <Icon icon="lucide:minus" />
            </IconButton>
            <Tooltip content="Click to reset zoom and pan">
              <button
                className="!bg-white text-center cursor-pointer w-[60px]"
                onClick={() => {
                  zoomActions.reset();
                  panActions.reset();
                }}
              >
                {zoom}%
              </button>
            </Tooltip>
            <IconButton
              variant="filled"
              color="white"
              className="py-[26px]"
              onClick={zoomActions.zoomIn}
            >
              <Icon icon="lucide:plus" />
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
          <ButtonGroup className="divide-x-0 ">
            <IconButton
              variant="filled"
              color="white"
              className="py-[26px]"
              onClick={pageActions.prevPage}
              disabled={currentPage === 1}
            >
              <Icon icon="lucide:chevron-left" />
            </IconButton>
            <input
              className="bg-white pl-4 flex items-center w-[50px] text-center focus:outline-none w-[60px]"
              value={currentPage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page)) {
                  pageActions.goToPage(page);
                }
              }}
              type="number"
              min="1"
              max={totalPages}
            />
            <div className="flex items-center bg-white px-2">
              of {totalPages}
            </div>
            <IconButton
              variant="filled"
              color="white"
              className="py-[26px]"
              onClick={pageActions.nextPage}
              disabled={currentPage === totalPages}
            >
              <Icon icon="lucide:chevron-right" />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};
