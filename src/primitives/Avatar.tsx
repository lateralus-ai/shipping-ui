import { cn } from "../utils/cn";

type ChiefType = "technical" | "compliance" | "initials";
type AvatarSize = 32 | 24 | 18 | 16;

export type AvatarProps = {
  chief: ChiefType;
  size?: AvatarSize;
  initials?: string;
  className?: string;
};

const sizeStyles: Record<AvatarSize, string> = {
  32: "size-8 text-caption-2-em",
  24: "size-6 text-footnote-em",
  18: "size-[18px] text-[10px] font-medium leading-none",
  16: "size-4 text-[9px] font-medium leading-none",
};

const chiefStyles: Record<ChiefType, string> = {
  technical: "bg-blue-100 text-blue-700",
  compliance: "bg-green-100 text-green-700",
  initials: "bg-grey-200 text-display-on-light-secondary",
};

const TechnicalIcon = ({ size }: { size: AvatarSize }) => {
  const iconSize = size >= 24 ? 12 : 8;

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M6 1.5v9M3.5 4h5M3.5 8h5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const ComplianceIcon = ({ size }: { size: AvatarSize }) => {
  const iconSize = size >= 24 ? 12 : 8;

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 6l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Avatar = ({ chief, size = 32, initials, className }: AvatarProps) => (
  <span
    className={cn(
      "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
      sizeStyles[size],
      chiefStyles[chief],
      className,
    )}
    aria-hidden={chief !== "initials"}
  >
    {chief === "technical" && <TechnicalIcon size={size} />}
    {chief === "compliance" && <ComplianceIcon size={size} />}
    {chief === "initials" && (initials?.slice(0, 2).toUpperCase() ?? "AC")}
  </span>
);
