import type { ReactNode } from "react";
import { colorScales } from "../../tokens/colors";
import { cn } from "../../utils/cn";

type ButtonHierarchy = "primary" | "secondary" | "tertiary" | "quaternary";
type ButtonOutcome = "action" | "destructive";
type VisualState = "idle" | "hover" | "disabled";

const actionStyles: Record<ButtonHierarchy, Record<VisualState, string>> = {
  primary: {
    idle: "bg-action-primary-idle text-action-primary-on-idle",
    hover: "bg-action-primary-hover text-action-primary-on-hover",
    disabled: "bg-action-primary-disabled text-action-primary-on-disabled",
  },
  secondary: {
    idle: "border border-divider-primary bg-action-secondary-idle text-action-secondary-on-idle",
    hover: "border border-divider-primary bg-action-secondary-hover text-action-secondary-on-hover",
    disabled: "border border-divider-primary bg-action-secondary-disabled text-action-secondary-on-disabled",
  },
  tertiary: {
    idle: "bg-action-tertiary-idle text-action-tertiary-on-idle",
    hover: "bg-action-tertiary-hover text-action-tertiary-on-hover",
    disabled: "bg-action-tertiary-disabled text-action-tertiary-on-disabled",
  },
  quaternary: {
    idle: "bg-action-quaternary-idle text-action-quaternary-on-idle",
    hover: "bg-action-quaternary-hover text-action-quaternary-on-hover",
    disabled: "bg-action-quaternary-disabled text-action-quaternary-on-disabled",
  },
};

const destructiveStyles: Record<ButtonHierarchy, Record<VisualState, string>> = {
  primary: {
    idle: "bg-action-destructive-idle text-action-destructive-on-idle",
    hover: "bg-action-destructive-hover text-action-destructive-on-hover",
    disabled: "bg-action-destructive-disabled text-action-destructive-on-disabled",
  },
  secondary: {
    idle: "border border-red-300 bg-grey-50 text-red-500",
    hover: "border border-red-300 bg-red-50 text-red-700",
    disabled: "border border-red-300 bg-grey-50 text-red-300",
  },
  tertiary: {
    idle: "bg-white text-red-500",
    hover: "bg-red-50 text-red-700",
    disabled: "bg-white text-red-300",
  },
  quaternary: {
    idle: "bg-white text-red-500",
    hover: "bg-grey-100 text-red-700",
    disabled: "bg-white text-red-300",
  },
};

export const ButtonSnapshot = ({
  hierarchy,
  outcome = "action",
  visualState = "idle",
  children = "Button",
}: {
  hierarchy: ButtonHierarchy;
  outcome?: ButtonOutcome;
  visualState?: VisualState;
  children?: ReactNode;
}) => {
  const styles = outcome === "destructive" ? destructiveStyles : actionStyles;

  return (
    <span
      className={cn(
        "inline-flex min-h-10 min-w-[94px] items-center justify-center rounded-control px-2 text-caption-1",
        visualState === "disabled" && "cursor-not-allowed",
        styles[hierarchy][visualState],
      )}
    >
      {children}
    </span>
  );
};

export const IconButtonSnapshot = ({
  hierarchy = "tertiary",
  visualState = "idle",
  size = "large",
}: {
  hierarchy?: "tertiary" | "quaternary";
  visualState?: "idle" | "hover";
  size?: "large" | "small";
}) => {
  const idleHover: Record<"tertiary" | "quaternary", Record<"idle" | "hover", string>> = {
    tertiary: {
      idle: "bg-action-tertiary-idle text-action-tertiary-on-idle",
      hover: "bg-action-tertiary-hover text-action-tertiary-on-hover",
    },
    quaternary: {
      idle: "bg-action-quaternary-idle text-action-quaternary-on-idle",
      hover: "bg-action-quaternary-hover text-action-quaternary-on-hover",
    },
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-control text-action-tertiary-on-idle",
        size === "large" ? "size-10 [&>svg]:size-6" : "size-8 [&>svg]:size-4",
        idleHover[hierarchy][visualState],
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    </span>
  );
};

type ColorScaleName = keyof typeof colorScales;

export const ColorScaleRow = ({ name }: { name: ColorScaleName }) => {
  const scale = colorScales[name];
  const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;

  return (
    <div className="mb-8">
      <p className="mb-2 text-subheader-em capitalize text-display-on-light-primary">{name}</p>
      <div className="flex">
        {shades.map((shade) => (
          <div
            key={shade}
            className="flex h-20 w-[100px] items-center justify-center text-body text-display-on-light-primary"
            style={{ backgroundColor: scale[shade] }}
          >
            {shade}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SemanticSwatch = ({
  label,
  cssVar,
  textClassName = "text-display-on-light-primary",
}: {
  label: string;
  cssVar: string;
  textClassName?: string;
}) => (
  <div className="w-[250px]">
    <div
      className={cn("flex h-[90px] items-end rounded-control p-3 text-caption-2-em", textClassName)}
      style={{ background: `var(${cssVar})` }}
    >
      {label}
    </div>
  </div>
);

export const formatIconLabel = (name: string) =>
  name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
