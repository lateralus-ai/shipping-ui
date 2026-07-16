import { colorScales } from "./tokens/colors";
import { elevation, borderRadius } from "./tokens/elevation";

const toTailwindFontSize = (
  size: string,
  opts: { lineHeight: string; letterSpacing: string; fontWeight?: number },
) =>
  [
    size,
    {
      lineHeight: opts.lineHeight,
      letterSpacing: opts.letterSpacing,
      ...(opts.fontWeight ? { fontWeight: String(opts.fontWeight) } : {}),
    },
  ] as const;

export const theme = {
  fontFamily: {
    heading: ['"TRY Vesterbro"', "Libre Baskerville", "Georgia", "serif"],
    sans: ['"Matter-TRIAL"', "DM Sans", "system-ui", "sans-serif"],
    mono: ["Roboto Mono", "monospace"],
  },
  fontSize: {
    title: toTailwindFontSize("28px", { lineHeight: "34px", letterSpacing: "-0.02em" }),
    "title-em": toTailwindFontSize("28px", {
      lineHeight: "34px",
      letterSpacing: "-0.02em",
      fontWeight: 500,
    }),
    heading: toTailwindFontSize("22px", {
      lineHeight: "28px",
      letterSpacing: "0",
      fontWeight: 500,
    }),
    subheader: toTailwindFontSize("18px", { lineHeight: "28px", letterSpacing: "-0.01em" }),
    "subheader-em": toTailwindFontSize("18px", {
      lineHeight: "28px",
      letterSpacing: "-0.01em",
      fontWeight: 500,
    }),
    body: toTailwindFontSize("16px", { lineHeight: "24px", letterSpacing: "-0.01em" }),
    "body-em": toTailwindFontSize("16px", {
      lineHeight: "24px",
      letterSpacing: "-0.01em",
      fontWeight: 500,
    }),
    "caption-1": toTailwindFontSize("16px", { lineHeight: "22px", letterSpacing: "0.02em" }),
    "caption-1-em": toTailwindFontSize("16px", {
      lineHeight: "22px",
      letterSpacing: "0.02em",
      fontWeight: 500,
    }),
    "caption-2": toTailwindFontSize("14px", { lineHeight: "20px", letterSpacing: "0.01em" }),
    "caption-2-em": toTailwindFontSize("14px", {
      lineHeight: "20px",
      letterSpacing: "0.01em",
      fontWeight: 500,
    }),
    footnote: toTailwindFontSize("13px", { lineHeight: "17px", letterSpacing: "0" }),
    "footnote-em": toTailwindFontSize("13px", {
      lineHeight: "17px",
      letterSpacing: "0",
      fontWeight: 500,
    }),
  },
  boxShadow: {
    raise1: elevation.raise1,
    raise2: elevation.raise2,
    raise3: elevation.raise3,
  },
  borderRadius: {
    control: borderRadius.control,
    lg: borderRadius.lg,
    md: borderRadius.md,
    sm: borderRadius.sm,
  },
  colors: {
    grey: colorScales.grey,
    gray: colorScales.grey,
    green: colorScales.green,
    blue: colorScales.blue,
    red: colorScales.red,
    orange: colorScales.orange,
    purple: colorScales.purple,
    white: "#ffffff",
    action: {
      primary: {
        idle: "var(--action-primary-idle)",
        "on-idle": "var(--action-primary-on-idle)",
        hover: "var(--action-primary-hover)",
        "on-hover": "var(--action-primary-on-hover)",
        disabled: "var(--action-primary-disabled)",
        "on-disabled": "var(--action-primary-on-disabled)",
      },
      secondary: {
        idle: "var(--action-secondary-idle)",
        "on-idle": "var(--action-secondary-on-idle)",
        hover: "var(--action-secondary-hover)",
        "on-hover": "var(--action-secondary-on-hover)",
        disabled: "var(--action-secondary-disabled)",
        "on-disabled": "var(--action-secondary-on-disabled)",
      },
      tertiary: {
        idle: "var(--action-tertiary-idle)",
        "on-idle": "var(--action-tertiary-on-idle)",
        hover: "var(--action-tertiary-hover)",
        "on-hover": "var(--action-tertiary-on-hover)",
        disabled: "var(--action-tertiary-disabled)",
        "on-disabled": "var(--action-tertiary-on-disabled)",
      },
      quaternary: {
        idle: "var(--action-quaternary-idle)",
        "on-idle": "var(--action-quaternary-on-idle)",
        hover: "var(--action-quaternary-hover)",
        "on-hover": "var(--action-quaternary-on-hover)",
        disabled: "var(--action-quaternary-disabled)",
        "on-disabled": "var(--action-quaternary-on-disabled)",
      },
      destructive: {
        idle: "var(--action-destructive-idle)",
        "on-idle": "var(--action-destructive-on-idle)",
        hover: "var(--action-destructive-hover)",
        "on-hover": "var(--action-destructive-on-hover)",
        disabled: "var(--action-destructive-disabled)",
        "on-disabled": "var(--action-destructive-on-disabled)",
      },
    },
    background: {
      primary: "var(--background-primary)",
      secondary: "var(--background-secondary)",
      tertiary: "var(--background-tertiary)",
      hover: "var(--background-hover)",
      selected: "var(--background-selected)",
      overlay: "var(--background-overlay)",
    },
    display: {
      "on-light": {
        primary: "var(--display-on-light-primary)",
        secondary: "var(--display-on-light-secondary)",
        tertiary: "var(--display-on-light-tertiary)",
        quaternary: "var(--display-on-light-quaternary)",
      },
      "on-dark": {
        primary: "var(--display-on-dark-primary)",
        secondary: "var(--display-on-dark-secondary)",
        tertiary: "var(--display-on-dark-tertiary)",
        quaternary: "var(--display-on-dark-quaternary)",
      },
    },
    accent: {
      "on-light": "var(--accent-on-light)",
      "on-dark": "var(--accent-on-dark)",
      "bg-light": "var(--accent-bg-light)",
      "bg-lighter": "var(--accent-bg-lighter)",
    },
    divider: {
      primary: "var(--divider-primary)",
      secondary: "var(--divider-secondary)",
    },
    meta: {
      green: "var(--meta-green)",
      onGreen: "var(--meta-on-green)",
      orange: "var(--meta-orange)",
      onOrange: "var(--meta-on-orange)",
      red: "var(--meta-red)",
      onRed: "var(--meta-on-red)",
      blue: "var(--meta-blue)",
      onBlue: "var(--meta-on-blue)",
      purple: "var(--meta-purple)",
      onPurple: "var(--meta-on-purple)",
    },
    /* Legacy aliases */
    "text-primary": "var(--display-on-light-primary)",
    "text-secondary": "var(--display-on-light-secondary)",
    "text-tertiary": "var(--display-on-light-tertiary)",
    "surface-primary": "var(--background-primary)",
    "surface-secondary": "var(--background-secondary)",
    "surface-hover": "var(--background-secondary)",
    "border-light": "var(--divider-primary)",
    "border-medium": "var(--divider-secondary)",
  },
};
