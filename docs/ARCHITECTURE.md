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
- Next Yak is the library that we use for styling.

## For Agents

- Treat this file and the linked SoT documents as canonical guidance—do not duplicate content in provider-specific contexts.
- When architecture shifts, update this document first, then cross-reference in [docs/ADR/README.md](./ADR/README.md) and the provider link files under `.context/`.
