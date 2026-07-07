import { Avatar, GroupedAvatars } from "../../primitives";
import { InviteIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type InviteeVariant = "single" | "multiple";

export type InviteeProps = {
  variant?: InviteeVariant;
  name?: string;
  names?: string[];
  className?: string;
};

export const Invitee = ({
  variant = "single",
  name = "Jordan Lee",
  names = ["Jordan Lee", "Sam Patel", "Riley Chen"],
  className,
}: InviteeProps) => (
  <div
    className={cn(
      "flex items-center gap-3 rounded-control border border-divider-primary bg-background-primary px-3 py-2",
      className,
    )}
    data-variant={variant}
  >
    {variant === "single" ? (
      <Avatar chief="initials" size={32} initials={name} />
    ) : (
      <GroupedAvatars count={3} />
    )}

    <div className="min-w-0 flex-1">
      <p className="truncate text-caption-1-em text-display-on-light-primary">
        {variant === "single" ? name : `${names.length} invitees`}
      </p>
      <p className="text-footnote text-display-on-light-tertiary">
        {variant === "single" ? "Pending invitation" : names.join(", ")}
      </p>
    </div>

    <InviteIcon className="size-4 shrink-0 text-display-on-light-quaternary" />
  </div>
);
