import { Avatar } from "../../primitives";
import { cn } from "../../utils/cn";
import type { Chief } from "../Sidebar/Switcher";

export type GreetingProps = {
  chief?: Chief;
  name?: string;
  className?: string;
};

const chiefGreetings: Record<Chief, string> = {
  technical: "How can I help with technical matters?",
  compliance: "How can I help with compliance today?",
};

export const Greeting = ({
  chief = "technical",
  name = "there",
  className,
}: GreetingProps) => (
  <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
    <Avatar chief={chief} size={32} />
    <div>
      <h1 className="font-heading text-heading text-display-on-light-primary">
        Hello, {name}
      </h1>
      <p className="mt-2 text-body text-display-on-light-secondary">
        {chiefGreetings[chief]}
      </p>
    </div>
  </div>
);
