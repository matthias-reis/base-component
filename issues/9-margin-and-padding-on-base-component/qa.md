# QA Checklist: Spacing System

## Manual Testing Steps

### 1. Start Development Server
```bash
pnpm dev
```
Navigate to http://localhost:4242

### 2. Visual Verification - Single Margin Props
Open browser DevTools (Elements/Inspector tab) and verify CSS variables are applied:

**Test Case: Margin Left**
- Add to page.tsx: `<Cask ml="xl">Left margin XL</Cask>`
- Inspect element and verify `margin-left: var(--spaceXL)` is applied
- Verify value resolves to 24px

**Test Case: Margin Top**
- Add to page.tsx: `<Cask mt="m">Top margin M</Cask>`
- Inspect element and verify `margin-top: var(--spaceM)` is applied
- Verify value resolves to 12px

**Test Case: Margin Right**
- Add to page.tsx: `<Cask mr="s">Right margin S</Cask>`
- Inspect element and verify `margin-right: var(--spaceS)` is applied
- Verify value resolves to 8px

**Test Case: Margin Bottom**
- Add to page.tsx: `<Cask mb="xxl">Bottom margin XXL</Cask>`
- Inspect element and verify `margin-bottom: var(--spaceXXL)` is applied
- Verify value resolves to 32px

### 3. Visual Verification - Composite Margin Props
**Test Case: Margin Inline (mx)**
- Add to page.tsx: `<Cask mx="l">Inline margin L</Cask>`
- Inspect element and verify both `margin-left` and `margin-right` are `var(--spaceL)` (16px)

**Test Case: Margin Block (my)**
- Add to page.tsx: `<Cask my="xl">Block margin XL</Cask>`
- Inspect element and verify both `margin-top` and `margin-bottom` are `var(--spaceXL)` (24px)

### 4. Visual Verification - Single Padding Props
**Test Case: Padding Left**
- Add to page.tsx: `<Cask pl="xs">Left padding XS</Cask>`
- Inspect element and verify `padding-left: var(--spaceXS)` is applied (4px)

**Test Case: Padding Top**
- Add to page.tsx: `<Cask pt="m">Top padding M</Cask>`
- Inspect element and verify `padding-top: var(--spaceM)` is applied (12px)

### 5. Visual Verification - Composite Padding Props
**Test Case: Padding Inline (px)**
- Add to page.tsx: `<Cask px="m">Inline padding M</Cask>`
- Inspect element and verify both `padding-left` and `padding-right` are `var(--spaceM)` (12px)

**Test Case: Padding Block (py)**
- Add to page.tsx: `<Cask py="s">Block padding S</Cask>`
- Inspect element and verify both `padding-top` and `padding-bottom` are `var(--spaceS)` (8px)

### 6. Visual Verification - Combined Spacing
**Test Case: Margin and Padding Together**
- Add to page.tsx: `<Cask m="l" p="s">Combined spacing</Cask>`
- Inspect element and verify:
  - `margin: var(--spaceL)` is applied (16px)
  - `padding: var(--spaceS)` is applied (8px)

### 7. Visual Verification - Override Behavior
**Test Case: Individual Overrides Composite**
- Add to page.tsx: `<Cask mx="l" ml="xs">Override left</Cask>`
- Inspect element and verify:
  - `margin-right: var(--spaceL)` (16px)
  - `margin-left: var(--spaceXS)` (4px) - this should override the mx value

### 8. Visual Verification - Polymorphic Elements
**Test Case: Spacing on Button**
- Add to page.tsx: `<Cask as="button" px="m" py="s">Button</Cask>`
- Verify element is a button
- Inspect and verify padding is applied correctly

**Test Case: Spacing on Section**
- Add to page.tsx: `<Cask as="section" m="xxl" p="l">Section</Cask>`
- Verify element is a section
- Inspect and verify both margin and padding are applied

### 9. Visual Verification - Extreme Values
**Test Case: Zero Spacing**
- Add to page.tsx: `<Cask m="0" p="0">Zero spacing</Cask>`
- Verify margin and padding are 0

**Test Case: Maximum Spacing**
- Add to page.tsx: `<Cask m="6xl" p="6xl">Max spacing</Cask>`
- Verify margin and padding are 122px

### 10. Integration with Existing Features
**Test Case: Spacing with className**
- Add to page.tsx: `<Cask className="custom-class" ml="l">With class</Cask>`
- Verify className is preserved
- Verify spacing is still applied

**Test Case: Spacing with inline style**
- Add to page.tsx: `<Cask style={{ color: 'red' }} p="m">With style</Cask>`
- Verify color is red
- Verify padding is applied

## Acceptance Criteria Verification

### Developer Experience
- [ ] TypeScript autocomplete works for spacing props
- [ ] TypeScript shows errors for invalid spacing values
- [ ] No TypeScript errors in IDE

### Runtime Behavior
- [ ] All margin props apply correct CSS variables
- [ ] All padding props apply correct CSS variables
- [ ] Composite props (mx, my, px, py) apply to both sides
- [ ] Individual props override composite props as expected
- [ ] Spacing works with polymorphic `as` prop
- [ ] Spacing works alongside className and style props

### CSS Variables
- [ ] All 13 spacing values are defined in globals.css
- [ ] CSS variables resolve to correct pixel values in browser

### Build
- [ ] Production build completes successfully (`pnpm build`)
- [ ] No console errors in development mode
- [ ] No console errors in production build

## Notes
- All automated tests (unit, component) are already verified by CI
- This checklist focuses on manual visual verification and developer experience
- Use browser DevTools to inspect computed styles
- Test in both development and production modes
