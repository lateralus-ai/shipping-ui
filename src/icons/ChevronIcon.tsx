import { forwardRef, type SVGProps } from "react";
import { cn } from "../utils/cn";
import { CHEVRON_PATHS } from "./chevron-paths";
import { ICON_BOX, type ChevronDirection, type IconProps } from "./types";

export type ChevronIconProps = IconProps & {
  direction?: ChevronDirection;
};

export const ChevronIcon = forwardRef<
  SVGSVGElement,
  ChevronIconProps & SVGProps<SVGSVGElement>
>(({ size = "small", direction = "right", className, ...props }, ref) => {
  const box = ICON_BOX[size];
  const paths = CHEVRON_PATHS[direction];
  const path = paths[size];

  if (!path) return null;

  const useStroke = path.strokeWidth !== undefined;

  return (
    <svg
      ref={ref}
      width={box}
      height={box}
      viewBox={`0 0 ${box} ${box}`}
      fill={useStroke ? "none" : "currentColor"}
      stroke={useStroke ? "currentColor" : undefined}
      strokeWidth={path.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      <path d={path.d} fillRule={path.fillRule} />
    </svg>
  );
});

ChevronIcon.displayName = "ChevronIcon";
