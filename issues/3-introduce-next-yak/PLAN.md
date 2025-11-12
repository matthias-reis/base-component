# Implementation Plan: Introduce Next Yak

**Task ID**: #3  
**Title**: Introduce Next Yak  
**Workpackage**: issues/3-introduce-next-yak

## Summary

This task involves integrating Next Yak as the styling solution for the base-component project and creating a styled Card component. The implementation will replace the existing unstyled div containers with styled Card components and update the project architecture to reflect Next Yak as the primary styling engine.

## Scope

### In Scope
- Install and configure Next Yak package
- Update Next.js configuration to include Next Yak
- Create a new Card component in `src/components/` with specified styling:
  - Grey border
  - 1rem padding
  - 1rem border radius
- Replace the four content div containers in the main page with Card components
- Update architecture documentation to reflect Next Yak integration
- Create new ADR documenting the Next Yak adoption decision

### Out of Scope
- Migration of existing CSS files
- Theme system implementation beyond basic Card styling
- Advanced Next Yak features or optimizations
- Performance testing or benchmarking

## File/Directory Map

### New Files
- `src/components/Card.tsx` - Styled Card component using Next Yak
- `docs/ADR/0002-next-yak-adoption.md` - ADR documenting styling engine choice

### Modified Files
- `package.json` - Add next-yak dependency
- `next.config.ts` - Configure Next Yak integration
- `src/app/page.tsx` - Replace div containers with Card components
- `docs/ARCHITECTURE.md` - Update styling section to mention Next Yak
- `docs/ADR/README.md` - Add new ADR to index

### Dependencies
- `next-yak@latest` - CSS-in-JS styling solution for Next.js

## Acceptance Criteria

- [ ] Next Yak is successfully installed and configured
- [ ] Card component is created with specified styling (grey border, 1rem padding, 1rem border radius)
- [ ] Page displays 4 Card components instead of plain div containers
- [ ] Application starts successfully on `npm run dev`
- [ ] Page is visually functional with styled cards
- [ ] Architecture documentation reflects Next Yak as the styling engine
- [ ] New ADR documents the Next Yak adoption decision

## Test Plan

### Manual Testing
1. **Installation Verification**
   - Verify `npm install` completes without errors
   - Check that next-yak appears in package.json dependencies

2. **Configuration Testing**
   - Ensure `npm run dev` starts without configuration errors
   - Verify Next.js builds successfully with Next Yak integration

3. **Component Testing**
   - Navigate to the homepage
   - Verify 4 Card components are visible
   - Confirm Card styling matches requirements:
     - Grey border is visible
     - 1rem padding creates appropriate inner spacing
     - 1rem border radius creates rounded corners

4. **Architecture Validation**
   - Review updated ARCHITECTURE.md for Next Yak references
   - Verify new ADR is properly formatted and indexed

### Automated Testing
- Run existing lint checks: `npm run lint`
- Ensure TypeScript compilation succeeds: `npm run build`

## Risks

### Technical Risks
- **Next.js/React Compatibility**: Next Yak requires specific versions of Next.js and React
  - *Mitigation*: Current project uses Next.js 16.0.1 and React 19.2.0, which are compatible
- **Build Configuration**: CSS-in-JS solutions can sometimes cause build issues
  - *Mitigation*: Follow official Next Yak documentation exactly; test build process thoroughly

### Project Risks
- **Learning Curve**: Team may need time to adapt to Next Yak syntax
  - *Mitigation*: Start with simple component (Card) to establish patterns

## Rollback Plan

If critical issues arise during implementation:

1. **Immediate Rollback**
   - Revert `next.config.ts` to remove Next Yak configuration
   - Remove next-yak from package.json dependencies
   - Restore original div containers in page.tsx
   - Remove Card component file

2. **Documentation Cleanup**
   - Revert ARCHITECTURE.md changes
   - Remove ADR file
   - Update ADR index

3. **Verification**
   - Ensure `npm run dev` works without Next Yak
   - Confirm original functionality is preserved

## CI Updates

No CI pipeline changes required for this implementation. Standard Next.js build and lint processes should handle Next Yak integration automatically.

## Documentation Updates

### Required Updates
1. **[docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)**
   - Update styling section to mention Next Yak as primary solution
   - Ensure consistency with existing Next Yak reference on line 5

2. **[docs/ADR/README.md](../docs/ADR/README.md)**
   - Add entry for new ADR: `0002-next-yak-adoption.md`

3. **New ADR Creation**
   - Create `docs/ADR/0002-next-yak-adoption.md` documenting the decision to adopt Next Yak
   - Follow format established in [docs/ADR/0001-record-format.md](../docs/ADR/0001-record-format.md)

### Reference Links
- [Next Yak Documentation](https://yak.js.org/docs/getting-started)
- [Existing Architecture Guide](../docs/ARCHITECTURE.md)
- [ADR Format Guide](../docs/ADR/0001-record-format.md)