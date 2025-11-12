# QA Checklist: Cask Component Implementation

## Manual Testing Steps

### 1. Local Development Setup
- [ ] Clone/pull latest changes from branch `issues/4-base-component-called-cask`
- [ ] Run `pnpm install` to install dependencies
- [ ] Start development server with `pnpm dev`
- [ ] Navigate to `http://localhost:4242`
- [ ] Verify application starts without errors

### 2. Component Import and Basic Usage
- [ ] Create a test page or component that imports Cask: `import { Cask } from '@/src/cask'`
- [ ] Verify import works without TypeScript errors
- [ ] Test default rendering: `<Cask>Default content</Cask>` renders as div
- [ ] Inspect DOM to confirm `<div>Default content</div>` is rendered

### 3. Polymorphic Behavior Testing
- [ ] Test semantic elements:
  - [ ] `<Cask as="section">Section content</Cask>` renders `<section>` tag
  - [ ] `<Cask as="header">Header content</Cask>` renders `<header>` tag
  - [ ] `<Cask as="article">Article content</Cask>` renders `<article>` tag
- [ ] Test interactive elements:
  - [ ] `<Cask as="button" onClick={() => alert('clicked')}>Click me</Cask>` renders clickable button
  - [ ] `<Cask as="a" href="https://example.com">Link</Cask>` renders functional link
- [ ] Test form elements:
  - [ ] `<Cask as="label">Label text</Cask>` renders `<label>` tag

### 4. Props Forwarding Verification
- [ ] Test className forwarding: `<Cask className="test-class">Content</Cask>` applies class
- [ ] Test style forwarding: `<Cask style={{color: 'red'}}>Content</Cask>` applies styles
- [ ] Test data attributes: `<Cask data-testid="my-cask">Content</Cask>` adds attribute
- [ ] Test aria attributes: `<Cask aria-label="description">Content</Cask>` adds accessibility

### 5. TypeScript Validation
- [ ] Open project in IDE/editor with TypeScript support
- [ ] Verify no TypeScript errors in component files
- [ ] Test type safety:
  - [ ] `<Cask as="a" href="valid">` should not show TypeScript errors
  - [ ] `<Cask as="button" href="invalid">` should show TypeScript error
  - [ ] `<Cask onClick={() => {}}>` should show TypeScript error (div doesn't have onClick)

### 6. Edge Cases
- [ ] Test with no children: `<Cask />` renders empty div
- [ ] Test with nested Casks:
  ```tsx
  <Cask as="div">
    <Cask as="span">Nested content</Cask>
  </Cask>
  ```
- [ ] Test with complex children (components, fragments)

### 7. Browser Compatibility
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)  
- [ ] Test in Safari (if available)
- [ ] Verify no console errors in any browser

### 8. Performance Check
- [ ] Open browser dev tools
- [ ] Check for any console warnings or errors
- [ ] Verify component renders quickly (no noticeable lag)
- [ ] Test with multiple Cask components on same page

## Expected Outcomes

### Functional Requirements
- ✅ Component renders as div by default
- ✅ `as` prop changes the HTML element
- ✅ All HTML attributes are forwarded correctly
- ✅ TypeScript provides proper type checking
- ✅ Component integrates with Next.js without issues

### Quality Requirements
- ✅ No TypeScript errors
- ✅ No runtime JavaScript errors
- ✅ No accessibility violations (basic check)
- ✅ Consistent behavior across browsers
- ✅ Component follows React best practices

## Notes
- All automated tests (lint, typecheck, unit tests) should pass before manual QA
- This checklist focuses on manual verification of functionality not covered by automated tests
- Report any issues found during testing with specific reproduction steps