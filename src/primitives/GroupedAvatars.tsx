import { Avatar } from "./Avatar";
import { cn } from "../utils/cn";

type GroupCount = 1 | 2 | 3;

export type GroupedAvatarsProps = {
  count: GroupCount;
  className?: string;
};

const groups: Record<GroupCount, Array<{ chief: "technical" | "compliance" | "initials"; initials?: string }>> = {
  1: [{ chief: "technical" }],
  2: [
    { chief: "technical" },
    { chief: "compliance" },
  ],
  3: [
    { chief: "technical" },
    { chief: "compliance" },
    { chief: "initials", initials: "AC" },
  ],
};

export const GroupedAvatars = ({ count, className }: GroupedAvatarsProps) => (
  <div className={cn("inline-flex items-center", className)}>
    {groups[count].map((avatar, index) => (
      <Avatar
        key={`${avatar.chief}-${index}`}
        chief={avatar.chief}
        initials={avatar.initials}
        size={24}
        className={cn("ring-2 ring-white", index > 0 && "-ml-2")}
      />
    ))}
  </div>
);
