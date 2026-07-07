import { InformationIcon } from "../../icons";
import {
  Avatar,
  Badge,
  Callout,
  Count,
  GroupedAvatars,
  Logo,
  MenuItem,
  Switch,
  ThinkingDot,
  Tooltip,
} from "../../primitives";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaRow,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const CoreCanvas = () => (
  <FigmaPage title="Core" width={FIGMA_WIDTHS.core}>
    <FigmaContent>
      <FigmaSection label="Logo">
        <FigmaGrid gap={24}>
          <Logo chief="technical" />
          <Logo chief="compliance" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Avatar">
        <FigmaRow label="32">
          <Avatar chief="technical" size={32} />
          <Avatar chief="compliance" size={32} />
          <Avatar chief="initials" size={32} initials="AC" />
        </FigmaRow>
        <FigmaRow label="24">
          <Avatar chief="technical" size={24} />
          <Avatar chief="compliance" size={24} />
          <Avatar chief="initials" size={24} initials="JL" />
        </FigmaRow>
        <FigmaRow label="18">
          <Avatar chief="technical" size={18} />
          <Avatar chief="compliance" size={18} />
        </FigmaRow>
        <FigmaRow label="16">
          <Avatar chief="technical" size={16} />
          <Avatar chief="compliance" size={16} />
        </FigmaRow>
      </FigmaSection>

      <FigmaSection label="Grouped Avatars">
        <FigmaGrid gap={24}>
          <GroupedAvatars count={1} />
          <GroupedAvatars count={2} />
          <GroupedAvatars count={3} />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Menu Item">
        <div className="w-64 rounded-control border border-divider-primary p-1">
          <MenuItem header>Section header</MenuItem>
          <MenuItem>Edit workflow</MenuItem>
          <MenuItem className="bg-grey-100">Hover</MenuItem>
          <MenuItem destructive>Delete</MenuItem>
        </div>
      </FigmaSection>

      <FigmaSection label="Tooltip">
        <FigmaGrid gap={24}>
          <Tooltip content="Short hint">
            <span className="rounded-control border border-divider-primary px-3 py-1 text-caption-2">Hover target</span>
          </Tooltip>
          <Tooltip content="Extended hint with additional context" hint>
            <span className="rounded-control border border-divider-primary px-3 py-1 text-caption-2">Extended hint</span>
          </Tooltip>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Thinking Dot">
        <ThinkingDot />
      </FigmaSection>

      <FigmaSection label="Count">
        <FigmaGrid gap={16}>
          <Count value={3} />
          <Count value={42} />
          <Count value={120} />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Switch">
        <FigmaGrid gap={24}>
          <Switch checked={false} onChange={() => {}} />
          <Switch checked onChange={() => {}} />
          <Switch checked={false} disabled onChange={() => {}} />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Badge">
        <FigmaGrid gap={16}>
          {(["blue", "green", "red", "orange", "purple", "grey"] as const).map((color) => (
            <FigmaVariant key={color} label={color}>
              <Badge color={color}>Label</Badge>
            </FigmaVariant>
          ))}
        </FigmaGrid>
        <FigmaGrid gap={16} className="mt-4">
          <Badge color="blue" type="icon">
            <InformationIcon size="small" />
          </Badge>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Callout">
        <Callout icon={<InformationIcon size="small" />}>
          Review the latest inspection report before proceeding.
        </Callout>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
