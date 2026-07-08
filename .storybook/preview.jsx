import "./storybook.css";
import { TooltipProvider } from "../src/primitives";

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200} skipDelayDuration={0}>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
