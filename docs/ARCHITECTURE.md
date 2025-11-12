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

## Package Management

- **pnpm** is the package manager for this project
- Use `pnpm` commands instead of `npm` for all operations (install, run scripts, etc.)
- The project includes `pnpm-lock.yaml` for dependency locking

## For Agents

- Treat this file and the linked SoT documents as canonical guidance—do not duplicate content in provider-specific contexts.
- When architecture shifts, update this document first, then cross-reference in [docs/ADR/README.md](./ADR/README.md) and the provider link files under `.context/`.
