# QA Checklist: Next Yak Integration

## Manual Testing Steps

### 1. Application Startup
- [ ] Run `pnpm dev`
- [ ] Verify application starts without errors on port 4242
- [ ] Check console for any build warnings or Next Yak configuration issues

### 2. Page Rendering
- [ ] Navigate to `http://localhost:4242`
- [ ] Verify page loads without JavaScript errors
- [ ] Confirm page title displays: "&lt;Cask/&gt; - The Crate Base Component"

### 3. Card Component Visual Verification
- [ ] Confirm exactly 4 Card components are visible on the page
- [ ] Verify each Card has the following styling:
  - [ ] Grey border (1px solid grey)
  - [ ] 1rem padding (content has proper inner spacing)
  - [ ] 1rem border radius (rounded corners visible)
- [ ] Check that all Card components contain their respective content:
  - [ ] "Regular Content" card with lorem ipsum text
  - [ ] "Always Dark" card with duis aute text  
  - [ ] "Always Light" card with sed ut perspiciatis text
  - [ ] "Nested Areas" card with child content sections

### 4. Content Structure
- [ ] Verify each Card properly wraps its h2 heading and paragraph content
- [ ] Confirm nested areas Card contains three child sections with h3 headings
- [ ] Check that Card styling doesn't interfere with internal typography

### 5. Build Verification
- [ ] Run `pnpm build`
- [ ] Verify build completes successfully
- [ ] Check that Next Yak CSS is properly extracted during build process

## Expected Results
- Application loads at http://localhost:4242 without errors
- 4 visually distinct Card components with grey borders and rounded corners
- Proper spacing and typography within each Card
- Clean build process with no styling-related warnings