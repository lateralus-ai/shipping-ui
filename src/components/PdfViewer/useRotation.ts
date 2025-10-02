import { useState } from "react";

export const useRotation = () => {
  const [rotation, setRotation] = useState<number>(0);

  const actions = {
    rotateClockwise: () => setRotation((prev) => (prev + 90) % 360),
    rotateCounterClockwise: () =>
      setRotation((prev) => (prev - 90 + 360) % 360),
  };

  return [rotation, actions] as const;
};
