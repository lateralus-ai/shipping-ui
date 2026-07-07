import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type FigmaPageProps = {
  title: string;
  width: number;
  children: ReactNode;
  className?: string;
};

export const FigmaPage = ({ title, width, children, className }: FigmaPageProps) => (
  <div
    className={cn("bg-white font-sans text-display-on-light-primary", className)}
    style={{ width }}
    data-figma-page={title}
  >
    <div className="px-8 pt-8 pb-4">
      <h1 className="font-heading text-heading text-display-on-light-primary">{title}</h1>
      <p className="mt-2 text-caption-2 text-display-on-light-tertiary">AskChief Design System</p>
    </div>
    {children}
  </div>
);

type FigmaContentProps = {
  children: ReactNode;
  padding?: number;
  className?: string;
};

export const FigmaContent = ({ children, padding = 24, className }: FigmaContentProps) => (
  <div className={cn("px-8 pb-8", className)} style={{ paddingLeft: 32, paddingRight: 32 }}>
    <div style={{ padding }}>{children}</div>
  </div>
);

type FigmaSectionProps = {
  label?: string;
  children: ReactNode;
  className?: string;
};

export const FigmaSection = ({ label, children, className }: FigmaSectionProps) => (
  <div className={cn("mb-6", className)}>
    {label && (
      <p className="mb-3 text-caption-2-em text-display-on-light-tertiary">{label}</p>
    )}
    {children}
  </div>
);

type FigmaGridProps = {
  children: ReactNode;
  gap?: number;
  className?: string;
};

export const FigmaGrid = ({ children, gap = 16, className }: FigmaGridProps) => (
  <div className={cn("flex flex-wrap items-center", className)} style={{ gap }}>
    {children}
  </div>
);

type FigmaRowProps = {
  label?: string;
  children: ReactNode;
  gap?: number;
  className?: string;
};

export const FigmaRow = ({ label, children, gap = 16, className }: FigmaRowProps) => (
  <div className={cn("mb-4", className)}>
    {label && (
      <p className="mb-2 w-24 text-caption-2 text-display-on-light-quaternary">{label}</p>
    )}
    <FigmaGrid gap={gap}>{children}</FigmaGrid>
  </div>
);

type FigmaVariantProps = {
  label?: string;
  children: ReactNode;
  className?: string;
};

/** Wraps a single variant for static snapshot display */
export const FigmaVariant = ({ label, children, className }: FigmaVariantProps) => (
  <div className={cn("flex flex-col items-center gap-1", className)}>
    <div>{children}</div>
    {label && (
      <span className="text-footnote text-display-on-light-quaternary">{label}</span>
    )}
  </div>
);
