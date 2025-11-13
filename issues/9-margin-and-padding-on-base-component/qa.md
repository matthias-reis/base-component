# QA Checklist: Spacing System Implementation

## Prerequisites
- Node.js 20+ installed
- pnpm package manager
- Git repository cloned locally

## Manual Testing Steps

### 1. Development Environment Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```
- ✅ Navigate to http://localhost:4242
- ✅ Verify app loads without errors
- ✅ Check console for any TypeScript or runtime errors

### 2. Basic Spacing Props Testing

#### 2.1 Single Margin Props
- ✅ Add `<Cask m="l">Test margin all</Cask>` to page.tsx
- ✅ Verify element has `margin: var(--spaceL)` in DevTools
- ✅ Test individual directions: `ml="xl"`, `mr="s"`, `mt="m"`, `mb="xs"`
- ✅ Verify correct CSS variables applied for each direction

#### 2.2 Single Padding Props  
- ✅ Add `<Cask p="xl">Test padding all</Cask>` to page.tsx
- ✅ Verify element has `padding: var(--spaceXL)` in DevTools
- ✅ Test individual directions: `pl="l"`, `pr="m"`, `pt="s"`, `pb="xxs"`
- ✅ Verify correct CSS variables applied for each direction

#### 2.3 Composite Props (mx, my, px, py)
- ✅ Test `<Cask mx="m">Horizontal margin</Cask>`
- ✅ Verify both `margin-left` and `margin-right` set to `var(--spaceM)`
- ✅ Test `<Cask my="l">Vertical margin</Cask>`
- ✅ Verify both `margin-top` and `margin-bottom` set to `var(--spaceL)`
- ✅ Test `<Cask px="s">Horizontal padding</Cask>`
- ✅ Verify both `padding-left` and `padding-right` set to `var(--spaceS)`
- ✅ Test `<Cask py="xl">Vertical padding</Cask>`
- ✅ Verify both `padding-top` and `padding-bottom` set to `var(--spaceXL)`

### 3. Override Behavior Testing
- ✅ Test `<Cask mx="m" ml="xl">Override test</Cask>`
- ✅ Verify `margin-left: var(--spaceXL)` and `margin-right: var(--spaceM)`
- ✅ Confirm individual props override composite props
- ✅ Test multiple override scenarios

### 4. Spacing Value Range Testing
For each spacing value, verify CSS variable resolution:
- ✅ `0` → `var(--space0)` → `0`
- ✅ `1` → `var(--space)` → `1px` 
- ✅ `xxs` → `var(--spaceXXS)` → `2px`
- ✅ `xs` → `var(--spaceXS)` → `4px`
- ✅ `s` → `var(--spaceS)` → `8px`
- ✅ `m` → `var(--spaceM)` → `12px`
- ✅ `l` → `var(--spaceL)` → `16px`
- ✅ `xl` → `var(--spaceXL)` → `24px`
- ✅ `xxl` → `var(--spaceXXL)` → `32px`
- ✅ `3xl` → `var(--space3XL)` → `48px`
- ✅ `4xl` → `var(--space4XL)` → `68px`
- ✅ `5xl` → `var(--space5XL)` → `92px`
- ✅ `6xl` → `var(--space6XL)` → `122px`

### 5. Polymorphic Compatibility Testing
- ✅ Test spacing with different elements: `<Cask as="section" p="l">`
- ✅ Test with interactive elements: `<Cask as="button" mx="m" py="s">`
- ✅ Verify spacing works with anchor elements: `<Cask as="a" p="m">`
- ✅ Confirm element type and spacing both work correctly

### 6. Style Prop Integration Testing
- ✅ Test `<Cask m="s" style={{color: 'red'}}>Combined styles</Cask>`
- ✅ Verify both spacing and style props applied
- ✅ Test style prop override: `<Cask m="s" style={{margin: '10px'}}>`
- ✅ Confirm style prop takes precedence over spacing props

### 7. TypeScript Integration Testing
- ✅ Verify autocomplete works for spacing prop names
- ✅ Verify autocomplete works for spacing values
- ✅ Test invalid value shows TypeScript error
- ✅ Confirm existing prop types still work correctly

### 8. Build and Production Testing
```bash
# Run type checking
pnpm typecheck
```
- ✅ Verify no TypeScript errors

```bash
# Run linting  
pnpm lint
```
- ✅ Verify no linting errors

```bash
# Build for production
pnpm build
```
- ✅ Verify build completes successfully
- ✅ Check build output for CSS variable inclusion

### 9. Browser Compatibility Testing
- ✅ Test in Chrome/Chromium (latest)
- ✅ Test in Firefox (latest) 
- ✅ Test in Safari (if available)
- ✅ Verify CSS variables resolve correctly across browsers

### 10. Visual Regression Testing
- ✅ Create test components with various spacing combinations
- ✅ Visually verify spacing appears correct
- ✅ Test responsive behavior at different screen sizes
- ✅ Confirm spacing scales appropriately

## Edge Cases to Verify
- ✅ Component with no spacing props has no style attribute
- ✅ Empty style prop doesn't interfere with spacing
- ✅ Multiple conflicting spacing props resolve correctly
- ✅ Nested Cask components with different spacing work independently
- ✅ Spacing props work with existing className prop

## Performance Verification
- ✅ Check bundle size impact (should be minimal)
- ✅ Verify no runtime JavaScript errors in console
- ✅ Confirm no memory leaks in component mounting/unmounting

## Rollback Verification
- ✅ Existing Cask usage without spacing props works unchanged
- ✅ No breaking changes to polymorphic behavior
- ✅ All original test cases still pass