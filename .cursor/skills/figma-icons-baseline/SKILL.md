---
name: figma-icons-baseline
description: Refresh or check Figma Icons visual regression baselines using Figma MCP (no access token). Use when updating icon baselines, checking if Figma icons changed, or running icons visual tests against Figma.
---

# Figma Icons Baseline (MCP)

**Canonical playbook (all agents):** [docs/agent-playbooks/visual-icons-test.md](../../docs/agent-playbooks/visual-icons-test.md)

This Cursor skill is a thin pointer. The full workflow — per-region gate, failure reports, baseline refresh, and fix guidance — lives in that document so Claude, ChatGPT, and other agents can use the same instructions.

Quick commands:

```bash
npm run test:visual:icons          # run visual test + per-region gate
npm run figma:baseline:icons:check # stale baseline check
npm run figma:baseline:icons -- --handoff scripts/.figma-mcp-handoff.json
```
