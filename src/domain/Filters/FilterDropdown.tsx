import {
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import { ChevronIcon } from "../../icons/ChevronIcon";
import { Switch } from "../../primitives/Switch";
import { FilterPill, type FilterPillAppearance } from "./FilterPill";

/** One selectable row at a leaf list. */
export type FilterOption = {
  value: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
  /**
   * Heading this option sits under, for a list that reads in sections.
   *
   * A list of product features is the case it was added for: the same word
   * means different things per product — "Chat" under Technical is not "Chat"
   * under Compliance — so the options need their product above them to be
   * legible at all. Prefixing every label instead ("Technical Chat",
   * "Compliance Chat") widened the panel and repeated the product on every
   * line.
   *
   * Consecutive options sharing a group render under one heading, so the
   * CALLER'S ORDER decides the sections — nothing is sorted or regrouped
   * here. Two separate runs of the same group therefore make two headings,
   * which is the honest rendering of a list handed over in that order.
   *
   * Headings are labels, not rows: not selectable, not focusable, no check
   * slot. Omit `group` and nothing changes — a list where no option has one
   * renders exactly as it always did.
   */
  group?: string;
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

/**
 * Options rendered inline in the first panel (no chevron / second column).
 * Mix with submenu rows for hybrid menus (e.g. Status submenu + Sort by flat).
 */
export type FilterCategoryInlineOptionsRow = {
  kind: "inline-options";
  id: string;
  /** Small section header above the options (e.g. "Sort by"). */
  title?: string;
  selectionKey: string;
  selectionMode?: FilterSelectionMode;
  options: FilterOption[];
};

/** First-panel row: label + Switch (no right panel). */
export type FilterCategoryToggleRow = {
  kind: "toggle";
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export type FilterCategoryRow =
  | FilterCategorySubmenuRow
  | FilterCategoryInlineOptionsRow
  | FilterCategoryToggleRow;

function isToggleRow(row: FilterCategoryRow): row is FilterCategoryToggleRow {
  return row.kind === "toggle";
}

function isInlineOptionsRow(
  row: FilterCategoryRow,
): row is FilterCategoryInlineOptionsRow {
  return row.kind === "inline-options";
}

function isSubmenuRow(row: FilterCategoryRow): row is FilterCategorySubmenuRow {
  return !isToggleRow(row) && !isInlineOptionsRow(row);
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
  /**
   * First panel rows — mix freely:
   * submenu (chevron + second panel), inline-options (flat list), toggle (Switch).
   */
  categoryRows: FilterCategoryRow[];
  selectedValuesBySelectionKey: Record<string, string[] | undefined>;
  /**
   * Fired when an option is activated. For `multi`, consumers typically toggle;
   * for `single`, replace the selection with `[optionValue]`.
   */
  onSelectOption: (selectionKey: string, optionValue: string) => void;
  onResetAll: () => void;
  resetAllLabel?: string;
  /** When false, hides the Reset all footer. Default true. */
  showResetAll?: boolean;
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
 * Filters trigger + popover. First panel supports hybrid rows: submenus,
 * inline option lists, and Switch toggles. Submenus open a second column.
 */
export function FilterDropdown({
  align = "start",
  sideOffset = 4,
  categoryRows,
  selectedValuesBySelectionKey,
  onSelectOption,
  onResetAll,
  resetAllLabel = "Reset all",
  showResetAll = true,
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

  const renderOptionButtons = (
    selectionKey: string,
    options: FilterOption[],
    selectionMode: FilterSelectionMode = "multi",
  ) => {
    const selectedValues = selectedValuesBySelectionKey[selectionKey] ?? [];
    /*
     * A group heading selects its whole group.
     *
     * It fires `onSelectOption` once per member, which is what makes it mean
     * exactly "the user clicked these one by one" — no second callback for
     * consumers to implement, and no way for the group to end up in a state
     * an individual click could not have produced. Consumers toggle from the
     * previous value (`prev => …`), so the burst batches correctly; one that
     * computes from a captured value instead would keep only the last click.
     *
     * Empty when every member is already selected, in which case the burst
     * covers all of them and the group toggles back off — the heading behaves
     * like the checkbox its tick implies.
     */
    const toggleGroup = (group: string) => {
      const members = options.filter((option) => option.group === group);
      const unselected = members.filter(
        (member) => !selectedValues.includes(member.value),
      );
      const targets = unselected.length > 0 ? unselected : members;
      for (const target of targets) {
        onSelectOption(selectionKey, target.value);
      }
    };

    return options.map((option, index) => {
      const selected = selectedValues.includes(option.value);
      const Icon = option.icon;
      const labelStyle = getOptionLabelStyle?.(selectionKey, option.value);
      // A heading whenever the group changes, so a run of options sits under
      // one. Compared against the PREVIOUS option rather than a set of groups
      // already seen: the caller's order is the sectioning (see `group`).
      const groupHeading =
        option.group && option.group !== options[index - 1]?.group
          ? option.group
          : null;
      const button = (
        <button
          key={option.value}
          type="button"
          onClick={() => onSelectOption(selectionKey, option.value)}
          className={cn(
            rowClass,
            // Indented under its heading. Padding rather than margin so the
            // hover and selected background still span the full row — a
            // margin would inset the highlight too and leave it floating.
            option.group && "pl-9",
            selected && "bg-grey-100",
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span
              className={cn(
                "text-body",
                labelStyle ? undefined : "text-display-on-light-primary",
              )}
              style={labelStyle}
            >
              {option.label}
            </span>
          </div>
          <CheckSlot selected={selected} />
        </button>
      );
      if (!groupHeading) {
        return button;
      }
      const members = options.filter(
        (member) => member.group === groupHeading,
      );
      const wholeGroupSelected = members.every((member) =>
        selectedValues.includes(member.value),
      );
      /*
       * `single` mode has no group to select — picking every member at once
       * is the one thing an exclusive list cannot mean — so there the
       * heading stays a caption.
       */
      const headingSelectable = selectionMode === "multi";
      const headingText = "text-caption-2 font-semibold text-display-on-light-primary";
      // The gap belongs BETWEEN sections, so the first heading does not get
      // one — it would only pad the top of the panel.
      const headingGap = index === 0 ? undefined : "mt-3";
      return (
        // Keyed on the option, not the group name: a group may head more than
        // one run, and React needs the key unique across the whole list.
        <div key={`group-${option.value}`}>
          {headingSelectable ? (
            // The row shape, so its tick lines up with the members' ticks and
            // it highlights on hover like anything else you can click. Only
            // the vertical padding is tightened, to keep a heading closer to
            // the options it heads than to the section above.
            <button
              type="button"
              onClick={() => toggleGroup(groupHeading)}
              className={cn(rowClass, "py-1", headingText, headingGap)}
            >
              <span className="truncate">{groupHeading}</span>
              <CheckSlot selected={wholeGroupSelected} />
            </button>
          ) : (
            <div
              // `presentation`, because a caption that cannot be chosen would
              // otherwise be announced as a choice.
              role="presentation"
              className={cn("px-4 pb-1 pt-1", headingText, headingGap)}
            >
              {groupHeading}
            </div>
          )}
          {button}
        </div>
      );
    });
  };

  const categoryPanel = (
    <div className={categoryPanelClass}>
      <div className="py-2">
        {categoryRows.map((row, index) => {
          const prev = index > 0 ? categoryRows[index - 1] : null;
          const showDividerBefore =
            index > 0 &&
            (isToggleRow(row) ||
              (isInlineOptionsRow(row) && prev && isSubmenuRow(prev)) ||
              (isSubmenuRow(row) && prev && !isSubmenuRow(prev)));

          if (isToggleRow(row)) {
            return (
              <div key={row.id}>
                {showDividerBefore && (
                  <div className="my-2 border-t border-divider-primary" />
                )}
                <div className={cn(rowClass, "hover:bg-transparent")}>
                  <span className="text-body text-display-on-light-primary">
                    {row.label}
                  </span>
                  <Switch
                    checked={row.checked}
                    onChange={row.onCheckedChange}
                  />
                </div>
              </div>
            );
          }

          if (isInlineOptionsRow(row)) {
            return (
              <div key={row.id}>
                {showDividerBefore && (
                  <div className="my-2 border-t border-divider-primary" />
                )}
                {row.title ? (
                  <div className="px-4 pb-1 pt-1 text-caption-2 text-display-on-light-secondary">
                    {row.title}
                  </div>
                ) : null}
                {row.options.length === 0 ? (
                  <p className="px-4 py-2 text-body text-grey-500">
                    No options
                  </p>
                ) : (
                  renderOptionButtons(
                    row.selectionKey,
                    row.options,
                    row.selectionMode,
                  )
                )}
              </div>
            );
          }

          return (
            <div key={row.id}>
              {showDividerBefore && (
                <div className="my-2 border-t border-divider-primary" />
              )}
              <button
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
            </div>
          );
        })}

        {showResetAll && (
          <div className="mt-2 border-t border-divider-primary pt-2">
            <button type="button" onClick={onResetAll} className={cn(rowClass)}>
              <span className="text-body text-display-on-light-primary">
                {resetAllLabel}
              </span>
            </button>
          </div>
        )}
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
              <ChevronIcon direction="left" size="small" className="shrink-0" />
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
            renderOptionButtons(
              view.selectionKey,
              view.options,
              view.selectionMode,
            )
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
            // `group` so the panels below can see which way this flipped.
            "group w-auto border-0 bg-transparent p-0 shadow-none outline-none",
          )}
        >
          {/*
            The two panels align to whichever edge is against the trigger.

            They are different heights — the category column is three rows,
            the options panel can be a dozen — and Radix flips the whole box
            above the trigger when there is no room below. Top-aligned, that
            put the short category column at the TOP of a tall box: metres
            from the button that opened it, reading as a detached menu
            belonging to nothing. `data-side` is Radix's own answer for which
            way it went, so the flip and the alignment cannot disagree.
          */}
          <div className="flex items-start gap-0 group-data-[side=top]:items-end">
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
