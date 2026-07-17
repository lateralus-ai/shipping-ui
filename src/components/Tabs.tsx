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

/** Soft = search filters (filled idle). Solid = workflow shell (ghost idle, blue active). */
export type TabsAppearance = "soft" | "solid";

type TabsContextValue = {
  type: TabsType;
  appearance: TabsAppearance;
};

const TabsContext = createContext<TabsContextValue>({
  type: "tabs",
  appearance: "soft",
});

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  type?: TabsType;
  /** Only applies when `type="pills"`. Defaults to `soft`. */
  appearance?: TabsAppearance;
};

export const Tabs = ({
  type = "tabs",
  appearance = "soft",
  className,
  children,
  ...props
}: TabsProps) => (
  <TabsContext.Provider value={{ type, appearance }}>
    <TabsPrimitive.Root
      className={cn("flex flex-col", className)}
      data-type={type}
      data-appearance={type === "pills" ? appearance : undefined}
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
  children: ReactNode;
};

export const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, ...props }, ref) => {
  const { type, appearance } = useContext(TabsContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 transition-colors outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        type === "tabs" && [
          "relative h-12 gap-2 px-0 py-0 text-caption-2 text-display-on-light-secondary",
          "hover:text-display-on-light-primary",
          "data-[state=active]:text-caption-2-em data-[state=active]:text-display-on-light-primary",
          "data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:-bottom-px",
          "data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-grey-900",
        ],
        type === "pills" &&
          appearance === "soft" && [
            "min-h-9 rounded-full px-3 py-1 text-caption-2-em",
            "bg-grey-100 text-display-on-light-secondary",
            "hover:bg-grey-200",
            "data-[state=active]:bg-accent-bg-light data-[state=active]:text-display-on-light-primary",
          ],
        type === "pills" &&
          appearance === "solid" && [
            "min-h-9 rounded-full px-3 py-1 text-caption-2-em",
            "bg-transparent text-display-on-light-tertiary",
            "hover:bg-grey-900/[0.04] hover:text-display-on-light-primary",
            "data-[state=active]:bg-blue-600 data-[state=active]:text-white",
            "data-[state=active]:hover:bg-blue-600",
          ],
        className,
      )}
      {...props}
    >
      {children}
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
