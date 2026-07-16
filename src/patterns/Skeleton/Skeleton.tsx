import { cn } from "../../utils/cn";

export type SkeletonVariant = "content" | "search";

export type SkeletonProps = {
  variant?: SkeletonVariant;
  className?: string;
};

const ContentSkeleton = () => (
  <div className="flex flex-col gap-4 p-4" aria-hidden>
    <div className="flex items-center gap-3">
      <div className="size-8 animate-pulse rounded-full bg-grey-200" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-1/3 animate-pulse rounded bg-grey-200" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-grey-100" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-4 w-full animate-pulse rounded bg-grey-200" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-grey-200" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-grey-100" />
    </div>
    <div className="h-24 animate-pulse rounded-control bg-grey-100" />
  </div>
);

/** Figma Search loading — 8 rows of icon + bar (no input/pills). */
const SearchSkeleton = () => {
  const widths = [250, 300, 220, 255, 250, 300, 220, 255];

  return (
    <div className="flex flex-col gap-1.5 p-4" aria-hidden>
      {widths.map((width, index) => (
        <div key={index} className="flex items-start gap-2 py-2">
          <div className="size-3 shrink-0 animate-pulse rounded-md bg-grey-200" />
          <div
            className="h-3 animate-pulse rounded-md bg-grey-200"
            style={{ width }}
          />
        </div>
      ))}
    </div>
  );
};

export const Skeleton = ({ variant = "content", className }: SkeletonProps) => (
  <div
    className={cn("rounded-control bg-background-primary", className)}
    role="status"
    aria-label="Loading"
    data-variant={variant}
  >
    {variant === "content" ? <ContentSkeleton /> : <SearchSkeleton />}
  </div>
);
