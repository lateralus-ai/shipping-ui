import { ThemeProvider } from "@material-tailwind/react";
import { materialTheme } from "../src/material-theme";
import "./storybook.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider value={materialTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
