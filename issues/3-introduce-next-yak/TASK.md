# Current Task: Create Plan

- **ID**: `#3`
- **Title**: `Introduce Next Yak`
- **Workpackage Name**: `issues/3-introduce-next-yak`

## Task description

- Read the **Issue Summary** below and produce a detailed implementation plan.
- Write a single Markdown file: `issues/3-introduce-next-yak/PLAN.md`.
- Include: Summary, Scope, Out-of-scope, File/dir map, Acceptance Criteria, Test Plan, Risks, Rollback, CI updates, Docs updates.
- Link to SoT docs instead of copying content.
- In case of architectural changes or added dependencies, consider an addition to the ADR and mention it in the `PLAN.md` docs update section
- Append a line to `issues/3-introduce-next-yak/cost.md` with:
  - timestamp (UTC), provider, model, input_tokens, output_tokens, total_tokens, estUSD, headers snapshot (remaining/reset if available).
- Do **not** modify other files.
- create a local commit if possible. If not propose a commit statement including message.

## Issue Summary

__Introduce Next Yak__

### Summary

We are running next js together with next yak.
See the getting started guide here: https://yak.js.org/docs/getting-started

The goal now is to bring a little style as proof of work into the application.

So add next yak to the setup and create a component in the src/components folder called Card with the following styles:
- border grey
- padding to the inside 1rem
- border radius also 1rem
and then use that component on the page. Replace the containers inside the top level div with `Card`

### Acceptance criteria

- page is visible after start and shows 4 cards
- architecture guide is overhauled and mentions next yak as the style engine (new ADR)

### Additional context

_No response_
Labels: ready


