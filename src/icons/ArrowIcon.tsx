import { forwardRef, type SVGProps } from "react";
import { cn } from "../utils/cn";
import { ARROW_PATHS } from "./arrow-paths";
import { ICON_BOX, type ArrowDirection, type IconProps } from "./types";

export type ArrowIconProps = IconProps & {
  direction?: ArrowDirection;
};

export const ArrowIcon = forwardRef<
  SVGSVGElement,
  ArrowIconProps & SVGProps<SVGSVGElement>
>(({ size = "large", direction = "right", className, ...props }, ref) => {
  const box = ICON_BOX[size];
  const paths = ARROW_PATHS[direction];
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

ArrowIcon.displayName = "ArrowIcon";
