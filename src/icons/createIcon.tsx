import { forwardRef, type SVGProps } from "react";
import { cn } from "../utils/cn";
import { ICON_BOX, type IconProps, type IconSize } from "./types";

export type IconShape = {
  type?: "path" | "rect";
  d?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rx?: number;
  fill?: string;
  stroke?: string;
  fillRule?: "evenodd";
  strokeWidth?: number;
  opacity?: number;
};

export type IconPathEntry = IconShape | IconShape[];

export type IconPathSet = Partial<Record<IconSize, IconPathEntry>>;

export type IconVariantSet = {
  outline?: IconPathSet;
  filled?: IconPathSet;
};

export type CreateIconOptions = {
  name: string;
  outline: IconPathSet;
  filled?: IconPathSet;
  variants?: Record<string, IconVariantSet>;
};

const normalizeShapes = (entry: IconPathEntry): IconShape[] =>
  Array.isArray(entry) ? entry : [entry];

const renderShape = (shape: IconShape, index: number) => {
  const fill = shape.fill ?? (shape.type === "rect" ? "none" : "currentColor");
  const stroke = shape.stroke ?? "currentColor";

  if (shape.type === "rect") {
    return (
      <rect
        key={index}
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        rx={shape.rx}
        fill={fill}
        stroke={shape.strokeWidth !== undefined ? stroke : undefined}
        strokeWidth={shape.strokeWidth}
        opacity={shape.opacity}
      />
    );
  }

  const useStroke = shape.strokeWidth !== undefined;

  return (
    <path
      key={index}
      d={shape.d}
      fillRule={shape.fillRule}
      fill={useStroke ? "none" : fill}
      stroke={useStroke ? stroke : undefined}
      strokeWidth={shape.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={shape.opacity}
    />
  );
};

export const createIcon = ({ name, outline, filled, variants }: CreateIconOptions) => {
  const Icon = forwardRef<SVGSVGElement, IconProps & SVGProps<SVGSVGElement>>(
    ({ size = "large", filled: isFilled = false, variant, className, ...props }, ref) => {
      const box = ICON_BOX[size];
      const variantSet = variant ? variants?.[variant] : undefined;
      const paths = variantSet
        ? isFilled && variantSet.filled
          ? variantSet.filled
          : variantSet.outline
        : isFilled && filled
          ? filled
          : outline;
      const entry = paths?.[size];

      if (!entry) return null;

      const shapes = normalizeShapes(entry);

      return (
        <svg
          ref={ref}
          width={box}
          height={box}
          viewBox={`0 0 ${box} ${box}`}
          fill="none"
          className={cn("shrink-0", className)}
          aria-hidden={props["aria-label"] ? undefined : true}
          {...props}
        >
          {shapes.map(renderShape)}
        </svg>
      );
    },
  );

  Icon.displayName = name;
  return Icon;
};

/** Renders multiple size variants side-by-side for canvas stories */
export const IconSizeRow = ({
  Icon,
  filled,
}: {
  Icon: React.ComponentType<IconProps>;
  filled?: boolean;
}) => (
  <>
    <Icon size="large" filled={filled} />
    <Icon size="small" filled={filled} />
  </>
);
