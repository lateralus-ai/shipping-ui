import { ChatEntry } from "./ChatEntry";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatStatus } from "./ChatStatus";
import { Greeting } from "./Greeting";
import { Sources } from "./Sources";
import { Suggestions } from "./Suggestions";
import { cn } from "../../utils/cn";
import type { Chief } from "../Sidebar/Switcher";

export type CopilotProps = {
  chief?: Chief;
  empty?: boolean;
  thinking?: boolean;
  className?: string;
};

export const Copilot = ({
  chief = "technical",
  empty = false,
  thinking = false,
  className,
}: CopilotProps) => (
  <div className={cn("flex h-full flex-col bg-background-primary", className)}>
    <ChatHeader chief={chief} />

    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
      {empty ? (
        <>
          <Greeting chief={chief} />
          <Suggestions />
        </>
      ) : (
        <>
          <ChatEntry role="user">Can you review the hull inspection report?</ChatEntry>
          <ChatEntry role="chief" chief={chief}>
            I&apos;ve reviewed the hull inspection report. The overall condition is satisfactory
            with minor observations noted in sections 4 and 7.
          </ChatEntry>
          <Sources count={2} />
          {thinking && <ChatStatus status="thinking" />}
        </>
      )}
    </div>

    <div className="border-t border-divider-primary p-4">
      <ChatInput />
    </div>
  </div>
);
