import withMT from "@material-tailwind/react/utils/withMT";
import { theme } from "./src/tailwind-theme";

export default withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: theme,
  },
});
