import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
} from "../_layout";
import { SemanticSwatch } from "./helpers";
import { FIGMA_WIDTHS } from "./figma-widths";

const actionColumns = [
  { label: "Primary", prefix: "action-primary" },
  { label: "Secondary", prefix: "action-secondary" },
  { label: "Tertiary", prefix: "action-tertiary" },
  { label: "Quaternary", prefix: "action-quaternary" },
  { label: "Destructive", prefix: "action-destructive" },
] as const;

const actionStates = ["idle", "on-idle", "hover", "on-hover", "disabled", "on-disabled"] as const;

export const ColorsCanvas = () => (
  <FigmaPage title="Colors" width={FIGMA_WIDTHS.colors}>
    <FigmaContent>
      <FigmaSection label="Accent">
        <FigmaGrid gap={24}>
          <SemanticSwatch label="On light" cssVar="--accent-on-light" />
          <SemanticSwatch label="On dark" cssVar="--accent-on-dark" textClassName="text-display-on-dark-primary" />
          <SemanticSwatch label="BG light" cssVar="--accent-bg-light" />
          <SemanticSwatch label="BG lighter" cssVar="--accent-bg-lighter" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Action">
        <FigmaGrid gap={24}>
          {actionColumns.map((column) => (
            <div key={column.prefix} className="flex flex-col gap-6">
              <p className="text-caption-2-em text-display-on-light-tertiary">{column.label}</p>
              {actionStates.map((state) => (
                <SemanticSwatch
                  key={state}
                  label={state}
                  cssVar={`--${column.prefix}-${state}`}
                  textClassName={
                    state.startsWith("on-") && !state.includes("disabled")
                      ? "text-white"
                      : "text-display-on-light-primary"
                  }
                />
              ))}
            </div>
          ))}
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Background">
        <FigmaGrid gap={24}>
          <SemanticSwatch label="Primary" cssVar="--background-primary" />
          <SemanticSwatch label="Secondary" cssVar="--background-secondary" />
          <SemanticSwatch label="Tertiary" cssVar="--background-tertiary" />
          <SemanticSwatch label="Hover" cssVar="--background-hover" textClassName="text-display-on-dark-primary" />
          <SemanticSwatch label="Selected" cssVar="--background-selected" textClassName="text-display-on-dark-primary" />
          <SemanticSwatch label="Overlay" cssVar="--background-overlay" textClassName="text-display-on-dark-primary" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Display">
        <FigmaGrid gap={24}>
          <SemanticSwatch label="On light primary" cssVar="--display-on-light-primary" />
          <SemanticSwatch label="On light secondary" cssVar="--display-on-light-secondary" />
          <SemanticSwatch label="On light tertiary" cssVar="--display-on-light-tertiary" />
          <SemanticSwatch label="On light quaternary" cssVar="--display-on-light-quaternary" />
          <SemanticSwatch label="On dark primary" cssVar="--display-on-dark-primary" textClassName="text-display-on-dark-primary" />
          <SemanticSwatch label="On dark secondary" cssVar="--display-on-dark-secondary" textClassName="text-display-on-dark-primary" />
          <SemanticSwatch label="On dark tertiary" cssVar="--display-on-dark-tertiary" textClassName="text-display-on-dark-primary" />
          <SemanticSwatch label="On dark quaternary" cssVar="--display-on-dark-quaternary" textClassName="text-display-on-dark-primary" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Divider">
        <FigmaGrid gap={24}>
          <SemanticSwatch label="Primary" cssVar="--divider-primary" />
          <SemanticSwatch label="Secondary" cssVar="--divider-secondary" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Meta">
        <FigmaGrid gap={24}>
          <SemanticSwatch label="Green" cssVar="--meta-green" />
          <SemanticSwatch label="On green" cssVar="--meta-on-green" />
          <SemanticSwatch label="Orange" cssVar="--meta-orange" />
          <SemanticSwatch label="On orange" cssVar="--meta-on-orange" />
          <SemanticSwatch label="Red" cssVar="--meta-red" />
          <SemanticSwatch label="On red" cssVar="--meta-on-red" />
          <SemanticSwatch label="Blue" cssVar="--meta-blue" />
          <SemanticSwatch label="On blue" cssVar="--meta-on-blue" />
          <SemanticSwatch label="Purple" cssVar="--meta-purple" />
          <SemanticSwatch label="On purple" cssVar="--meta-on-purple" />
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
