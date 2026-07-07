import {
  File,
  Folder,
  Folders,
  ListRow as LibraryListRow,
  Navigation,
} from "../../domain/Library";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const LibraryCanvas = () => (
  <FigmaPage title="Library" width={FIGMA_WIDTHS.library}>
    <FigmaContent>
      <FigmaSection label="Folder">
        <FigmaGrid gap={16}>
          <Folder />
          <Folder name="Crew documents" fileCount={12} state="selected" />
          <Folder name="Certificates" fileCount={5} state="hover" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="File">
        <FigmaGrid gap={16}>
          <File />
          <File state="uploading" />
          <File state="waiting" />
          <File state="uploaded" name="Safety certificate.pdf" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Navigation">
        <div className="max-w-xs space-y-2">
          <Navigation />
          <Navigation label="Certificates" nested="on" />
        </div>
      </FigmaSection>

      <FigmaSection label="Folders">
        <FigmaGrid gap={24}>
          <FigmaVariant label="Expanded">
            <div className="w-64">
              <Folders />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Collapsed">
            <div className="w-64">
              <Folders layout="collapsed" />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="List Row">
        <div className="max-w-xl space-y-2">
          <LibraryListRow />
          <LibraryListRow name="Safety certificate.pdf" updatedAt="Updated today" state="hover" />
        </div>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
