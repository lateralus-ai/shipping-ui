# Visual Icons Test — Agent Playbook

Use this playbook when fixing icon mismatches against the Figma baseline, refreshing baselines, or interpreting visual test failures. It is written for any coding agent (Cursor, Claude Code, ChatGPT, Copilot, etc.) — plain Markdown, no tool-specific format required.

## Quick start

```bash
npm run test:visual:icons
```

**Pass/fail gate:** every icon region must have ≤ **5%** ink-pixel diff vs the Figma baseline. There is no aggregate pass/fail — one bad region fails the test.

## Read failures first (do not rely on diff PNG vision)

After a run, read the machine-readable report:

| File | Purpose |
|------|---------|
| `tests/visual/figma-baselines/icons-grid-failures.json` | Failed regions only — start here |
| `tests/visual/figma-baselines/icons-grid-report.json` | Full report: all 149 regions sorted by diff |

Each failed region includes:

- `label` — e.g. `checkbox-large@69:1` (name-size@frameIndex:slotIndex)
- `iconName`, `iconSize`, `filled`, `kind`, `direction` — parsed slot metadata
- `x`, `y`, `size` — position in the cropped 710×1536 grid
- `diffPercent`, `diffPixels`, `inkPixels`, `shift` — comparison metrics

## Icon component model

Icons follow a **one component per type** pattern. Do not create separate React components per size.

### Standard icons (`createIcon`)

Most icons are a single component backed by one entry in `src/icons/icons-data.ts`, exported from `src/icons/generated.tsx`:

```tsx
<ChatIcon size="large" />
<AttachmentIcon size="small" />
<AddIcon size="large" filled />
```

| Prop | Type | Role |
|------|------|------|
| `size` | `IconSize` | Selects which SVG path to render |
| `filled` | `boolean` | `outline` vs `filled` path set (when the icon has both) |

`createIcon` (`src/icons/createIcon.tsx`) picks the path from `outline` or `filled` using the `size` key. If a size is missing from the data, the component returns `null`.

### Size names (source of truth: `src/icons/types.ts`)

Code uses **`large`**, **`small`**, and **`xs`** — not L/M/S literals:

| `IconSize` | Pixel box (`ICON_BOX`) | Typical Figma tier |
|------------|------------------------|--------------------|
| `large` | 24×24 | Large |
| `small` | 16×16 | Small |
| `xs` | 12×12 | Extra-small (only some icons, e.g. `tick`, `clear`) |

Not every icon has every size. Check what's defined:

- `src/icons/icons-data.ts` — committed paths
- `scripts/figma-icon-nodes.json` — Figma node IDs per icon / variant / size
- `hasIconSize`, `getOutlineSizes`, `getFilledSizes` in `src/icons/icon-sizes.ts`

### Directional icons (separate components)

`ChevronIcon` and `ArrowIcon` are not `createIcon` icons. They use `direction` plus `size`:

```tsx
<ChevronIcon size="small" direction="down" />
<ArrowIcon size="large" direction="right" />
```

Paths live in `src/icons/chevron-paths.ts` and `src/icons/arrow-paths.ts`, with node IDs under `chevron` / `arrow` in `figma-icon-nodes.json`.

### Storybook grid vs app usage

The Icons canvas (`IconsCanvas.tsx`) renders one slot per Figma frame position. Some Figma slots are **variants** (checkbox states, workflow steps) that are not yet separate `size` values — those need variant modeling in layout + data, not a new component name.

## Fix workflow

1. Run `npm run test:visual:icons`.
2. Open `icons-grid-failures.json` and work through failures highest `diffPercent` first.
3. Map each failure to source files:

   | Symptom | Likely fix location |
   |---------|---------------------|
   | Wrong SVG path / shape | Re-download from Figma → `icons-data.ts` (see below) |
   | Missing `size` or `filled` path | `figma-icon-nodes.json` + re-extract, or add slot in data |
   | Missing variant (checkbox state, workflow step) | `figma-icons-layout.ts` + `IconsCanvas.tsx` + paths in `icons-data.ts` |
   | Wrong grid position | `src/stories/canvases/figma-icons-layout.ts` |
   | Layout offset (rare; most regions align at dx=0, dy=0) | `FIGMA_ICON_RENDER_OFFSET` in `figma-icons-layout.ts` |

4. Re-run `npm run test:visual:icons` until `failedRegionCount` is 0.

## Re-download SVG paths from Figma

When a failure is a **shape mismatch** (not a missing variant or layout bug), update paths from Figma rather than hand-editing `d` attributes.

### 1. Resolve the Figma node ID

From the failure report:

- `iconName` + `iconSize` + `filled` → `scripts/figma-icon-nodes.json`
- Example: `chat`, `large`, outline → `icons.chat.outline.large` → `"9:910"`
- Example: `add`, `small`, filled → `icons.add.filled.small` → `"9:826"`
- Chevrons/arrows: use `chevron` / `arrow` sections with `direction` + `size`

If the node is missing from the manifest, add it there first (after locating the symbol in Figma metadata).

### 2. Export SVG via Figma MCP

Use Figma MCP **`download_assets`** (preferred) on the node ID(s) you need. **Do not use `FIGMA_ACCESS_TOKEN`.**

- File key: `2Up8R8hZw2eivY9crqf5dz`
- Pass the node ID(s) from the manifest (e.g. `9:910`)

Save the returned download URL(s).

### 3. Update URL map and extract

1. Put URLs in `scripts/figma-svg-urls.json` keyed by node ID:

   ```json
   {
     "9:910": "https://…",
     "97:4298": "https://…"
   }
   ```

   On first run with an empty map, `node scripts/extract-figma-icons.mjs` scaffolds this file from `figma-icon-nodes.json`.

2. Run extraction (downloads SVGs to `scripts/.figma-svgs/`, regenerates TS):

   ```bash
   node scripts/extract-figma-icons.mjs
   ```

3. Outputs:
   - `src/icons/icons-data.ts` — all `createIcon` icons
   - `src/icons/arrow-paths.ts`, `src/icons/chevron-paths.ts` — directional icons

4. Re-run `npm run test:visual:icons`.

Cached SVGs in `scripts/.figma-svgs/` are reused; delete a specific `.svg` file to force re-download for that node.

### Manual path edit (last resort)

Only edit `icons-data.ts` directly when MCP export is unavailable. Prefer re-extraction so paths stay aligned with Figma exports and the parser (`extract-figma-icons.mjs`) stays the single transform step.

## Figma source

- File key: `2Up8R8hZw2eivY9crqf5dz` (AskChief Rebranded)
- Node: `12:1251` (Icons > Content)
- Cropped comparison grid: 710×1536 from y=297 (cursor row excluded)
- Storybook story: `components-icons--canvas` (loaded via iframe in Playwright)

## Refresh Figma baseline

Use when icons are added, removed, or restructured in Figma. **Prefer Figma MCP** — no `FIGMA_ACCESS_TOKEN` required.

### Steps

1. **Screenshot** — `get_screenshot` on node `12:1251`, `maxDimension` 2048.
2. **Metadata** — `get_metadata` on the same node. Save only `<frame>…</frame>` XML to `scripts/.figma-icons-live-metadata.xml`.
3. **Handoff** — write `scripts/.figma-mcp-handoff.json`:

   ```json
   {
     "screenshotUrl": "<url from get_screenshot>",
     "metadataPath": "scripts/.figma-icons-live-metadata.xml"
   }
   ```

4. **Apply:**

   ```bash
   npm run figma:baseline:icons -- --handoff scripts/.figma-mcp-handoff.json
   ```

   Updates `tests/visual/figma-baselines/icons-grid.png`, `icons-grid.metadata.xml`, and `icons-grid.meta.json`.

### Stale baseline check

```bash
npm run figma:baseline:icons:check
```

Compares SHA-256 of live metadata vs committed baseline. `test:visual:icons` runs this automatically when live metadata exists.

### CLI without handoff file

```bash
npm run figma:baseline:icons -- --url <screenshot-url> --metadata scripts/.figma-icons-live-metadata.xml
```

## Comparison details

- **149 regions** — one per icon slot in `FIGMA_ICON_FRAMES` (`icon-comparison-regions.ts`).
- **Ink-only** — compares dark pixels inside each symbol box (12/16/24px), not frame whitespace.
- **±1px shift search** — per-region alignment tolerance before diffing.
- **Artifacts** (local runs): `icons-grid-actual.png`, `icons-grid-diff.png`, `icons-grid-mask.png`.

## Known failure patterns

| Pattern | Example labels | Cause |
|---------|----------------|-------|
| Checkbox states | `checkbox-large@69:0–4` | Five Figma states, one `CheckboxIcon` component |
| Workflow / form / approval rows | `workflow-large@45:*`, `form-large@46:*` | Variant symbols not modeled in Storybook |
| Smart variants | `ship-small`, `spinner-large` | Size or state variants differ from Figma |

These require modeling the correct variant in code, not adjusting the test mask or threshold.

## Do not

- Exclude regions from the comparison mask to make tests pass.
- Lower `MAX_PER_REGION_DIFF_RATIO` (5%) or add an aggregate pass gate.
- Use diff PNG screenshots as the primary failure source — use the JSON report.
