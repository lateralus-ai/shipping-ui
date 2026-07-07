import { cn } from "../utils/cn";
import { Tab } from "./Tab";

export type TabsType = "tabs" | "pills";

export type TabsItem = {
  label: string;
};

export type TabsProps = {
  type?: TabsType;
  items: TabsItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  className?: string;
};

export const Tabs = ({
  type = "tabs",
  items,
  activeIndex,
  onChange,
  className,
}: TabsProps) => (
  <div
    role="tablist"
    className={cn(
      "flex gap-1",
      type === "pills" && "rounded-control bg-background-secondary p-1",
      className,
    )}
  >
    {items.map((item, index) => (
      <Tab
        key={item.label}
        label={item.label}
        state={index === activeIndex ? "active" : "idle"}
        onClick={() => onChange(index)}
        className={cn(
          type === "pills" && "rounded-control px-3 py-1.5",
          type === "pills" &&
            index === activeIndex &&
            "bg-white shadow-raise1 data-[state=active]:after:hidden",
        )}
      />
    ))}
  </div>
);
