import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["lib/**/*"],
      exclude: ["**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "ShippingUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "esm" : ""}js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@iconify/react",
        "@material-tailwind/react",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
