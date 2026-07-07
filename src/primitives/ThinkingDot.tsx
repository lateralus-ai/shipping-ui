import { cn } from "../utils/cn";

export type ThinkingDotProps = {
  className?: string;
};

const frames = [0, 1, 2];

export const ThinkingDot = ({ className }: ThinkingDotProps) => (
  <span
    className={cn("inline-flex items-center gap-1", className)}
    role="status"
    aria-label="Thinking"
  >
    {frames.map((frame) => (
      <span
        key={frame}
        className="size-1.5 rounded-full bg-blue-600 motion-reduce:animate-none motion-reduce:opacity-60 animate-[thinking-dot_1.8s_ease-in-out_infinite]"
        style={{ animationDelay: `${frame * 0.3}s` }}
      />
    ))}
    <style>{`
      @keyframes thinking-dot {
        0%, 16.67%, 100% { opacity: 0.3; transform: scale(1); }
        8.33% { opacity: 1; transform: scale(1.25); }
        33.33% { opacity: 0.3; transform: scale(1); }
        41.67% { opacity: 1; transform: scale(1.25); }
        58.33% { opacity: 0.3; transform: scale(1); }
        66.67% { opacity: 1; transform: scale(1.25); }
        83.33% { opacity: 0.3; transform: scale(1); }
      }
    `}</style>
  </span>
);
