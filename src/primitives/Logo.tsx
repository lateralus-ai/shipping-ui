import { cn } from "../utils/cn";

type ChiefType = "technical" | "compliance";

export type LogoProps = {
  chief: ChiefType;
  className?: string;
};

const TechnicalMark = () => (
  <>
    <circle cx="12" cy="12" r="10" className="fill-blue-600" />
    <path
      d="M12 6.5v11M8.5 9.5h7M8.5 14.5h7"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </>
);

const ComplianceMark = () => (
  <>
    <rect x="3" y="3" width="18" height="18" rx="4" className="fill-green-600" />
    <path
      d="M8 12.5l2.5 2.5L16 9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </>
);

export const Logo = ({ chief, className }: LogoProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("size-6 shrink-0", className)}
    aria-hidden
  >
    {chief === "technical" ? <TechnicalMark /> : <ComplianceMark />}
  </svg>
);
