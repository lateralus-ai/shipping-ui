import { ThinkingDot } from "../../primitives";
import { cn } from "../../utils/cn";

export type ChatStatusProps = {
  status?: "thinking" | "typing" | "idle";
  message?: string;
  className?: string;
};

export const ChatStatus = ({
  status = "thinking",
  message = "Chief is thinking",
  className,
}: ChatStatusProps) => (
  <div
    className={cn(
      "flex items-center gap-2 text-caption-2 text-display-on-light-tertiary",
      className,
    )}
    role="status"
    data-status={status}
  >
    {status === "thinking" && <ThinkingDot />}
    <span>{message}</span>
  </div>
);
