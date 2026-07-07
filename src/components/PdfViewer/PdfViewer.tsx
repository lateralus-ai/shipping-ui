import { Document, Page, pdfjs } from "react-pdf";
import { ModalPanel } from "../ModalPanel";
import { IconButton } from "../../primitives/IconButton";
import { ChevronIcon, MinusIcon, PlusIcon, ExpandIcon } from "../../icons";
import { cn } from "../../utils/cn";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  useState,
  type ChangeEvent,
  useRef,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useZoom } from "./useZoom";
import { useRotation } from "./useRotation";
import { usePageManagement } from "./usePageManagement";
import { usePanning } from "./usePanning";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerProps = React.HTMLProps<HTMLDivElement> & {
  onClose: () => void;
  src: string;
  title?: string;
  onOpen?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
};

const toolbarButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-control border border-divider-primary bg-white text-display-on-light-secondary hover:bg-background-secondary disabled:opacity-50";

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
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const baseScale = containerWidth / 612;
      setScale(baseScale * (zoom / 100));
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [zoom]);

  const handleOpen = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onOpen?.(event);
    if (event.defaultPrevented || !src) {
      event.preventDefault();
      return;
    }
    window.open(src, "_blank", "noopener,noreferrer");
  };

  const rightButtons = (
    <IconButton hierarchy="quaternary" size="small" aria-label="Open in new tab" onClick={handleOpen}>
      <ExpandIcon size="small" />
    </IconButton>
  );

  return (
    <div className={cn("flex h-full flex-col rounded-t-lg shadow-raise2", className)} ref={containerRef}>
      <ModalPanel.Header onClose={onClose} right={rightButtons}>
        {title}
      </ModalPanel.Header>

      <div className="grid h-full grow overflow-hidden shadow">
        <div
          className={cn(
            "col-start-1 row-start-1 mt-8 flex h-full items-center justify-center overflow-hidden bg-background-tertiary p-8 select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          onMouseDown={panActions.handleMouseDown}
          onMouseMove={panActions.handleMouseMove}
          onMouseUp={panActions.handleMouseUp}
          onMouseLeave={panActions.handleMouseUp}
          style={{ userSelect: "none" }}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px)`,
              transition: isDragging ? "none" : "transform 0.1s",
              pointerEvents: "none",
              maxWidth: "650px",
            }}
          >
            <Document
              externalLinkRel="noopener noreferrer"
              externalLinkTarget="_blank"
              file={src}
              onLoadSuccess={({ numPages }) => pageActions.setTotalPages(numPages)}
              scale={scale}
              rotate={rotation}
            >
              <Page pageNumber={currentPage} renderTextLayer renderAnnotationLayer />
            </Document>
          </div>
        </div>

        <div className="z-10 col-start-1 row-start-1 flex w-full flex-wrap items-center justify-between gap-3 self-start bg-background-secondary p-2 shadow">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={toolbarButtonClass}
              onClick={pageActions.prevPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronIcon direction="left" size="small" />
            </button>
            <input
              className="h-8 w-14 rounded-control border border-divider-primary bg-white px-1 py-1 text-center text-caption-2 text-display-on-light-primary"
              value={currentPage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const page = parseInt(e.target.value, 10);
                if (!isNaN(page)) pageActions.goToPage(page);
              }}
              type="number"
              min="1"
              max={totalPages}
            />
            <span className="px-2 text-caption-2 text-display-on-light-secondary">of {totalPages}</span>
            <button
              type="button"
              className={toolbarButtonClass}
              onClick={pageActions.nextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronIcon direction="right" size="small" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <button type="button" className={toolbarButtonClass} onClick={zoomActions.zoomOut} aria-label="Zoom out">
                <MinusIcon size="small" />
              </button>
              <button
                type="button"
                className="h-8 w-14 rounded-control border border-divider-primary bg-white text-center text-caption-2 text-display-on-light-primary hover:bg-background-secondary"
                onClick={() => {
                  zoomActions.reset();
                  panActions.reset();
                }}
              >
                {zoom}%
              </button>
              <button type="button" className={toolbarButtonClass} onClick={zoomActions.zoomIn} aria-label="Zoom in">
                <PlusIcon size="small" />
              </button>
            </div>
            <div className="h-6 w-px bg-divider-primary" />
            <button
              type="button"
              className={toolbarButtonClass}
              onClick={rotationActions.rotateCounterClockwise}
              aria-label="Rotate counter-clockwise"
            >
              <ChevronIcon direction="left" size="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
