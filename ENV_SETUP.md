# Environment Variables Setup Guide

This guide documents all environment variables needed for the Rythu Mowa project.

## 📁 Projects Overview

The project consists of three main applications:
1. **rythumowas.shop** - Main customer storefront (Stack Auth)
2. **medusa-backend** - E-commerce backend API
3. **farmer-portal** - Farmer dashboard (redirects to main app)

---

## 1. rythumowas.shop Environment Variables

**Location:** `rythumowas.shop/.env`

Copy from: `rythumowas.shop/.env.example`

### Required Variables

```env
# Stack Auth Configuration
# Get these from https://stack-auth.com/ → Your Project → API Keys
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_client_key_here
STACK_SECRET_SERVER_KEY=your_secret_server_key_here

# Database Configuration
# PostgreSQL connection string (Neon, Supabase, Railway, or local)
DATABASE_URL="postgresql://user:password@localhost:5432/rythumowa?schema=public"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Optional Variables

```env
# Medusa Backend URL (if using Medusa)
NEXT_PUBLIC_MEDUSA_BACKEND_URL="http://localhost:9000"

# Bundle Analyzer (for production builds)
ANALYZE=false

# Node Environment
NODE_ENV=development
```

### Getting Stack Auth Keys

1. Go to [Stack Auth](https://stack-auth.com/)
2. Sign up or log in
3. Create a new project
4. Navigate to **API Keys** section
5. Copy:
   - Project ID → `NEXT_PUBLIC_STACK_PROJECT_ID`
   - Publishable Client Key → `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
   - Secret Server Key → `STACK_SECRET_SERVER_KEY`

### Database Setup Options

**Option 1: Neon (Recommended)**
- Go to https://neon.tech
- Create new project
- Copy connection string
- Use as `DATABASE_URL`

**Option 2: Supabase**
- Go to https://supabase.com
- Create new project
- Go to Settings → Database
- Copy connection string

**Option 3: Local PostgreSQL**
- Install PostgreSQL locally
- Create database: `createdb rythumowa`
- Use: `postgresql://user:password@localhost:5432/rythumowa`

---

## 2. medusa-backend Environment Variables

**Location:** `medusa-backend/.env`

Copy from: `medusa-backend/.env.example`

### Required Variables

```env
# Database Configuration
# PostgreSQL connection string for Medusa
DATABASE_URL="postgresql://user:password@localhost:5432/medusa-store?schema=public"

# Redis Configuration
# Required for event bus and cache
REDIS_URL="redis://localhost:6379"
```

### Optional Variables

```env
# CORS Configuration
# Comma-separated list of allowed origins
STORE_CORS="http://localhost:3000,http://localhost:8000"
ADMIN_CORS="http://localhost:7001,http://localhost:7000,http://localhost:9000"

# Medusa Admin Configuration
OPEN_BROWSER=true

# Node Environment
NODE_ENV=development
```

### Redis Setup

**Option 1: Local Redis**
```bash
# Install Redis
# Windows: Use WSL or Docker
# Mac: brew install redis
# Linux: sudo apt-get install redis-server

# Start Redis
redis-server
```

**Option 2: Redis Cloud**
- Go to https://redis.com/cloud
- Create free account
- Create database
- Copy connection URL

---

## 3. farmer-portal Environment Variables

**Location:** `farmer-portal/.env`

Copy from: `farmer-portal/.env.example`

### Required Variables

```env
# Main App URL
# Farmer portal redirects to main app for authentication
NEXT_PUBLIC_MAIN_APP_URL="http://localhost:3000"
```

### Optional Variables

```env
# API URL (if connecting to Medusa or other backend)
NEXT_PUBLIC_API_URL="http://localhost:9000"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3001"
```

**Note:** Farmer portal no longer uses authentication directly. It redirects users to the main app (`rythumowas.shop`) for authentication via Stack Auth.

---

## 🚀 Quick Setup

### Step 1: Copy Environment Files

```bash
# Main storefront
cd rythumowas.shop
cp .env.example .env

# Medusa backend
cd ../medusa-backend
cp .env.example .env

# Farmer portal
cd ../farmer-portal
cp .env.example .env
```

### Step 2: Fill in Values

1. **Stack Auth Keys** (for rythumowas.shop)
   - Get from https://stack-auth.com
   - Add to `rythumowas.shop/.env`

2. **Database URLs**
   - Set up PostgreSQL databases
   - Add connection strings to `.env` files

3. **Redis URL** (for medusa-backend)
   - Set up Redis instance
   - Add to `medusa-backend/.env`

### Step 3: Verify Setup

```bash
# Check environment files exist
ls rythumowas.shop/.env
ls medusa-backend/.env
ls farmer-portal/.env
```

---

## 🔒 Security Notes

### Never Commit `.env` Files

The following files should **never** be committed to git:
- `.env`
- `.env.local`
- `.env.production`
- Any file containing secrets

### Environment File Template

Only `.env.example` files should be committed. They contain:
- Placeholder values
- Documentation comments
- No actual secrets

### Production Deployment

For production (Vercel, Railway, etc.):
- Add environment variables through the platform's dashboard
- Never hardcode secrets in code
- Use different keys for production vs development

---

## 📋 Environment Variables Checklist

### rythumowas.shop
- [ ] `NEXT_PUBLIC_STACK_PROJECT_ID`
- [ ] `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
- [ ] `STACK_SECRET_SERVER_KEY`
- [ ] `DATABASE_URL`
- [ ] `NEXT_PUBLIC_APP_URL`
- [ ] `NEXT_PUBLIC_MEDUSA_BACKEND_URL` (optional)

### medusa-backend
- [ ] `DATABASE_URL`
- [ ] `REDIS_URL`
- [ ] `STORE_CORS` (optional)
- [ ] `ADMIN_CORS` (optional)

### farmer-portal
- [ ] `NEXT_PUBLIC_MAIN_APP_URL`
- [ ] `NEXT_PUBLIC_API_URL` (optional)

---

## 🔧 Troubleshooting

### Stack Auth Not Working

**Issue:** Authentication not loading

**Solution:**
1. Verify all three Stack Auth keys are set correctly
2. Check that keys start with correct prefixes
3. Ensure `NEXT_PUBLIC_` prefix is used for client-side keys
4. Restart development server after changing `.env`

### Database Connection Errors

**Issue:** Cannot connect to database

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Check database is running
3. Test connection string format
4. For cloud databases, check IP whitelist/security settings

### Redis Connection Errors

**Issue:** Medusa backend cannot connect to Redis

**Solution:**
1. Verify Redis is running: `redis-cli ping` (should return `PONG`)
2. Check `REDIS_URL` format
3. For Redis Cloud, verify connection string includes password

---

## 📚 Additional Resources

- [Stack Auth Documentation](https://docs.stack-auth.com/)
- [Neon Database Setup](https://neon.tech/docs)
- [Medusa.js Documentation](https://docs.medusajs.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

## ✅ Verification

After setting up all environment variables:

1. **Test rythumowas.shop:**
   ```bash
   cd rythumowas.shop
   pnpm dev
   # Visit http://localhost:3000
   # Check that "Sign In" button appears
   ```

2. **Test medusa-backend:**
   ```bash
   cd medusa-backend
   npm run dev
   # Visit http://localhost:9000/app (Admin panel)
   ```

3. **Test farmer-portal:**
   ```bash
   cd farmer-portal
   npm run dev
   # Visit http://localhost:3001
   # Should redirect to main app for auth
   ```

---

**Last Updated:** 2024
**Maintained by:** Rythu Mowa Development Team

