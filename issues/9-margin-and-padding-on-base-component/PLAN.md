# Implementation Plan: Margin and Padding on Base Component

## Summary

Add a comprehensive spacing system to the Cask component, enabling margin and padding configuration through intuitive props (`m`, `ml`, `mt`, `mr`, `mb`, `mx`, `my`, `p`, `pl`, `pt`, `pr`, `pb`, `px`, `py`). The implementation will use Next Yak's `css` mixin feature for build-time CSS extraction and leverage CSS custom properties defined in `globals.css` for consistent spacing values across the design system.

## Scope

### In Scope
1. **CSS Custom Properties**: Define 13 spacing scale variables in `globals.css` (space0 through space6XL)
2. **Type System**: Create TypeScript types for spacing props with strict value constraints
3. **Utility Functions**: Build helper functions to generate CSS from spacing props
4. **Next Yak Integration**: Implement CSS mixin pattern using `css` function from Next Yak
5. **Cask Component Enhancement**: Integrate spacing props into Cask while preserving polymorphic behavior
6. **Test Coverage**: Comprehensive unit tests for spacing utilities and Cask spacing behavior
7. **Type Safety**: Ensure full TypeScript support with proper type inference

### Out of Scope
- Responsive spacing values (breakpoint-based sizing)
- Negative margin values
- Auto/inherit/initial keyword values
- Programmatic spacing calculations
- Visual regression testing
- Storybook integration
- Migration guide for existing components

## File/Directory Map

```
src/
├── app/
│   └── globals.css                    # ADD: CSS custom properties for spacing scale
├── cask/
│   ├── Cask.tsx                       # MODIFY: Add spacing props and Next Yak styling
│   ├── Cask.test.tsx                  # MODIFY: Add spacing-related tests
│   ├── spacing.ts                     # CREATE: Type definitions and utility functions
│   ├── spacing.test.ts                # CREATE: Unit tests for spacing utilities
│   └── index.ts                       # MODIFY: Export spacing types
```

## Detailed Changes

### 1. CSS Custom Properties (`src/app/globals.css`)
Add spacing scale variables to establish design system foundation:
```css
:root {
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
}
```

### 2. Spacing Type System (`src/cask/spacing.ts`)
- `SpacingValue` type: Union of valid spacing keys ('0' | '1' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl' | '6xl')
- `MarginProps` interface: 7 margin props (m, ml, mr, mt, mb, mx, my)
- `PaddingProps` interface: 7 padding props (p, pl, pr, pt, pb, px, py)
- `SpacingProps` interface: Union of margin and padding props
- `spacingValueToVar()`: Convert spacing key to CSS var reference
- `generateSpacingCSS()`: Generate CSS template literal from spacing props
- CSS ordering: m → mx/my → ml/mr/mt/mb → p → px/py → pl/pr/pt/pb (individual props override composite)

### 3. Next Yak Integration (`src/cask/Cask.tsx`)
- Import `css` function from `next-yak`
- Import spacing types and utilities from `./spacing`
- Extend Cask props with `SpacingProps`
- Extract spacing props before forwarding to underlying element
- Apply spacing styles using `css` mixin pattern
- Preserve polymorphic behavior and type safety

**Implementation Pattern:**
```tsx
import { css } from 'next-yak'
import type { SpacingProps } from './spacing'
import { generateSpacingCSS } from './spacing'

type PolymorphicProps<T extends ElementType = ElementType> = {
  as?: T
  children?: ReactNode
} & SpacingProps & ComponentProps<T>

export function Cask<T extends ElementType = 'div'>({
  as,
  children,
  m, ml, mr, mt, mb, mx, my,
  p, pl, pr, pt, pb, px, py,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div'
  const spacingProps = { m, ml, mr, mt, mb, mx, my, p, pl, pr, pt, pb, px, py }
  
  return (
    <Component 
      {...props}
      css={css`
        ${generateSpacingCSS(spacingProps)}
      `}
    >
      {children}
    </Component>
  )
}
```

### 4. Testing Strategy

#### Unit Tests (`src/cask/spacing.test.ts`)
- `spacingValueToVar()`: Correct CSS var for each spacing value
- `generateSpacingCSS()`: 
  - Single margin/padding props
  - Composite props (mx, my, px, py)
  - Override precedence (individual > composite > all)
  - Empty props object
  - All props combinations

#### Component Tests (`src/cask/Cask.test.tsx`)
New test suite: "Spacing Props"
- Single margin/padding application
- Composite props (mx, my, px, py)
- Individual props override composite
- Multiple spacing props combination
- Spacing with polymorphic rendering
- Spacing preserved with other props (className, style, event handlers)

## Acceptance Criteria

- [ ] All 13 CSS custom properties defined in `globals.css`
- [ ] Spacing types exported from `src/cask/index.ts`
- [ ] `generateSpacingCSS()` correctly handles all prop combinations
- [ ] Next Yak `css` mixin successfully applies spacing styles
- [ ] Cask maintains type safety with spacing props
- [ ] Polymorphic behavior preserved with spacing
- [ ] Unit tests achieve 100% coverage of spacing utilities
- [ ] Component tests verify spacing integration
- [ ] All existing Cask tests continue to pass
- [ ] TypeScript compilation succeeds without errors
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Test suite passes (`pnpm test`)

## Test Plan

### Pre-Implementation
```bash
pnpm typecheck  # Establish baseline
pnpm lint       # Ensure clean starting point
pnpm test       # Verify existing tests pass
```

### During Implementation
1. Create `spacing.ts` with types and utilities
2. Create `spacing.test.ts` and run: `pnpm test spacing.test.ts`
3. Update `globals.css` with CSS variables
4. Modify `Cask.tsx` with Next Yak integration
5. Update `Cask.test.tsx` with spacing tests
6. Run full test suite: `pnpm test`
7. Run type checking: `pnpm typecheck`
8. Run linting: `pnpm lint`

### Post-Implementation
```bash
pnpm test       # All tests pass
pnpm typecheck  # No type errors
pnpm lint       # No linting errors
pnpm build      # Successful production build
```

### Manual Testing
```tsx
// Test component in src/app/page.tsx
<Cask ml="xl" pt="m">Left margin XL, top padding M</Cask>
<Cask mx="l" py="s">Inline margin L, block padding S</Cask>
<Cask as="section" m="xxl" p="l">Section with all margins XXL, padding L</Cask>
```

## Risks & Mitigations

### Risk: Next Yak `css` Mixin Compatibility
**Impact**: High - Core feature dependency  
**Probability**: Low  
**Mitigation**: Next Yak 8.0.1 officially supports `css` function; verify in Card.tsx pattern; consult [Next Yak docs](https://github.com/jantimon/next-yak) if issues arise

### Risk: Type Safety with Polymorphic Props
**Impact**: Medium - Developer experience degradation  
**Probability**: Medium  
**Mitigation**: Use TypeScript 5.5+ conditional types; extensive type tests; ensure SpacingProps doesn't conflict with ComponentProps<T>

### Risk: CSS Specificity Conflicts
**Impact**: Low - Visual bugs  
**Probability**: Low  
**Mitigation**: CSS custom properties have lower specificity; inline styles override; test with className and style props

### Risk: Build Performance
**Impact**: Low - Slower builds  
**Probability**: Low  
**Mitigation**: Next Yak performs build-time extraction; minimal runtime overhead; monitor build times

## Rollback Strategy

### Immediate Rollback (if blocking issues discovered)
1. Revert PR branch to previous commit
2. Remove spacing props from Cask exports in `index.ts`
3. Delete `spacing.ts` and `spacing.test.ts`
4. Restore original `Cask.tsx` and `Cask.test.tsx`
5. Remove CSS custom properties from `globals.css`

### Partial Rollback (if spacing works but Cask integration fails)
1. Keep `spacing.ts` and CSS variables
2. Revert Cask changes
3. Document spacing system for future integration
4. Use spacing utilities in other components

### Data/State Impact
None - pure presentation feature with no data persistence

## CI/CD Updates

No CI/CD pipeline changes required. Existing quality gates cover this implementation:

- **Linting**: `pnpm lint` - catches code style issues
- **Type Checking**: `pnpm typecheck` - validates TypeScript
- **Testing**: `pnpm test` - runs unit and component tests
- **Build**: `pnpm build` - ensures production build succeeds

All gates already configured in GitHub Actions workflow.

## Documentation Updates

### Architecture Documentation
No changes required - spacing system aligns with existing architecture documented in [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md)

### ADR Creation
**Not required** - This feature is an enhancement to existing Cask component, not an architectural decision. Key rationale:
- Uses already-adopted Next Yak (ADR 0002)
- Follows established Cask patterns (ADR 0004)
- No new dependencies or architectural shifts
- CSS custom properties are standard web platform features

### Codebase Overview
**Minor update to [`docs/CODEBASE_OVERVIEW.md`](../../docs/CODEBASE_OVERVIEW.md)**:
```markdown
## Application internals
- `src/cask` — Core Cask component (polymorphic container primitive) with spacing system and colocated tests
```

### Inline Documentation
- JSDoc comments in `spacing.ts` for all exported functions/types
- JSDoc comments for new Cask spacing props
- README update showing spacing prop usage examples (optional, future enhancement)

## Implementation Order

1. **Foundation** (30 min)
   - Add CSS custom properties to `globals.css`
   - Create `spacing.ts` with types and utilities
   - Export spacing types from `index.ts`

2. **Testing** (45 min)
   - Create `spacing.test.ts` with comprehensive unit tests
   - Verify all utility functions work correctly

3. **Integration** (60 min)
   - Update `Cask.tsx` with Next Yak `css` mixin
   - Extract spacing props and apply styles
   - Ensure type safety preserved

4. **Component Testing** (45 min)
   - Add spacing test suite to `Cask.test.tsx`
   - Verify integration with polymorphic behavior
   - Test prop combinations and overrides

5. **Quality Gates** (15 min)
   - Run full test suite
   - Type checking
   - Linting
   - Production build verification

**Total Estimated Time**: ~3 hours

## Dependencies

- `next-yak@8.0.1` - Already installed (ADR 0002)
- `react@19.2.0` - Already installed
- `typescript@5.5.4` - Already installed
- No new dependencies required

## References

- [Architecture Documentation](../../docs/ARCHITECTURE.md)
- [ADR 0002: Next Yak Adoption](../../docs/ADR/0002-next-yak-adoption.md)
- [ADR 0004: Cask Component Architecture](../../docs/ADR/0004-cask-component-architecture.md)
- [Next Yak Documentation](https://github.com/jantimon/next-yak)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
