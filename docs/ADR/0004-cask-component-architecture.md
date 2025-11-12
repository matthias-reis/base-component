# ADR 0004: Cask Component Architecture

## Status
Accepted

## Context
The project requires a foundational design system component that can serve as a generic container, replacing the need for multiple basic HTML elements while maintaining type safety and flexibility.

## Decision
We will implement the **Cask component** as a polymorphic React component with the following architecture:

### Core Design:
- **Polymorphic typing**: Component can render as any HTML element via the `as` prop
- **Default element**: Renders as `div` when no `as` prop is provided
- **Props forwarding**: All HTML attributes are properly forwarded to the underlying element
- **Named export**: Component is exported as named export (not default) for better tree-shaking

## Rationale

### Design Principles:
1. **Flexibility**: Single component can replace multiple basic HTML containers
2. **Type Safety**: TypeScript ensures element-specific props are correctly typed
3. **Developer Experience**: Intuitive API similar to styled-components polymorphic pattern
4. **Performance**: Minimal runtime overhead with compile-time type checking

### Technical Implementation:
- **TypeScript generics**: `Cask<T extends ElementType = 'div'>` for polymorphic typing
- **Props intersection**: Combines component props with element-specific props via `ComponentProps<T>`
- **Runtime element selection**: `const Component = as || 'div'` for dynamic rendering
- **Clean API**: Simple prop spreading pattern for attribute forwarding

### File Structure:
```
src/cask/
├── index.ts          # Named export barrel
├── Cask.tsx          # Component implementation
└── Cask.test.tsx     # Comprehensive unit tests
```

### Usage Examples:
```tsx
// Default div rendering
<Cask>Content</Cask>

// Semantic HTML elements
<Cask as="section">Section content</Cask>
<Cask as="header">Header content</Cask>

// Interactive elements with proper typing
<Cask as="button" onClick={handler}>Click me</Cask>
<Cask as="a" href="https://example.com">Link</Cask>
```

### Import Pattern:
```tsx
import { Cask } from '@/src/cask'
```

## Consequences

### Positive:
- **Reduced component proliferation**: Single component handles multiple container use cases
- **Consistent API**: Uniform interface across different HTML elements
- **Type safety**: Compile-time verification of element-specific attributes
- **Tree-shaking friendly**: Named exports support better bundling optimization
- **Testable**: Clear interface enables comprehensive unit testing

### Negative:
- **Learning curve**: Team needs to understand polymorphic component patterns
- **Type complexity**: Generic types may be challenging for junior developers
- **Runtime cost**: Minimal overhead from dynamic element selection

### Design System Impact:
- **Foundation layer**: Establishes pattern for future polymorphic components
- **Styling integration**: Ready for future Next Yak styling system integration
- **Extensibility**: Architecture supports future enhancements (themes, variants)

### Testing Strategy:
- **Unit tests**: Cover default behavior, polymorphic rendering, props forwarding
- **Type tests**: Verify TypeScript type safety in various scenarios
- **Integration tests**: Ensure compatibility with Next.js build process