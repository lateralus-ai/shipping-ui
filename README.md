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

## Storybook structure

Stories mirror the Figma file 1:1:

- **Style Guide/** — Colors, Color Tokens, Typography, Buttons matrix, Raise Levels
- **Components/** — Buttons, Icons, Core, Sidebar, Chat, Modals, Workflows, etc.

Each page has a single **Canvas** story — a fullscreen Figma-frame reproduction for screenshot comparison.

## Using in your project

```bash
npm install @lateralus-ai/shipping-ui
```

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
