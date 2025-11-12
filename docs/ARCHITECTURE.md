# Architecture

## Overview

- Primary stack: Next JS. Styling provided by Next Yak
- Source lives under `src/` with routing, entry points, and tests colocated to streamline focus on front-end agent UX.
- Documentation is centralized here under `docs/`; see [CODEBASE_OVERVIEW.md](./CODEBASE_OVERVIEW.md) for directory-level details and [ADR index](./ADR/README.md) for decision history.

## Purpose

This repo is supposed to host a showcase for two features

- a base component called Cask that can act as a design system primitive
- a theming system with light and dark mode support

## Frontend

- Next JS handles basic app bootstrapping and serves only one single page
- Next Yak is the CSS-in-JS styling library that provides build-time CSS extraction and styled-components-like API

## Testing

- **Vitest** is the testing framework for unit and component tests
- **React Testing Library** provides testing utilities for React components
- **JSDOM** environment enables DOM testing without a browser
- Tests are colocated with components following the pattern `Component.test.tsx`
- Quality gates include linting, type checking, testing, and building
- CI/CD pipeline runs all quality gates on every pull request

### Test Commands
- `pnpm test` - Run all tests once
- `pnpm test:watch` - Run tests in watch mode
- `pnpm typecheck` - Run TypeScript type checking

## Package Management

- **pnpm** is the package manager for this project
- Use `pnpm` commands instead of `npm` for all operations (install, run scripts, etc.)
- The project includes `pnpm-lock.yaml` for dependency locking

## Components

### Cask Component
The Cask component serves as a foundational design system primitive with the following characteristics:

- **Polymorphic**: Can render as any HTML element via the `as` prop
- **Type-safe**: Full TypeScript support with element-specific prop inference
- **Flexible**: Replaces basic container elements (`div`, `span`, etc.) with a single component
- **Default behavior**: Renders as `div` when no `as` prop is specified
- **Props forwarding**: All HTML attributes are properly forwarded to the underlying element

#### Usage
```tsx
import { Cask } from '@/src/cask'

// Default div
<Cask>Content</Cask>

// Semantic elements
<Cask as="section">Section content</Cask>
<Cask as="header">Header content</Cask>

// Interactive elements with proper typing
<Cask as="button" onClick={handler}>Click me</Cask>
<Cask as="a" href="https://example.com">Link</Cask>
```

See [ADR 0004](./ADR/0004-cask-component-architecture.md) for detailed design decisions.

## For Agents

- Treat this file and the linked SoT documents as canonical guidance—do not duplicate content in provider-specific contexts.
- When architecture shifts, update this document first, then cross-reference in [docs/ADR/README.md](./ADR/README.md) and the provider link files under `.context/`.
