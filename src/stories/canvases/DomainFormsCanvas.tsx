import {
  FormCard,
  FormHeader,
  ListRow as FormListRow,
  RiskMeter,
} from "../../domain/Forms";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const DomainFormsCanvas = () => (
  <FigmaPage title="Domain Forms" width={FIGMA_WIDTHS.domainForms}>
    <FigmaContent>
      <FigmaSection label="Form Card">
        <FigmaGrid gap={24}>
          <div className="w-80">
            <FormCard />
          </div>
          <div className="w-80">
            <FormCard
              name="Safety Management"
              description="ISM Code forms"
              formCount={8}
              pendingCount={2}
              state="hover"
            />
          </div>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Form Header">
        <div className="max-w-xl">
          <FormHeader />
          <div className="mt-4">
            <FormHeader title="ISM Code checklist" status="Pending review" dueDate="Due 30 Jul 2026" />
          </div>
        </div>
      </FigmaSection>

      <FigmaSection label="List Row">
        <div className="max-w-xl space-y-2">
          <FormListRow />
          <FormListRow name="Fire safety checklist" subtitle="Last updated today" state="hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Risk Meter">
        <FigmaGrid gap={24}>
          <FigmaVariant label="High">
            <RiskMeter level="high" />
          </FigmaVariant>
          <FigmaVariant label="Medium">
            <RiskMeter level="medium" />
          </FigmaVariant>
          <FigmaVariant label="Low">
            <RiskMeter level="low" score={22} />
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
