import {
  GroupHeader,
  Importance,
  Progress,
  Question,
  StatusPopover,
  Task,
  TaskHeader,
  WorkflowFilters,
  WorkflowForm,
  WorkflowHeader,
  WorkflowListItem,
  WorkflowProgress,
  WorkflowRow,
} from "../../domain/Workflows";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const WorkflowsCanvas = () => (
  <FigmaPage title="Workflows" width={FIGMA_WIDTHS.workflows}>
    <FigmaContent>
      <FigmaSection label="Workflow Header">
        <FigmaGrid gap={24}>
          <div className="w-96">
            <WorkflowHeader />
          </div>
          <div className="w-96">
            <WorkflowHeader workflow="audit-preparation" variant="pending" />
          </div>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Workflow Row">
        <div className="max-w-xl space-y-2">
          <WorkflowRow />
          <WorkflowRow name="Monthly Forms" description="Recurring compliance tasks" state="hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Workflow List Item">
        <div className="max-w-xl space-y-2">
          <WorkflowListItem />
          <WorkflowListItem chief="compliance" progress="91%" hover="on" />
        </div>
      </FigmaSection>

      <FigmaSection label="Workflow Progress">
        <FigmaGrid gap={16}>
          <WorkflowProgress />
          <WorkflowProgress progress="54%" />
          <WorkflowProgress progress="100%" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Workflow Filters">
        <WorkflowFilters />
      </FigmaSection>

      <FigmaSection label="Workflow Form">
        <div className="max-w-xl space-y-2">
          <WorkflowForm />
          <WorkflowForm name="ISM checklist" state="hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Task">
        <div className="max-w-xl space-y-2">
          <Task />
          <Task status="completed" label="Review fire pump records" />
          <Task state="hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Task Header">
        <div className="max-w-xl space-y-2">
          <TaskHeader />
          <TaskHeader property="in-review" progressState="89%" />
        </div>
      </FigmaSection>

      <FigmaSection label="Question">
        <div className="max-w-xl space-y-2">
          <Question />
          <Question expanded="off" state="hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Group Header">
        <FigmaGrid gap={16}>
          <GroupHeader />
          <GroupHeader group="ai-insights" count={7} />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Progress">
        <FigmaGrid gap={16}>
          <Progress />
          <Progress state="54%" />
          <Progress state="all-done" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Importance">
        <FigmaGrid gap={16}>
          <Importance />
          <Importance importance="normal" status="approved" />
          <Importance importance="critical" status="uncompleted" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Status Popover">
        <FigmaGrid gap={24}>
          <FigmaVariant label="Pending">
            <StatusPopover />
          </FigmaVariant>
          <FigmaVariant label="Done">
            <StatusPopover state="critical-done" />
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
