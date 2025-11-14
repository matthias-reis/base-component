# Current Task: Create Plan

- **ID**: `#9`
- **Title**: `Margin and Padding on base component`
- **Workpackage Name**: `issues/9-margin-and-padding-on-base-component`

## Task description

- Read the **Issue Summary** below and produce a detailed implementation plan.
- Write a single Markdown file: `issues/9-margin-and-padding-on-base-component/PLAN.md`.
- Include: Summary, Scope, Out-of-scope, File/dir map, Acceptance Criteria, Test Plan, Risks, Rollback, CI updates, Docs updates.
- Link to SoT docs instead of copying content.
- In case of architectural changes or added dependencies, consider an addition to the ADR and mention it in the `PLAN.md` docs update section
- Append a line to `issues/9-margin-and-padding-on-base-component/cost.md` with:
  - timestamp (UTC), provider, model, input_tokens, output_tokens, total_tokens, estUSD, headers snapshot (remaining/reset if available).
- Do **not** modify other files.
- create a local commit if possible. If not propose a commit statement including message.

## Issue Summary

__Margin and Padding on base component__

### Summary

The cask base components now should receive its first feature, configuration based margins. Generally the idea is to apply props like so `<Cask ml='xl'>content</Cask>`  and it would translate to css.

#### Available Props

Similar to e.g. mui or tailwind, we want an easy way to place the base component relative to others and to its internal content. We need:

- `p` (padding), `pl` (padding left), `pt`, `pr`, `pb`, `px` (padding inline), `py` (padding block).
- `m` (margin), `ml` (margin left), `mt`, `mr`, `mb`, `mx` (margin inline), `my` (margin block).

#### Available Values

Each of those props can be assigned with the following values.

```
  --space0: 0;
  --space: 1px;
  --spaceXXS: 2px;
  --spaceXS: 4px;
  --spaceS: 8px;
  --spaceM: 12px;
  --spaceL: 16px;
  --spaceXL: 24px;
  --spaceXXL: 32px;
  --space3XL: 48px;
  --space4XL: 68px;
  --space5XL: 92px;
  --space6XL: 122px;
```

Create those as variables inside the `global.css` and make use of them through next yak.


### Acceptance criteria

- style is applied via Next Yak. You should use the feature "mixins" (with the `css` function)
- classes are added to the components
- make sure it stays extensible
Labels: ready


