import { IconButton, ButtonGroup, Tooltip } from "@material-tailwind/react";
import { Document, Page, pdfjs } from "react-pdf";
import { ModalPanel } from "../ModalPanel";
import ExpandIcon from "../icons/ExpandIcon";
import { Icon } from "@iconify/react";
import { cn } from "../../utils/cn";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState, ChangeEvent, useMemo } from "react";
import { useZoom } from "./useZoom";
import { useRotation } from "./useRotation";
import { usePageManagement } from "./usePageManagement";
import { usePanning } from "./usePanning";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps extends React.HTMLProps<HTMLDivElement> {
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
  const [zoom, zoomActions] = useZoom();
  const [rotation, rotationActions] = useRotation();
  const [{ currentPage, totalPages }, pageActions] = usePageManagement();
  const [{ pan, isDragging }, panActions] = usePanning();

  const documentComponent = useMemo(
    () => (
      <Document
        file={src}
        onLoadSuccess={({ numPages }) => {
          pageActions.setTotalPages(numPages);
        }}
        options={{
          cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
          standardFontDataUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
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
    ),
    [src, zoom, rotation, currentPage]
  );

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
        {title} - {currentPage} - {zoom}
      </ModalPanel.Header>

      <div className="grid grow h-full">
        <div
          className={cn(
            "col-start-1 row-start-1 bg-gray-200 h-full overflow-auto select-none",
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
{documentComponent}
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
