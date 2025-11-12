# Implementation Plan: Fix Build (#6)

## Summary

The GitHub Actions CI pipeline is failing because it's configured to look for a `web` directory that doesn't exist. The configuration references `web/pnpm-lock.yaml` and tries to run commands in a `web` subdirectory, but the project structure shows that all files are in the root directory.

## Scope

- Fix CI configuration to work with the current project structure
- Update pnpm cache paths to reference the correct lockfile location
- Update working directory references in CI jobs
- Ensure all CI commands work with the root-level package.json

## Out-of-scope

- Adding new testing frameworks or scripts
- Changing project structure to match the incorrect CI configuration
- Adding new dependencies

## File/Directory Map

### Files to Modify
- `.github/workflows/ci.yml` - Update cache paths and remove incorrect `web` directory references

### Files Referenced
- `package.json` - Contains build scripts (located in root)
- `pnpm-lock.yaml` - Dependency lockfile (located in root)

## Acceptance Criteria

1. CI pipeline runs without path resolution errors
2. `pnpm install` works correctly in the build job
3. Build job successfully completes `pnpm build`
4. Test job successfully runs lint (note: typecheck and test scripts don't exist in package.json)
5. All jobs reference correct file paths and working directories

## Test Plan

1. **Local Testing**:
   - Verify `pnpm install` works in root directory
   - Verify `pnpm build` works in root directory
   - Verify `pnpm lint` works in root directory

2. **CI Testing**:
   - Create a test branch and push changes
   - Verify CI pipeline completes successfully
   - Check that cache is properly created and used

3. **Integration Testing**:
   - Test with both push to main and PR workflows
   - Verify both build and test jobs complete

## Risks

### Medium Risk
- **Missing scripts**: package.json doesn't define `typecheck` or `test` scripts that CI tries to run
  - **Mitigation**: Remove or comment out these steps until scripts are defined

### Low Risk
- **Node version mismatch**: CI uses Node 20, but package.json specifies node >=20 and volta specifies 24.11.0
  - **Mitigation**: Update CI to use Node 24 or update package.json volta config

## Rollback

If changes cause issues:
1. Revert the `.github/workflows/ci.yml` file to previous version
2. The changes are isolated to CI configuration and don't affect local development

## CI Updates

The main fix involves updating `.github/workflows/ci.yml`:

### Changes Required
1. **Fix cache dependency path**: Change `web/pnpm-lock.yaml` to `pnpm-lock.yaml`
2. **Remove web directory references**: Remove `--dir web` from pnpm commands
3. **Remove non-existent script calls**: Comment out or remove `typecheck` and `test` steps
4. **Consider Node version alignment**: Update from Node 20 to 24 to match volta config

### Root Cause
The CI configuration appears to be copied from a different project structure where the application lived in a `web` subdirectory.

## Docs Updates

No documentation updates required as this is a build configuration fix. The change should be transparent to developers.

## Related ADRs

No architectural changes or new dependencies are being introduced, so no new ADR is needed.