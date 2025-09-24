# @lateralus-ai/shipping-ui

Shared UI theme and design system for Lateralus shipping applications.

## Features

- Material Tailwind theme configuration
- Custom color palette (Gray, Green, Blue, Red, Orange)
- Typography styles (subheader, body, caption, footnote variations)
- CSS variables for theming
- Light/Dark mode support
- Storybook for component documentation

## Development

### Setup

```bash
npm install
```

### Run Storybook

```bash
npm run dev
# or
npm run storybook
```

Storybook will be available at http://localhost:6006

### Build Storybook

```bash
npm run build
# or
npm run build-storybook
```

## Using the Theme in Your Project

### 1. Install the package (when published)

```bash
npm install @lateralus-ai/shipping-ui
```

### 2. Import the Tailwind configuration

In your `tailwind.config.js`:

```javascript
const shippingUIConfig = require('@lateralus-ai/shipping-ui/tailwind');

module.exports = shippingUIConfig;
```

Or extend it:

```javascript
const shippingUIConfig = require('@lateralus-ai/shipping-ui/tailwind');

module.exports = {
  ...shippingUIConfig,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@lateralus-ai/shipping-ui/**/*.{js,jsx,ts,tsx}",
  ],
  // Your additional configuration
};
```

### 3. Import the global styles

In your main CSS file:

```css
@import '@lateralus-ai/shipping-ui/css';
```

## Theme Structure

### Typography Classes

- `text-subheader` / `text-subheader-em` - 18px/28px
- `text-body` / `text-body-em` - 16px/28px
- `text-caption-1` / `text-caption-1-em` - 16px/22px
- `text-caption-2` / `text-caption-2-em` - 14px/20px
- `text-footnote` / `text-footnote-em` - 13px/17px

### Color Palette

- Gray: 50-900
- Green: 50-900 (primary brand color)
- Blue: 50-900
- Red: 50-900
- Orange: 50-900
- Brand Purple: #ab68ff

### Font Families

- Sans: Work Sans
- Mono: Roboto Mono
- Signature: Cursive fonts for signatures

## License

UNLICENSED - Proprietary software