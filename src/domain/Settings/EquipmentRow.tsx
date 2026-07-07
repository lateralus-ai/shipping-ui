import { cn } from "../../utils/cn";
import { PenIcon } from "../../icons/generated";

export type EquipmentRowEditable = "on" | "off";

export type EquipmentRowProps = {
  name?: string;
  type?: string;
  editable?: EquipmentRowEditable;
  className?: string;
};

export const EquipmentRow = ({
  name = "Main engine",
  type = "MAN B&W 6S50ME-C",
  editable = "on",
  className,
}: EquipmentRowProps) => (
  <div
    className={cn(
      "flex w-full items-center justify-between gap-4 rounded-control border border-divider-primary bg-background-primary px-4 py-3",
      className,
    )}
  >
    <div className="min-w-0">
      <p className="text-body-em text-display-on-light-primary">{name}</p>
      <p className="text-caption-2 text-display-on-light-tertiary">{type}</p>
    </div>
    {editable === "on" && (
      <button
        type="button"
        aria-label="Edit equipment"
        className="shrink-0 rounded-control p-1 text-display-on-light-tertiary hover:bg-background-secondary hover:text-display-on-light-primary"
      >
        <PenIcon size="small" />
      </button>
    )}
  </div>
);
