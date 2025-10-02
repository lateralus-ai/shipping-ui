import { useState, WheelEvent } from "react";

export const useZoom = (initialZoom = 100, minZoom = 50, maxZoom = 990, step = 10) => {
  const [zoom, setZoom] = useState<number>(initialZoom);

  const actions = {
    zoomIn: () => setZoom(prev => Math.min(prev + step, maxZoom)),
    zoomOut: () => setZoom(prev => Math.max(prev - step, minZoom)),
    reset: () => setZoom(initialZoom),
    zoomToValue: (value: number) => setZoom(Math.max(minZoom, Math.min(value, maxZoom)))
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -step : step;
    setZoom(prev => Math.max(minZoom, Math.min(prev + delta, maxZoom)));
  };

  return [zoom, { ...actions, handleWheel }] as const;
};