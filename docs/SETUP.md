# Setup Guide

## Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL database

## Installation

1. **Clone and install**
```bash
pnpm install
```

2. **Database Setup**
```bash
# Create PostgreSQL databases
createdb rythumowa_main
createdb rythumowa_medusa

# Run migrations
cd rythumowas.shop
pnpm db:push

cd ../medusa-backend
pnpm migration:run
```

3. **Environment Variables**

Copy `.env.example` to `.env` in each project:

**rythumowas.shop/.env**
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_MEDUSA_URL="http://localhost:9000"
```

**farmer-portal/.env**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_API_URL="http://localhost:9000"
```

**medusa-backend/.env**
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
COOKIE_SECRET="your-secret"
```

4. **Start Development**
```bash
# Terminal 1 - Backend
cd medusa-backend
pnpm dev

# Terminal 2 - Main shop
cd rythumowas.shop
pnpm dev

# Terminal 3 - Farmer portal
cd farmer-portal
pnpm dev
```

## Clerk Setup

1. Create account at clerk.com
2. Create application
3. Enable email/password authentication
4. Copy API keys to .env files
5. Configure webhooks for user sync

## Troubleshooting

**Build errors**: Clear `.next` folders and rebuild
**Database errors**: Check connection strings and run migrations
**Port conflicts**: Change ports in package.json scripts
