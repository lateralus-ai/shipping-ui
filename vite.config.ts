import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
      exclude: ["**/*.stories.tsx", "src/stories/**"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        theme: resolve(__dirname, "src/theme-entry.ts"),
      },
      name: "ShippingUI",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if (entryName === "theme") {
          return format === "es" ? "theme.esm.js" : "theme.cjs";
        }
        return format === "es" ? "index.esm.js" : "index.cjs";
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-textarea-autosize",
        "react-pdf",
        "react-router",
        "docx-preview",
        "docxtemplater",
        "pizzip",
        "react-hotkeys-hook",
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
