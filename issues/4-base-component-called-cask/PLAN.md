# Implementation Plan: Base Component called Cask

## Summary

Create the first iteration of a `Cask` component - a generic container component that serves as a design system primitive. The component allows swapping the underlying HTML tag through an `as` prop while maintaining all features of the target element.

## Scope

### In Scope
- Create `src/cask/` folder with colocated component and test files
- Implement `Cask` component with polymorphic `as` prop functionality
- Set up unit testing framework (Jest + React Testing Library)
- Add test scripts to package.json and GitHub Actions CI workflow
- Implement comprehensive unit tests covering:
  - Default rendering as `div`
  - Polymorphic rendering with different HTML elements
  - Props forwarding to underlying elements
  - TypeScript type safety
- Update architecture documentation for testing setup and Cask component
- Ensure all linting, type checking, and tests pass

### Out of Scope
- Styling/theming system implementation
- Integration with existing components
- Performance optimizations beyond basic implementation
- Advanced polymorphic features (complex element constraints)

## File/Directory Map

```
src/
├── cask/
│   ├── index.ts          # Barrel export
│   ├── Cask.tsx          # Main component implementation
│   └── Cask.test.tsx     # Unit tests
```

### Modified Files
- `package.json` - Add testing dependencies and scripts
- `.github/workflows/ci.yml` - Add test execution step
- `docs/ARCHITECTURE.md` - Document testing setup and Cask component
- `docs/CODEBASE_OVERVIEW.md` - Update with src/cask folder reference

### New Dependencies
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - Jest DOM matchers
- `jest` - Testing framework
- `jest-environment-jsdom` - JSDOM environment for React testing

## Acceptance Criteria

### Component Requirements
- [ ] `Cask` component renders as `div` by default
- [ ] `as` prop allows rendering as any valid HTML element
- [ ] All props are properly forwarded to the underlying element
- [ ] Component maintains TypeScript type safety with proper polymorphic typing
- [ ] Component exports are available from `src/cask/index.ts`

### Testing Requirements
- [ ] Unit testing framework is configured and functional
- [ ] Test scripts added to package.json (`test`, `test:watch`)
- [ ] GitHub Actions CI includes test execution
- [ ] Unit tests cover:
  - Default rendering behavior
  - Polymorphic rendering with various elements (`section`, `a`, `button`, etc.)
  - Props forwarding and attribute handling
  - TypeScript type checking scenarios

### Quality Gates
- [ ] All existing lint rules pass (`pnpm exec biome lint`)
- [ ] TypeScript compilation succeeds (`pnpm exec tsc --noEmit`)
- [ ] All tests pass (`pnpm test`)
- [ ] Build process succeeds (`pnpm build`)

### Documentation Requirements
- [ ] Architecture documentation updated with testing approach
- [ ] Cask component usage and design principles documented
- [ ] Codebase overview reflects new folder structure

## Test Plan

### Unit Tests
1. **Default Behavior**
   - Renders as div when no `as` prop provided
   - Accepts standard div attributes

2. **Polymorphic Behavior**
   - Renders as `section` when `as="section"`
   - Renders as `a` when `as="a"` and accepts href
   - Renders as `button` when `as="button"` and accepts onClick

3. **Props Forwarding**
   - HTML attributes are properly forwarded
   - Event handlers work correctly
   - className and style props are applied

4. **Type Safety**
   - TypeScript correctly infers element-specific props
   - Invalid prop combinations are caught at compile time

### Integration Testing
- Component integrates with Next.js build process
- Component works with Next Yak styling (future consideration)

## Risks

### Technical Risks
- **TypeScript Complexity**: Polymorphic component typing can be complex
  - *Mitigation*: Start with simple implementation, iterate based on needs
- **Testing Setup**: First-time Jest configuration with Next.js may have conflicts
  - *Mitigation*: Use Next.js recommended testing setup, follow official documentation

### Project Risks
- **Scope Creep**: Component requirements may expand during implementation
  - *Mitigation*: Stick to defined acceptance criteria, defer additional features

## Rollback Plan

If implementation fails or causes issues:
1. Remove `src/cask/` directory
2. Revert package.json changes (remove testing dependencies/scripts)
3. Revert CI workflow changes
4. Revert documentation updates
5. Ensure build and existing functionality remain intact

## CI Updates

### GitHub Actions Workflow
Add test execution step to `.github/workflows/ci.yml`:
```yaml
- name: Test
  run: pnpm test
```

### Package Scripts
Add to package.json:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "typecheck": "tsc --noEmit"
  }
}
```

## Documentation Updates

### Architecture Documentation
- Add section on testing philosophy and setup
- Document Cask component purpose and design principles
- Reference polymorphic component patterns

### Codebase Overview
- Update `src/` section to include `src/cask/` folder
- Explain component colocation strategy

### ADR Consideration
If testing framework choice requires architectural decision documentation, consider creating `docs/ADR/0003-testing-framework-adoption.md` to record Jest selection rationale.

## Implementation Notes

- Follow existing Next Yak styled-components patterns from `src/components/Card.tsx`
- Maintain consistency with project's TypeScript configuration
- Use Biome for linting and formatting consistency
- Leverage existing pnpm package management setup