import {
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { FilterPill, type FilterPillAppearance } from "./FilterPill";

/** One selectable row at a leaf list. */
export type FilterOption = {
  value: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
};

export type FilterSelectionMode = "multi" | "single";

/**
 * Recursive submenu: options leaf, nested folders, or custom panel (e.g. date range).
 */
export type FilterSubmenuContent =
  | {
      type: "options";
      /** Key into `selectedValuesBySelectionKey` / `onSelectOption` */
      selectionKey: string;
      /** `multi` (default) toggles; `single` is exclusive — still one check slot reserved. */
      selectionMode?: FilterSelectionMode;
      options: FilterOption[];
    }
  | {
      type: "nested";
      items: FilterNestedItem[];
    }
  | {
      type: "custom";
      render: () => ReactNode;
    };

export type FilterNestedItem = {
  id: string;
  label: string;
  content: FilterSubmenuContent;
};

/** Left-column row that opens a (possibly nested) submenu panel. */
export type FilterCategorySubmenuRow = {
  kind?: "submenu";
  id: string;
  label: string;
  content: FilterSubmenuContent;
};

/** Left column row: inline check toggle (no right panel). */
export type FilterCategoryToggleRow = {
  kind: "toggle";
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export type FilterCategoryRow =
  | FilterCategorySubmenuRow
  | FilterCategoryToggleRow;

function isToggleRow(row: FilterCategoryRow): row is FilterCategoryToggleRow {
  return row.kind === "toggle";
}

function isSubmenuRow(row: FilterCategoryRow): row is FilterCategorySubmenuRow {
  return !isToggleRow(row);
}

type ResolvedSubmenuView =
  | { kind: "folders"; items: FilterNestedItem[]; trail: string[] }
  | {
      kind: "options";
      selectionKey: string;
      selectionMode: FilterSelectionMode;
      options: FilterOption[];
      trail: string[];
    }
  | { kind: "custom"; render: () => ReactNode; trail: string[] };

/** Walk `path` (folder ids) from `content` to the current view. */
export function resolveSubmenuView(
  content: FilterSubmenuContent,
  path: string[],
): ResolvedSubmenuView {
  if (content.type === "options") {
    return {
      kind: "options",
      selectionKey: content.selectionKey,
      selectionMode: content.selectionMode ?? "multi",
      options: content.options,
      trail: [],
    };
  }
  if (content.type === "custom") {
    return { kind: "custom", render: content.render, trail: [] };
  }
  if (path.length === 0) {
    return { kind: "folders", items: content.items, trail: [] };
  }
  const [head, ...tail] = path;
  const child = content.items.find((i) => i.id === head);
  if (!child) {
    return { kind: "folders", items: content.items, trail: [] };
  }
  if (child.content.type === "options") {
    return {
      kind: "options",
      selectionKey: child.content.selectionKey,
      selectionMode: child.content.selectionMode ?? "multi",
      options: child.content.options,
      trail: [child.label],
    };
  }
  if (child.content.type === "custom") {
    return {
      kind: "custom",
      render: child.content.render,
      trail: [child.label],
    };
  }
  if (tail.length === 0) {
    return {
      kind: "folders",
      items: child.content.items,
      trail: [child.label],
    };
  }
  const inner = resolveSubmenuView(child.content, tail);
  return {
    ...inner,
    trail: [child.label, ...inner.trail],
  };
}

function CheckMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-4 shrink-0", className)}
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Always reserves check width so the panel does not jump when selection moves. */
function CheckSlot({ selected }: { selected: boolean }) {
  return (
    <CheckMark
      className={cn(
        "text-blue-600",
        selected ? "visible" : "invisible",
      )}
    />
  );
}

export type FilterDropdownProps = {
  align?: "start" | "center" | "end";
  sideOffset?: number;
  /** Left column: submenu roots and/or toggles. */
  categoryRows: FilterCategoryRow[];
  selectedValuesBySelectionKey: Record<string, string[] | undefined>;
  /**
   * Fired when an option is activated. For `multi`, consumers typically toggle;
   * for `single`, replace the selection with `[optionValue]`.
   */
  onSelectOption: (selectionKey: string, optionValue: string) => void;
  onResetAll: () => void;
  resetAllLabel?: string;
  activeFilterCount: number;
  getOptionLabelStyle?: (
    selectionKey: string,
    optionValue: string,
  ) => CSSProperties | undefined;
  zIndexClass?: string;
  /** Replace the default FilterPill trigger. */
  trigger?: ReactNode;
  /** Passed to the default FilterPill when `trigger` is omitted. */
  triggerAppearance?: FilterPillAppearance;
  /**
   * Which side the options panel attaches to the category column.
   * Carets stay on the right of category rows either way.
   */
  submenuSide?: "left" | "right";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

const scrollClass = "py-2 overflow-y-auto overscroll-y-contain flex-1 min-h-0";

const rowClass =
  "w-full flex items-center justify-between gap-4 px-4 py-2 text-left transition-colors hover:bg-grey-50";

/**
 * Filters trigger + two-column popover (audit-prep pattern).
 * Supports multi/single option leaves, nested folders, custom panels, and toggles.
 */
export function FilterDropdown({
  align = "start",
  sideOffset = 4,
  categoryRows,
  selectedValuesBySelectionKey,
  onSelectOption,
  onResetAll,
  resetAllLabel = "Reset all",
  activeFilterCount,
  getOptionLabelStyle,
  zIndexClass = "z-50",
  trigger,
  triggerAppearance = "filled",
  submenuSide = "right",
  open: openControlled,
  onOpenChange,
  className,
}: FilterDropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = openControlled ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  const [navPath, setNavPath] = useState<string[]>([]);

  const activeSubmenuRow = categoryRows.find(
    (r) => isSubmenuRow(r) && r.id === activeSubmenuId,
  ) as FilterCategorySubmenuRow | undefined;

  const view = activeSubmenuRow
    ? resolveSubmenuView(activeSubmenuRow.content, navPath)
    : null;

  const showSubmenuPanel = Boolean(activeSubmenuRow && view);
  const submenuOpensLeft = submenuSide === "left";

  const resetNav = () => setNavPath([]);

  const submenuPanelClass = cn(
    "bg-background-primary max-h-[min(28rem,calc(100dvh-8rem))] min-w-[200px] max-w-[min(28rem,calc(100vw-2rem))] flex flex-col overflow-hidden border border-divider-primary shadow-raise1",
    submenuOpensLeft
      ? "rounded-l-lg rounded-r-none border-r-0"
      : "rounded-r-lg rounded-l-none border-l-0",
  );

  const categoryPanelClass = cn(
    "min-w-[180px] border border-divider-primary bg-background-primary shadow-raise1",
    showSubmenuPanel
      ? submenuOpensLeft
        ? "rounded-r-lg rounded-l-none"
        : "rounded-l-lg rounded-r-none"
      : "rounded-lg",
  );

  const categoryPanel = (
    <div className={categoryPanelClass}>
      <div className="py-2">
        {categoryRows.map((row) =>
          isToggleRow(row) ? (
            <button
              key={row.id}
              type="button"
              onClick={() => row.onCheckedChange(!row.checked)}
              className={cn(rowClass, row.checked && "bg-grey-50")}
            >
              <span className="text-body text-display-on-light-primary">
                {row.label}
              </span>
              <CheckSlot selected={row.checked} />
            </button>
          ) : (
            <button
              key={row.id}
              type="button"
              onClick={() => {
                if (activeSubmenuId === row.id) {
                  setActiveSubmenuId(null);
                  resetNav();
                } else {
                  setActiveSubmenuId(row.id);
                  resetNav();
                }
              }}
              className={cn(
                rowClass,
                activeSubmenuId === row.id && "bg-grey-50",
              )}
            >
              <span className="text-body text-display-on-light-primary">
                {row.label}
              </span>
              <ChevronIcon
                direction="right"
                size="small"
                className={cn(
                  "text-grey-400 transition-transform",
                  activeSubmenuId === row.id && "rotate-90",
                )}
              />
            </button>
          ),
        )}

        <div className="mt-2 border-t border-divider-primary pt-2">
          <button
            type="button"
            onClick={onResetAll}
            className={cn(rowClass)}
          >
            <span className="text-body text-display-on-light-primary">
              {resetAllLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const submenuPanel =
    showSubmenuPanel && view ? (
      <div className={cn(submenuPanelClass, "flex flex-col")}>
        {navPath.length > 0 && (
          <div className="flex-shrink-0 border-b border-grey-100 px-2 py-1.5">
            <button
              type="button"
              onClick={() => setNavPath((p) => p.slice(0, -1))}
              className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-caption-2-em text-display-on-light-secondary hover:bg-grey-50"
            >
              <ChevronIcon
                direction="left"
                size="small"
                className="shrink-0"
              />
              Back
            </button>
          </div>
        )}
        {view.trail.length > 0 && (
          <div className="flex-shrink-0 truncate px-4 pb-1 pt-2 text-footnote text-grey-500">
            {view.trail.join(" › ")}
          </div>
        )}
        <div className={scrollClass}>
          {view.kind === "folders" ? (
            view.items.length === 0 ? (
              <p className="px-4 py-2 text-body text-grey-500">No options</p>
            ) : (
              view.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setNavPath((p) => [...p, item.id])}
                  className={rowClass}
                >
                  <span className="text-body text-display-on-light-primary">
                    {item.label}
                  </span>
                  <ChevronIcon
                    direction="right"
                    size="small"
                    className="shrink-0 text-grey-400"
                  />
                </button>
              ))
            )
          ) : view.kind === "custom" ? (
            <div className="p-4">{view.render()}</div>
          ) : view.options.length === 0 ? (
            <p className="px-4 py-2 text-body text-grey-500">No options</p>
          ) : (
            view.options.map((option) => {
              const selected =
                selectedValuesBySelectionKey[view.selectionKey]?.includes(
                  option.value,
                ) ?? false;
              const Icon = option.icon;
              const labelStyle = getOptionLabelStyle?.(
                view.selectionKey,
                option.value,
              );
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    onSelectOption(view.selectionKey, option.value)
                  }
                  className={cn(rowClass, selected && "bg-grey-100")}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    <span
                      className={cn(
                        "text-body",
                        labelStyle
                          ? undefined
                          : "text-display-on-light-primary",
                      )}
                      style={labelStyle}
                    >
                      {option.label}
                    </span>
                  </div>
                  <CheckSlot selected={selected} />
                </button>
              );
            })
          )}
        </div>
      </div>
    ) : null;

  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setActiveSubmenuId(null);
          setNavPath([]);
        }
      }}
    >
      <Popover.Trigger asChild>
        {trigger ?? (
          <FilterPill
            activeFilterCount={activeFilterCount}
            appearance={triggerAppearance}
            className={className}
          />
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align={align}
          sideOffset={sideOffset}
          className={cn(
            zIndexClass,
            "w-auto border-0 bg-transparent p-0 shadow-none outline-none",
          )}
        >
          <div className="flex items-start gap-0">
            {submenuOpensLeft ? (
              <>
                {submenuPanel}
                {categoryPanel}
              </>
            ) : (
              <>
                {categoryPanel}
                {submenuPanel}
              </>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
