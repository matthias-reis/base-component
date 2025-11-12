# QA Checklist: Fix Build (#6)

## Local Testing

### Prerequisites
- [ ] Ensure you have Node.js 24 or later installed
- [ ] Ensure you have pnpm installed

### Basic Functionality Test
1. [ ] **Install dependencies**
   ```bash
   pnpm install
   ```
   - Verify command completes without errors
   - Verify no "web directory" related errors

2. [ ] **Build the application**
   ```bash
   pnpm build
   ```
   - Verify build completes successfully
   - Verify Next.js creates optimized production build
   - Check that TypeScript compilation succeeds

3. [ ] **Run linting**
   ```bash
   pnpm exec biome lint
   ```
   - Verify linting runs without path resolution errors
   - Note: Existing linting warnings in `aio/` directory are expected and not part of this fix

4. [ ] **Start development server**
   ```bash
   pnpm dev
   ```
   - Navigate to http://localhost:4242
   - Verify the application loads without errors
   - Verify hot reloading works when making small changes to src/app/page.tsx

## CI Integration Testing

### GitHub Actions Testing
1. [ ] **Create test branch**
   ```bash
   git checkout -b test-ci-fix
   git push -u origin test-ci-fix
   ```

2. [ ] **Verify CI pipeline**
   - [ ] Check that GitHub Actions build job runs without path resolution errors
   - [ ] Verify that `pnpm install` completes in CI
   - [ ] Verify that `pnpm build` succeeds in CI
   - [ ] Verify that `pnpm exec biome lint` runs without errors in CI
   - [ ] Confirm both build and test jobs complete successfully

3. [ ] **Test caching**
   - [ ] Run CI pipeline twice
   - [ ] Verify that pnpm cache is properly used on second run (faster dependency installation)

### Pull Request Testing
1. [ ] **Create PR against main**
   - [ ] Verify CI runs on PR creation
   - [ ] Verify all checks pass
   - [ ] Verify status checks appear correctly

## Rollback Testing
1. [ ] **If issues arise, test rollback procedure**
   ```bash
   git checkout main
   git revert <commit-hash>
   ```
   - Verify original CI configuration can be restored

## Success Criteria
- [ ] All local commands (`install`, `build`, `biome lint`) run without path-related errors
- [ ] CI pipeline completes successfully for both build and test jobs
- [ ] No references to non-existent `web` directory remain in CI configuration
- [ ] pnpm cache works correctly using root-level `pnpm-lock.yaml`
- [ ] Application still functions normally in development and production modes