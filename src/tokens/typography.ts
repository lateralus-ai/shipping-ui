export const fontFamilies = {
  heading: ['"TRY Vesterbro"', "Georgia", "serif"],
  body: ['"Matter-TRIAL"', "system-ui", "sans-serif"],
  mono: ['"Roboto Mono"', "monospace"],
} as const;

export const fontSizes = {
  title: { size: "28px", lineHeight: "34px", letterSpacing: "-0.02em", weight: 400 },
  "title-em": { size: "28px", lineHeight: "34px", letterSpacing: "-0.02em", weight: 500 },
  heading: { size: "22px", lineHeight: "28px", letterSpacing: "0", weight: 500 },
  subheader: { size: "18px", lineHeight: "28px", letterSpacing: "-0.01em", weight: 400 },
  "subheader-em": { size: "18px", lineHeight: "28px", letterSpacing: "-0.01em", weight: 500 },
  body: { size: "16px", lineHeight: "24px", letterSpacing: "-0.01em", weight: 400 },
  "body-em": { size: "16px", lineHeight: "24px", letterSpacing: "-0.01em", weight: 500 },
  "caption-1": { size: "16px", lineHeight: "22px", letterSpacing: "0.02em", weight: 400 },
  "caption-1-em": { size: "16px", lineHeight: "22px", letterSpacing: "0.02em", weight: 500 },
  "caption-2": { size: "14px", lineHeight: "20px", letterSpacing: "0.01em", weight: 400 },
  "caption-2-em": { size: "14px", lineHeight: "20px", letterSpacing: "0.01em", weight: 500 },
  footnote: { size: "13px", lineHeight: "17px", letterSpacing: "0", weight: 400 },
  "footnote-em": { size: "13px", lineHeight: "17px", letterSpacing: "0", weight: 500 },
} as const;
