# Agent instructions

This repository includes playbooks for coding agents. They are plain Markdown — usable from any agent environment (Cursor, Claude Code, ChatGPT, Copilot, etc.).

## Playbooks

| Task | Document |
|------|----------|
| Fix icon visual test failures, read per-region reports, refresh Figma baselines | [docs/agent-playbooks/visual-icons-test.md](docs/agent-playbooks/visual-icons-test.md) |

## Conventions

- Follow [CLAUDE.md](CLAUDE.md) for TypeScript style.
- **Icons:** one React component per type (`ChatIcon`, `AttachmentIcon`, …); use the `size` prop (`large` | `small` | `xs`) to pick the path. See the visual icons playbook.
- Icon visual regression gate: **per-region only** (≤5% ink diff each). See the visual icons playbook for details.
- Figma icon baselines and SVG re-extraction: use Figma MCP, not a personal access token.
