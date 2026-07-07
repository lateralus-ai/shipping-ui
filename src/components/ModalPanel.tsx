import { type PropsWithChildren, type ReactNode } from "react";
import { IconButton } from "../primitives/IconButton";
import { ClearIcon } from "../icons";
import { cn } from "../utils/cn";

type HeaderProps = {
  onClose: () => void;
  right?: ReactNode;
};

const Header = ({ onClose, right, children }: PropsWithChildren<HeaderProps>) => (
  <div className="flex items-center gap-2 rounded-t-xl bg-background-secondary px-2 py-3">
    <div className="grow text-subheader-em text-display-on-light-primary">{children}</div>
    <div className="flex items-center gap-4">
      {right}
      <IconButton hierarchy="quaternary" size="small" aria-label="Close" onClick={onClose}>
        <ClearIcon size="small" />
      </IconButton>
    </div>
  </div>
);

type BodyProps = {
  className?: string;
};

const Body = ({ children, className }: PropsWithChildren<BodyProps>) => (
  <div className={cn("w-full overflow-auto", className)}>{children}</div>
);

export const ModalPanel = {
  Header,
  Body,
};
