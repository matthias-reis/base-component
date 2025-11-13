# CurrentTask: Work on Feedback for Plan

- **ID**: `#9`
- **Title**: `Margin and Padding on base component`
- **Workpackage Name**: `issues/9-margin-and-padding-on-base-component`

## Task Description

- Read the text below, especially the "Feedback Comments" section.
- Update the existing implementation plan in `issues/9-margin-and-padding-on-base-component/PLAN.md` based on the feedback provided.
- Ensure that all relevant feedback is addressed in the updated plan.
- Append a line to `issues/9-margin-and-padding-on-base-component/cost.md` with:
  - timestamp (UTC), provider, model, input_tokens, output_tokens, total_tokens, estUSD, headers snapshot (remaining/reset if available).
- Do **not** modify other files.
- create a local commit if possible. If not propose a commit statement including message.

## Issue Summary

__Margin and Padding on base component__

### Summary

The cask base components now should receive its first feature, configuration based margins. Generally the idea is to apply props like so &lt;Cask ml=&#39;xl&#39;&gt;content and it would translate to css.

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

_No response_

### Additional context

_No response_
Labels: proposed

## Feedback Comments

__Comment on issues/9-margin-and-padding-on-base-component/PLAN.md line 42__ 
Mention the values - i.e. copy them from the task. The plan.md is supposed to be a self sufficient description of the task - so all relevant information must be in there..
__Comment on issues/9-margin-and-padding-on-base-component/PLAN.md line 44__ 
One value seems to be missing. There is a css variable called &quot;--space&quot; with 1px.

You can add it as &quot;1&quot; to the prop values. Probably you should add a table that connects the css value and the prop to make it clearer..



## Pull Request Information

- **PR ID**: `#10`
- **Title**: `agent(#9): Margin and Padding on base component`
- **State**: `open`
