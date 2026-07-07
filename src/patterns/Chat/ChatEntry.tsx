import { type ReactNode } from "react";
import { Avatar } from "../../primitives";
import { cn } from "../../utils/cn";
import type { Chief } from "../Sidebar/Switcher";

export type ChatEntryRole = "user" | "chief";

export type ChatEntryProps = {
  role?: ChatEntryRole;
  chief?: Chief;
  children?: ReactNode;
  className?: string;
};

export const ChatEntry = ({
  role = "chief",
  chief = "technical",
  children = "Based on the inspection data, all critical systems are operating within acceptable parameters.",
  className,
}: ChatEntryProps) => (
  <div
    className={cn(
      "flex gap-3",
      role === "user" ? "flex-row-reverse" : "flex-row",
      className,
    )}
    data-role={role}
  >
    {role === "chief" && <Avatar chief={chief} size={32} />}
    <div
      className={cn(
        "max-w-[80%] rounded-control px-4 py-3 text-body",
        role === "user"
          ? "bg-action-primary-idle text-action-primary-on-idle"
          : "bg-background-secondary text-display-on-light-primary",
      )}
    >
      {children}
    </div>
  </div>
);
