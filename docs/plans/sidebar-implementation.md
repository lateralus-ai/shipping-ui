# Sidebar — Implementation Plan

Plain Markdown plan for building the AskChief Sidebar in `shipping-ui`. Usable by any coding agent (Cursor, Claude Code, ChatGPT, Copilot, etc.).

**Goal:** Figma-faithful Sidebar subcomponents + composed layouts in Storybook, with anchor-first navigation, built-in overflow menus, and a path to visual regression (same pattern as Icons).

---

## Success criteria

- [x] **Subcomponents canvas** mirrors Figma frame `12:1258` (464×3044) with pixel-positioned variant slots
- [x] **Layouts canvas** mirrors Figma frame `14:841` (1432×2684) — all 10 full-sidebar compositions
- [x] Nav rows use **`<a>`** where specified (native open-in-new-tab, full icon+label hit area)
- [x] **`SidebarEntry`** supports optional `icon`, hover burger menu, consumer-defined menu actions
- [x] **`SidebarAction`** for non-link rows (Search → modal)
- [x] **`Account`** is a **dropup** menu trigger (not an anchor)
- [x] **Product switcher** baked into composed `Sidebar` (not a separate public pattern)
- [x] **Collapsed mode** + tooltips in this pass
- [x] **Interactive playground** — Ships collapse, sidebar shell, chief switcher, entry menus
- [x] **`SidebarShell`** — viewport-height layout; main scrolls independently
- [ ] **shipping-ai** can adopt primitives via composition (data/routing/dialogs stay in the app)
- [x] **Visual regression infrastructure** Figma baselines + per-region box diff gate (Phase 6)
- [ ] **Pixel alignment** — fix failures until `test:visual:sidebar` passes (24/27 subcomponents, 11/14 layouts failing on first run)

---

## Figma source

File key: `2Up8R8hZw2eivY9crqf5dz` (AskChief Rebranded)

| Storybook page | Figma URL | Root node | Content node | Frame size |
|----------------|-----------|-----------|--------------|------------|
| Components / Sidebar | [12-1258](https://www.figma.com/design/2Up8R8hZw2eivY9crqf5dz/AskChief-Rebranded?node-id=12-1258) | `12:1258` | `12:1255` | 464×3044 |
| Components / Sidebar Layouts | [14-841](https://www.figma.com/design/2Up8R8hZw2eivY9crqf5dz/AskChief-Rebranded?node-id=14-841) | `14:841` | `14:840` | 1432×2684 |

Frame widths in code: `src/stories/canvases/figma-widths.ts` — `sidebar: 464`, `sidebarLayouts: 1432`.

### Subcomponents page (`12:1255` Content)

| Figma frame | Node | Variants (symbols) |
|-------------|------|-------------------|
| New chat | `14:745` | Idle/Hover × Collapsed Off/On (`14:744`, `14:746`, `1808:34090`, `1808:34094`) — 304×40 expanded, 40×40 collapsed |
| Indicator | `5464:105111` | Chief=Technical / Compliance (`5464:105110`, `5464:105112`) — 24×24 |
| Section | `91:6215` | Idle/Hover/Active × Collapsed Off/On — row 304×36, collapsed 32×32 |
| Heading | `10:1014` | Idle/Hover × Collapsed Off/On — 304×28 |
| Entry | `14:385` | Idle / Hover / Selected (`14:384`, `14:470`, `14:472`) — 304×36; hover shows More icon on right |
| Ships | `375:7423` | Collapsed header / Expanded with nested links (`375:7419`, `375:7420`) |
| Activity | `375:7490` | Chief=Technical/Compliance × Empty On/Off (`375:7556`, `375:7479`, `4263:59154`) |
| Account | `14:648` | Idle × Collapsed Off/On; Hover collapsed (`14:647`, `1808:34180`, `1808:34184`) |

**Note:** Switcher is **not** on the subcomponents page — only on Layouts.

### Layouts page (`14:840` Content)

| Figma frame | Node | Variants |
|-------------|------|----------|
| Switcher | `7467:74902` | Technical/Compliance × Expanded On/Off — 248×44 expanded, 40×32 collapsed |
| Sidebar (full) | `14:481` | 10 symbols — Chief × Activity × Ships × Collapsed |

Full sidebar symbols (`14:481`):

| Symbol | Node | Chief | Activity | Ships | Collapsed |
|--------|------|-------|----------|-------|-----------|
| | `14:283` | Technical | Off | Off | Off |
| | `1808:34039` | Technical | Off | Off | On |
| | `14:482` | Technical | On | Off | Off |
| | `290:7511` | Technical | On | On | Off |
| | `383:13479` | Technical | Off | On | Off |
| | `4263:52212` | Compliance | Off | Off | Off |
| | `4263:62271` | Compliance | Off | Off | On |
| | `4263:79734` | Compliance | On | Off | Off |
| | `4263:80529` | Compliance | On | On | Off |
| | `4263:80904` | Compliance | Off | On | Off |

Expanded sidebar width: **280px**. Collapsed: **56px**. Height: **1024px** per layout symbol.

---

## Current state

| Area | Location | Gap |
|------|----------|-----|
| Presentational pieces | `src/patterns/Sidebar/` | Mostly `<button>`, no anchor/menu split |
| Subcomponents canvas | `src/stories/canvases/SidebarCanvas.tsx` | Flex/grid, fake hover spans |
| Layouts canvas | `src/stories/canvases/SidebarLayoutsCanvas.tsx` | Approximate sizing |
| Figma layout data | — | **Missing** (`figma-sidebar-layout.ts`) |
| Dropdown primitive | — | **Missing** (only `MenuItem` styling exists) |
| Visual tests | `tests/visual/storybook.spec.ts` | Whole-page snapshots only; no Figma baseline |

---

## Component taxonomy

### Navigation primitives (`src/patterns/Sidebar/`)

| Component | Element | Purpose |
|-----------|---------|---------|
| `SidebarLink` | `<a>` | Top-level nav row (icon + label). Full row hit area minus padding. |
| `NewChat` | `<a>` | Primary CTA; unique hover styling; collapsed = 40×40 icon-only. |
| `SidebarEntry` | `<a>` + menu | Conversation/history row; optional icon; burger on hover. |
| `SidebarAction` | `<button>` | Non-route action (Search opens modal). |
| `SidebarHeading` | static | Section label (Recent, Fleet, …). |
| `CollapsibleNavGroup` | `<a>` + toggle + nested `<a>` | Ships — header navigates; chevron toggles children. |
| `ActivityNavGroup` | `<a>` + nested `<a>` | Activity header + always-visible sublinks; **no collapse**. |
| `Account` | `<button>` + dropup | Footer account row; menu opens **upward**. |
| `Sidebar` | shell | Composed sidebar: switcher, scroll region, pinned account, collapsed mode. |

**Switcher** is internal to `Sidebar` — not exported as a standalone pattern.

### Shared primitive (new)

| Component | Location | Purpose |
|-----------|----------|---------|
| `DropdownMenu` | `src/primitives/DropdownMenu.tsx` | Radix wrapper + panel styling; reuses `MenuItem`. Used by Entry (down) and Account (up). |

Add dependency: `@radix-ui/react-dropdown-menu` (shipping-ai already uses this).

---

## Interaction rules

### Row hit area

- Outer row: padding (`px-2`, `py-1.5`), `min-h-[36px]`, `rounded-control`
- **Anchor fills** icon + label (`flex-1`, truncate)
- **Menu toggle** is a **sibling `<button>`** — never nested inside the anchor
- Toggle uses `stopPropagation` so it does not navigate

### State props (Storybook + apps)

Drive states via props — do not fake hover with placeholder spans:

| Component | States |
|-----------|--------|
| `NewChat` | `idle`, `hover` (Storybook), `collapsed` |
| `SidebarLink` | `idle`, `hover`, `active`, `collapsed` |
| `SidebarEntry` | `idle`, `hover`, `selected` |
| `SidebarHeading` | `idle`, `hover`, `collapsed` |
| `CollapsibleNavGroup` | `expanded` / `collapsed` × header states |
| `Account` | `idle`, `hover`, `collapsed` |

For Storybook canvas, pass `className` or `data-state` to simulate hover/active where Figma shows distinct frames.

### Collapsed mode

| Piece | Collapsed behavior |
|-------|-------------------|
| New chat | 40×40 icon button + tooltip |
| Section / Activity / Ships | Icon-only `SidebarLink` + tooltip |
| Entry rows | Hidden (matches shipping-ai — conversations not shown when collapsed) |
| Account | 40×40 avatar; dropup still works |
| Switcher | 40×32 chief indicator |
| Shell width | 56px vs 280px expanded |

Use `Tooltip` from `src/primitives/Tooltip.tsx`.

---

## API sketches

### `SidebarEntry`

```tsx
type SidebarEntryMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  onSelect: () => void;
};

type SidebarEntryProps = {
  href: string;
  label: string;
  state?: "idle" | "selected";
  icon?: ReactNode;
  badge?: ReactNode;
  menuItems?: SidebarEntryMenuItem[];
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};
```

**DOM:**

```
group row
├── a[href] (flex-1): icon? + label
├── badge? (hidden on row hover / when menu open)
└── DropdownMenu trigger (MoreIcon, hidden until group-hover or open)
```

### `SidebarLink`

```tsx
type SidebarLinkProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  state?: "idle" | "active";
  collapsed?: boolean;
  badge?: ReactNode;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};
```

Apps wrap with React Router: `onNavigate` calls `preventDefault()` + client navigation on plain left-click; modifier keys keep native anchor behavior.

### `SidebarAction`

```tsx
type SidebarActionProps = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  collapsed?: boolean;
  active?: boolean;
};
```

### `Account`

```tsx
type AccountMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  onSelect: () => void;
};

type AccountProps = {
  name: string;
  avatar?: ReactNode;
  collapsed?: boolean;
  menuItems: AccountMenuItem[];
};
```

Dropdown `side="top"` for dropup.

### `CollapsibleNavGroup`

```tsx
type CollapsibleNavGroupProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  children: ReactNode; // nested SidebarLink or SidebarEntry rows
};
```

### `ActivityNavGroup`

```tsx
type ActivityNavGroupProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  chief: "technical" | "compliance";
  empty?: boolean;
  children: ReactNode; // always visible sublinks
};
```

### `Sidebar`

```tsx
type SidebarProps = {
  chief?: "technical" | "compliance";
  activity?: boolean;
  ships?: boolean;
  collapsed?: boolean;
  className?: string;
  // Storybook: placeholder data only
  // Apps: compose with real hrefs/menuItems via slots or dedicated app wrapper
};
```

Consider slot props (`renderEntries`, `menuItems`) for app integration without pulling routing into the design system.

---

## shipping-ai mapping

shipping-ai (`c:\Projects\shipping-ai\client\src\components\Nav\`) does **not** use shipping-ui Sidebar today. Target migration:

| shipping-ai | shipping-ui primitive |
|-------------|---------------------|
| `NavLink` | `SidebarLink` |
| `NewConvo` | `NewChat` |
| `SubNavConvoLink` | `SidebarEntry` (+ app-owned dialogs) |
| `NavButton` (Search) | `SidebarAction` |
| `AccordionNavLink` + `SubShipLink` | `CollapsibleNavGroup` |
| Activity `NavLink` + convo list | `ActivityNavGroup` |
| `AccountSettings` | `Account` (+ app-owned menu items) |
| `SideContainer` + product buttons | Baked into `Sidebar` switcher |
| Collapse / tooltips / Recoil state | App shell; design system provides `collapsed` + `Tooltip` |

**Stays in shipping-ai:** React Query data, feature flags, rename/delete/archive dialogs, agent-step navigation guard, mobile overlay nav.

Reference files:

- `NavCollapsible.tsx` — full desktop composition
- `SubNavConvoLink.tsx` — entry + menu (today `div[role=button]`)
- `NavDropdownMenu.tsx` — hover-reveal more button
- `AccordionNavLink.tsx` — split link + chevron
- `AccountSettings.tsx` — dropup menu

---

## Implementation phases

### Phase 1 — Figma layout extraction

**Deliverables:**

- `src/stories/canvases/figma-sidebar-layout.ts` — subcomponent frame positions from `12:1255`
- `src/stories/canvases/figma-sidebar-layouts-layout.ts` — switcher + 10 sidebar symbols from `14:840` / `14:481`
- Optional: `scripts/.figma-sidebar-live-metadata.xml` via Figma MCP `get_metadata`

**Process (mirror icons):**

1. MCP `get_metadata` on `12:1258` and `14:841`
2. Record `(x, y, width, height)` per variant symbol
3. Note any render offset (compare screenshot vs layout; icons used `translate(-1px,-1px)`)

### Phase 2 — Dropdown primitive

**Deliverables:**

- `src/primitives/DropdownMenu.tsx` + export from `src/primitives/index.ts`
- `@radix-ui/react-dropdown-menu` in `package.json`
- Storybook example on Core canvas (optional)

**Panel styling:** match Figma / existing `MenuItem` tokens (`rounded-control`, `shadow-raise2`, `border-divider-primary`).

### Phase 3 — Refactor Sidebar primitives

**Files to update/create in `src/patterns/Sidebar/`:**

| File | Action |
|------|--------|
| `Entry.tsx` | Replace → `SidebarEntry.tsx` (anchor + menu + optional icon) |
| `Section.tsx` | Replace → `SidebarLink.tsx` |
| `NewChat.tsx` | Render as `<a>`, distinct hover tokens |
| `Activity.tsx` | Replace → `ActivityNavGroup.tsx` |
| `Ships.tsx` | Replace → `CollapsibleNavGroup.tsx` |
| `Account.tsx` | Dropup menu + `menuItems` prop |
| `Heading.tsx` | Rename/refine → `SidebarHeading.tsx` |
| `SidebarAction.tsx` | **New** |
| `Sidebar.tsx` | Wire switcher, groups, collapsed, pinned account |
| `Indicator.tsx` | Keep for switcher collapsed state or merge into Switcher internal |
| `index.ts` | Update exports |

Delete or deprecate unused pieces after composed sidebar matches Figma.

### Phase 4 — Figma-mirror Storybook canvases

**Deliverables:**

- `SidebarCanvas.tsx` — absolute-positioned grid, `data-figma-sidebar-grid`, crop wrapper like Icons
- `SidebarLayoutsCanvas.tsx` — 10 layout symbols at Figma coordinates
- Remove fake hover `<span>` placeholders; use real component states

**Stories (unchanged IDs):**

- `components-sidebar--canvas`
- `components-sidebar-layouts--canvas`

### Phase 5 — Collapsed mode + tooltips

- Pass `collapsed` through all row components
- Icon-only + `Tooltip` for New chat, Section links, Action, Account
- Verify against Figma collapsed symbols (`1808:34039`, `4263:62271`, etc.)

### Phase 6 — Visual regression ✅ (infrastructure)

Mirror icons pipeline — **implemented**:

| Artifact | Path |
|----------|------|
| Baseline PNG | `tests/visual/figma-baselines/sidebar-grid.png` |
| Layouts baseline | `tests/visual/figma-baselines/sidebar-layouts-grid.png` |
| Specs | `sidebar-figma.spec.ts`, `sidebar-layouts-figma.spec.ts` |
| Regions helpers | `sidebar-comparison-regions.ts`, `sidebar-layouts-comparison-regions.ts` |
| Compare helper | `compare-images.ts` — `compareFigmaRegions` with `box` mode |
| Baseline script | `scripts/figma-sidebar-baseline.mjs` |
| Config | `tests/visual/figma.config.ts` |
| npm script | `test:visual:sidebar` |
| Agent playbook | `docs/agent-playbooks/visual-sidebar-test.md` |
| Cursor skill | `.cursor/skills/figma-sidebar-baseline/SKILL.md` |

Gate: **per-region ≤5% box diff** (rectangular slot masks, not ink-only). First run: 24/27 subcomponents + 11/14 layouts failing — use `*-failures.json` to fix pixels.

---

## File checklist (summary)

```
src/stories/canvases/
  figma-sidebar-layout.ts          [Phase 1]
  figma-sidebar-layouts-layout.ts  [Phase 1]
  SidebarCanvas.tsx                [Phase 4]
  SidebarLayoutsCanvas.tsx         [Phase 4]

src/patterns/Sidebar/
  SidebarLink.tsx                  [Phase 3]
  SidebarEntry.tsx                 [Phase 3]
  SidebarAction.tsx                [Phase 3]
  SidebarHeading.tsx               [Phase 3]
  CollapsibleNavGroup.tsx          [Phase 3]
  ActivityNavGroup.tsx             [Phase 3]
  NewChat.tsx                      [Phase 3]
  Account.tsx                      [Phase 3]
  Sidebar.tsx                      [Phase 3–5]
  index.ts                         [Phase 3]

src/primitives/
  DropdownMenu.tsx                 [Phase 2]

tests/visual/                      [Phase 6]
scripts/figma-sidebar-baseline.mjs [Phase 6]
docs/agent-playbooks/visual-sidebar-test.md [Phase 6]
```

---

## Do not

- Use `<button>` for rows that must be anchors (Entry, Section, New chat, nested ship links)
- Nest menu triggers inside `<a>` tags
- Put routing, React Query, or dialog logic inside design-system components
- Exclude Figma variant slots from the canvas to make layout easier
- Skip collapsed mode in the first delivery

---

## Suggested execution order

```
Phase 1 (layout TS)
    → Phase 2 (DropdownMenu)
    → Phase 3 (primitives)
    → Phase 4 (canvases)
    → Phase 5 (collapsed + tooltips)
    → Phase 6 (visual tests)
    → shipping-ai adoption (separate PR in shipping-ai)
```

Start Phase 1 with Figma MCP metadata on nodes `12:1258` and `14:841`.

---

## Phase 7 — Interactive playground & app shell ✅

**Deliverables:**

- `SidebarPlayground` + Storybook **Playground** story (controls: chief, activity, ships, collapsed)
- `SidebarShell` — `100dvh` flex row; sidebar `h-full`; main `overflow-auto`
- `Sidebar` scroll anatomy: Switcher + New chat pinned top; Account pinned bottom; nav scrolls
- Chief switcher interactive via `onChiefChange` on `Switcher`
- Demo entry menus (`Example one`, `Example two`) in playground for ship/activity rows with badges
- Minimal flush-right scrollbar (`.sidebar-scroll` in `src/style.css`)

**Visual regression:** `Canvas` stories keep `presentation={true}` — unchanged pixel grids.

---

## Phase 8 — shipping-ai migration (separate PR)

### Desktop

Replace `NavCollapsible` + `SideContainer` + collapsed `fixed` hack with:

```tsx
<SidebarShell bannerOffset={bannerHeight} sidebar={<AppSidebar />}>
  <Outlet />
</SidebarShell>
```

`AppSidebar` wraps shipping-ui `Sidebar` with app data:

| App concern | Where it lives |
|-------------|----------------|
| React Query (ships, convos) | `AppSidebar` |
| React Router `href` / `onNavigate` | `AppSidebar` |
| Feature flags (search, defect reports) | `AppSidebar` |
| Rename/delete/archive menu actions | `SidebarEntry` `menuItems` from app |
| Collapse state (Recoil) | `AppSidebar` controlled `collapsed` + `onToggleCollapsed` via Account |
| Agent-step navigation guard | App shell |

**Do not port:** `position: fixed` when collapsed, `md:ml-16` compensation, or separate `SideContainer` rail — width transition inside `SidebarShell` is enough.

### Mobile (future — Phase 9)

shipping-ai today uses **`NavCollapsibleMobile`**: overlay drawer, hamburger trigger, click-away + route change closes. **Not** the collapsed desktop rail.

**Do not** fold mobile into `Sidebar` or `SidebarShell` in the first migration.

Future primitive (shipping-ui):

```tsx
<SidebarDrawer open={isNavOpen} onOpenChange={setIsNavOpen} sidebar={<AppSidebar />}>
  {children}
</SidebarDrawer>
```

Until then, keep existing mobile nav in shipping-ai or hide desktop sidebar below breakpoint and retain overlay pattern.

Reference: `shipping-ai/client/src/components/Nav/NavCollapsibleMobile.tsx`, `Root.tsx` (`isSmallScreen` branch).

---

## Scrollbar styling (shipping-ai reference)

shipping-ai (`client/src/style.css` + `NavCollapsible.tsx`):

- Global webkit thumb: `width: 0.5rem`, `rgba(0,0,0,0.1)`, track transparent
- Nav scroll container: `-mr-2 overflow-y-auto pr-2` so thumb sits flush on the right
- `scrollbar-transparent` class hides thumb until the scroll region is hovered

shipping-ui equivalent: `.sidebar-scroll` on the nav region + negative margin matching aside padding (`-mr-4 pr-4` expanded, `-mr-2 pr-2` collapsed).
