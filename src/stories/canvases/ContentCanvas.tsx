import { Button } from "../../primitives";
import {
  EmptyState,
  Entry,
  Header,
  Tab,
  Tabs,
} from "../../components";
import { WorkflowsIllustration } from "../../illustrations";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const ContentCanvas = () => (
  <FigmaPage title="Content" width={FIGMA_WIDTHS.content}>
    <FigmaContent>
      <FigmaSection label="Tab">
        <FigmaGrid gap={16}>
          <Tab label="Overview" />
          <Tab label="Tasks" state="active" />
          <Tab label="Reports" className="bg-background-hover" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Tabs">
        <div className="max-w-xl space-y-6">
          <Tabs
            items={[{ label: "All" }, { label: "Reports" }, { label: "Issues" }]}
            activeIndex={0}
            onChange={() => {}}
          />
          <Tabs
            type="pills"
            items={[{ label: "Active" }, { label: "Completed" }]}
            activeIndex={1}
            onChange={() => {}}
          />
        </div>
      </FigmaSection>

      <FigmaSection label="Header">
        <div className="max-w-xl space-y-4">
          <Header title="Fleet overview" />
          <Header
            variant="nested"
            title="Outstanding actions"
            actions={<Button hierarchy="primary">Add</Button>}
          />
        </div>
      </FigmaSection>

      <FigmaSection label="Entry">
        <div className="max-w-xl space-y-2">
          <Entry type="chat" title="Hull inspection report" subtitle="2 hours ago" meta="17" />
          <Entry type="issue" title="Critical valve malfunction" state="selected" meta="High" />
          <Entry type="chat" title="Port state control checklist" subtitle="Yesterday" className="bg-background-hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Empty State">
        <FigmaGrid gap={32}>
          <FigmaVariant label="Default">
            <div className="w-80">
              <EmptyState
                title="No workflows yet"
                description="Create your first workflow to get started."
              />
            </div>
          </FigmaVariant>
          <FigmaVariant label="With illustration">
            <div className="w-80">
              <EmptyState
                title="No reports"
                illustration={<WorkflowsIllustration className="mx-auto h-24 w-32" />}
                action={{ children: "Create report", hierarchy: "primary" }}
              />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
