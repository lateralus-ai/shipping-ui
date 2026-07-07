import { IconButton } from "../../primitives";
import { AttachmentIcon, SendIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type ChatInputProps = {
  placeholder?: string;
  className?: string;
};

export const ChatInput = ({
  placeholder = "Ask your Chief anything...",
  className,
}: ChatInputProps) => (
  <div
    className={cn(
      "flex items-end gap-2 rounded-control border border-divider-primary bg-background-primary p-3 shadow-raise1",
      className,
    )}
  >
    <IconButton hierarchy="quaternary" size="small" aria-label="Attach file">
      <AttachmentIcon />
    </IconButton>

    <textarea
      rows={1}
      placeholder={placeholder}
      className="max-h-32 min-h-6 flex-1 resize-none bg-transparent text-body text-display-on-light-primary placeholder:text-display-on-light-quaternary focus:outline-none"
      aria-label="Message input"
    />

    <IconButton hierarchy="tertiary" size="small" aria-label="Send message">
      <SendIcon />
    </IconButton>
  </div>
);
