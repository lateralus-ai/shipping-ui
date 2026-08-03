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
      // Pin the emitted stylesheet name. Vite 5 derived it from the entry and
      // emitted `style.css`; Vite 6 derives it from the package name, which
      // silently renamed it to `shipping-ui.css` in 2.0.0-dev.32 while
      // `exports["./style.css"]` still pointed at `./dist/style.css`. The build
      // stayed green and the published package lost every style. The consumer
      // imports `@lateralus-ai/shipping-ui/style.css` by that name and dev.31
      // shipped it, so the filename is the contract — restore it here rather
      // than repoint the export. `scripts/check-package-exports.mjs` now fails
      // the build if any export target goes missing from the tarball again.
      cssFileName: "style",
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
        "react-pdf",
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
