import { type ComponentPropsWithoutRef } from "react";
import { cn } from "../utils/cn";

export type ScrollableListProps = ComponentPropsWithoutRef<"div">;
export type ScrollableListHeaderProps = ComponentPropsWithoutRef<"div">;
export type ScrollableListBodyProps = ComponentPropsWithoutRef<"div">;

/**
 * Fill-height list chrome — Figma `Table` (6154:152285).
 * Outer grey-100 frame + header slot + internally scrolling grey-50 body.
 * Column layout and rows are caller-owned children.
 */
function ScrollableListRoot({ className, ...props }: ScrollableListProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-hidden rounded-lg bg-grey-100 p-1",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Column title bar. Default left padding aligns with a 24px leading icon +
 * 8px gap + 8px row padding (Figma). Override `className` when rows have no icon.
 */
function ScrollableListHeader({
  className,
  ...props
}: ScrollableListHeaderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-start gap-8 pl-10 pr-2 py-1",
        "text-caption-2-em text-display-on-light-secondary",
        className,
      )}
      {...props}
    />
  );
}

/** Internally scrolling row region. */
function ScrollableListBody({ className, ...props }: ScrollableListBodyProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto rounded bg-grey-50 p-1",
        className,
      )}
      {...props}
    />
  );
}

export const ScrollableList = Object.assign(ScrollableListRoot, {
  Header: ScrollableListHeader,
  Body: ScrollableListBody,
});
