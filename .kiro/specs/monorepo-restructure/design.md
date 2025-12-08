# Design Document: Monorepo Restructure

## Overview

This design document outlines the technical approach for restructuring the RythuMowa marketplace from a multi-app architecture into a unified monorepo. The restructure consolidates the `farmer-portal` into the main `rythumowas.shop` Next.js application, removes deprecated Clerk authentication in favor of Stack Auth, and establishes a clean three-tier architecture.

### Goals
- Consolidate all frontend functionality into a single Next.js application
- Eliminate code duplication and reduce deployment complexity
- Remove all Clerk authentication references and standardize on Stack Auth
- Maintain clear separation of concerns between customer, farmer, and admin portals
- Ensure seamless integration between frontend and Medusa backend

### Non-Goals
- Migrating away from Medusa backend (it remains as-is)
- Changing the database schema or data models
- Implementing new features beyond the restructure
- Modifying the shared UI component library structure

## Architecture

### High-Level Structure

```
rythumowas-shop/
├── rythumowas.shop/          # Unified Next.js Frontend
│   ├── app/
│   │   ├── (storefront)/     # Customer shopping routes
│   │   ├── (admin)/          # Admin panel routes
│   │   ├── farmer/           # Farmer portal routes
│   │   ├── shop/             # Marketing storefront
│   │   └── api/              # API routes
│   ├── components/
│   │   ├── farmer/           # Farmer-specific components
│   │   ├── admin/            # Admin-specific components
│   │   └── storefront/       # Customer-facing components
│   └── lib/
│       ├── stack.ts          # Stack Auth configuration
│       └── medusa-client.ts  # Medusa API client
├── medusa-backend/           # E-commerce Backend
│   ├── src/
│   │   ├── api/              # Custom API routes
│   │   ├── models/           # Data models (Farmer, FarmerProduct)
│   │   └── migrations/       # Database migrations
│   └── medusa-config.js
├── packages/
│   └── ui/                   # Shared component library
└── pnpm-workspace.yaml
```

### Three-Tier Architecture

1. **Presentation Layer**: Next.js frontend (`rythumowas.shop/`)
   - Server-side rendering and static generation
   - Client-side interactivity with React
   - Stack Auth for authentication
   - Three distinct portal experiences (customer, farmer, admin)

2. **Business Logic Layer**: Medusa backend (`medusa-backend/`)
   - RESTful API for products, orders, and cart
   - Custom endpoints for farmer management
   - Database operations via TypeORM
   - Event-driven architecture with Redis

3. **Data Layer**: PostgreSQL database
   - Medusa core tables (products, orders, customers)
   - Custom tables (farmers, farmer_products)
   - Managed via Medusa migrations

## Components and Interfaces

### Frontend Application Structure

#### Route Organization

**Current State**: The routes already exist in `rythumowas.shop/app/`. This design documents the target state after cleanup.

**Target Route Structure**:

```
app/
├── page.tsx                    # Landing page (/) - EDIT to remove Clerk
├── shop/
│   └── page.tsx               # Marketing storefront (/shop) - KEEP AS-IS
├── (storefront)/              # EVALUATE: Consider renaming for clarity
│   ├── layout.tsx             # Storefront layout - EDIT to remove Clerk
│   ├── page.tsx               # B2B product listing - KEEP AS-IS
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx       # Product detail - KEEP AS-IS
│   └── cart/
│       └── page.tsx           # Shopping cart - KEEP AS-IS
├── farmer/                     # EDIT all files to remove Clerk
│   ├── layout.tsx             # Farmer portal layout
│   ├── register/
│   │   └── page.tsx           # Farmer registration
│   └── dashboard/
│       └── page.tsx           # Farmer dashboard
└── (admin)/                    # EDIT all files to remove Clerk
    └── admin/
        ├── layout.tsx         # Admin panel layout
        ├── page.tsx           # Admin dashboard
        └── farmers/
            └── page.tsx       # Farmer verification
```

**Actions Required**:
- **EDIT**: Remove Clerk imports, replace with Stack Auth
- **KEEP AS-IS**: Files without authentication logic
- **EVALUATE**: Consider renaming `(storefront)` route group for clarity
- **DELETE**: No routes need to be deleted (they're already correct)

#### Component Migration from Farmer Portal

**Assessment First**: Before migrating, check if functionality already exists in `rythumowas.shop`.

**Likely Scenario**: Most farmer functionality already exists in `rythumowas.shop/app/farmer/` and just needs Clerk references removed.

**Migration Only If Unique**:
- Only copy components that don't exist in rythumowas.shop
- Delete `farmer-portal/lib/auth.ts` (replaced by Stack Auth)
- Merge unique styles from `farmer-portal/app/globals.css` into main app
- Delete farmer-portal directory once verified empty of unique code

**Expected Component Organization** (already exists):
```
components/
├── farmer/
│   └── (existing components, just edit to remove Clerk)
├── admin/
│   ├── AdminNav.tsx (already exists)
│   └── (other existing admin components)
├── storefront/
│   ├── StorefrontHeader.tsx (already exists)
│   ├── ProductCard.tsx (already exists)
│   └── (other existing storefront components)
└── (use @rythumowa/ui for shared components)
```

**Key Point**: This is primarily a **deletion and editing** task, not a migration task. The farmer portal functionality likely already exists in the main app.

### Authentication Integration

#### Stack Auth Configuration

**Client Configuration** (`lib/stack.ts`):
```typescript
import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/handler/sign-in",
    signUp: "/handler/sign-up",
    afterSignIn: "/",
    afterSignUp: "/farmer/register",
  },
});
```

**Middleware** (`middleware.ts`):
- Protects `/farmer/*` routes (requires authentication)
- Protects `/admin/*` routes (requires admin role)
- Allows public access to `/`, `/shop`, `/products/*`, `/cart`

**User Roles**:
- `CUSTOMER`: Default role for all users
- `FARMER`: Assigned after farmer registration approval
- `ADMIN`: Manually assigned for platform administrators

#### Authentication Flow

1. **User Sign-Up**:
   - User creates account via Stack Auth
   - Redirected to `/farmer/register` or `/` based on intent
   - User profile created in Stack Auth

2. **Farmer Registration**:
   - Authenticated user fills farmer registration form
   - POST to `/api/farmer/profile` creates farmer record in Medusa
   - Farmer status: `pending` (awaits admin approval)

3. **Admin Approval**:
   - Admin views pending farmers at `/admin/farmers`
   - Approves farmer → updates `verified: true` in Medusa
   - Stack Auth role updated to `FARMER`

4. **Authenticated Requests**:
   - Frontend includes Stack Auth JWT in `Authorization` header
   - Medusa backend validates JWT and extracts user context
   - User ID used for data filtering and authorization

### Backend Integration

#### Medusa API Client

**Check First**: Verify if `lib/medusa-client.ts` already exists in rythumowas.shop.

**If Exists**: Edit to replace Clerk with Stack Auth
**If Missing**: Create with Stack Auth integration

**Authenticated Client** (`lib/medusa-client.ts`):
```typescript
import Medusa from "@medusajs/medusa-js";
import { stackServerApp } from "./stack";

export async function getAuthenticatedMedusaClient() {
  const user = await stackServerApp.getUser();
  
  const client = new Medusa({
    baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
    maxRetries: 3,
  });

  if (user) {
    client.client.setHeaders({
      "x-stack-user-id": user.id,
      "x-stack-user-role": user.role,
    });
  }

  return client;
}
```

**Note**: Only create this file if it doesn't exist. If similar functionality exists, edit it instead.

#### Medusa Backend Middleware

**Check First**: Review existing files in `medusa-backend/src/api/` to see what already exists.

**Likely Scenario**: Farmer endpoints already exist and just need header validation updated.

**If Middleware Doesn't Exist**: Create `medusa-backend/src/api/middlewares/stack-auth.ts`:
```typescript
import { Request, Response, NextFunction } from "express";

export async function validateStackAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers["x-stack-user-id"];
  const userRole = req.headers["x-stack-user-role"];

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = {
    id: userId as string,
    role: userRole as string,
  };

  next();
}
```

**Existing Farmer Endpoints** (likely already exist, just edit):
- `GET /store/farmer/profile` - EDIT to use Stack Auth headers
- `POST /store/farmer/products` - EDIT to use Stack Auth headers
- `GET /store/farmer/products` - EDIT to use Stack Auth headers
- `PUT /store/farmer/products/:id` - EDIT to use Stack Auth headers

**Existing Admin Endpoints** (likely already exist, just edit):
- `GET /admin/farmers` - EDIT to validate Stack Auth role
- `PUT /admin/farmers/:id` - EDIT to validate Stack Auth role

**Key Point**: Don't rewrite these endpoints. Just update authentication checks.

## Data Models

### Existing Medusa Models

The following models already exist in the Medusa backend and will remain unchanged:

**Farmer Model** (`medusa-backend/src/models/farmer.ts`):
```typescript
{
  id: string;
  userId: string;          // Stack Auth user ID
  farmName: string;
  location: string;
  phoneNumber: string;
  verified: boolean;       // Admin approval status
  createdAt: Date;
  updatedAt: Date;
  products: FarmerProduct[];
}
```

**FarmerProduct Model** (`medusa-backend/src/models/farmer-product.ts`):
```typescript
{
  id: string;
  farmerId: string;
  productId: string;       // Links to Medusa Product
  stock: number;
  customPrice?: number;    // Override default price
  createdAt: Date;
  updatedAt: Date;
  farmer: Farmer;
  product: Product;
}
```

### Data Flow Diagrams

#### Farmer Registration Flow
```
User (Frontend)
    │
    ├─> Sign up with Stack Auth
    │       │
    │       └─> Stack Auth creates user account
    │
    ├─> Fill farmer registration form
    │       │
    │       └─> POST /api/farmer/profile
    │               │
    │               └─> Medusa Backend creates Farmer record
    │                       │
    │                       └─> Status: pending, verified: false
    │
    └─> Redirected to /farmer/dashboard (limited access)
```

#### Product Creation Flow
```
Farmer (Frontend)
    │
    ├─> Navigate to /farmer/products/new
    │       │
    │       └─> Fill product form
    │               │
    │               └─> POST /api/farmer/products
    │                       │
    │                       ├─> Validate farmer is verified
    │                       │
    │                       ├─> Create Product in Medusa
    │                       │
    │                       └─> Create FarmerProduct link
    │
    └─> Product appears in storefront
```

#### Customer Purchase Flow
```
Customer (Frontend)
    │
    ├─> Browse products at / or /shop
    │       │
    │       └─> GET /api/products
    │               │
    │               └─> Medusa returns products with farmer info
    │
    ├─> Add to cart (localStorage + Medusa cart API)
    │
    ├─> Checkout
    │       │
    │       └─> POST /api/cart/complete
    │               │
    │               └─> Medusa creates Order
    │                       │
    │                       └─> Order assigned to farmer via FarmerProduct
    │
    └─> Order confirmation
```

## Error Handling

### Frontend Error Handling

**Authentication Errors**:
- Unauthenticated access to protected routes → Redirect to `/handler/sign-in`
- Insufficient permissions (e.g., non-admin accessing `/admin`) → Show 403 error page
- Stack Auth token expiration → Automatic refresh via Stack SDK

**API Errors**:
- Network errors → Show toast notification with retry option
- 400 Bad Request → Display validation errors inline on forms
- 404 Not Found → Show "Resource not found" page
- 500 Server Error → Show generic error page with support contact

**Form Validation**:
- Client-side validation using Zod schemas
- Real-time feedback on input fields
- Server-side validation as final check
- Clear error messages for each field

### Backend Error Handling

**Medusa API Errors**:
- Wrap all Medusa API calls in try-catch blocks
- Log errors with context (user ID, endpoint, timestamp)
- Return standardized error responses:
  ```json
  {
    "error": "Error message",
    "code": "ERROR_CODE",
    "details": {}
  }
  ```

**Database Errors**:
- Connection failures → Retry with exponential backoff
- Constraint violations → Return 400 with specific field errors
- Transaction failures → Rollback and return 500

**Authorization Errors**:
- Missing user context → 401 Unauthorized
- Insufficient role → 403 Forbidden
- Resource ownership validation → 403 if user doesn't own resource

## Testing Strategy

### Unit Testing

**Frontend Components**:
- Test farmer dashboard components with mock data
- Test form validation logic
- Test utility functions (e.g., `getAuthenticatedMedusaClient`)
- Use Vitest + React Testing Library

**Backend Endpoints**:
- Test API routes with mock Medusa client
- Test middleware (Stack Auth validation)
- Test data transformations
- Use Jest or Vitest

### Integration Testing

**Authentication Flow**:
- Test sign-up → farmer registration → admin approval flow
- Test role-based access control
- Test token refresh and expiration handling

**API Integration**:
- Test frontend → Medusa backend communication
- Test authenticated requests with real JWT tokens
- Test error handling for failed API calls

**Route Protection**:
- Test middleware correctly protects farmer and admin routes
- Test redirects for unauthenticated users
- Test role-based route access

### End-to-End Testing

**Critical User Journeys**:
- Farmer registration and approval flow
- Product creation and listing
- Customer browsing and cart management
- Admin farmer verification

**Tools**:
- Playwright for E2E tests
- Test against local development environment
- Mock external services (payment gateways, etc.)

### Manual Testing Checklist

**Post-Migration Validation**:
- [ ] All routes accessible at correct paths
- [ ] No broken links or 404 errors
- [ ] Authentication works on all protected routes
- [ ] Farmer dashboard displays correct data
- [ ] Admin panel shows pending farmers
- [ ] Product listing shows farmer information
- [ ] Cart and checkout flow works end-to-end
- [ ] No console errors in browser
- [ ] No Clerk references remain in codebase
- [ ] Environment variables correctly configured

## Migration Strategy

### Guiding Principle: Delete First, Edit Second, Create Last

The restructure prioritizes **deletion** and **targeted edits** over writing new code. Most functionality already exists in `rythumowas.shop` - we're consolidating, not rebuilding.

### Phase 1: Cleanup and Deletion
1. **Delete temporary documentation** (Requirement 5):
   - Remove all `*PUSH*.md`, `*FIX*.md`, `*VERCEL*.md` files from root
   - Keep only essential docs: README.md, docs/, package files
   
2. **Remove Clerk references** (Requirement 2):
   - Delete Clerk imports from all files
   - Remove Clerk environment variables from .env files
   - Delete any Clerk-specific utility files
   - Remove Clerk configuration from package.json

3. **Delete root environment files** (Requirement 3):
   - Remove `.env` from root directory
   - Keep only `.env.example` files in package directories

### Phase 2: Targeted Edits
1. **Update existing farmer routes** in rythumowas.shop:
   - Edit `app/farmer/register/page.tsx` to remove Clerk, use Stack Auth
   - Edit `app/farmer/dashboard/page.tsx` to remove Clerk, use Stack Auth
   - Edit `app/api/farmer/profile/route.ts` to use Stack Auth headers
   
2. **Update route groups** (Requirement 6):
   - Rename `(storefront)` to more descriptive name if needed
   - Ensure route structure matches design
   
3. **Update .gitignore** (Requirement 4):
   - Add comprehensive ignore rules
   - Ensure all .env files (except .env.example) are ignored

4. **Update workspace configuration** (Requirement 7):
   - Edit `pnpm-workspace.yaml` to remove farmer-portal
   - Edit root `package.json` to add monorepo scripts
   - Remove farmer-portal from workspace

### Phase 3: Minimal Component Migration
1. **Identify unique farmer-portal components**:
   - Only migrate components that don't exist in rythumowas.shop
   - Most functionality likely already exists - just needs Clerk removed
   
2. **Copy only necessary files**:
   - If farmer dashboard has unique components, copy to `components/farmer/`
   - Update import paths in copied files
   - Merge any unique styles into main globals.css

3. **Delete farmer-portal directory** (Requirement 1):
   - Once all unique functionality is migrated
   - Verify no broken imports remain

### Phase 4: Validation and Documentation
1. **Build validation** (Requirement 10):
   - Run `pnpm build:shop` and fix any errors
   - Run `pnpm build:backend` and fix any errors
   - Ensure no references to deleted files
   
2. **Update documentation** (Requirement 9):
   - Edit docs/ARCHITECTURE.md to remove farmer-portal
   - Edit docs/SETUP.md to simplify setup
   - Edit root README.md to reflect unified structure
   - Remove outdated documentation

### What NOT to Do
- ❌ Don't rewrite existing working code
- ❌ Don't create new components if they already exist
- ❌ Don't add new features during restructure
- ❌ Don't create new documentation files
- ❌ Don't refactor code that doesn't need Clerk removed

### Rollback Plan
- Use Git to revert changes if critical issues found
- Keep commits atomic (one phase per commit)
- Test after each phase before proceeding
- Document any breaking changes discovered

## Configuration Management

### Environment Variables

**Frontend** (`.env.example`):
```bash
# Stack Auth Configuration
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_key
STACK_SECRET_SERVER_KEY=your_secret_key

# Medusa Backend URL
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (Prisma)
DATABASE_URL=postgresql://user:password@localhost:5432/rythumowa
```

**Backend** (`.env.example`):
```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/medusa-store

# Redis Configuration
REDIS_URL=redis://localhost:6379

# CORS Configuration
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000

# Node Environment
NODE_ENV=development
```

### Workspace Configuration

**pnpm-workspace.yaml**:
```yaml
packages:
  - 'rythumowas.shop'
  - 'medusa-backend'
  - 'packages/*'
```

**Root package.json scripts**:
```json
{
  "scripts": {
    "dev": "pnpm --parallel dev",
    "dev:shop": "pnpm --filter rythumowas.shop dev",
    "dev:backend": "pnpm --filter rythumowa-medusa-backend dev",
    "build": "pnpm --recursive build",
    "build:shop": "pnpm --filter rythumowas.shop build",
    "build:backend": "pnpm --filter rythumowa-medusa-backend build"
  }
}
```

### Git Ignore Rules

**Root .gitignore additions**:
```
# Environment files
.env
.env.local
.env.*.local
!.env.example

# Dependencies
node_modules/
.pnpm-store/

# Build outputs
.next/
dist/
.turbo/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
```

## Documentation Updates

### Files to Update

1. **Root README.md**:
   - Update architecture diagram to show unified frontend
   - Remove references to separate farmer-portal
   - Update quick start instructions
   - Add Stack Auth setup instructions

2. **docs/ARCHITECTURE.md**:
   - Update system design diagram
   - Document unified frontend structure
   - Explain route organization strategy
   - Update authentication section to Stack Auth only

3. **docs/SETUP.md**:
   - Update installation steps (no farmer-portal)
   - Add Stack Auth configuration steps
   - Update environment variable setup
   - Simplify development server instructions

4. **docs/DEPLOYMENT.md**:
   - Update Vercel configuration for single frontend
   - Remove farmer-portal deployment instructions
   - Update environment variable configuration
   - Add Stack Auth production setup

### Files to Remove

- All `*PUSH*.md` files in root
- All `*FIX*.md` files in root
- All `*VERCEL*.md` files in root
- `farmer-portal/README.md` (after migration)
- Any Clerk-specific documentation

## Performance Considerations

### Build Optimization

**Next.js Configuration**:
- Enable Turbopack for faster development builds
- Use `output: 'standalone'` for optimized production builds
- Implement code splitting for farmer and admin routes
- Use dynamic imports for heavy components

**Bundle Size**:
- Remove unused dependencies (Clerk packages)
- Tree-shake unused code
- Optimize images with Next.js Image component
- Lazy load farmer dashboard charts

### Runtime Performance

**Server-Side Rendering**:
- Use `generateStaticParams` for product pages
- Implement ISR (Incremental Static Regeneration) for product listings
- Cache Medusa API responses with appropriate TTL

**Client-Side Performance**:
- Implement React Query for data fetching and caching
- Use optimistic updates for better UX
- Debounce search and filter inputs
- Virtualize long lists (product grids, farmer tables)

### Database Performance

**Medusa Backend**:
- Ensure indexes on frequently queried fields (userId, farmerId)
- Use database connection pooling
- Implement Redis caching for product listings
- Optimize N+1 queries with proper joins

## Security Considerations

### Authentication Security

**Stack Auth**:
- Use HTTP-only cookies for token storage
- Implement CSRF protection
- Validate JWT signatures on backend
- Set appropriate token expiration times

**API Security**:
- Validate all user inputs
- Sanitize data before database operations
- Implement rate limiting on API routes
- Use HTTPS in production

### Authorization

**Role-Based Access Control**:
- Validate user roles on every protected route
- Check resource ownership before mutations
- Implement least privilege principle
- Log all authorization failures

**Data Access**:
- Filter farmer data by ownership
- Prevent horizontal privilege escalation
- Validate IDs in URL parameters
- Sanitize user-generated content

### Environment Security

**Secrets Management**:
- Never commit `.env` files
- Use different secrets for each environment
- Rotate secrets regularly
- Use Vercel environment variables for production

**CORS Configuration**:
- Whitelist only necessary origins
- Configure appropriate CORS headers
- Validate origin on sensitive endpoints
- Use credentials: true only when needed

## Deployment Architecture

### Vercel Deployment (Frontend)

**Configuration** (`vercel.json`):
```json
{
  "buildCommand": "pnpm build:shop",
  "outputDirectory": "rythumowas.shop/.next",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["bom1"]
}
```

**Environment Variables**:
- Set all `NEXT_PUBLIC_*` variables in Vercel dashboard
- Configure Stack Auth production keys
- Set Medusa backend production URL

### Backend Deployment

**Options**:
- Railway: Automatic deployments from Git
- Render: Docker-based deployment
- DigitalOcean App Platform: Managed containers

**Requirements**:
- PostgreSQL database (Supabase, Neon, or managed)
- Redis instance (Upstash, Redis Cloud)
- Environment variables configured
- Database migrations run on deployment

### Database Hosting

**Recommended**: Neon or Supabase
- Automatic backups
- Connection pooling
- Serverless scaling
- Free tier available

**Configuration**:
- Enable SSL connections
- Set up read replicas for scaling
- Configure backup retention
- Monitor query performance

## Success Criteria

The restructure will be considered successful when:

1. **Build Success**: Both `rythumowas.shop` and `medusa-backend` build without errors
2. **No Clerk References**: Zero imports or environment variables related to Clerk
3. **Functional Parity**: All farmer-portal features work in unified app
4. **Authentication Works**: Stack Auth protects all routes correctly
5. **Clean Codebase**: Fewer than 10 markdown files in root directory
6. **Documentation Updated**: All docs reflect new architecture
7. **Tests Pass**: All unit and integration tests pass
8. **Manual Testing**: All user flows work end-to-end

## Appendix

### Technology Stack

**Frontend**:
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Stack Auth SDK
- Radix UI components

**Backend**:
- Medusa 1.20
- TypeORM
- PostgreSQL
- Redis
- Express.js

**Development Tools**:
- pnpm (package manager)
- Vitest (testing)
- Playwright (E2E testing)
- ESLint + Prettier (code quality)

### Key Dependencies

**Frontend**:
- `@stackframe/stack`: Authentication
- `@medusajs/medusa-js`: Medusa client
- `@prisma/client`: Database ORM
- `@radix-ui/*`: UI primitives
- `zod`: Schema validation

**Backend**:
- `@medusajs/medusa`: Core framework
- `typeorm`: Database ORM
- `express`: HTTP server
- `cors`: CORS middleware
- `body-parser`: Request parsing

### Glossary

- **Route Group**: Next.js directory with parentheses that doesn't affect URL structure
- **ISR**: Incremental Static Regeneration, Next.js feature for updating static pages
- **JWT**: JSON Web Token, used for authentication
- **CORS**: Cross-Origin Resource Sharing, security feature for API access
- **Monorepo**: Single repository containing multiple related packages
- **Workspace**: pnpm feature for managing monorepo packages
