import { extendTailwindMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

/**
 * Custom fontSize keys from tailwind-theme.ts (tailwind-merge@1.x API).
 * Without this, twMerge treats e.g. text-caption-2-em as the same group as
 * text-display-on-light-primary and drops the font-size class.
 */
const fontSizeTokens = [
  "title",
  "title-em",
  "heading",
  "subheader",
  "subheader-em",
  "body",
  "body-em",
  "caption-1",
  "caption-1-em",
  "caption-2",
  "caption-2-em",
  "footnote",
  "footnote-em",
] as const;

const twMerge = extendTailwindMerge({
  classGroups: {
    "font-size": [{ text: [...fontSizeTokens] }],
  },
});

/**
 * Merges the tailwind clases (using twMerge). Conditionally removes false values
 * @param inputs The tailwind classes to merge
 * @returns className string to apply to an element or HOC
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
