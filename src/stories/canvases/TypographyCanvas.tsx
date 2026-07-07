import { FigmaContent, FigmaPage } from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

const typographyStyles = [
  { label: "Title", className: "font-heading text-title" },
  { label: "Title Em", className: "font-heading text-title-em" },
  { label: "Heading", className: "font-heading text-heading" },
  { label: "Subheader", className: "text-subheader" },
  { label: "Subheader Em", className: "text-subheader-em" },
  { label: "Body", className: "text-body" },
  { label: "Body Em", className: "text-body-em" },
  { label: "Caption 1", className: "text-caption-1" },
  { label: "Caption 1 Em", className: "text-caption-1-em" },
  { label: "Caption 2", className: "text-caption-2" },
  { label: "Caption 2 Em", className: "text-caption-2-em" },
  { label: "Footnote", className: "text-footnote" },
  { label: "Footnote Em", className: "text-footnote-em" },
] as const;

export const TypographyCanvas = () => (
  <FigmaPage title="Typography" width={FIGMA_WIDTHS.typography}>
    <FigmaContent>
      <div className="mb-8 rounded-control border border-divider-primary p-8">
        <p className="font-heading text-title text-display-on-light-primary">Vesterbro</p>
        <p className="mt-1 text-caption-2 text-display-on-light-tertiary">Regular · Medium</p>
      </div>

      {typographyStyles.slice(0, 3).map((style) => (
        <div key={style.label} className="mb-6 border-b border-divider-primary pb-6">
          <p className="mb-2 text-caption-2 text-display-on-light-tertiary">{style.label}</p>
          <p className={style.className}>The quick brown fox jumps over the lazy dog</p>
        </div>
      ))}

      <div className="mb-8 mt-10 rounded-control border border-divider-primary p-8">
        <p className="font-sans text-title text-display-on-light-primary">Matter</p>
        <p className="mt-1 text-caption-2 text-display-on-light-tertiary">Regular · Medium</p>
      </div>

      {typographyStyles.slice(3).map((style) => (
        <div key={style.label} className="mb-6 border-b border-divider-primary pb-6">
          <p className="mb-2 text-caption-2 text-display-on-light-tertiary">{style.label}</p>
          <p className={style.className}>The quick brown fox jumps over the lazy dog</p>
        </div>
      ))}

      <div className="mb-6 border-b border-divider-primary pb-6">
        <p className="mb-2 text-caption-2 text-display-on-light-tertiary">Mono</p>
        <p className="font-mono text-body">const vessel = &quot;MV Atlantic Star&quot;;</p>
      </div>
    </FigmaContent>
  </FigmaPage>
);
