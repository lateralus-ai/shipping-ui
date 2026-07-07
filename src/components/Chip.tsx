import { type ReactNode } from "react";
import { ClearIcon } from "../icons";
import { Avatar, type AvatarProps, GroupedAvatars } from "../primitives";
import { IconButton } from "../primitives/IconButton";
import { cn } from "../utils/cn";

export type ChipVariant = "avatar" | "multiple" | "icon" | "dot" | "label";

type ChipDotColor = "blue" | "green" | "red" | "orange" | "purple" | "grey";

export type ChipProps = {
  variant: ChipVariant;
  label: string;
  avatar?: Pick<AvatarProps, "chief" | "initials">;
  icon?: ReactNode;
  dotColor?: ChipDotColor;
  onRemove?: () => void;
  className?: string;
};

const dotColorStyles: Record<ChipDotColor, string> = {
  blue: "bg-meta-blue",
  green: "bg-meta-green",
  red: "bg-meta-red",
  orange: "bg-meta-orange",
  purple: "bg-meta-purple",
  grey: "bg-grey-400",
};

export const Chip = ({
  variant,
  label,
  avatar,
  icon,
  dotColor = "blue",
  onRemove,
  className,
}: ChipProps) => (
  <span
    data-variant={variant}
    className={cn(
      "inline-flex h-8 max-w-full items-center gap-1.5 rounded-control border border-divider-primary bg-white px-2 text-caption-2 text-display-on-light-primary",
      className,
    )}
  >
    {variant === "avatar" && avatar && (
      <Avatar chief={avatar.chief} initials={avatar.initials} size={18} />
    )}
    {variant === "multiple" && <GroupedAvatars count={2} />}
    {variant === "icon" && icon && (
      <span className="shrink-0 text-display-on-light-secondary [&>svg]:size-4">{icon}</span>
    )}
    {variant === "dot" && (
      <span className={cn("size-2 shrink-0 rounded-full", dotColorStyles[dotColor])} />
    )}
    <span className="truncate">{label}</span>
    {onRemove && (
      <IconButton
        hierarchy="quaternary"
        size="small"
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        className="size-6 [&>svg]:size-3"
      >
        <ClearIcon size="xs" />
      </IconButton>
    )}
  </span>
);
