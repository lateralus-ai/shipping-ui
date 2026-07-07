import { ReportIcon } from "../../icons";
import {
  Checkbox,
  Chip,
  Input,
  InputType,
  ReportInput,
} from "../../components";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaRow,
  FigmaSection,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const FormsCanvas = () => (
  <FigmaPage title="Forms" width={FIGMA_WIDTHS.forms}>
    <FigmaContent>
      <FigmaSection label="Input">
        <div className="max-w-sm space-y-4">
          <Input label="Vessel name" placeholder="Enter vessel name" />
          <Input label="IMO number" value="9876543" state="edit" />
          <Input label="Email" error="Invalid email address" />
          <Input label="Port" placeholder="Enter port" state="disabled" />
        </div>
      </FigmaSection>

      <FigmaSection label="Report Input">
        <div className="max-w-sm space-y-4">
          <ReportInput />
          <ReportInput value="Inspection findings summary..." state="edit" />
        </div>
      </FigmaSection>

      <FigmaSection label="Input Type">
        <FigmaGrid gap={16}>
          <InputType type="text" state="on" />
          <InputType type="text" state="off" />
          <InputType type="binary" state="on" />
          <InputType type="binary" state="off" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Chip">
        <FigmaGrid gap={16}>
          <Chip variant="label" label="Status" />
          <Chip variant="dot" label="Critical" dotColor="red" />
          <Chip variant="icon" label="Report" icon={<ReportIcon size="small" />} />
          <Chip variant="multiple" label="3 members" />
          <Chip
            variant="avatar"
            label="Jordan Lee"
            avatar={{ chief: "initials", initials: "JL" }}
            onRemove={() => {}}
          />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Checkbox">
        <FigmaRow label="States">
          <Checkbox label="Accept terms" />
          <Checkbox checked label="Completed" />
          <Checkbox indeterminate label="Partial selection" />
          <Checkbox disabled label="Disabled" />
        </FigmaRow>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
