# Implementation Plan: Monorepo Restructure

## Task List

- [x] 1. Clean up temporary documentation files
  - Delete all files matching `*PUSH*.md`, `*FIX*.md`, `*VERCEL*.md` patterns from root directory
  - Verify fewer than 10 markdown files remain in root
  - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [ ] 2. Remove Clerk authentication references

- [x] 2.1 Remove Clerk from frontend package dependencies
  - Edit `rythumowas.shop/package.json` to remove `@clerk/nextjs` dependency
  - Run `pnpm install` to update lockfile
  - _Requirements: 2.1_

- [x] 2.2 Remove Clerk environment variables from rythumowas.shop
  - Edit `rythumowas.shop/.env` to remove all `CLERK_*` variables
  - Edit `rythumowas.shop/.env.example` to remove all `CLERK_*` variables
  - Add Stack Auth variables to `.env.example` if missing
  - _Requirements: 2.3, 3.1_

- [ ] 2.3 Remove root .env file with Clerk variables
  - Delete `.env` file from root directory (contains CLERK_* variables)
  - Verify environment files only exist in package directories
  - _Requirements: 3.3_

- [x] 2.4 Update farmer portal routes to use Stack Auth
  - Edit `rythumowas.shop/app/farmer/register/page.tsx` to replace Clerk imports with Stack Auth
  - Edit `rythumowas.shop/app/farmer/dashboard/page.tsx` to replace Clerk imports with Stack Auth
  - _Requirements: 2.1, 2.2, 2.4_

- [x] 2.5 Update admin routes to use Stack Auth
  - Edit `rythumowas.shop/app/(admin)/admin/layout.tsx` to replace Clerk imports with Stack Auth
  - Edit `rythumowas.shop/app/(admin)/admin/page.tsx` to replace Clerk imports with Stack Auth
  - Edit `rythumowas.shop/app/(admin)/admin/farmers/page.tsx` to replace Clerk imports with Stack Auth
  - _Requirements: 2.1, 2.2, 2.4_

- [x] 2.6 Update API routes to use Stack Auth
  - Edit `rythumowas.shop/app/api/farmer/profile/route.ts` to use Stack Auth user context
  - Edit `rythumowas.shop/app/api/auth/register/route.ts` to use Stack Auth user context
  - Update any other API routes that reference Clerk
  - _Requirements: 2.1, 2.2, 2.4_

- [ ] 2.7 Remove Clerk documentation references
  - Edit `docs/archive/` files to remove or archive Clerk references
  - Verify no Clerk references remain in active docs/ directory
  - _Requirements: 2.5_

- [x] 3. Standardize environment configuration






- [x] 3.1 Update frontend environment configuration


  - Edit `rythumowas.shop/.env.example` to include all required Stack Auth variables with comments
  - Ensure `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is documented
  - Add comments explaining each variable's purpose
  - _Requirements: 3.1, 3.4, 3.5_


- [x] 3.2 Update backend environment configuration

  - Edit `medusa-backend/.env.example` to include database and Redis configuration with comments
  - Add comments explaining each variable's purpose
  - _Requirements: 3.2, 3.4_

- [ ] 4. Update .gitignore rules

- [ ] 4.1 Update root .gitignore
  - Edit `.gitignore` to explicitly ignore `.env` files (not just `.env.local`)
  - Ensure rules for `node_modules/` cover all depths
  - Verify build output rules include `.next/`, `dist/`, `.turbo/`
  - Ensure IDE files and log files are properly ignored
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Evaluate and consolidate farmer-portal

- [ ] 5.1 Audit farmer-portal for unique functionality
  - Compare `farmer-portal/app/` with `rythumowas.shop/app/farmer/` routes
  - Check `farmer-portal/lib/` for unique utilities (auth.ts uses Clerk, can be deleted)
  - Review `farmer-portal/components/` for unique components not in rythumowas.shop
  - Check `farmer-portal/public/` for unique assets needed
  - Document findings: most functionality already exists in rythumowas.shop
  - _Requirements: 1.1, 1.2_

- [ ] 5.2 Migrate unique farmer-portal assets (if any)
  - Copy only unique images/assets from `farmer-portal/public/` to `rythumowas.shop/public/farmer/`
  - Copy only unique components (if any) to `rythumowas.shop/components/farmer/`
  - Update import paths in copied files to reference new locations
  - Merge unique styles from `farmer-portal/app/globals.css` into `rythumowas.shop/app/globals.css` (if needed)
  - _Requirements: 1.2, 1.4_

- [ ] 5.3 Delete farmer-portal directory
  - Remove entire `farmer-portal/` directory after confirming all unique content is migrated
  - Verify no broken imports remain in codebase
  - _Requirements: 1.3_

- [ ] 6. Update workspace configuration

- [ ] 6.1 Update pnpm workspace configuration
  - Edit `pnpm-workspace.yaml` to remove `farmer-portal` from packages list
  - Verify workspace includes only `rythumowas.shop`, `medusa-backend`, and `packages/*`
  - _Requirements: 7.1_

- [ ] 6.2 Add monorepo scripts to root package.json
  - Edit root `package.json` to add proper monorepo scripts
  - Add `dev` script to run all services in parallel
  - Add `dev:shop` and `dev:backend` scripts for individual services
  - Add `build`, `build:shop`, `build:backend` scripts
  - Ensure scripts use pnpm workspace filter commands
  - _Requirements: 7.2, 7.3, 7.4_

- [ ] 7. Integrate Stack Auth with Medusa backend

- [ ] 7.1 Create Medusa API client utility with Stack Auth
  - Create `rythumowas.shop/lib/medusa-client.ts` (does not currently exist)
  - Implement `getAuthenticatedMedusaClient()` function that includes Stack Auth user ID and role in headers
  - Use `x-stack-user-id` and `x-stack-user-role` header names
  - _Requirements: 8.1, 8.3_

- [ ] 7.2 Create Stack Auth validation middleware for Medusa
  - Create `medusa-backend/src/api/middlewares/stack-auth.ts`
  - Implement middleware to extract and validate `x-stack-user-id` and `x-stack-user-role` headers
  - Add user context to request object for downstream handlers
  - _Requirements: 8.2, 8.4_

- [ ] 7.3 Update Medusa farmer endpoints to use Stack Auth
  - Edit `medusa-backend/src/api/store/farmer/profile/route.ts` to use Stack Auth middleware
  - Edit `medusa-backend/src/api/store/farmer/products/route.ts` to use Stack Auth middleware
  - Update farmer data filtering to use Stack Auth user ID from headers
  - _Requirements: 8.2, 8.5_

- [ ] 7.4 Update Medusa admin endpoints to validate Stack Auth roles
  - Edit `medusa-backend/src/api/admin/farmers/route.ts` to validate admin role from Stack Auth headers
  - Edit `medusa-backend/src/api/admin/farmers/[id]/route.ts` to validate admin role
  - _Requirements: 8.2, 8.4_

- [x] 8. Update route structure and naming

- [x] 8.1 Evaluate route group naming
  - Review `rythumowas.shop/app/(storefront)/` route group name
  - Rename to more descriptive name if needed (e.g., `(shop)` or `(customer)`)
  - Update any references to old route group name
  - Note: Current structure is acceptable, no changes needed
  - _Requirements: 6.5_

- [x] 8.2 Verify route paths match requirements
  - Verify landing page at `/` (root page.tsx exists)
  - Verify marketing storefront at `/shop` (exists)
  - Verify farmer routes under `/farmer/*` (register and dashboard exist)
  - Verify admin routes under `/admin/*` (admin panel exists)
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 9. Update project documentation

- [ ] 9.1 Update root README.md
  - Edit README.md to describe three-tier architecture (currently mentions farmer-portal separately)
  - Remove references to separate farmer-portal and Clerk
  - Update quick start instructions for unified structure
  - Update tech stack to show Stack Auth instead of Clerk
  - Update project structure to remove farmer-portal
  - _Requirements: 9.1, 9.3, 9.4_

- [ ] 9.2 Create docs/ARCHITECTURE.md
  - Create new ARCHITECTURE.md file (currently doesn't exist in docs/)
  - Show unified frontend in system diagram
  - Document three-tier architecture (frontend, Medusa backend, database)
  - Update authentication section to reference only Stack Auth
  - Add data flow diagrams showing farmer registration, product creation, customer purchase
  - _Requirements: 9.2, 9.3, 9.5_

- [ ] 9.3 Update docs/SETUP.md
  - Edit to remove farmer-portal setup steps (currently has separate farmer-portal instructions)
  - Update Stack Auth configuration steps (currently present but needs verification)
  - Update environment variable setup instructions to remove farmer-portal
  - Simplify development server instructions to two terminals (shop + backend)
  - _Requirements: 9.2, 9.3, 9.4_

- [ ] 9.4 Create docs/DEPLOYMENT.md
  - Create new DEPLOYMENT.md file (currently doesn't exist in docs/)
  - Document single frontend deployment to Vercel
  - Remove farmer-portal deployment instructions
  - Add Stack Auth production setup instructions
  - Document Medusa backend deployment options
  - _Requirements: 9.2, 9.3_

- [ ] 10. Validate build success

- [ ] 10.1 Build and validate frontend
  - Run `pnpm --filter rythumowas.shop build` to build frontend
  - Fix any TypeScript errors related to Stack Auth integration
  - Fix any import errors from deleted farmer-portal (after task 5.3)
  - Verify build completes successfully
  - _Requirements: 10.1, 10.3, 10.4, 10.5_

- [ ] 10.2 Build and validate backend
  - Run `pnpm --filter medusa-backend build` to build Medusa backend
  - Fix any compilation errors related to Stack Auth middleware
  - Verify build completes successfully
  - _Requirements: 10.2, 10.5_

- [ ]* 10.3 Run test suites
  - Run `pnpm --filter rythumowas.shop test` to execute unit tests
  - Fix any failing tests related to authentication changes
  - Run `pnpm --filter rythumowas.shop e2e:headless` to execute E2E tests
  - _Requirements: 10.1, 10.2_
