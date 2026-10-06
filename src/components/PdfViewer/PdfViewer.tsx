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

// The pdf.js worker is deliberately NOT configured here. `react-pdf` is external
// to this bundle, so the host app owns the single pdfjs-dist instance and is the
// only place that can emit the worker as a same-origin asset — a library built in
// Vite lib mode can only inline it (~1.4 MB), which every consumer would pay for
// on load whether or not a PDF is ever opened.
//
// Host apps MUST set `pdfjs.GlobalWorkerOptions.workerSrc` once at startup, e.g.
//   import { pdfjs } from "react-pdf";
//   pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs",
//     import.meta.url,
//   ).toString();
// Pointing it at a public CDN is not acceptable: crew run on filtered/degraded
// satellite links where that fetch is the one most likely to fail.
if (
  process.env.NODE_ENV !== "production" &&
  !pdfjs.GlobalWorkerOptions.workerSrc
) {
  console.warn(
    "[shipping-ui] PdfViewer: pdfjs.GlobalWorkerOptions.workerSrc is not set. " +
      "Configure it once in the host app or PDFs will fail to render.",
  );
}

type PdfViewerProps = React.HTMLProps<HTMLDivElement> & {
  onClose: () => void;
  src: string;
  title?: string;
  onOpen?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
};

// Fallback until react-pdf reports the real page size (US Letter, in PDF points).
const DEFAULT_PAGE_SIZE = { width: 612, height: 792 };
// At 100% a page is never drawn wider than this, so it doesn't balloon in a wide modal.
const MAX_FIT_WIDTH = 650;

type PageSize = typeof DEFAULT_PAGE_SIZE;

const getPadding = (element: HTMLElement) => {
  const style = getComputedStyle(element);
  return {
    x: parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    y: parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
  };
};

// The scale at which the whole page (as rotated) fits the viewport. Measures the
// border box, which doesn't change when scrollbars appear, so zooming can't oscillate.
const getFitScale = (viewport: HTMLElement, pageSize: PageSize, rotation: number) => {
  const padding = getPadding(viewport);
  const availableWidth = Math.min(viewport.offsetWidth - padding.x, MAX_FIT_WIDTH);
  const availableHeight = viewport.offsetHeight - padding.y;
  const isSideways = rotation % 180 !== 0;
  const pageWidth = isSideways ? pageSize.height : pageSize.width;
  const pageHeight = isSideways ? pageSize.width : pageSize.height;
  return Math.min(availableWidth / pageWidth, availableHeight / pageHeight);
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const [{ canPan, isDragging }, panActions] = usePanning(viewportRef);
  const [pageSize, setPageSize] = useState<PageSize>(DEFAULT_PAGE_SIZE);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const calculateScale = () => {
      const fitScale = getFitScale(viewport, pageSize, rotation);
      if (fitScale > 0) setScale(fitScale * (zoom / 100));
    };

    calculateScale();
    const observer = new ResizeObserver(calculateScale);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [zoom, rotation, pageSize]);

  useEffect(() => {
    panActions.resetScroll();
  }, [currentPage, src]);

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
    <div className={cn("flex h-full flex-col rounded-t-lg shadow-raise2", className)}>
      <ModalPanel.Header onClose={onClose} right={rightButtons}>
        {title}
      </ModalPanel.Header>

      <div className="flex min-h-0 grow flex-col overflow-hidden shadow">
        {/* `m-auto` (not justify/items-center) centers the page while keeping its
            top-left edge reachable by scrolling once it overflows. */}
        <div
          ref={viewportRef}
          className={cn(
            "flex min-h-0 grow overflow-auto overscroll-contain bg-background-tertiary p-8",
            canPan && (isDragging ? "cursor-grabbing select-none" : "cursor-grab"),
          )}
          onMouseDown={panActions.handleMouseDown}
          onClickCapture={panActions.handleClickCapture}
        >
          <div className="m-auto shrink-0">
            <Document
              externalLinkRel="noopener noreferrer"
              externalLinkTarget="_blank"
              file={src}
              onLoadSuccess={({ numPages }) => pageActions.setTotalPages(numPages)}
              onItemClick={({ pageNumber }) => pageActions.goToPage(pageNumber)}
              scale={scale}
              rotate={rotation}
            >
              <Page
                pageNumber={currentPage}
                renderTextLayer
                renderAnnotationLayer
                onLoadSuccess={(page) => {
                  const { width, height } = page.getViewport({ scale: 1, rotation: 0 });
                  setPageSize((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
                }}
              />
            </Document>
          </div>
        </div>

        <div className="z-10 order-first flex w-full shrink-0 flex-wrap items-center justify-between gap-3 bg-background-secondary p-2 shadow">
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
                  panActions.resetScroll();
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
