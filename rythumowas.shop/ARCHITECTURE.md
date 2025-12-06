# Rythu Mowa - Satya's FARC Data Architecture

## Overview

Rythu Mowa is part of the **Vyomm/Satya's FARC ecosystem** - a unified platform for health, commerce, and community services across India.

## Architecture Principles

### 1. Unified Identity Layer
- **Clerk** as the primary identity provider across all Vyomm apps
- Single sign-on (SSO) across health (OGBG), commerce (Rythu Mowa), and future apps
- User mapping table in core database links Clerk IDs to app-specific profiles

### 2. Database Strategy

#### Neon (Primary) - Commerce & Core
- **Database**: `vyomm-commerce`
- **Schemas**:
  - `public` - Core user identity mapping
  - `rythu` - Marketplace (farmers, products, orders)
  - Future: `basics`, `supply-chain`, etc.

#### Supabase (Secondary) - Health Vertical
- **Project**: `ogbg-health`
- **Purpose**: Health profiles, protocols, sessions
- **Integration**: Linked to Neon core via `ogbgUserId` field

### 3. Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Clerk (Identity)                      │
│              clerk_user_id (primary key)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
┌────────▼────────┐         ┌────────▼────────┐
│  Neon (Core DB) │         │   Supabase      │
│                 │         │   (OGBG Health) │
│  User Table:    │         │                 │
│  - id           │◄────────┤  ogbgUserId     │
│  - clerkId      │  sync   │  (optional)     │
│  - email        │         │                 │
│  - role         │         └─────────────────┘
│  - ogbgUserId   │
│                 │
│  Farmer Table   │
│  Product Table  │
│  Order Table    │
└─────────────────┘
```

## Database Schema

### Core Identity (Neon)

```prisma
model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique  // Clerk user ID
  email         String    @unique
  name          String?
  role          Role      @default(CUSTOMER)
  
  // Cross-app linking
  ogbgUserId    String?   @unique  // Link to OGBG Supabase
  
  // Rythu Mowa relations
  farmer        Farmer?
  orders        Order[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  ADMIN
  FARMER
  CUSTOMER
}
```

### Farmer Marketplace (Neon)

```prisma
model Farmer {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id])
  
  farmName      String
  location      String
  district      String
  phone         String
  description   String?
  verified      Boolean   @default(false)
  
  products      Product[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Product {
  id            String    @id @default(cuid())
  name          String
  description   String
  price         Float
  image         String
  category      String
  inStock       Boolean   @default(true)
  quantity      Int       @default(0)
  
  farmerId      String
  farmer        Farmer    @relation(fields: [farmerId], references: [id])
  
  orderItems    OrderItem[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

## Authentication Flow

### 1. User Signs Up/In (Clerk)
```
User → Clerk Sign In → Clerk Webhook → Neon User Table
```

### 2. Farmer Registration
```
Clerk User → /farmer/register → Create Farmer Profile → Update role to FARMER
```

### 3. Cross-App Identity
```
OGBG User → Links to Clerk → Syncs to Neon → ogbgUserId populated
```

## API Routes

### Clerk Webhook
- **Route**: `/api/webhooks/clerk`
- **Purpose**: Sync Clerk users to Neon database
- **Events**: `user.created`, `user.updated`, `user.deleted`

### Farmer Profile
- **Route**: `/api/farmer/profile`
- **Methods**: `POST` (create), `GET` (read)
- **Auth**: Clerk `currentUser()`

## Deployment Architecture

### Production Stack
```
┌──────────────────────────────────────────────────────┐
│                    Vercel Edge                        │
│  - Next.js App Router                                 │
│  - Clerk Middleware (proxy.ts)                        │
│  - API Routes                                         │
└────────────┬─────────────────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐      ┌────▼─────┐
│  Neon  │      │  Clerk   │
│  DB    │      │  Auth    │
└────────┘      └──────────┘
```

### Environment Variables
```bash
# Neon Database
DATABASE_URL=postgresql://...neon.tech/rythumowa

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...
```

## Agentic AI Integration (Future)

### AI Services Layer
```
┌─────────────────────────────────────────────────┐
│           Agentic AI Services (VPS)              │
│  - Farmer advisory agents                        │
│  - Pricing optimization                          │
│  - Crop recommendations                          │
│  - Health-food bridges (OGBG ↔ Rythu Mowa)      │
└──────────────┬──────────────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
┌─────▼─────┐    ┌─────▼─────┐
│   Neon    │    │ Supabase  │
│ (Commerce)│    │  (Health) │
└───────────┘    └───────────┘
```

### Vector Storage
- **Option 1**: pgvector extension in Neon
- **Option 2**: Separate Qdrant/Pinecone instance
- **Purpose**: Product embeddings, farmer knowledge base, RAG

## Scaling Strategy

### Phase 1 (Current - MVP)
- Single Neon database
- Clerk authentication
- Vercel deployment

### Phase 2 (Growth)
- Database branching for dev/staging/prod
- Read replicas for analytics
- CDN for product images (Cloudflare R2)

### Phase 3 (Scale)
- Multi-region deployment
- Separate analytics database
- Event-driven architecture (message queues)

## Security

### Data Protection
- Row Level Security (RLS) via Prisma middleware
- Clerk handles auth tokens (JWT)
- API routes protected by Clerk middleware
- Webhook signature verification

### Compliance
- GDPR-ready (user data export/deletion)
- Data residency (India-specific deployments)
- Audit logs for admin actions

## Monitoring

### Observability Stack
- **Vercel Analytics**: Performance monitoring
- **Neon Metrics**: Database performance
- **Clerk Dashboard**: Auth metrics
- **Sentry** (future): Error tracking

## Cost Optimization

### Neon Benefits
- Serverless: Scale-to-zero for dev/staging
- Branching: No cost for temporary test databases
- Storage separation: Cheaper than traditional Postgres

### Estimated Monthly Costs (MVP)
- Neon: $0-20 (free tier → starter)
- Clerk: $0-25 (free tier → pro)
- Vercel: $0-20 (hobby → pro)
- **Total**: $0-65/month

## Migration Path

### From Supabase to Neon (if needed)
1. Export Supabase data (pg_dump)
2. Create Neon branch
3. Import data
4. Update connection strings
5. Test thoroughly
6. Switch DNS/environment variables

### From Neon to Self-Hosted (if needed)
1. Neon is standard Postgres
2. Export via pg_dump
3. Import to any Postgres instance
4. Update DATABASE_URL
5. No code changes required

---

**Built for**: Satya's FARC ecosystem
**Maintained by**: Vyomm team
**Last updated**: December 2024
