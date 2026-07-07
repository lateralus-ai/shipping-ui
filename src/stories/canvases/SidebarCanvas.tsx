import { WorkflowIcon } from "../../icons";
import {
  Account,
  Activity,
  Entry as SidebarEntry,
  Heading,
  Indicator,
  NewChat,
  Section,
  Ships,
  Switcher,
} from "../../patterns/Sidebar";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const SidebarCanvas = () => (
  <FigmaPage title="Sidebar" width={FIGMA_WIDTHS.sidebar}>
    <FigmaContent>
      <FigmaSection label="New chat">
        <FigmaGrid gap={24}>
          <div className="w-[304px]">
            <NewChat />
          </div>
          <div className="w-[304px]">
            <span className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-control bg-action-primary-hover px-2 text-caption-1 text-action-primary-on-hover">
              New chat
            </span>
          </div>
          <NewChat collapsed />
          <span className="inline-flex size-10 items-center justify-center rounded-control bg-action-primary-hover text-action-primary-on-hover">
            +
          </span>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Indicator">
        <FigmaGrid gap={24}>
          <Indicator chief="technical" />
          <Indicator chief="compliance" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Section">
        <div className="w-[304px] space-y-3">
          <Section label="Workflows" icon={<WorkflowIcon size="small" />} />
          <Section label="Workflows" icon={<WorkflowIcon size="small" />} className="bg-background-hover text-display-on-light-primary" />
          <Section label="Workflows" icon={<WorkflowIcon size="small" />} state="active" />
          <Section label="Workflows" icon={<WorkflowIcon size="small" />} collapsed />
          <Section label="Workflows" icon={<WorkflowIcon size="small" />} collapsed className="bg-background-hover" />
          <Section label="Workflows" icon={<WorkflowIcon size="small" />} collapsed state="active" />
        </div>
      </FigmaSection>

      <FigmaSection label="Heading">
        <div className="w-[304px] space-y-3">
          <Heading title="Recent" collapsed />
          <Heading title="Recent" />
          <Heading title="Recent" collapsed className="bg-background-hover" />
          <Heading title="Recent" className="bg-background-hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Entry">
        <div className="w-[304px] space-y-3">
          <SidebarEntry label="Hull inspection report review" />
          <SidebarEntry label="Hull inspection report review" className="bg-background-hover" />
          <SidebarEntry label="Hull inspection report review" state="selected" />
        </div>
      </FigmaSection>

      <FigmaSection label="Ships">
        <div className="w-[264px]">
          <Ships state="collapsed" />
          <div className="mt-4">
            <Ships state="expanded" />
          </div>
        </div>
      </FigmaSection>

      <FigmaSection label="Activity">
        <FigmaGrid gap={24}>
          <div className="w-[248px]">
            <Activity chief="technical" empty />
          </div>
          <div className="w-[248px]">
            <Activity chief="technical" />
          </div>
          <div className="w-[248px]">
            <Activity chief="compliance" />
          </div>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Account">
        <FigmaGrid gap={24}>
          <div className="w-[304px]">
            <Account />
          </div>
          <FigmaVariant label="Collapsed">
            <Account collapsed />
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Switcher">
        <FigmaGrid gap={24}>
          <Switcher chief="technical" />
          <Switcher chief="compliance" />
          <Switcher chief="technical" expanded={false} />
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
