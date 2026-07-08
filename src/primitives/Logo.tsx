import { cn } from "../utils/cn";

type ChiefType = "technical" | "compliance";

export type LogoProps = {
  chief: ChiefType;
  className?: string;
  muted?: boolean;
};

const ASK_CHIEF_A =
  "M9.89258 5.62793L13.2041 14.625H11.9316L9.20117 11.8926H9.03223L6.29785 14.623C6.29785 14.623 6.29573 14.6211 6.29395 14.6211V14.625H5.0625L8.38867 5.62793H9.89258ZM9.01172 7.12305L7.16016 12.2334L8.87109 10.5234H9.36133L11.0762 12.2402L9.23828 7.12305H9.01172ZM12.6904 3.375V4.64355H5.61328V3.375H12.6904Z";

const TechnicalGlyph = () => <path d={ASK_CHIEF_A} fill="currentColor" />;

const ComplianceGlyph = () => (
  <>
    <path d={ASK_CHIEF_A} fill="currentColor" />
    <path
      d="M6.2 5.2C7.4 4.1 10.6 4.1 11.8 5.2"
      stroke="currentColor"
      strokeWidth="0.9"
      fill="none"
      strokeLinecap="round"
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
