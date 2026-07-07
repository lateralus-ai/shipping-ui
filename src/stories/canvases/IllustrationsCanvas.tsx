import {
  AuditPreparationIllustration,
  CompletedTasksIllustration,
  CreationIllustration,
  InternalAuditIllustration,
  InviteIllustration,
  PortStateControlIllustration,
  ProcessingIllustration,
  QuestionsDoneIllustration,
  RightShipInspectionIllustration,
  UploadIllustration,
  WorkflowCreatedIllustration,
  WorkflowsIllustration,
} from "../../illustrations";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

const illustrations = [
  { label: "Workflows", Component: WorkflowsIllustration },
  { label: "Upload", Component: UploadIllustration },
  { label: "Processing", Component: ProcessingIllustration },
  { label: "Invite", Component: InviteIllustration },
  { label: "Creation", Component: CreationIllustration },
  { label: "Completed Tasks", Component: CompletedTasksIllustration },
  { label: "Workflow Created", Component: WorkflowCreatedIllustration },
  { label: "Audit Preparation", Component: AuditPreparationIllustration },
  { label: "Port State Control", Component: PortStateControlIllustration },
  { label: "RightShip Inspection", Component: RightShipInspectionIllustration },
  { label: "Internal Audit", Component: InternalAuditIllustration },
  { label: "Questions Done", Component: QuestionsDoneIllustration },
] as const;

export const IllustrationsCanvas = () => (
  <FigmaPage title="Illustrations" width={FIGMA_WIDTHS.illustrations}>
    <FigmaContent>
      <FigmaGrid gap={32}>
        {illustrations.map(({ label, Component }) => (
          <FigmaVariant key={label} label={label}>
            <Component className="h-32 w-40" />
          </FigmaVariant>
        ))}
      </FigmaGrid>
    </FigmaContent>
  </FigmaPage>
);
