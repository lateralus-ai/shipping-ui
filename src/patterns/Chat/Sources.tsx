import { cn } from "../../utils/cn";
import { Source } from "./Source";

export type SourcesProps = {
  count?: number;
  className?: string;
};

const placeholderSources = [
  { title: "ISM Code Section 10", excerpt: "The company should establish procedures to ensure that the ship is maintained..." },
  { title: "Port State Control MOU", excerpt: "Inspections are carried out to verify compliance with international conventions..." },
];

export const Sources = ({ count = 2, className }: SourcesProps) => (
  <div className={cn("flex flex-col gap-2", className)} role="region" aria-label="Sources">
    <p className="text-footnote-em text-display-on-light-tertiary">
      {count} source{count !== 1 ? "s" : ""}
    </p>
    {placeholderSources.slice(0, count).map((source) => (
      <Source key={source.title} title={source.title} excerpt={source.excerpt} />
    ))}
  </div>
);
