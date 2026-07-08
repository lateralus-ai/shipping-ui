# Agent instructions

This repository includes playbooks for coding agents. They are plain Markdown — usable from any agent environment (Cursor, Claude Code, ChatGPT, Copilot, etc.).

## Playbooks

| Task | Document |
|------|----------|
| Fix icon visual test failures, read per-region reports, refresh Figma baselines | [docs/agent-playbooks/visual-icons-test.md](docs/agent-playbooks/visual-icons-test.md) |
| Fix sidebar visual test failures, read per-region reports, refresh Figma baselines | [docs/agent-playbooks/visual-sidebar-test.md](docs/agent-playbooks/visual-sidebar-test.md) |
| Implement Sidebar (Figma mirror, anchors, menus, layouts) | [docs/plans/sidebar-implementation.md](docs/plans/sidebar-implementation.md) |

## Conventions

- Follow [CLAUDE.md](CLAUDE.md) for TypeScript style.
- **Icons:** one React component per type (`ChatIcon`, `AttachmentIcon`, …); use the `size` prop (`large` | `small` | `xs`) to pick the path. See the visual icons playbook.
- **Sidebar:** nav rows are `<a>` where specified; `SidebarEntry` has optional `icon` + hover menu; `Account` is a dropup; Search is `SidebarAction`. See the sidebar implementation plan.
- Icon visual regression gate: **per-region only** (≤5% ink diff each). See the visual icons playbook for details.
- Sidebar visual regression gate: **per-region only** (≤5% box diff each, rectangular slot masks). See the visual sidebar playbook for details.
- Figma icon baselines and SVG re-extraction: use Figma MCP, not a personal access token.
