# ADR 0005: Spacing System

## Status
Accepted

## Context
The Cask component requires a spacing system to enable configuration-based margins and padding. This enhancement needs to provide a consistent API for spacing control similar to design systems like MUI or Tailwind CSS, allowing developers to apply spacing with props like `ml='xl'`, `p='m'`, etc.

## Decision
We will implement a **CSS variable-based spacing system** with the following architecture:

### Core Design:
- **CSS Variables**: 13 predefined spacing values defined in `global.css`
- **Prop Interface**: 14 spacing props covering all margin and padding directions
- **Style Injection**: Direct inline styles using CSS custom properties
- **Type Safety**: Full TypeScript support with constrained value types

## Rationale

### Design Principles:
1. **Consistency**: Unified spacing scale across the application
2. **Performance**: CSS variables enable efficient styling with minimal runtime overhead
3. **Flexibility**: Comprehensive prop API covering all spacing use cases
4. **Developer Experience**: Intuitive prop names matching industry standards
5. **Maintainability**: Centralized spacing definitions in CSS variables

### Technical Implementation:

#### CSS Variable Scale:
```css
:root {
  --space0: 0;          /* 0 */
  --space: 1px;         /* 1 */
  --spaceXXS: 2px;      /* xxs */
  --spaceXS: 4px;       /* xs */
  --spaceS: 8px;        /* s */
  --spaceM: 12px;       /* m */
  --spaceL: 16px;       /* l */
  --spaceXL: 24px;      /* xl */
  --spaceXXL: 32px;     /* xxl */
  --space3XL: 48px;     /* 3xl */
  --space4XL: 68px;     /* 4xl */
  --space5XL: 92px;     /* 5xl */
  --space6XL: 122px;    /* 6xl */
}
```

#### Prop Interface:
```tsx
interface SpacingProps {
  // Margin props
  m?: SpacingValue       // All margins
  ml?: SpacingValue      // Margin left
  mr?: SpacingValue      // Margin right
  mt?: SpacingValue      // Margin top
  mb?: SpacingValue      // Margin bottom
  mx?: SpacingValue      // Margin inline (left and right)
  my?: SpacingValue      // Margin block (top and bottom)
  
  // Padding props
  p?: SpacingValue       // All padding
  pl?: SpacingValue      // Padding left
  pr?: SpacingValue      // Padding right
  pt?: SpacingValue      // Padding top
  pb?: SpacingValue      // Padding bottom
  px?: SpacingValue      // Padding inline (left and right)
  py?: SpacingValue      // Padding block (top and bottom)
}
```

#### Value Resolution:
- **Composite Props**: `mx`, `my`, `px`, `py` set multiple directions
- **Individual Override**: `ml`, `mr`, etc. override composite props for specific directions
- **Style Merging**: Spacing styles merge with existing `style` prop, with `style` prop taking precedence

### File Structure:
```
src/cask/
├── spacing.ts         # Type definitions and utility functions
├── Cask.tsx          # Updated component with spacing integration
├── Cask.test.tsx     # Enhanced tests including spacing functionality
└── spacing.test.ts   # Dedicated spacing utility tests
```

### Usage Examples:
```tsx
// Basic spacing
<Cask m="l" p="m">Content</Cask>

// Directional spacing
<Cask ml="xl" pt="s">Content</Cask>

// Composite spacing
<Cask mx="m" py="xl">Content</Cask>

// Mixed with polymorphic rendering
<Cask as="section" p="l" mx="xl">Section content</Cask>

// Override behavior
<Cask mx="m" ml="xl">Content</Cask>  // ml overrides mx for left margin
```

## Alternative Approaches Considered

### 1. Next Yak Styled Components
**Rejected** due to complexity and potential build-time issues. The CSS variable approach provides better performance and simpler implementation.

### 2. CSS Classes
**Rejected** because it would require generating numerous utility classes and increase bundle size. CSS variables provide more flexibility.

### 3. Responsive Spacing Props
**Deferred** to future iterations. Current implementation focuses on static spacing values for initial release.

## Consequences

### Positive:
- **Zero Runtime Cost**: CSS variables resolve at browser level
- **Type Safety**: Compile-time validation of spacing values
- **Consistent API**: Familiar prop names matching industry standards
- **Backward Compatibility**: Existing Cask functionality unchanged
- **Style Prop Integration**: Seamless merging with existing inline styles
- **Performance**: No additional JavaScript execution for style calculation

### Negative:
- **CSS Variable Support**: Requires modern browser support (IE 11+)
- **Value Constraint**: Limited to predefined spacing scale
- **Debugging**: CSS variables may be less obvious in dev tools than static values

### Design System Impact:
- **Foundation**: Establishes consistent spacing system for the design system
- **Extensibility**: Easy to add new spacing values by updating CSS variables
- **Component Pattern**: Sets precedent for other spacing-aware components

### Testing Strategy:
- **Unit Tests**: Comprehensive coverage of all spacing prop combinations
- **Integration Tests**: Verify CSS variable resolution and style application
- **Type Tests**: Ensure TypeScript constraints work correctly
- **Visual Tests**: Manual verification of spacing output in development

### Migration Path:
- **Opt-in**: New spacing props are optional, existing usage unaffected
- **Gradual Adoption**: Components can be updated incrementally
- **Rollback**: CSS variables can be removed without breaking existing components