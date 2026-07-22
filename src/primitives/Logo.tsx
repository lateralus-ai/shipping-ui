import { cn } from "../utils/cn";

type ChiefType = "technical" | "compliance";

export type LogoProps = {
  chief: ChiefType;
  className?: string;
  muted?: boolean;
};

// The "A" body only — no topper. Technical adds a straight bar; Compliance
// adds a curved arc. Previously the bar lived inside this shared path, so the
// Compliance glyph rendered the technical bar (plus a faint arc) and looked
// identical to Technical.
const ASK_CHIEF_A =
  "M9.89258 5.62793L13.2041 14.625H11.9316L9.20117 11.8926H9.03223L6.29785 14.623C6.29785 14.623 6.29573 14.6211 6.29395 14.6211V14.625H5.0625L8.38867 5.62793H9.89258ZM9.01172 7.12305L7.16016 12.2334L8.87109 10.5234H9.36133L11.0762 12.2402L9.23828 7.12305H9.01172Z";

const TECHNICAL_BAR = "M12.6904 3.375V4.64355H5.61328V3.375H12.6904Z";

const TechnicalGlyph = () => (
  <>
    <path d={ASK_CHIEF_A} fill="currentColor" />
    <path d={TECHNICAL_BAR} fill="currentColor" />
  </>
);

// Exact Figma export (Logo → Compliance): filled "A" body + filled crescent.
const ComplianceGlyph = () => (
  <>
    <path
      d="M8.30335 5.84666L5.18335 14.2917H6.33835V14.2883C6.34002 14.2883 6.34168 14.29 6.34168 14.29L8.90668 11.7267H9.06668L11.6283 14.2917H12.8233L9.71668 5.84666H8.30502H8.30335ZM9.21502 10.4433H8.75668L7.15168 12.0483L8.89002 7.25166H9.10168L10.825 12.055L9.21668 10.4433H9.21502Z"
      fill="currentColor"
    />
    <path
      d="M8.98839 4.85833C9.87172 4.85833 10.6817 5.23 11.3117 5.84666H12.7967C11.9251 4.54666 10.5434 3.70667 8.98839 3.70667C7.43339 3.70667 6.05172 4.54666 5.18005 5.84666H6.66505C7.29339 5.23 8.10505 4.85833 8.98839 4.85833Z"
      fill="currentColor"
    />
  </>
);

export const Logo = ({ chief, className, muted = false }: LogoProps) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(
      "shrink-0",
      muted ? "text-display-on-light-quaternary" : "text-display-on-light-primary",
      className,
    )}
    aria-hidden
  >
    {chief === "technical" ? <TechnicalGlyph /> : <ComplianceGlyph />}
  </svg>
);
