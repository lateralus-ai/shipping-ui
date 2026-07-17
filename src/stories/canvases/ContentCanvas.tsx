import { Badge, Button, IconButton } from "../../primitives";
import {
  EmptyState,
  Entry,
  Header,
  PageHeader,
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components";
import { MoreIcon, ShipIcon, TickIcon } from "../../icons";
import { WorkflowsIllustration } from "../../illustrations";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

const demoActions = (
  <>
    <Button hierarchy="secondary">Button</Button>
    <IconButton hierarchy="tertiary" size="small" aria-label="More">
      <MoreIcon size="small" />
    </IconButton>
  </>
);

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
        <div className="max-w-xl space-y-8">
          <FigmaVariant label="Underline">
            <Tabs defaultValue="all" type="tabs">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="issues">Issues</TabsTrigger>
              </TabsList>
              <TabsContent
                value="all"
                className="pt-3 text-caption-2 text-display-on-light-secondary"
              >
                All content
              </TabsContent>
              <TabsContent
                value="reports"
                className="pt-3 text-caption-2 text-display-on-light-secondary"
              >
                Reports content
              </TabsContent>
              <TabsContent
                value="issues"
                className="pt-3 text-caption-2 text-display-on-light-secondary"
              >
                Issues content
              </TabsContent>
            </Tabs>
          </FigmaVariant>
          <FigmaVariant label="Pills · soft">
            <Tabs defaultValue="active" type="pills" appearance="soft">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                  <Badge color="blue">3</Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="active"
                className="pt-3 text-caption-2 text-display-on-light-secondary"
              >
                Active content
              </TabsContent>
              <TabsContent
                value="completed"
                className="pt-3 text-caption-2 text-display-on-light-secondary"
              >
                Completed content
              </TabsContent>
            </Tabs>
          </FigmaVariant>
          <FigmaVariant label="Pills · solid">
            <Tabs defaultValue="chat" type="pills" appearance="solid">
              <TabsList>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="questions">
                  Questions
                  <Badge color="grey">208</Badge>
                </TabsTrigger>
                <TabsTrigger value="review">
                  Review
                  <Badge color="green" type="icon">
                    <TickIcon size="xs" />
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="gaps">
                  Gaps
                  <Badge color="grey">47</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </FigmaVariant>
        </div>
      </FigmaSection>

      <FigmaSection label="PageHeader">
        <div className="max-w-[1120px] space-y-8">
          <FigmaVariant label="Standard">
            <PageHeader
              icon={<ShipIcon size="large" />}
              title="Title"
              actions={demoActions}
            />
          </FigmaVariant>
          <FigmaVariant label="Nested">
            <PageHeader
              icon={<ShipIcon size="large" />}
              title="Title"
              crumbs={[{ label: "Parent", href: "#parent" }]}
              actions={demoActions}
            />
          </FigmaVariant>
          <FigmaVariant label="Shell (pinned header)">
            <div className="h-64 overflow-hidden rounded-control border border-divider-primary">
              <PageHeader.Shell className="bg-background-primary p-4">
                <PageHeader
                  icon={<ShipIcon size="large" />}
                  title="Fleet"
                  crumbs={[{ label: "Ships", href: "#ships" }]}
                  actions={demoActions}
                />
                <PageHeader.Body className="mt-4 space-y-2 text-caption-2 text-display-on-light-secondary">
                  {Array.from({ length: 20 }, (_, i) => (
                    <p key={i}>Scrollable body line {i + 1}</p>
                  ))}
                </PageHeader.Body>
              </PageHeader.Shell>
            </div>
          </FigmaVariant>
        </div>
      </FigmaSection>

      <FigmaSection label="Header (legacy)">
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
          <Entry
            variant="chat"
            title="Hull inspection report"
            subtitle="We’ve got a persistent oil leak from the fuel pump."
          />
          <Entry
            variant="chat"
            state="active"
            title="Ballast Pump Not Starting"
            subtitle="The fuel pump won’t start consistently."
            trailing={
              <span className="text-display-on-light-secondary">···</span>
            }
          />
          <Entry
            variant="issue"
            title="Excessive Rust on Fuel Pump"
            subtitle="Created by Jake Silva on March 28"
            count={3}
          />
          <Entry
            variant="report"
            title="Engine Room Oil Leak"
            subtitle="We’ve spotted a steady oil leak near the fuel pump."
          />
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
                illustration={
                  <WorkflowsIllustration className="mx-auto h-24 w-32" />
                }
                action={{ children: "Create report", hierarchy: "primary" }}
              />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
