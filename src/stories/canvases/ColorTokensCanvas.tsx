import { FigmaContent, FigmaPage } from "../_layout";
import { ColorScaleRow } from "./helpers";
import { FIGMA_WIDTHS } from "./figma-widths";

export const ColorTokensCanvas = () => (
  <FigmaPage title="Color Tokens" width={FIGMA_WIDTHS.colorTokens}>
    <FigmaContent>
      <ColorScaleRow name="grey" />
      <ColorScaleRow name="green" />
      <ColorScaleRow name="blue" />
      <ColorScaleRow name="red" />
      <ColorScaleRow name="orange" />
      <ColorScaleRow name="purple" />
    </FigmaContent>
  </FigmaPage>
);
