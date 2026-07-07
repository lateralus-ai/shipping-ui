import { EquipmentRow, MemberRow, SettingRow } from "../../domain/Settings";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const SettingsCanvas = () => (
  <FigmaPage title="Settings" width={FIGMA_WIDTHS.settings}>
    <FigmaContent>
      <FigmaSection label="Setting Row">
        <div className="max-w-xl space-y-2">
          <SettingRow />
          <SettingRow variant="user" label="Jane Doe" subtitle="Admin" state="selected" />
          <SettingRow state="hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Member Row">
        <div className="max-w-xl space-y-2">
          <MemberRow />
          <MemberRow name="Sam Patel" role="Captain" action="button" />
          <MemberRow name="Alex Morgan" role="Chief Engineer" state="hover" />
        </div>
      </FigmaSection>

      <FigmaSection label="Equipment Row">
        <FigmaGrid gap={16}>
          <div className="w-96">
            <EquipmentRow />
          </div>
          <div className="w-96">
            <EquipmentRow name="Auxiliary engine" type="Wärtsilä 6L20" editable="off" />
          </div>
        </FigmaGrid>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
