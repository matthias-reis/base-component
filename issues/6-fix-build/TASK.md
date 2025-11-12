# Current Task: Create Plan

- **ID**: `#6`
- **Title**: `Fix Build`
- **Workpackage Name**: `issues/6-fix-build`

## Task description

- Read the **Issue Summary** below and produce a detailed implementation plan.
- Write a single Markdown file: `issues/6-fix-build/PLAN.md`.
- Include: Summary, Scope, Out-of-scope, File/dir map, Acceptance Criteria, Test Plan, Risks, Rollback, CI updates, Docs updates.
- Link to SoT docs instead of copying content.
- In case of architectural changes or added dependencies, consider an addition to the ADR and mention it in the `PLAN.md` docs update section
- Append a line to `issues/6-fix-build/cost.md` with:
  - timestamp (UTC), provider, model, input_tokens, output_tokens, total_tokens, estUSD, headers snapshot (remaining/reset if available).
- Do **not** modify other files.
- create a local commit if possible. If not propose a commit statement including message.

## Issue Summary

__Fix Build__

### Summary

The github pipeline is currently broken. Github does not know `pnpm`.

Output from the failing setup node step:
```
Environment details
  node: v20.19.5
  npm: 10.8.2
  yarn: 1.22.22
/home/runner/setup-pnpm/node_modules/.bin/pnpm store path --silent
/home/runner/setup-pnpm/node_modules/.bin/store/v3
Error: Some specified paths were not resolved, unable to cache dependencies.
```

### Steps to reproduce

On every ci run

### Environment details

_No response_
Labels: ready


