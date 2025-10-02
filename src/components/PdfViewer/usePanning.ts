import { useState, MouseEvent } from "react";

interface PanState {
  x: number;
  y: number;
}

export const usePanning = () => {
  const [pan, setPan] = useState<PanState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<PanState>({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const actions = {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    reset: () => setPan({ x: 0, y: 0 })
  };

  return [{ pan, isDragging }, actions] as const;
};