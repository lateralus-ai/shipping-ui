import { ShipIcon, ChevronIcon } from "../../icons";
import { cn } from "../../utils/cn";

export type ShipsState = "collapsed" | "expanded";

export type Ship = {
  id: string;
  name: string;
};

export type ShipsProps = {
  state?: ShipsState;
  ships?: Ship[];
  className?: string;
};

const placeholderShips: Ship[] = [
  { id: "1", name: "MV Atlantic Star" },
  { id: "2", name: "MV Pacific Dawn" },
  { id: "3", name: "MV Nordic Wind" },
];

export const Ships = ({
  state = "expanded",
  ships = placeholderShips,
  className,
}: ShipsProps) => (
  <div className={cn("flex flex-col gap-0.5", className)} data-state={state}>
    <button
      type="button"
      className="group flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-caption-1-em text-display-on-light-secondary transition-colors hover:bg-background-hover hover:text-display-on-light-primary"
    >
      <ShipIcon className="size-5 shrink-0" />
      <span className="flex-1 truncate text-left">Ships</span>
      <ChevronIcon
        direction={state === "expanded" ? "up" : "down"}
        className="size-4 shrink-0 text-display-on-light-quaternary"
      />
    </button>

    <div
      className={cn(
        "flex flex-col gap-0.5 pl-7",
        state === "collapsed" && "hidden",
      )}
    >
      {ships.map((ship) => (
        <button
          key={ship.id}
          type="button"
          className="truncate rounded-control px-2 py-1 text-left text-caption-2 text-display-on-light-secondary transition-colors hover:bg-background-hover hover:text-display-on-light-primary"
        >
          {ship.name}
        </button>
      ))}
    </div>
  </div>
);
