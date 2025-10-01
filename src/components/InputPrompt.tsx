import { IconButton, Tooltip } from "@material-tailwind/react";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "../utils/cn";
import SendArrowIcon from "./icons/SendArrowIcon";
import SendArrowIconGreen from "./icons/SendArrowIconGreen";

interface SubmitButtonProps extends React.ComponentProps<typeof IconButton> {
  tooltipContent?: string;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  tooltipContent = "Send message",
  className,
  ...props
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Tooltip content={tooltipContent}>
      <IconButton
        variant="text"
        color="gray"
        className={cn(className, "hover:rounded-lg hover:bg-gray-100")}
        type="submit"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...props}
      >
        {hover ? (
          <SendArrowIconGreen className="size-6 " />
        ) : (
          <SendArrowIcon className="size-6 " />
        )}
      </IconButton>
    </Tooltip>
  );
};

interface TextareaProps extends React.ComponentProps<typeof TextareaAutosize> {
  onSubmit?: () => void;
}

export const Textarea: React.FC<TextareaProps> = ({
  onSubmit = () => {},
  ...props
}) => {
  return (
    <TextareaAutosize
      autoFocus
      placeholder="Write your message here"
      className="pl-1 block w-full focus:outline-none max-h-32 resize-none placeholder:text-gray-400"
      onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSubmit();
        }
      }}
      {...props}
    />
  );
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  bottom?: ReactNode;
  right?: ReactNode;
  top?: ReactNode;
  textArea?: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  bottom,
  right,
  top,
  textArea = <Textarea />,
  ...props
}) => {
  return (
    <div
      className="border gap-2 rounded-lg bg-white shadow-[0px_2px_2px_0px_#0000000A,0px_8px_8px_-8px_#0000000A] border-gray-100"
      {...props}
    >
      {top}

      <div className="flex gap-2 p-4 rounded-lg bg-white">
        <div className="grow flex flex-col items-start justify-center">
          {textArea}
          {bottom}
        </div>

        <div className="shrink flex items-end justify-end">{right}</div>
      </div>
    </div>
  );
};
