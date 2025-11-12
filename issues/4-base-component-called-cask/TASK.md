# Current Task: Create Plan

- **ID**: `#4`
- **Title**: `Base Component called Cask`
- **Workpackage Name**: `issues/4-base-component-called-cask`

## Task description

- Read the **Issue Summary** below and produce a detailed implementation plan.
- Write a single Markdown file: `issues/4-base-component-called-cask/PLAN.md`.
- Include: Summary, Scope, Out-of-scope, File/dir map, Acceptance Criteria, Test Plan, Risks, Rollback, CI updates, Docs updates.
- Link to SoT docs instead of copying content.
- In case of architectural changes or added dependencies, consider an addition to the ADR and mention it in the `PLAN.md` docs update section
- Append a line to `issues/4-base-component-called-cask/cost.md` with:
  - timestamp (UTC), provider, model, input_tokens, output_tokens, total_tokens, estUSD, headers snapshot (remaining/reset if available).
- Do **not** modify other files.
- create a local commit if possible. If not propose a commit statement including message.

## Issue Summary

__Base Component called Cask__

### Summary

Now it's time for the core showcase feature. Create the first iteration of the `Cask` component,

Create this component in a separate folder `src/cask`.

What does the component do?
- it is a generic container component used instead of div or span
- in the first iteration it should allow swapping the used html tag through a prop called `as`. This is similar to a styled components feature
- fallback is a `div`
- Make sure that all features of the used tag are still applicable

Examples:
- `<Cask as='section'>foo</Cask>` would render `<section>foo</section>`
- `<Cask as='a' href='https://github.com'>To Github</Cask> would render a link to Github.

### Acceptance criteria

- folder for the component is created
- component is in there colocated with a unit test file
- unit testing in general is set up and added to the scripts and the gh action
- unit tests are covering the relevant use cases
- the component has an appropriate type
- tests, linter and typechecks are green
- architecture documentation is extended with docs on 
  - tests
  - the cask base component

### Additional context

_No response_
Labels: ready


