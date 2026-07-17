import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

export type PageHeaderCrumb = {
  label: string;
  /** Renders a real `<a href>` so native browser controls work. */
  href: string;
  /**
   * Optional SPA handler. Callers should `preventDefault` only for unmodified
   * primary clicks; modifier / middle-click keep native anchor behavior.
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type PageHeaderProps = {
  /** Leading icon (Figma 24×24). */
  icon?: ReactNode;
  /** Standard title, or current (last) segment when `crumbs` is set. */
  title: ReactNode;
  /**
   * Parent breadcrumb links. When present, renders Nested: icon + parents + `/`
   * + current `title` (non-link).
   */
  crumbs?: PageHeaderCrumb[];
  /** Right-hand actions slot (buttons, menus, etc.). */
  actions?: ReactNode;
  className?: string;
};

export type PageHeaderShellProps = ComponentPropsWithoutRef<"div">;

export type PageHeaderBodyProps = ComponentPropsWithoutRef<"div">;

/**
 * Page title row — Figma `Header` (389:8850).
 * Variants: Standard (icon + title) | Nested (icon + crumb trail).
 */
function PageHeaderRoot({
  icon,
  title,
  crumbs,
  actions,
  className,
}: PageHeaderProps) {
  const isNested = Boolean(crumbs?.length);

  return (
    <div
      data-variant={isNested ? "nested" : "standard"}
      className={cn(
        "flex w-full shrink-0 items-center justify-between gap-4",
        "min-h-10",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {icon != null && (
          <span className="inline-flex size-6 shrink-0 items-center justify-center [&>svg]:size-6">
            {icon}
          </span>
        )}

        {isNested ? (
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex min-w-0 flex-wrap items-center gap-2">
              {crumbs!.map((crumb) => (
                <li key={`${crumb.href}-${crumb.label}`} className="contents">
                  <a
                    href={crumb.href}
                    onClick={crumb.onClick}
                    className="truncate text-caption-1-em text-display-on-light-secondary transition-colors hover:text-display-on-light-primary"
                  >
                    {crumb.label}
                  </a>
                  <span
                    aria-hidden
                    className="text-caption-1-em text-display-on-light-secondary"
                  >
                    /
                  </span>
                </li>
              ))}
              <li
                aria-current="page"
                className="min-w-0 truncate text-caption-1-em text-display-on-light-primary"
              >
                {title}
              </li>
            </ol>
          </nav>
        ) : (
          <h1 className="min-w-0 truncate text-caption-1-em text-display-on-light-primary">
            {title}
          </h1>
        )}
      </div>

      {actions != null && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

/** Flex column shell — pin header, scroll body (avoids brittle CSS sticky). */
function PageHeaderShell({ className, ...props }: PageHeaderShellProps) {
  return (
    <div
      className={cn("flex h-full min-h-0 flex-col", className)}
      {...props}
    />
  );
}

/** Scrollable page content under a pinned PageHeader. */
function PageHeaderBody({ className, ...props }: PageHeaderBodyProps) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
      {...props}
    />
  );
}

export const PageHeader = Object.assign(PageHeaderRoot, {
  Shell: PageHeaderShell,
  Body: PageHeaderBody,
});
