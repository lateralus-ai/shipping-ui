import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

export type TabsType = "tabs" | "pills";

type TabsContextValue = {
  type: TabsType;
};

const TabsContext = createContext<TabsContextValue>({ type: "tabs" });

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  type?: TabsType;
};

export const Tabs = ({
  type = "tabs",
  className,
  children,
  ...props
}: TabsProps) => (
  <TabsContext.Provider value={{ type }}>
    <TabsPrimitive.Root
      className={cn("flex flex-col", className)}
      data-type={type}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  </TabsContext.Provider>
);

export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const { type } = useContext(TabsContext);

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "flex items-center",
        type === "tabs" && "gap-6 border-b border-divider-primary",
        type === "pills" && "gap-2",
        className,
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> & {
  /** Optional count badge (pill variant / search filters). */
  count?: number;
  children: ReactNode;
};

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, count, children, ...props }, ref) => {
  const { type } = useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center transition-colors outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        type === "tabs" && [
          "relative h-12 gap-2 px-0 py-0 text-caption-2 text-display-on-light-secondary",
          "hover:text-display-on-light-primary",
          "data-[state=active]:text-caption-2-em data-[state=active]:text-display-on-light-primary",
          "data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:-bottom-px",
          "data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-grey-900",
        ],
        type === "pills" && [
          "group min-h-9 gap-2.5 rounded-full px-3 py-1 text-caption-2-em",
          "bg-grey-100 text-display-on-light-secondary",
          "hover:bg-grey-200",
          "data-[state=active]:bg-accent-bg-light data-[state=active]:text-display-on-light-primary",
        ],
        className,
      )}
      {...props}
    >
      {children}
      {typeof count === "number" &&
        (type === "pills" ? (
          <span
            className={cn(
              "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-footnote-em",
              "bg-accent-bg-light text-display-on-light-secondary",
              "group-data-[state=active]:text-display-on-light-tertiary",
            )}
            aria-label={`Count: ${count}`}
          >
            {count > 99 ? "99+" : count}
          </span>
        ) : (
          <span
            className="px-1 text-caption-2 text-display-on-light-secondary"
            aria-label={`Count: ${count}`}
          >
            {count > 99 ? "99+" : count}
          </span>
        ))}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export type TabsContentProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;

export const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

/** @deprecated Prefer Tabs + TabsTrigger. Kept for Storybook atom demos. */
export type TabsItem = {
  label: string;
  value?: string;
  count?: number;
};
