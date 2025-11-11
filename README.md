# Base Component

A repository that showcase the use of

- next yak as styling framework
- a box component called `Cask`
- a theming system with light and dark mode support

## Requirements

- Node 24.x
- pnpm 9.15+

## Quickstart

```bash
pnpm install
pnpm dev
```

The root `pnpm i` command installs dependencies. The development server runs on <http://localhost:4242/>.

## Agent Workflow (Local)

1. Prepare or react to state:
   pnpm agent <issueNumber>
2. Run your code agent on files in `issues/<n>-<slug>/` (edit PLAN.md, implement code, update qa.md).
3. Run `pnpm agent <n>` again to push changes, update PR, and sync feedback.
4. When maintainers add `ready-to-merge`, the script posts cost summary, cleans up `issues/**`, and merges.

See docs/CONTRIBUTING.md for details.

## Documentation (Single Source of Truth)

- [Architecture](docs/ARCHITECTURE.md)
- [Codebase overview](docs/CODEBASE_OVERVIEW.md)
- [ADR index](docs/ADR/README.md) & [ADR format](docs/ADR/0001-record-format.md)
- [API skeleton](docs/API/openapi.yaml)
- [Glossary](docs/GLOSSARY.md)

## Agent context

Provider instructions link back to the docs above:

- [Claude](CLAUDE.md)
- [GitHub Copilot](.github/copilot-instructions.md)
- [Cursor](.cursor/rules/00-start-here.md)
- [Continue](.continue/rules/00-start-here.md)
- [Windsurf](.windsurfrules)
- [Shared rules & registry](.context/INDEX.md)

## Continuous integration

GitHub Actions workflow (`.github/workflows/ci.yml`) runs lint, type-check, and unit tests on pushes and pull requests using Node 20 with cached pnpm dependencies.

## Contributing

Follow the plan-first and test-gate policies in [.context/RULES.md](.context/RULES.md). Architecture-affecting changes must include an ADR entry per [docs/ADR/0001-record-format.md](docs/ADR/0001-record-format.md).
