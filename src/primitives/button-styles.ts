export type ButtonHierarchy =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "destructive";

export type ButtonAppearance = "idle" | "hover" | "disabled";

type HierarchyStyleMap = Record<ButtonAppearance, string>;

const primaryStyles: HierarchyStyleMap = {
  idle: "bg-action-primary-idle text-action-primary-on-idle",
  hover: "bg-action-primary-hover text-action-primary-on-hover",
  disabled: "bg-action-primary-disabled text-action-primary-on-disabled",
};

const secondaryStyles: HierarchyStyleMap = {
  idle:
    "border border-divider-primary bg-action-secondary-idle text-action-secondary-on-idle",
  hover:
    "border border-divider-secondary bg-action-secondary-hover text-action-secondary-on-hover",
  disabled:
    "border border-divider-primary bg-action-secondary-disabled text-action-secondary-on-disabled",
};

const tertiaryStyles: HierarchyStyleMap = {
  idle: "bg-action-tertiary-idle text-action-tertiary-on-idle",
  hover: "bg-action-tertiary-hover text-action-tertiary-on-hover",
  disabled: "bg-action-tertiary-disabled text-action-tertiary-on-disabled",
};

const quaternaryStyles: HierarchyStyleMap = {
  idle: "bg-action-quaternary-idle text-action-quaternary-on-idle",
  hover: "bg-action-quaternary-hover text-action-quaternary-on-hover",
  disabled: "bg-action-quaternary-disabled text-action-quaternary-on-disabled",
};

const destructiveStyles: HierarchyStyleMap = {
  idle: "bg-action-destructive-idle text-action-destructive-on-idle",
  hover: "bg-action-destructive-hover text-action-destructive-on-hover",
  disabled:
    "bg-action-destructive-disabled text-action-destructive-on-disabled",
};

const hierarchyStyles: Record<ButtonHierarchy, HierarchyStyleMap> = {
  primary: primaryStyles,
  secondary: secondaryStyles,
  tertiary: tertiaryStyles,
  quaternary: quaternaryStyles,
  destructive: destructiveStyles,
};

const interactiveHierarchyStyles: Record<ButtonHierarchy, string> = {
  primary:
    "bg-action-primary-idle text-action-primary-on-idle hover:bg-action-primary-hover hover:text-action-primary-on-hover",
  secondary:
    "border border-divider-primary bg-action-secondary-idle text-action-secondary-on-idle hover:border-divider-secondary hover:bg-action-secondary-hover hover:text-action-secondary-on-hover",
  tertiary:
    "bg-action-tertiary-idle text-action-tertiary-on-idle hover:bg-action-tertiary-hover hover:text-action-tertiary-on-hover",
  quaternary:
    "bg-action-quaternary-idle text-action-quaternary-on-idle hover:bg-action-quaternary-hover hover:text-action-quaternary-on-hover",
  destructive:
    "bg-action-destructive-idle text-action-destructive-on-idle hover:bg-action-destructive-hover hover:text-action-destructive-on-hover",
};

const disabledHierarchyStyles: Record<ButtonHierarchy, string> = {
  primary: "bg-action-primary-disabled text-action-primary-on-disabled",
  secondary:
    "border border-divider-primary bg-action-secondary-disabled text-action-secondary-on-disabled",
  tertiary: "bg-action-tertiary-disabled text-action-tertiary-on-disabled",
  quaternary:
    "bg-action-quaternary-disabled text-action-quaternary-on-disabled",
  destructive:
    "bg-action-destructive-disabled text-action-destructive-on-disabled",
};

export const getButtonAppearanceClasses = (
  hierarchy: ButtonHierarchy,
  appearance: ButtonAppearance,
) => hierarchyStyles[hierarchy][appearance];

export const getButtonInteractiveClasses = (
  hierarchy: ButtonHierarchy,
  disabled: boolean,
) => {
  if (disabled) {
    return disabledHierarchyStyles[hierarchy];
  }

  return interactiveHierarchyStyles[hierarchy];
};
