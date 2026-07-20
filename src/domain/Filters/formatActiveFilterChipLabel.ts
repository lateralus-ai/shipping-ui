/**
 * Format the user-visible label for an active-filter chip (audit-prep rules).
 *
 * - 0 selected → "" (caller should not render)
 * - 1 selected → `<filterName> (<value>)`
 * - 2 selected → `<filterName> (<v1>, <v2>)`
 * - 3+ selected → `<filterName> (<v1>, <v2>...)` (literal `...`)
 *
 * `selectedLabels` are already human-readable, in selection order.
 */
export function formatActiveFilterChipLabel(
  filterName: string,
  selectedLabels: string[],
): string {
  if (selectedLabels.length === 0) return "";
  if (selectedLabels.length === 1) {
    return `${filterName} (${selectedLabels[0]})`;
  }
  if (selectedLabels.length === 2) {
    return `${filterName} (${selectedLabels[0]}, ${selectedLabels[1]})`;
  }
  return `${filterName} (${selectedLabels[0]}, ${selectedLabels[1]}...)`;
}
