import { SearchIcon } from "../../icons";
import { cn } from "../../utils/cn";
import { Pill } from "./Pill";
import { ResultRow } from "./ResultRow";
import { SectionHeader } from "./SectionHeader";

export type SearchModalState = "idle" | "loading" | "results";

export type SearchModalProps = {
  state?: SearchModalState;
  className?: string;
};

const placeholderResults = [
  { variant: "report" as const, title: "Hull inspection report Q3", subtitle: "MV Atlantic Star" },
  { variant: "chat" as const, title: "Port state control discussion", subtitle: "2 days ago" },
  { variant: "issue" as const, title: "Critical valve malfunction", subtitle: "Open · High priority" },
];

export const SearchModal = ({ state = "idle", className }: SearchModalProps) => (
  <div
    className={cn(
      "w-full max-w-xl overflow-hidden rounded-lg border border-divider-primary bg-background-primary shadow-raise2",
      className,
    )}
    role="dialog"
    aria-label="Search"
    data-state={state}
  >
    <div className="flex items-center gap-2 border-b border-divider-primary px-4 py-3">
      <SearchIcon className="size-5 shrink-0 text-display-on-light-quaternary" />
      <input
        type="search"
        placeholder="Search reports, chats, and issues..."
        className="flex-1 bg-transparent text-body text-display-on-light-primary placeholder:text-display-on-light-quaternary focus:outline-none"
        aria-label="Search query"
        readOnly
        defaultValue={state === "results" ? "inspection" : ""}
      />
      {state === "loading" && (
        <span className="size-4 animate-spin rounded-full border-2 border-divider-primary border-t-blue-600" />
      )}
    </div>

    <div className="flex gap-2 px-4 py-2">
      <Pill state={state === "results" ? "active" : "idle"} size="small">
        All
      </Pill>
      <Pill state="idle" size="small">
        Reports
      </Pill>
      <Pill state="idle" size="small">
        Chats
      </Pill>
      <Pill state="idle" size="small">
        Issues
      </Pill>
    </div>

    <div className="max-h-80 overflow-y-auto px-2 pb-2">
      {state === "idle" && (
        <p className="px-2 py-8 text-center text-caption-2 text-display-on-light-tertiary">
          Start typing to search across your workspace
        </p>
      )}

      {state === "loading" && (
        <p className="px-2 py-8 text-center text-caption-2 text-display-on-light-tertiary">
          Searching...
        </p>
      )}

      {state === "results" && (
        <>
          <SectionHeader label="Results" />
          {placeholderResults.map((result) => (
            <ResultRow
              key={result.title}
              variant={result.variant}
              title={result.title}
              subtitle={result.subtitle}
            />
          ))}
        </>
      )}
    </div>
  </div>
);
