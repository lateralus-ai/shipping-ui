import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

export type ModalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

/** Generic dialog shell — portal, backdrop, focus trap, Escape. */
export const Modal = DialogPrimitive.Root;

export const ModalTrigger = DialogPrimitive.Trigger;

export const ModalClose = DialogPrimitive.Close;

export type ModalPortalProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Portal
>;

export const ModalPortal = DialogPrimitive.Portal;

export type ModalOverlayProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>;

/** Dark gray backdrop (app convention; Figma search frames omit overlay). */
export const ModalOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ModalOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[999] bg-grey-900/65 transition-opacity",
      "data-[state=open]:animate-in data-[state=open]:fade-in",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out",
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

export type ModalContentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  /** When false, backdrop is omitted. Defaults to true. */
  showOverlay?: boolean;
  overlayClassName?: string;
};

export const ModalContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(
  (
    {
      className,
      children,
      showOverlay = true,
      overlayClassName,
      ...props
    },
    ref,
  ) => (
    <ModalPortal>
      {showOverlay && <ModalOverlay className={overlayClassName} />}
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-[999] w-full max-w-xl -translate-x-1/2 -translate-y-1/2",
          "overflow-hidden rounded-xl border border-divider-primary bg-background-primary shadow-raise3",
          "outline-none",
          "data-[state=open]:animate-in data-[state=open]:fade-in-90",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  ),
);
ModalContent.displayName = DialogPrimitive.Content.displayName;

export type ModalTitleProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;

export const ModalTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ModalTitleProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-subheader-em text-display-on-light-primary", className)}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

export type ModalDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;

export const ModalDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ModalDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-caption-2 text-display-on-light-secondary", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

export type ModalHeaderSlotProps = {
  children: ReactNode;
  className?: string;
};

export const ModalHeaderSlot = ({
  children,
  className,
}: ModalHeaderSlotProps) => (
  <div className={cn("shrink-0", className)}>{children}</div>
);

export type ModalBodyProps = {
  children: ReactNode;
  className?: string;
};

export const ModalBody = ({ children, className }: ModalBodyProps) => (
  <div className={cn("min-h-0 overflow-auto", className)}>{children}</div>
);
