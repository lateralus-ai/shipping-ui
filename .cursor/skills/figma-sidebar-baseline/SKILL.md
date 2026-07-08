---
name: figma-sidebar-baseline
description: Refresh or check Figma Sidebar visual regression baselines using Figma MCP (no access token). Use when updating sidebar baselines, checking if Figma sidebar changed, or running sidebar visual tests against Figma.
---

# Figma Sidebar Baseline (MCP)

**Canonical playbook (all agents):** [docs/agent-playbooks/visual-sidebar-test.md](../../docs/agent-playbooks/visual-sidebar-test.md)

This Cursor skill is a thin pointer. The full workflow — per-region box diff gate, failure reports, baseline refresh, and fix guidance — lives in that document.

Quick commands:

```bash
npm run test:visual:sidebar                    # both subcomponents + layouts specs
npm run figma:baseline:sidebar:check           # stale check (pass --target)
npm run figma:baseline:sidebar -- --handoff scripts/.figma-sidebar-handoff.json
npm run figma:baseline:sidebar:layouts -- --url <url> --metadata scripts/.figma-sidebar-layouts-live-metadata.xml
```
