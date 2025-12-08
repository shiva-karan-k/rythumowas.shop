# 🚀 Installation Guide

## Prerequisites

- Node.js 20+
- PostgreSQL
- Redis
- pnpm 10+

---

## Quick Install

```bash
# 1. Install dependencies
pnpm install

# 2. Install Medusa client in frontend
cd rythumowas.shop
pnpm add @medusajs/medusa-js

# 3. Set up environment files
cp rythumowas.shop/.env.example rythumowas.shop/.env
cp medusa-backend/.env.example medusa-backend/.env

# 4. Configure Stack Auth
# Edit rythumowas.shop/.env and add your Stack Auth keys
# Get keys from: https://stack-auth.com

# 5. Configure databases
# Edit both .env files with your PostgreSQL and Redis URLs

# 6. Run Medusa migrations
cd medusa-backend
pnpm migrate

# 7. Push Prisma schema
cd ../rythumowas.shop
pnpm prisma db push

# 8. Start development
cd ..
pnpm dev
```

---

## Detailed Setup

### 1. Stack Auth Setup

1. Go to https://stack-auth.com
2. Create a new project
3. Get your API keys
4. Add to `rythumowas.shop/.env`:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_key
STACK_SECRET_SERVER_KEY=your_secret
```

### 2. Database Setup

**Option A: Neon (Recommended)**
1. Go to https://neon.tech
2. Create project
3. Copy connection string
4. Add to both `.env` files

**Option B: Local PostgreSQL**
```bash
createdb rythumowa
```

Add to `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/rythumowa
```

### 3. Redis Setup

**Option A: Local Redis**
```bash
# Windows: Download from GitHub
# Mac: brew install redis
# Linux: sudo apt install redis

redis-server
```

**Option B: Cloud Redis (Upstash)**
1. Go to https://upstash.com
2. Create Redis database
3. Copy connection string

Add to `medusa-backend/.env`:
```env
REDIS_URL=redis://localhost:6379
```

### 4. Run Migrations

```bash
# Medusa migrations
cd medusa-backend
pnpm migrate

# Prisma schema
cd ../rythumowas.shop
pnpm prisma db push
```

### 5. Start Development

```bash
# From root directory
pnpm dev

# Or individually:
pnpm dev:backend  # Terminal 1
pnpm dev:shop     # Terminal 2
```

---

## Access Points

- **Frontend**: http://localhost:3000
- **Medusa Admin**: http://localhost:9000/app
- **Medusa API**: http://localhost:9000

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 9000
npx kill-port 9000
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### Redis Connection Error
- Verify Redis is running
- Check REDIS_URL in .env
- Try: `redis-cli ping` (should return PONG)

### TypeScript Errors
```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

---

## Environment Variables

### rythumowas.shop/.env
```env
# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=

# Database
DATABASE_URL=postgresql://...

# Medusa Backend
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### medusa-backend/.env
```env
# Database
DATABASE_URL=postgresql://...

# Redis
REDIS_URL=redis://localhost:6379

# CORS
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000

# JWT (generate with: openssl rand -base64 32)
JWT_SECRET=
COOKIE_SECRET=
```

---

## Verification

After installation, verify:

1. **Frontend loads**: http://localhost:3000
2. **No console errors**: Check browser console
3. **Stack Auth works**: Try sign in
4. **Medusa admin loads**: http://localhost:9000/app
5. **API responds**: http://localhost:9000/health

---

## Next Steps

1. Create admin user in Medusa
2. Add test products
3. Test farmer registration
4. Test customer flow
5. Configure payment providers

---

**Need help?** Check `NEXT_STEPS.md` for detailed guidance.
