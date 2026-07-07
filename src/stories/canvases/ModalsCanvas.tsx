import { Invitee, ModalFooter, ModalHeader } from "../../patterns/Modal";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

const headerVariants = [
  "issue",
  "thinking",
  "generic",
  "settings",
  "audit",
  "forms",
] as const;

export const ModalsCanvas = () => (
  <FigmaPage title="Modals" width={FIGMA_WIDTHS.modals}>
    <FigmaContent>
      <FigmaSection label="Modal Header">
        <FigmaGrid gap={24}>
          {headerVariants.map((variant) => (
            <FigmaVariant key={variant} label={variant}>
              <div className="w-96">
                <ModalHeader variant={variant} onClose={() => {}} />
              </div>
            </FigmaVariant>
          ))}
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Modal Footer">
        <FigmaGrid gap={24}>
          <div className="w-96">
            <ModalFooter />
          </div>
          <div className="w-96">
            <ModalFooter chief="compliance" />
          </div>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Invitee">
        <FigmaGrid gap={24}>
          <Invitee />
          <Invitee variant="multiple" names={["Jordan Lee", "Sam Patel", "Alex Morgan"]} />
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
