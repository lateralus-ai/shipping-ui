import { type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type SidebarShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
  /** Pixels subtracted from viewport height (e.g. app banner). */
  bannerOffset?: number;
  className?: string;
  mainClassName?: string;
};

/** Viewport-height app shell: sidebar stays put, main scrolls independently. */
export const SidebarShell = ({
  sidebar,
  children,
  bannerOffset = 0,
  className,
  mainClassName,
}: SidebarShellProps) => (
  <div
    className={cn("flex overflow-hidden bg-background-primary", className)}
    style={{
      height: bannerOffset > 0 ? `calc(100dvh - ${bannerOffset}px)` : "100dvh",
    }}
  >
    {sidebar}
    <main className={cn("min-h-0 min-w-0 flex-1 overflow-auto", mainClassName)}>
      {children}
    </main>
  </div>
);
