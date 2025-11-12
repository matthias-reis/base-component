# Codebase Overview

## Top-level

- `src/` — Next JS application with app router setup. Homepage lives under src/app/page.tsx.
- `docs/` — Single Source of Truth documentation (architecture, ADRs, glossary, API docs). See [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) for context.
- `.context/` — Agent-facing index and rules that link back to this documentation bundle. No unique content should exist outside `docs/`.
- `.github/` — GitHub metadata including workflows, issue templates, Copilot guidance, and CODEOWNERS.

## Application internals

- `src/app/globals.css` — Global styles and css variable definitions outside next yak
- `src/components` — design system components
- `src/cask` — Core Cask component (polymorphic container primitive) with colocated tests

Keep this file synchronized with structural changes and ensure agent context files under `.context/` refer back here for directory explanations.
