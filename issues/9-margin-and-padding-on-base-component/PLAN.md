# Implementation Plan: Margin and Padding on Base Component

## Summary

Add spacing utility props to the Cask component to enable configuration-based margins and padding. This enhancement will provide a consistent API for spacing control similar to design systems like MUI or Tailwind CSS, allowing developers to apply spacing with props like `ml='xl'`, `p='m'`, etc.

## Scope

### In Scope
- Add margin props: `m`, `ml`, `mr`, `mt`, `mb`, `mx`, `my`
- Add padding props: `p`, `pl`, `pr`, `pt`, `pb`, `px`, `py`
- Define spacing scale CSS variables in `global.css`
- Integrate with Next Yak styling system for CSS generation
- Type-safe prop interfaces with auto-completion
- Comprehensive unit tests for new functionality
- Update component documentation

### Out of Scope
- Responsive spacing props (e.g., `ml={{ xs: 's', md: 'xl' }}`)
- Negative margin values
- Custom spacing values outside the defined scale
- Integration with existing Card component (separate task)

## File/Directory Map

```
src/
├── app/
│   └── globals.css                 # ADD: CSS spacing variables
├── cask/
│   ├── Cask.tsx                   # MODIFY: Add spacing props and styling
│   ├── Cask.test.tsx              # MODIFY: Add tests for spacing functionality
│   ├── spacing.ts                 # ADD: Spacing type definitions and utilities
│   └── index.ts                   # MODIFY: Export spacing types if needed
docs/
└── ADR/
    └── 0005-spacing-system.md      # ADD: Document spacing system decisions
```

## Acceptance Criteria

1. **CSS Variables**: All spacing values defined in `global.css` as CSS custom properties with the following scale:

   | Prop Value | CSS Variable | Pixel Value |
   |------------|-------------|-------------|
   | `0`        | `--space0`   | `0`         |
   | `1`        | `--space`    | `1px`       |
   | `xxs`      | `--spaceXXS` | `2px`       |
   | `xs`       | `--spaceXS`  | `4px`       |
   | `s`        | `--spaceS`   | `8px`       |
   | `m`        | `--spaceM`   | `12px`      |
   | `l`        | `--spaceL`   | `16px`      |
   | `xl`       | `--spaceXL`  | `24px`      |
   | `xxl`      | `--spaceXXL` | `32px`      |
   | `3xl`      | `--space3XL` | `48px`      |
   | `4xl`      | `--space4XL` | `68px`      |
   | `5xl`      | `--space5XL` | `92px`      |
   | `6xl`      | `--space6XL` | `122px`     |

2. **Prop Interface**: Support all 14 spacing props (`m`, `ml`, `mr`, `mt`, `mb`, `mx`, `my`, `p`, `pl`, `pr`, `pt`, `pb`, `px`, `py`)
3. **Value Scale**: Accept 13 predefined spacing values: `0`, `1`, `xxs`, `xs`, `s`, `m`, `l`, `xl`, `xxl`, `3xl`, `4xl`, `5xl`, `6xl`
4. **Type Safety**: Full TypeScript support with intellisense for prop names and values
5. **CSS Generation**: Use Next Yak for compile-time CSS extraction
6. **Backward Compatibility**: Existing Cask functionality remains unchanged
7. **Performance**: No runtime performance impact on spacing calculations
8. **Testing**: 100% test coverage for new spacing functionality

## Test Plan

### Unit Tests
- **Prop Application**: Verify each spacing prop applies correct CSS classes/styles
- **Value Mapping**: Test all spacing scale values map to correct CSS variables
- **Combination Props**: Test combinations like `mx` + `ml` (ml should override mx-left)
- **Type Safety**: Verify TypeScript compilation for valid/invalid prop combinations
- **Backward Compatibility**: Ensure existing tests continue to pass

### Integration Tests
- **Next Yak Integration**: Verify CSS extraction works correctly in build
- **Browser Rendering**: Visual regression tests for spacing output
- **Performance**: Measure bundle size impact

### Test Files
- `src/cask/Cask.test.tsx` - Enhanced with spacing tests
- `src/cask/spacing.test.ts` - New file for spacing utility tests

## Risks

### Technical Risks
1. **Next Yak Integration Complexity**: Risk of styling conflicts or build issues
   - *Mitigation*: Start with simple CSS variable approach, research Next Yak patterns
2. **Type System Complexity**: Complex intersection types may affect DX
   - *Mitigation*: Use helper types and provide clear examples
3. **CSS Specificity Issues**: Spacing styles may conflict with existing styles
   - *Mitigation*: Use CSS custom properties, test with existing components

### Product Risks
1. **API Consistency**: Deviating from established design system patterns
   - *Mitigation*: Research MUI/Tailwind patterns, document decisions in ADR
2. **Performance Impact**: Additional props may increase bundle size
   - *Mitigation*: Measure impact, use tree-shaking friendly patterns

## Rollback Plan

1. **Git Revert**: All changes contained in feature branch, easy to revert
2. **Gradual Rollout**: New props are opt-in, existing usage unaffected
3. **CSS Variables**: Can be removed from `global.css` without breaking changes
4. **Fallback**: Component continues working without spacing props

## CI Updates

### Quality Gates
- **Type Checking**: Ensure `pnpm typecheck` passes with new prop types
- **Linting**: Verify `pnpm lint` passes with code style compliance
- **Testing**: All existing and new tests must pass via `pnpm test`
- **Build**: Successful production build via `pnpm build`

### New Tests
- Add test coverage reporting for spacing functionality
- Visual regression tests for spacing output (future enhancement)

## Documentation Updates

### ADR Updates
- **New ADR**: `docs/ADR/0005-spacing-system.md` documenting spacing design decisions
  - CSS variable approach vs styled-components
  - Next Yak integration strategy
  - API design rationale (prop naming, value scale)

### Architecture Documentation
- **Update**: `docs/ARCHITECTURE.md` - Add spacing system to Cask component section
- **Reference**: Link to spacing ADR from architecture overview

### Code Documentation
- **JSDoc**: Add comprehensive prop documentation with examples
- **TypeScript**: Detailed type definitions with value constraints
- **README**: Update component usage examples (if exists)

### No New Documentation Files
- Per project guidelines, no new README or markdown files outside ADR system
- All documentation integrated into existing structure

## Implementation Strategy

### Phase 1: Foundation
1. Define CSS variables in `global.css`
2. Create spacing type definitions
3. Update Cask component with basic spacing props

### Phase 2: Integration
1. Implement Next Yak styling integration
2. Add comprehensive test coverage
3. Verify backward compatibility

### Phase 3: Documentation
1. Write spacing system ADR
2. Update architecture documentation
3. Add inline code documentation