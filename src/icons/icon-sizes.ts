import { iconsData, type IconDataName } from "./icons-data";
import type { IconSize } from "./types";

const sizesFromPathSet = (set?: Partial<Record<IconSize, unknown>>): IconSize[] =>
  set ? (Object.keys(set) as IconSize[]) : [];

export const getOutlineSizes = (name: IconDataName): IconSize[] =>
  sizesFromPathSet(iconsData[name].outline);

export const getFilledSizes = (name: IconDataName): IconSize[] =>
  sizesFromPathSet(iconsData[name].filled);

export const hasIconSize = (
  name: IconDataName,
  size: IconSize,
  filled = false,
): boolean => {
  const paths = filled ? iconsData[name].filled : iconsData[name].outline;
  return Boolean(paths?.[size]);
};
