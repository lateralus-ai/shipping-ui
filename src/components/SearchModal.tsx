import { Dialog, DialogBody } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useMediaQuery } from "@uidotdev/usehooks";
import { cn } from "../utils/cn";

export const formatDateReport = (date: string | Date) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(\\b${searchTerm}\\b)`, "gi");
  const parts = text.split(regex);
  const firstMatchIndex = parts.findIndex((part) => regex.test(part));

  if (firstMatchIndex === -1) return text;

  if (firstMatchIndex === 0) {
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-gray-900 font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    );
  }

  const matchedPart = parts[firstMatchIndex];
  const beforeMatch = parts.slice(0, firstMatchIndex).join("");
  const afterMatch = parts.slice(firstMatchIndex + 1).join("");

  return (
    <>
      <span key="match" className="text-gray-900 font-medium">
        {beforeMatch && <>...</>}
        {matchedPart}
      </span>
      {afterMatch && <span key="after"> {afterMatch}</span>}
    </>
  );
};

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  metadata?: Record<string, any>;
}

export interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  items?: SearchItem[];
  loading?: boolean;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSelect?: (item: SearchItem) => void;
  filterOptions?: string[];
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
  recentlyViewedLabel?: string;
  noResultsText?: string;
}

const SearchFilters = ({
  filters,
  selected,
  onChange,
}: {
  filters: string[];
  selected: string;
  onChange: (filter: string) => void;
}) => {
  return (
    <div className="flex gap-2 px-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(
            "px-3 py-1 text-sm rounded-full transition-colors",
            selected === filter
              ? "bg-brand-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const SearchSkeleton = () => {
  return (
    <div className="p-4 flex flex-col gap-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

const SearchItemComponent = ({
  item,
  isActive,
  onClick,
  searchTerm,
}: {
  item: SearchItem;
  isActive: boolean;
  onClick: () => void;
  searchTerm: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
        isActive ? "bg-gray-100" : "hover:bg-gray-50",
      )}
    >
      {item.icon && <div className="shrink-0 text-gray-600">{item.icon}</div>}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">
          {item.title}
        </div>
        {item.subtitle && (
          <div className="text-sm text-gray-600 truncate">
            {typeof item.subtitle === "string"
              ? highlightText(item.subtitle, searchTerm)
              : item.subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchModal = ({
  open,
  onClose,
  items = [],
  loading = false,
  placeholder = "Search...",
  onSearch,
  onSelect,
  filterOptions = [],
  selectedFilter = "All",
  onFilterChange,
  recentlyViewedLabel = "Recently viewed",
  noResultsText = "No results found.",
}: SearchModalProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  useEffect(() => {
    if (activeIndex > items.length) {
      setActiveIndex(-1);
    }
  }, [items, activeIndex]);

  useEffect(() => {
    const currentItem = itemRefs.current[activeIndex];
    currentItem?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeIndex]);

  useHotkeys(
    "ArrowUp",
    () => {
      if (items.length === 0) return;
      setActiveIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
      enabled: open,
    },
  );

  useHotkeys(
    "ArrowDown",
    () => {
      if (items.length === 0) return;
      setActiveIndex((prev) => (prev >= items.length - 1 ? 0 : prev + 1));
    },
    {
      preventDefault: true,
      enableOnFormTags: true,
      enabled: open,
    },
  );

  useHotkeys(
    "Enter",
    () => {
      if (activeIndex >= 0 && activeIndex < items.length) {
        handleItemSelect(items[activeIndex]);
      }
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      enabled: open,
    },
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleItemSelect = (item: SearchItem) => {
    onSelect?.(item);
    handleClose();
  };

  const handleClose = () => {
    setSearchValue("");
    setActiveIndex(-1);
    onClose();
  };

  const showFilters = filterOptions.length > 0 && searchValue;
  const showRecentlyViewed = !searchValue && items.length > 0;

  return (
    <Dialog
      open={open}
      size="lg"
      handler={handleClose}
      className={cn(
        isMobile && "w-screen m-0",
        "focus:outline-none 2xl:min-w-px",
      )}
    >
      <DialogBody className="relative px-0 py-2">
        <div>
          <div className="border-b border-b-gray-100 px-6 pb-2">
            <input
              type="text"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-transparent p-2 px-0 text-sm font-medium text-gray-600 placeholder-gray-400 outline-none focus:outline-none"
            />
          </div>

          {loading ? (
            <SearchSkeleton />
          ) : (
            <div className="p-4 flex flex-col gap-2">
              {showRecentlyViewed && (
                <p className="text-sm font-normal text-gray-600 px-2">
                  {recentlyViewedLabel}
                </p>
              )}

              {showFilters && (
                <SearchFilters
                  filters={filterOptions}
                  selected={selectedFilter}
                  onChange={(filter) => onFilterChange?.(filter)}
                />
              )}

              <div className="overflow-y-auto max-h-[320px]" tabIndex={0}>
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) itemRefs.current[index] = el;
                    }}
                  >
                    <SearchItemComponent
                      item={item}
                      isActive={activeIndex === index}
                      onClick={() => handleItemSelect(item)}
                      searchTerm={searchValue}
                    />
                  </div>
                ))}

                {!loading && items.length === 0 && (
                  <div className="text-sm text-gray-900 font-medium">
                    {noResultsText}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default SearchModal;
