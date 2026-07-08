# Visual Sidebar Test — Agent Playbook

Use this playbook when fixing sidebar mismatches against the Figma baseline, refreshing baselines, or interpreting visual test failures. Plain Markdown — usable from any agent environment.

## Quick start

```bash
npm run test:visual:sidebar
```

**Pass/fail gate:** every component region must have ≤ **5%** box-pixel diff vs the Figma baseline. There is no aggregate pass/fail — one bad region fails the test.

This runs **two** specs:

| Spec | Story | Grid marker | Regions |
|------|-------|-------------|---------|
| `sidebar-figma.spec.ts` | `components-sidebar--canvas` | `[data-figma-sidebar-grid]` | 27 subcomponent slots |
| `sidebar-layouts-figma.spec.ts` | `components-sidebar-layouts--canvas` | `[data-figma-sidebar-layouts-grid]` | 14 switcher + full-sidebar symbols |

## Read failures first (do not rely on diff PNG vision)

After a run, read the machine-readable reports:

| File | Purpose |
|------|---------|
| `tests/visual/figma-baselines/sidebar-grid-failures.json` | Failed subcomponent regions — start here |
| `tests/visual/figma-baselines/sidebar-grid-report.json` | Full subcomponent report (27 regions) |
| `tests/visual/figma-baselines/sidebar-layouts-grid-failures.json` | Failed layout regions |
| `tests/visual/figma-baselines/sidebar-layouts-grid-report.json` | Full layouts report (14 regions) |

Each failed region includes:

- `label` — e.g. `sidebarEntry-hover-menu@4:1` or `sidebarLayout-technical-activity-ships-expanded@1:3`
- `x`, `y`, `width`, `height` — position in the cropped grid
- `compareMode` — always `box` for sidebar (full slot rectangle, not ink-only)
- `diffPercent`, `diffPixels`, `comparablePixels`, `shift` — comparison metrics

## Comparison vs icons

| | Icons | Sidebar |
|---|-------|---------|
| Region shape | Square symbol box (`size`) | Rectangular slot (`width` × `height`) |
| Compare mode | `ink` — dark pixels only | `box` — all pixels in slot |
| Mask coverage | Small 12–24px boxes | Full component slots (e.g. 304×40, 280×1024) |
| Whitespace | Excluded via ink filter | Included — slots are tight to component bounds |
| Top crop | **Yes** — excludes cursor row inside Content (`FIGMA_ICONS_GRID_TOP` = 297px); Storybook grid is shorter + `marginTop: -297` | **No in-content exclusion** — full Content frame is compared. Baseline crop `y: 188` only skips the **page Title** when extracting Content from a page screenshot; Storybook grid is Content-sized with **no** negative margin |

Do not copy the icons `marginTop` viewport trick to sidebar canvases. Sidebar has no cursor section to cut.

Sidebar masks are **much larger** than icons because each region covers the full Figma symbol slot, not just glyph ink.

## Component model

Sidebar lives in `src/patterns/Sidebar/`:

| Component | Role |
|-----------|------|
| `NewChat` | Primary CTA link |
| `SidebarLink` | Section nav row (`<a>`) |
| `SidebarHeading` | Section label |
| `SidebarEntry` | Conversation row + optional hover menu |
| `SidebarAction` | Non-link action (Search) |
| `CollapsibleNavGroup` | Ships group |
| `ActivityNavGroup` | Activity header + sublinks |
| `Account` | Dropup account menu |
| `Switcher` | Product/chief switcher |
| `Sidebar` | Composed shell (280px / 56px collapsed) |

Storybook canvases mirror Figma frame positions:

- `SidebarCanvas.tsx` — subcomponents from `figma-sidebar-layout.ts`
- `SidebarLayoutsCanvas.tsx` — layouts from `figma-sidebar-layouts-layout.ts`

## Fix workflow

1. Run `npm run test:visual:sidebar`.
2. Open `sidebar-grid-failures.json` and `sidebar-layouts-grid-failures.json`; work highest `diffPercent` first.
3. Map each failure to source files:

   | Symptom | Likely fix location |
   |---------|---------------------|
   | Wrong colors / typography | `sidebar-styles.ts`, `src/style.css`, Tailwind tokens |
   | Wrong spacing / size | Component + `constants.ts` (280/56 widths) |
   | Missing icon or wrong icon | `src/icons/`, component props |
   | Wrong hover/active state | Component state props in canvas + component styles |
   | Wrong grid position | `figma-sidebar-layout.ts` or `figma-sidebar-layouts-layout.ts` |
   | Full sidebar composition wrong | `Sidebar.tsx`, `SidebarLayoutsCanvas.tsx` |

4. Re-run `npm run test:visual:sidebar` until both specs report `failedRegionCount: 0`.

## Figma source

| Target | Page node | Content crop | Baseline PNG |
|--------|-----------|--------------|--------------|
| Subcomponents | `12:1258` | 400×2824 at (32, 188) | `sidebar-grid.png` |
| Layouts | `14:841` | 1368×2464 at (32, 188) | `sidebar-layouts-grid.png` |

File key: `2Up8R8hZw2eivY9crqf5dz` (AskChief Rebranded)

## Refresh Figma baseline

Use when sidebar symbols are added, removed, or restructured in Figma. **Prefer Figma MCP** — no access token required.

### Subcomponents

1. **Screenshot** — `get_screenshot` on node `12:1258`, `maxDimension` 4096.
2. **Metadata** — `get_metadata` on the same node. Save XML to `scripts/.figma-sidebar-live-metadata.xml`.
3. **Apply:**

   ```bash
   npm run figma:baseline:sidebar -- --url <screenshot-url> --metadata scripts/.figma-sidebar-live-metadata.xml
   ```

### Layouts

1. **Screenshot** — `get_screenshot` on node `14:841`, `maxDimension` 4096.
2. **Metadata** — save to `scripts/.figma-sidebar-layouts-live-metadata.xml`.
3. **Apply:**

   ```bash
   npm run figma:baseline:sidebar:layouts -- --url <screenshot-url> --metadata scripts/.figma-sidebar-layouts-live-metadata.xml
   ```

### Handoff file

```json
{
  "screenshotUrl": "<url from get_screenshot>",
  "metadataPath": "scripts/.figma-sidebar-live-metadata.xml"
}
```

```bash
npm run figma:baseline:sidebar -- --handoff scripts/.figma-sidebar-handoff.json
```

### Stale baseline check

```bash
npm run figma:baseline:sidebar:check -- --target subcomponents --metadata scripts/.figma-sidebar-live-metadata.xml
npm run figma:baseline:sidebar:check -- --target layouts --metadata scripts/.figma-sidebar-layouts-live-metadata.xml
```

`test:visual:sidebar` runs both checks automatically when live metadata files exist.

## Comparison details

- **Box mode** — compares every pixel inside each slot rectangle; ±1px shift search per region.
- **Gate** — per-region ≤5% box diff; aggregate masked diff is informational only.
- **Artifacts** (local runs, gitignored): `*-actual.png`, `*-diff.png`, `*-mask.png`, `*-report.json`, `*-failures.json`.

## Do not

- Exclude regions from the comparison mask to make tests pass.
- Lower `SIDEBAR_MAX_PER_REGION_DIFF_RATIO` (5%) or add an aggregate pass gate.
- Switch sidebar to ink-only mode — slots include backgrounds and padding that must match.
- Use diff PNG screenshots as the primary failure source — use the JSON reports.
