# @lateralus-ai/shipping-ui

AskChief design system — shared UI theme and React components for Lateralus shipping applications.

## Features

- **Design tokens** — Grey/Green/Blue/Red/Orange/Purple scales, semantic action/background/display tokens
- **Typography** — Vesterbro (headings) + Matter (body) with fallbacks
- **55+ icons** — size-specific SVGs (`large` 24px, `small` 16px, `xs` 12px)
- **Primitives** — Button, IconButton, Avatar, Badge, Switch, Tooltip, and more
- **Patterns** — Sidebar, Chat, Modal, Search compositions
- **Domain components** — Workflows, Reports, Settings, Library, Filters
- **Storybook** — Figma-mirror canvas pages for visual review
- **Playwright** — automated screenshot regression against Storybook

## Development

```bash
npm install
npm run dev          # Storybook at http://localhost:6006
npm run build        # Library build to dist/
npm run build-storybook
npm run test:visual          # Playwright visual regression (starts Storybook dev)
npm run test:visual:update   # Update screenshot baselines
```

The committed Playwright baselines under `tests/visual/storybook.spec.ts-snapshots/` are
`-chromium-win32` only, so `toHaveScreenshot` on macOS or Linux finds no baseline and writes a
new one instead of comparing. On those platforms the real gate is the three `*-figma.spec.ts`
specs, which compare against the committed Figma PNGs and are platform-independent.

`overrides.uuid` in `package.json` exists because `@storybook/addon-essentials@8` pulls
`uuid@9` transitively through `@storybook/addon-actions`, which carries GHSA advisories with no
fix on the 8.x line. Drop the override when this repo moves to Storybook 9, which no longer
ships `addon-essentials` at all.

## Storybook structure

Stories mirror the Figma file 1:1:

- **Style Guide/** — Colors, Color Tokens, Typography, Buttons matrix, Raise Levels
- **Components/** — Buttons, Icons, Core, Sidebar, Chat, Modals, Workflows, etc.

Each page has a single **Canvas** story — a fullscreen Figma-frame reproduction for screenshot comparison.

## Releases

### Stable (`latest`)

Production releases use semver on `main` and publish to npm’s `latest` tag:

```bash
npm run release
```

### Dev / nightly (v2 rebrand)

In-progress v2 work publishes as **`2.0.0-dev.0`**, **`2.0.0-dev.1`**, … under npm’s **`dev`** tag. These do **not** replace `latest`, so existing consumers on `^1.x` are unaffected.

**First v2 dev release** (bumps `1.x` → `2.0.0-dev.0`):

```bash
npm run release:dev:init
```

If npm 2FA is enabled, the build step can take long enough for a one-time password to expire. Build first, then publish with a fresh OTP:

```bash
npm run build
npm run release:dev:init:publish -- --npm.otp=123456
```

**Subsequent dev releases** (increments the dev counter):

```bash
npm run release:dev
```

Same OTP timing applies — use `release:dev:publish` after `npm run build` if needed.

For repeat publishes without OTP timing issues, create a **Granular Access Token** at [npmjs.com → Account menu → Access Tokens](https://www.npmjs.com/settings/kwstoikonomou/tokens) with publish access to `@lateralus-ai/shipping-ui` and **Bypass 2FA for automation** enabled.

**Opt in from a consumer** (e.g. shipping-ai):

```bash
npm install @lateralus-ai/shipping-ui@dev
```

Or pin an exact pre-release in `package.json`:

```json
"@lateralus-ai/shipping-ui": "2.0.0-dev.0"
```

When v2 is ready for production, run `npm run release` to publish stable **`2.0.0`** to `latest`.

## Using in your project

```bash
npm install @lateralus-ai/shipping-ui
```

### Peer dependencies

`react` and `react-dom` are peers accepting **`^18.2.0 || ^19.0.0`** — the host app owns the
single React copy. Everything else the bundle needs at runtime (`react-pdf` and the five
`@radix-ui/react-*` primitives) is a regular dependency and installs automatically. Nothing
else belongs in `dependencies`: a consumer installs every one of them, so an entry no file
under `src/` imports is pure tax. Check for importers before adding one, and drop it when the
last importer goes.

React 19 support is verified, not assumed: the Playwright canvas suite renders pixel-identically
under 18.3.1 and 19.2.8. Both are supported, but only 19 is installed in `devDependencies`, so
that is the version the visual suite actually exercises.

### Tailwind configuration

```javascript
const shippingUIConfig = require("@lateralus-ai/shipping-ui/tailwind");

module.exports = {
  ...shippingUIConfig,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@lateralus-ai/shipping-ui/**/*.{js,jsx,ts,tsx}",
  ],
};
```

### Global styles

```css
@import "@lateralus-ai/shipping-ui/style.css";
```

### Components

```tsx
import { Button, Icon, Patterns, Domain } from "@lateralus-ai/shipping-ui";

<Button hierarchy="primary">Save</Button>
<Icon name="heart" size="small" />
<Patterns.Sidebar chief="technical" collapsed={false} />
```

## License

UNLICENSED — Proprietary software
