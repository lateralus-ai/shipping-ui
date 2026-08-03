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
    // Vite's default is 4096 bytes, but it base64-inlines *any* asset an entry
    // reaches transitively — and a placeholder avatar imported by a published
    // Sidebar component reached the entry twice. That put 740 KB of base64
    // JPEG (33% larger than the binary) into `dist/index.esm.js`: 55% of the
    // bundle, 544 KB gzipped in the consuming app's eager vendor chunk, on
    // ships with satellite links.
    //
    // 2048 is deliberately below the default. Nothing this package ships needs
    // to be welded into the JS; an emitted asset is a separate file the CDN and
    // the browser can cache on its own. Raising this is a decision to make a
    // consumer download the bytes whether or not the component renders.
    assetsInlineLimit: 2048,
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
