import { Badge, Button, IconButton, Avatar } from "../../primitives";
import {
  EmptyState,
  Entry,
  Header,
  PageHeader,
  ScrollableList,
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components";
import { FormsIcon, MoreIcon, ShipIcon, TickIcon } from "../../icons";
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

type DemoRow = {
  title: string;
  assignee?: string;
  unassigned?: boolean;
  signatures?: number[];
  date: string;
  vessel: string;
  initials: string;
  avatarClassName: string;
};

const DEMO_ROWS: DemoRow[] = [
  {
    title: "Cargo Tank Cleaning for Grade Change",
    assignee: "Dimitris Konstantinou",
    signatures: [1, 2, 3],
    date: "23/04/2026",
    vessel: "The Coral Explorer",
    initials: "MS",
    avatarClassName: "bg-purple-500 text-white",
  },
  {
    title: "Hot Work in Engine Room",
    assignee: "Dimitris Konstantinou",
    signatures: [1, 2, 3],
    date: "23/04/2026",
    vessel: "Ocean Voyager",
    initials: "PO",
    avatarClassName: "bg-blue-700 text-white",
  },
  {
    title: "Enclosed Space Entry in Ballast Tank",
    assignee: "Yiannis Papadopoulos",
    signatures: [1],
    date: "23/04/2026",
    vessel: "Ocean Voyager",
    initials: "PO",
    avatarClassName: "bg-blue-700 text-white",
  },
  {
    title: "Working at Height on Deck Crane",
    assignee: "Yiannis Papadopoulos",
    date: "23/04/2026",
    vessel: "Albatross Wind",
    initials: "LD",
    avatarClassName: "bg-grey-700 text-white",
  },
  {
    title: "Electrical Isolation for Switchboard Maintenance",
    assignee: "Dimitris Konstantinou",
    signatures: [1, 2, 3],
    date: "23/04/2026",
    vessel: "The Coral Explorer",
    initials: "MS",
    avatarClassName: "bg-purple-500 text-white",
  },
  {
    title: "Pilot Ladder Rigging in High Swell",
    unassigned: true,
    date: "23/04/2026",
    vessel: "Albatross Wind",
    initials: "",
    avatarClassName: "",
  },
];

function DemoListRow({ row }: { row: DemoRow }) {
  return (
    <div className="flex h-12 w-full shrink-0 items-center gap-2 rounded-lg p-2">
      <FormsIcon size="large" className="shrink-0 text-display-on-light-primary" />
      <div className="flex min-w-0 flex-1 items-center gap-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <p className="shrink-0 truncate text-body text-display-on-light-primary">
            {row.title}
          </p>
          <div className="flex shrink-0 items-start gap-1">
            {row.unassigned ? (
              <Badge color="red">Unassigned</Badge>
            ) : row.assignee ? (
              <Badge color="grey">{row.assignee}</Badge>
            ) : null}
            {row.signatures?.map((n) => (
              <Badge key={n} color="orange" type="icon">
                {n}
              </Badge>
            ))}
          </div>
        </div>
        <div className="w-[90px] shrink-0 text-caption-2 text-display-on-light-secondary">
          {row.date}
        </div>
        <div className="w-[150px] shrink-0 truncate text-caption-2 text-display-on-light-secondary">
          {row.vessel}
        </div>
        {row.initials ? (
          <Avatar
            chief="initials"
            size={24}
            initials={row.initials}
            className={row.avatarClassName}
          />
        ) : (
          <span className="size-6 shrink-0" aria-hidden />
        )}
      </div>
    </div>
  );
}


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

      <FigmaSection label="ScrollableList (Table)">
        <FigmaVariant label="Column header + scrolling body">
          <div className="flex h-[420px] w-full max-w-[960px] flex-col">
            <ScrollableList>
              <ScrollableList.Header>
                <span className="min-w-0 flex-1">Title</span>
                <span className="w-[90px] shrink-0">Date</span>
                <span className="w-[210px] shrink-0">Vessel</span>
              </ScrollableList.Header>
              <ScrollableList.Body>
                {DEMO_ROWS.map((row) => (
                  <DemoListRow key={row.title} row={row} />
                ))}
              </ScrollableList.Body>
            </ScrollableList>
          </div>
        </FigmaVariant>
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
