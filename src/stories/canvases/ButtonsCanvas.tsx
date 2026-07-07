import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
} from "../_layout";
import { ButtonSnapshot } from "./helpers";
import { FIGMA_WIDTHS } from "./figma-widths";

const hierarchies = ["primary", "secondary", "tertiary", "quaternary"] as const;

export const ButtonsCanvas = () => (
  <FigmaPage title="Buttons" width={FIGMA_WIDTHS.buttons}>
    <FigmaContent>
      <FigmaSection label="Button">
        <FigmaGrid gap={24}>
          {hierarchies.map((hierarchy) => (
            <div key={hierarchy} className="flex flex-col gap-4">
              {(["idle", "hover", "disabled"] as const).map((state) => (
                <ButtonSnapshot key={state} hierarchy={hierarchy} visualState={state} />
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-4">
            {(["idle", "hover", "disabled"] as const).map((state) => (
              <ButtonSnapshot
                key={state}
                hierarchy="primary"
                outcome="destructive"
                visualState={state}
              />
            ))}
          </div>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Icon Button">
        <FigmaGrid gap={24}>
          <ButtonSnapshot hierarchy="tertiary" visualState="idle" />
          <ButtonSnapshot hierarchy="tertiary" visualState="hover" />
          <ButtonSnapshot hierarchy="quaternary" visualState="idle" />
          <ButtonSnapshot hierarchy="quaternary" visualState="hover" />
          <span className="inline-flex size-8 items-center justify-center rounded-control bg-action-quaternary-idle text-action-quaternary-on-idle">
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M8 3.33v9.34M3.33 8h9.34" strokeLinecap="round" />
            </svg>
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-control bg-action-quaternary-hover text-action-quaternary-on-hover">
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M8 3.33v9.34M3.33 8h9.34" strokeLinecap="round" />
            </svg>
          </span>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
