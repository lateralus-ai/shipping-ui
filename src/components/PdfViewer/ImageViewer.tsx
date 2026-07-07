import { IconButton } from "../../primitives/IconButton";
import { ChevronIcon, MinusIcon, PlusIcon, ExpandIcon } from "../../icons";
import { ModalPanel } from "../ModalPanel";
import { type ChangeEvent, useEffect, useState } from "react";
import { useZoom } from "./useZoom";
import { useRotation } from "./useRotation";
import { usePanning } from "./usePanning";
import { usePageManagement } from "./usePageManagement";
import { cn } from "../../utils/cn";

type ImageViewerProps = {
  className?: string;
  canvasClassName?: string;
  documentUrl?: string;
  mainCanvasClassname?: string;
  initialPage?: number;
  onClose: () => void;
  totalPages: number;
  getImageSrc: (page: number) => string | Promise<string>;
  title?: string;
};

const toolbarButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-control border border-divider-primary bg-white text-display-on-light-secondary hover:bg-background-secondary disabled:opacity-50";

export const ImageViewer = ({
  className,
  canvasClassName,
  mainCanvasClassname,
  initialPage = 1,
  onClose,
  totalPages,
  getImageSrc,
  documentUrl,
  title = "PDF Viewer",
}: ImageViewerProps) => {
  const [zoom, zoomActions] = useZoom();
  const [rotation, rotationActions] = useRotation();
  const [{ pan, isDragging }, panActions] = usePanning();
  const [{ currentPage }, pageActions] = usePageManagement(totalPages, initialPage);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const src = await getImageSrc(currentPage);
      setImageSrc(src);
    };
    load();
  }, [currentPage, getImageSrc]);

  const handleOpen = () => {
    if (!documentUrl) return;
    window.open(documentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={cn("flex h-full flex-col rounded-t-lg shadow-raise2", className)}>
      <ModalPanel.Header
        onClose={onClose}
        right={
          documentUrl ? (
            <IconButton hierarchy="quaternary" size="small" aria-label="Open" onClick={handleOpen}>
              <ExpandIcon size="small" />
            </IconButton>
          ) : undefined
        }
      >
        {title}
      </ModalPanel.Header>

      <div className={cn("grid h-full grow overflow-hidden", canvasClassName)}>
        <div
          className={cn(
            "col-start-1 row-start-1 flex items-center justify-center overflow-hidden bg-background-tertiary p-8",
            isDragging ? "cursor-grabbing" : "cursor-grab",
            mainCanvasClassname,
          )}
          onMouseDown={panActions.handleMouseDown}
          onMouseMove={panActions.handleMouseMove}
          onMouseUp={panActions.handleMouseUp}
          onMouseLeave={panActions.handleMouseUp}
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt={`Page ${currentPage}`}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) rotate(${rotation}deg) scale(${zoom / 100})`,
              }}
              className="max-w-full"
              draggable={false}
            />
          )}
        </div>

        <div className="z-10 col-start-1 row-start-1 flex items-center justify-between gap-3 self-start bg-background-secondary p-2 shadow">
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
              className="h-8 w-14 rounded-control border border-divider-primary bg-white text-center text-caption-2"
              value={currentPage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const page = parseInt(e.target.value, 10);
                if (!isNaN(page)) pageActions.goToPage(page);
              }}
              type="number"
              min={1}
              max={totalPages}
            />
            <span className="px-2 text-caption-2">of {totalPages}</span>
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
          <div className="flex items-center gap-1">
            <button type="button" className={toolbarButtonClass} onClick={zoomActions.zoomOut} aria-label="Zoom out">
              <MinusIcon size="small" />
            </button>
            <span className="w-14 text-center text-caption-2">{zoom}%</span>
            <button type="button" className={toolbarButtonClass} onClick={zoomActions.zoomIn} aria-label="Zoom in">
              <PlusIcon size="small" />
            </button>
            <button
              type="button"
              className={toolbarButtonClass}
              onClick={rotationActions.rotateCounterClockwise}
              aria-label="Rotate"
            >
              <ChevronIcon direction="left" size="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
