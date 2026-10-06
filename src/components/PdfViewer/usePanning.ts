import { useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";

const DRAG_THRESHOLD = 3;

const hasOverflow = (element: HTMLElement) =>
  element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;

/**
 * Drag-to-pan for a native scroll container. Panning moves `scrollLeft`/`scrollTop`,
 * so it is bounded by the content, and it is only enabled while the content
 * overflows — at fit zoom nothing moves and the text layer stays selectable.
 */
export const usePanning = (viewportRef: RefObject<HTMLElement | null>) => {
  const [canPan, setCanPan] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const hasMoved = useRef<boolean>(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => setCanPan(hasOverflow(viewport));
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    Array.from(viewport.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [viewportRef]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      hasMoved.current ||= Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD;
      viewport.scrollLeft = dragStart.current.left - dx;
      viewport.scrollTop = dragStart.current.top - dy;
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      // The click that ends a drag fires right after mouseup; let handleClickCapture see it first.
      setTimeout(() => (hasMoved.current = false));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, viewportRef]);

  const handleMouseDown = (e: MouseEvent) => {
    const viewport = viewportRef.current;
    if (!canPan || !viewport || e.button !== 0) return;
    e.preventDefault();
    dragStart.current = { x: e.clientX, y: e.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
    setIsDragging(true);
  };

  // Releasing a drag over a link must not follow it.
  const handleClickCapture = (e: MouseEvent) => {
    if (!hasMoved.current) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const actions = {
    handleMouseDown,
    handleClickCapture,
    resetScroll: () => viewportRef.current?.scrollTo({ left: 0, top: 0 }),
  };

  return [{ canPan, isDragging }, actions] as const;
};
