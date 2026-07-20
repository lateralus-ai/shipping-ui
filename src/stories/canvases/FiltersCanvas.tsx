import { useMemo, useState } from "react";
import {
  FilterDropdown,
  FilterPill,
  FilterPills,
  FilteredPill,
  FiltersBar,
  formatActiveFilterChipLabel,
  type FilterCategoryRow,
} from "../../domain/Filters";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

const demoOptions = {
  status: [
    { value: "approved", label: "Approved" },
    { value: "reviewed", label: "Reviewed" },
    { value: "pending", label: "Pending" },
  ],
  vessel: [
    { value: "aurora", label: "Aurora" },
    { value: "north", label: "North Star" },
  ],
};

export const FiltersCanvas = () => {
  const [status, setStatus] = useState<string[]>([]);
  const [vessel, setVessel] = useState<string[]>([]);
  const [groupByVessel, setGroupByVessel] = useState(false);

  const selectedValuesBySelectionKey = useMemo(
    () => ({ status, vessel }),
    [status, vessel],
  );

  const categoryRows: FilterCategoryRow[] = useMemo(
    () => [
      {
        id: "status",
        label: "Status",
        content: {
          type: "options",
          selectionKey: "status",
          selectionMode: "multi",
          options: demoOptions.status,
        },
      },
      {
        id: "vessel",
        label: "Vessel",
        content: {
          type: "options",
          selectionKey: "vessel",
          selectionMode: "multi",
          options: demoOptions.vessel,
        },
      },
      {
        kind: "toggle",
        id: "group",
        label: "Group by Vessel",
        checked: groupByVessel,
        onCheckedChange: setGroupByVessel,
      },
    ],
    [groupByVessel],
  );

  const chips = useMemo(() => {
    const next: {
      key: string;
      label: string;
      onRemove: () => void;
    }[] = [];
    if (status.length > 0) {
      const labels = status.map(
        (v) => demoOptions.status.find((o) => o.value === v)?.label ?? v,
      );
      next.push({
        key: "status",
        label: formatActiveFilterChipLabel("Status", labels),
        onRemove: () => setStatus([]),
      });
    }
    if (vessel.length > 0) {
      const labels = vessel.map(
        (v) => demoOptions.vessel.find((o) => o.value === v)?.label ?? v,
      );
      next.push({
        key: "vessel",
        label: formatActiveFilterChipLabel("Vessel", labels),
        onRemove: () => setVessel([]),
      });
    }
    return next;
  }, [status, vessel]);

  const activeFilterCount = chips.length;

  return (
    <FigmaPage title="Filters" width={FIGMA_WIDTHS.filters}>
      <FigmaContent>
        <FigmaSection label="Filter Pill (trigger)">
          <FigmaGrid gap={16}>
            <FilterPill />
            <FilterPill activeFilterCount={2} />
            <FilterPill appearance="ghost" />
            <FilterPill appearance="ghost" activeFilterCount={2} />
          </FigmaGrid>
        </FigmaSection>

        <FigmaSection label="Filtered Pill">
          <FigmaGrid gap={16}>
            <FilteredPill label="Approved" onRemove={() => undefined} />
            <FilteredPill label="Reviewed" onRemove={() => undefined} />
          </FigmaGrid>
        </FigmaSection>

        <FigmaSection label="FilterDropdown + FilterPills (interactive)">
          <div className="flex w-full items-center justify-between gap-4">
            <FilterPills chips={chips} />
            <div className="flex shrink-0 items-center gap-4">
              <FilterDropdown
                align="end"
                submenuSide="left"
                triggerAppearance="ghost"
                categoryRows={categoryRows}
                selectedValuesBySelectionKey={selectedValuesBySelectionKey}
                activeFilterCount={activeFilterCount}
                onSelectOption={(key, value) => {
                  if (key === "status") {
                    setStatus((prev) =>
                      prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value],
                    );
                  }
                  if (key === "vessel") {
                    setVessel((prev) =>
                      prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value],
                    );
                  }
                }}
                onResetAll={() => {
                  setStatus([]);
                  setVessel([]);
                  setGroupByVessel(false);
                }}
              />
            </div>
          </div>
        </FigmaSection>

        <FigmaSection label="Filters Bar (layout stub)">
          <div className="space-y-6">
            <FiltersBar />
            <FiltersBar filters="on" activeTab="Reports" />
            <FiltersBar tabs="off" searchPlaceholder="Search workflows..." />
          </div>
        </FigmaSection>
      </FigmaContent>
    </FigmaPage>
  );
};
