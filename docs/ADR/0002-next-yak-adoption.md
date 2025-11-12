# ADR 0002: Next Yak Adoption

- **Status**: Accepted
- **Date**: 2025-11-12
- **Deciders**: Core maintainers
- **Related**: Architecture overhaul for styling engine

## Context

The base-component project required a CSS-in-JS styling solution to replace unstyled div containers with properly styled components. The application needed a styling engine that integrates seamlessly with Next.js 16.0.1 and React 19.2.0, while providing a developer-friendly API for creating reusable styled components.

The project's purpose is to showcase a base component called Cask and a theming system with light and dark mode support, requiring a robust styling foundation.

## Decision

We adopted **Next Yak** as the primary styling solution for the following reasons:

- **Next.js Integration**: Next Yak is specifically designed for Next.js with excellent compatibility for versions 16.0.0+
- **Performance**: Build-time CSS extraction provides optimal performance compared to runtime CSS-in-JS solutions
- **Developer Experience**: Familiar styled-components-like syntax reduces learning curve
- **React 19 Compatibility**: Full support for the project's React 19.2.0 requirement
- **TypeScript Support**: First-class TypeScript integration matches the project's tech stack

Alternatives considered and rejected:
- **styled-components**: Runtime CSS-in-JS with potential performance overhead
- **Emotion**: Similar runtime overhead concerns
- **Tailwind CSS**: Would require significant architectural changes and doesn't align with component-focused styling approach
- **CSS Modules**: Lacks the component composition benefits needed for the Cask design system

## Consequences

### Positive outcomes:
- Enables creation of styled Card components with proper encapsulation
- Provides foundation for future theming system implementation
- Improves development experience with styled-components-like API
- Ensures optimal performance through build-time CSS extraction

### Risks and tradeoffs:
- Additional build complexity through next-yak webpack plugin
- Team learning curve for Next Yak specific patterns
- Dependency on Next Yak maintenance and compatibility with future Next.js versions

### Follow-up tasks:
- All new components should use Next Yak for styling consistency
- Future theming system implementation will build on Next Yak foundation
- Component library patterns should be established using Next Yak conventions

## Implementation Notes

- Added `next-yak@8.0.1` to project dependencies
- Updated `next.config.ts` with `withYak()` wrapper for build integration
- Created initial `Card` component as proof-of-concept in `src/components/Card.tsx`
- Replaced four div containers in main page with styled Card components
- Updated architecture documentation to reflect Next Yak as primary styling engine