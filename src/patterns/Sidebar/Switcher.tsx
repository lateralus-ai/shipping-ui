import { Logo } from "../../primitives";
import { cn } from "../../utils/cn";

export type Chief = "technical" | "compliance";

export type SwitcherProps = {
  chief: Chief;
  expanded?: boolean;
  onChiefChange?: (chief: Chief) => void;
  className?: string;
};

const chiefLabels: Record<Chief, string> = {
  technical: "Technical",
  compliance: "Compliance",
};

const SwitcherTab = ({
  tabChief,
  active,
  onSelect,
}: {
  tabChief: Chief;
  active: boolean;
  onSelect?: (chief: Chief) => void;
}) => {
  const tabClassName = cn(
    "box-border flex h-[34px] flex-1 items-center gap-[2px] rounded-[4px] py-2 pl-[14px] pr-4",
    active
      ? "bg-background-primary text-display-on-light-primary shadow-[0_1px_1px_rgba(0,0,0,0.06)]"
      : "text-display-on-light-quaternary",
    onSelect && !active && "cursor-pointer hover:text-display-on-light-secondary",
  );

  const content = (
    <>
      <div
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded-full",
          active && "bg-background-primary",
        )}
      >
        <Logo chief={tabChief} muted={!active} className="size-[18px]" />
      </div>
      <span
        className={cn(
          "truncate text-[11px] uppercase leading-4 tracking-normal",
          active ? "text-display-on-light-primary" : "text-display-on-light-quaternary",
        )}
      >
        {chiefLabels[tabChief]}
      </span>
    </>
  );

  if (!onSelect) {
    return (
      <div className={tabClassName} data-active={active}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={tabClassName}
      data-active={active}
      aria-pressed={active}
      aria-label={`Switch to ${chiefLabels[tabChief]}`}
      disabled={active}
      onClick={() => onSelect(tabChief)}
    >
      {content}
    </button>
  );
};

export const Switcher = ({
  chief,
  expanded = true,
  onChiefChange,
  className,
}: SwitcherProps) => {
  if (!expanded) {
    return (
      <div
        className={cn(
          "flex h-8 w-10 shrink-0 items-center justify-center self-center rounded-control",
          className,
        )}
        data-expanded={expanded}
        data-chief={chief}
        aria-label={`Switch chief: ${chiefLabels[chief]}`}
      >
        <Logo chief={chief} className="size-6 shrink-0" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "box-border flex h-11 w-full gap-1 rounded-control bg-background-secondary p-[5px] shadow-[inset_0_0_0_1px_theme(colors.divider.primary)]",
        className,
      )}
      data-expanded={expanded}
      data-chief={chief}
      role="group"
      aria-label="Chief switcher"
    >
      <SwitcherTab tabChief="technical" active={chief === "technical"} onSelect={onChiefChange} />
      <SwitcherTab tabChief="compliance" active={chief === "compliance"} onSelect={onChiefChange} />
    </div>
  );
};
