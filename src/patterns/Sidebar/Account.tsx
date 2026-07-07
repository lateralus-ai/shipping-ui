import { Avatar } from "../../primitives";
import { cn } from "../../utils/cn";

export type AccountProps = {
  collapsed?: boolean;
  name?: string;
  avatar?: string;
  className?: string;
};

export const Account = ({
  collapsed = false,
  name = "Alex Morgan",
  avatar,
  className,
}: AccountProps) => (
  <button
    type="button"
    className={cn(
      "group flex w-full items-center gap-2 rounded-control px-2 py-1.5 transition-colors hover:bg-background-hover",
      className,
    )}
    data-collapsed={collapsed}
    aria-label={`Account: ${name}`}
  >
    <Avatar chief="initials" size={32} initials={avatar ?? name} />
    <span
      className={cn(
        "min-w-0 flex-1 truncate text-left text-caption-1-em text-display-on-light-primary",
        "group-data-[collapsed=true]:sr-only",
      )}
    >
      {name}
    </span>
  </button>
);
