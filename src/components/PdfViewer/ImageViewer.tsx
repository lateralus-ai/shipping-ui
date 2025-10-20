import { IconButton, ButtonGroup, Tooltip } from "@material-tailwind/react"
import { ModalPanel } from "../ModalPanel"
import ExpandIcon from "../icons/ExpandIcon"
import { Icon } from "@iconify/react"
import { ChangeEvent, useEffect, useState } from "react"
import { useZoom } from "./useZoom"
import { useRotation } from "./useRotation"
import { usePanning } from "./usePanning"
import { usePageManagement } from "./usePageManagement"
import { cn } from "../../utils/cn"

interface ImageViewerProps {
  className?: string
  canvasClassName?: string
  documentUrl?: string
  onClose: () => void
  totalPages: number
  getImageSrc: (page: number) => string | Promise<string>
  title?: string
}

export const ImageViewer = ({
  className,
  canvasClassName,
  onClose,
  totalPages,
  getImageSrc,
  documentUrl,
  title = "PDF Viewer",
}: ImageViewerProps) => {
  const [zoom, zoomActions] = useZoom()
  const [rotation, rotationActions] = useRotation()
  const [{ pan, isDragging }, panActions] = usePanning()
  const [{ currentPage }, pageActions] = usePageManagement(totalPages)
  const [imageSrc, setImageSrc] = useState<string>(() => {
    const initialResult = getImageSrc(currentPage)
    return typeof initialResult === "string" ? initialResult : ""
  })

  useEffect(() => {
    let isActive = true

    const loadImage = async () => {
      const result = getImageSrc(currentPage)
      const resolvedSrc = await Promise.resolve(result)

      if (isActive) {
        setImageSrc(resolvedSrc)
      }
    }

    void loadImage()

    return () => {
      isActive = false
    }
  }, [currentPage, getImageSrc])

  const rightButtons = (
    <IconButton variant="text" color="gray">
      <a href={documentUrl} target="_blank" rel="noopener noreferrer">
        <ExpandIcon className="size-4" />
      </a>
    </IconButton>
  )

  return (
    <div className={cn("shadow rounded-t-lg flex flex-col h-full", className)}>
      <ModalPanel.Header onClose={onClose} right={rightButtons}>
        {title}
      </ModalPanel.Header>

      <div className="flex flex-col h-full justify-between">
        <div className="grid relative h-full">
          <div
            className={`${canvasClassName} overflow-hidden col-start-1 row-start-1 bg-gray-200 h-full relative`}
            onMouseMove={panActions.handleMouseMove}
            onMouseUp={panActions.handleMouseUp}
            onMouseLeave={panActions.handleMouseUp}
            onWheel={zoomActions.handleWheel}
          >
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px)`,
                cursor: isDragging ? "grabbing" : "grab",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseDown={panActions.handleMouseDown}
            >
              <div
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transformOrigin: "center",
                  transition: isDragging ? "none" : "transform 0.3s ease",
                }}
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    style={{ userSelect: "none", pointerEvents: "none" }}
                  />
                ) : null}
              </div>
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
                    zoomActions.reset()
                    panActions.reset()
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
                  const page = parseInt(e.target.value)
                  if (!isNaN(page)) {
                    pageActions.goToPage(page)
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
    </div>
  )
}
