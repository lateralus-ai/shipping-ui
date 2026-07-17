import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalTitle,
  type ModalContentProps,
  type ModalProps,
} from "../../components/Modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/Tabs";
import { Badge } from "../../primitives/Badge";
import { cn } from "../../utils/cn";
import { ResultRow, type ResultRowProps } from "./ResultRow";
import { SectionHeader } from "./SectionHeader";
import { Skeleton } from "../Skeleton";

export type SearchModalState = "idle" | "loading" | "results";

export type SearchFilterTab = {
  value: string;
  label: string;
  count?: number;
};

export type SearchModalProps = ModalProps & {
  /** Panel state when using the built-in layout helpers. */
  state?: SearchModalState;
  className?: string;
  contentClassName?: string;
  showOverlay?: boolean;
  overlayClassName?: string;
  children?: ReactNode;
};

const DEFAULT_FILTERS: SearchFilterTab[] = [
  { value: "all", label: "All", count: 0 },
  { value: "reports", label: "Reports", count: 0 },
  { value: "chats", label: "Chats", count: 0 },
  { value: "issues", label: "Issues", count: 0 },
];

/**
 * Search dialog composed on Modal.
 * Use compound parts (Input / Body / Filters / Results) for app wiring,
 * or pass `state` + demo children for Storybook.
 */
export const SearchModal = ({
  state,
  className,
  contentClassName,
  showOverlay = true,
  overlayClassName,
  children,
  ...modalProps
}: SearchModalProps) => (
  <Modal {...modalProps}>
    <ModalContent
      showOverlay={showOverlay}
      overlayClassName={overlayClassName}
      className={cn(
        "flex max-h-[min(80vh,640px)] w-[min(100vw-2rem,700px)] max-w-[768px] flex-col p-0",
        contentClassName,
      )}
      aria-label="Search"
      data-state={state}
    >
      <ModalTitle className="sr-only">Search</ModalTitle>
      <ModalDescription className="sr-only">
        Search reports, chats, or issues
      </ModalDescription>
      <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
        {children}
      </div>
    </ModalContent>
  </Modal>
);

export type SearchModalInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  className?: string;
  wrapperClassName?: string;
};

export const SearchModalInput = ({
  className,
  wrapperClassName,
  placeholder = "Search reports, chats, or issues…",
  ...props
}: SearchModalInputProps) => (
  <div
    className={cn(
      "shrink-0 p-3",
      wrapperClassName,
    )}
  >
    <div className="flex min-h-10 items-center px-3">
      <input
        type="search"
        placeholder={placeholder}
        className={cn(
          "w-full bg-transparent text-caption-1 text-display-on-light-primary",
          "placeholder:text-display-on-light-tertiary focus:outline-none",
          className,
        )}
        aria-label="Search query"
        {...props}
      />
    </div>
  </div>
);

export const SearchModalDivider = ({ className }: { className?: string }) => (
  <div
    className={cn("h-px w-full shrink-0 bg-divider-primary", className)}
    aria-hidden
  />
);

export type SearchModalBodyProps = {
  children: ReactNode;
  className?: string;
};

export const SearchModalBody = ({
  children,
  className,
}: SearchModalBodyProps) => (
  <ModalBody
    className={cn(
      "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-2",
      className,
    )}
  >
    {children}
  </ModalBody>
);

export type SearchModalFiltersProps = {
  tabs?: SearchFilterTab[];
  value: string;
  onValueChange: (value: string) => void;
  children?: ReactNode;
  className?: string;
  listClassName?: string;
};

/**
 * Pill-style filter tabs for the results state.
 * Children render below the tab list (typically a single filtered results list).
 * For per-tab panels, nest `SearchModalFilterPanel` (TabsContent) as children.
 */
export const SearchModalFilters = ({
  tabs = DEFAULT_FILTERS,
  value,
  onValueChange,
  children,
  className,
  listClassName,
}: SearchModalFiltersProps) => (
  <Tabs
    type="pills"
    value={value}
    onValueChange={onValueChange}
    className={cn("min-h-0 flex-1 gap-0", className)}
  >
    <TabsList
      className={cn(
        "w-full shrink-0 bg-background-primary p-2",
        listClassName,
      )}
    >
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
          {typeof tab.count === "number" && (
            <Badge color="blue">
              {tab.count > 99 ? "99+" : tab.count}
            </Badge>
          )}
        </TabsTrigger>
      ))}
    </TabsList>
    <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
  </Tabs>
);

export type SearchModalFilterPanelProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export const SearchModalFilterPanel = ({
  value,
  children,
  className,
}: SearchModalFilterPanelProps) => (
  <TabsContent value={value} className={className}>
    {children}
  </TabsContent>
);

export type SearchModalResultsProps = {
  items?: ResultRowProps[];
  children?: ReactNode;
  className?: string;
};

export const SearchModalResults = ({
  items,
  children,
  className,
}: SearchModalResultsProps) => (
  <div className={cn("flex flex-col", className)}>
    {items?.map((item, index) => (
      <ResultRow key={index} {...item} />
    ))}
    {children}
  </div>
);

export type SearchModalIdleProps = {
  label?: string;
  items?: ResultRowProps[];
  children?: ReactNode;
  className?: string;
};

export const SearchModalIdle = ({
  label = "Recently viewed",
  items,
  children,
  className,
}: SearchModalIdleProps) => (
  <div className={cn("flex min-h-0 flex-1 flex-col p-1", className)}>
    <SectionHeader
      label={label}
      className="shrink-0 px-3 py-1 text-caption-2 font-normal normal-case tracking-[0.01em] text-display-on-light-secondary"
    />
    <div className="min-h-0 flex-1 overflow-y-auto">
      <SearchModalResults items={items}>{children}</SearchModalResults>
    </div>
  </div>
);

export type SearchModalLoadingProps = {
  className?: string;
};

export const SearchModalLoading = ({ className }: SearchModalLoadingProps) => (
  <Skeleton variant="search" className={cn("rounded-none", className)} />
);

/** Convenience controlled panel for Storybook / simple embeds. */
export type SearchModalPanelProps = {
  state?: SearchModalState;
  query?: string;
  onQueryChange?: (query: string) => void;
  filter?: string;
  onFilterChange?: (filter: string) => void;
  filters?: SearchFilterTab[];
  recentItems?: ResultRowProps[];
  resultItems?: ResultRowProps[];
  className?: string;
};

export const SearchModalPanel = ({
  state = "idle",
  query = "",
  onQueryChange,
  filter = "all",
  onFilterChange,
  filters = DEFAULT_FILTERS,
  recentItems,
  resultItems,
  className,
}: SearchModalPanelProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange?.(event.target.value);
  };

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)} data-state={state}>
      <SearchModalInput value={query} onChange={handleChange} />
      <SearchModalDivider />
      <SearchModalBody className={state === "loading" ? "p-0" : undefined}>
        {state === "idle" && <SearchModalIdle items={recentItems} />}
        {state === "loading" && <SearchModalLoading />}
        {state === "results" && (
          <SearchModalFilters
            tabs={filters}
            value={filter}
            onValueChange={(next) => onFilterChange?.(next)}
          >
            <SearchModalResults items={resultItems} />
          </SearchModalFilters>
        )}
      </SearchModalBody>
    </div>
  );
};

export type { ModalContentProps };
