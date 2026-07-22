import {
  type ButtonHTMLAttributes,
  type ComponentType,
  isValidElement,
  type ReactNode,
} from "react";
import { ChevronIcon } from "../icons";
import type { IconProps } from "../icons";
import { cn } from "../utils/cn";
import {
  DropdownMenu,
  DropdownMenuItem,
} from "./DropdownMenu";
import {
  getButtonAppearanceClasses,
  getButtonInteractiveClasses,
  type ButtonAppearance,
  type ButtonHierarchy,
} from "./button-styles";

export type ButtonDropdownOption = {
  label: string;
  onSelect: () => void;
  destructive?: boolean;
  disabled?: boolean;
  icon?: ComponentType<IconProps>;
};

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  hierarchy?: ButtonHierarchy;
  disabled?: boolean;
  icon?: ComponentType<IconProps> | ReactNode;
  startIcon?: ComponentType<IconProps> | ReactNode;
  /** Renders after the label, inside the same button (no split/dropdown segment). */
  endIcon?: ComponentType<IconProps> | ReactNode;
  dropdownOptions?: ButtonDropdownOption[];
  dropdownOpen?: boolean;
  onDropdownOpenChange?: (open: boolean) => void;
  forcedState?: ButtonAppearance;
  children: ReactNode;
};

const renderIcon = (icon?: ComponentType<IconProps> | ReactNode) => {
  if (!icon) return null;

  if (isValidElement(icon)) {
    return <span className="shrink-0 [&>svg]:size-4">{icon}</span>;
  }

  if (
    typeof icon === "string" ||
    typeof icon === "number" ||
    typeof icon === "boolean"
  ) {
    return <span className="shrink-0 [&>svg]:size-4">{icon}</span>;
  }

  const Icon = icon as ComponentType<IconProps>;
  return <Icon size="small" className="shrink-0" />;
};

const getAppearance = (
  disabled: boolean,
  forcedState?: ButtonAppearance,
): ButtonAppearance => {
  if (forcedState) return forcedState;
  if (disabled) return "disabled";
  return "idle";
};

const getSegmentClasses = (
  hierarchy: ButtonHierarchy,
  appearance: ButtonAppearance,
  forcedState?: ButtonAppearance,
) => {
  if (forcedState) {
    return getButtonAppearanceClasses(hierarchy, appearance);
  }

  if (appearance === "disabled") {
    return getButtonAppearanceClasses(hierarchy, "disabled");
  }

  if (appearance === "hover") {
    return getButtonAppearanceClasses(hierarchy, "hover");
  }

  return getButtonInteractiveClasses(hierarchy, false);
};

const getCursorClass = (disabled: boolean) =>
  disabled ? "cursor-not-allowed" : "cursor-pointer";

const withSecondarySplitBorders = (
  hierarchy: ButtonHierarchy,
  segment: "main" | "dropdown",
  classes: string,
) => {
  if (hierarchy !== "secondary") return classes;

  return cn(
    classes,
    segment === "main" ? "border-r-0" : "border-l-0",
  );
};

export const Button = ({
  hierarchy = "primary",
  disabled = false,
  icon,
  startIcon,
  endIcon,
  dropdownOptions,
  dropdownOpen,
  onDropdownOpenChange,
  forcedState,
  children,
  className,
  type = "button",
  onClick,
  ...props
}: ButtonProps) => {
  const resolvedIcon = icon ?? startIcon;
  const renderedIcon = renderIcon(resolvedIcon);
  const renderedEndIcon = renderIcon(endIcon);
  const hasIcon = renderedIcon != null || renderedEndIcon != null;
  const hasDropdown = Boolean(dropdownOptions?.length);
  const dropdownDisabled = !dropdownOptions?.some((option) => !option.disabled);
  const mainAppearance = getAppearance(disabled, forcedState);
  const dropdownAppearance = getAppearance(dropdownDisabled, forcedState);
  const mainClasses = getSegmentClasses(
    hierarchy,
    mainAppearance,
    forcedState,
  );
  const dropdownClasses = getSegmentClasses(
    hierarchy,
    dropdownAppearance,
    forcedState,
  );

  /** Label-only: centered text. With start icon: gap between icon and label. */
  const content = (
    <span
      className={cn(
        "flex min-h-6 items-center justify-center",
        hasIcon && "gap-2",
      )}
    >
      {renderedIcon}
      <span>{children}</span>
      {renderedEndIcon}
    </span>
  );

  if (!hasDropdown) {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "inline-flex min-h-10 items-center justify-center rounded-control p-2 text-caption-1 tracking-[0.32px] transition-colors",
          getCursorClass(disabled),
          mainClasses,
          className,
        )}
        {...props}
      >
        {content}
      </button>
    );
  }

  const mainButton = (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 items-center justify-center rounded-none rounded-l-control p-2 text-caption-1 tracking-[0.32px] transition-colors",
        getCursorClass(disabled),
        withSecondarySplitBorders(hierarchy, "main", mainClasses),
      )}
      {...props}
    >
      {content}
    </button>
  );

  const dropdownTrigger = (
    <button
      type="button"
      disabled={dropdownDisabled}
      aria-label="Open menu"
      className={cn(
        "inline-flex min-h-10 shrink-0 items-center justify-center rounded-none rounded-r-control px-1 transition-colors",
        getCursorClass(dropdownDisabled),
        withSecondarySplitBorders(hierarchy, "dropdown", dropdownClasses),
      )}
    >
      <ChevronIcon direction="down" size="small" />
    </button>
  );

  return (
    <div
      className={cn(
        "inline-flex min-h-10 items-stretch overflow-hidden rounded-control",
        className,
      )}
    >
      {mainButton}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={onDropdownOpenChange}
        align="end"
        trigger={dropdownTrigger}
        contentClassName="min-w-[11rem]"
      >
        {dropdownOptions?.map((option) => (
          <DropdownMenuItem
            key={option.label}
            disabled={option.disabled}
            onSelect={option.onSelect}
            className={cn(
              option.destructive &&
                "text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600",
            )}
          >
            {option.icon ? renderIcon(option.icon) : null}
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </div>
  );
};
