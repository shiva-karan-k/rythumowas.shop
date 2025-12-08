# 🔧 Configuration Guide - Step by Step

Follow these steps in order. I'll guide you through each one!

---

## ✅ Step 1: Medusa Client - DONE!

The `@medusajs/medusa-js` package has been installed successfully.

---

## 📝 Step 2: Configure Stack Auth

### What is Stack Auth?
Stack Auth handles all user authentication (sign up, sign in, user management).

### Get Your Keys:

1. **Go to**: https://stack-auth.com
2. **Sign up** with your email or GitHub
3. **Create a new project**:
   - Project name: "RythuMowa Marketplace"
   - Click "Create Project"
4. **Get your API keys**:
   - Go to "API Keys" in the sidebar
   - You'll see 3 keys:
     - `Project ID`
     - `Publishable Client Key`
     - `Secret Server Key`
5. **Copy these keys** - you'll need them next

### Add Keys to Your .env:

Open `rythumowas.shop/.env` and replace these lines:

```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_client_key_here
STACK_SECRET_SERVER_KEY=your_secret_server_key_here
```

**With your actual keys from Stack Auth**

✅ **Done?** Move to Step 3

---

## 🗄️ Step 3: Set Up Database (PostgreSQL)

### Option A: Neon (Recommended - Easiest)

**Why Neon?**
- ✅ Free tier (no credit card)
- ✅ No installation needed
- ✅ Works immediately
- ✅ Automatic backups

**Steps:**

1. **Go to**: https://neon.tech
2. **Sign up** (free, no credit card)
3. **Create a new project**:
   - Project name: "rythumowa"
   - Region: Choose closest to you
   - Click "Create Project"
4. **Copy connection string**:
   - You'll see a connection string like:
   ```
   postgresql://user:password@ep-xxx-xxx.neon.tech/neondb?sslmode=require
   ```
5. **Add to BOTH .env files**:
   
   **rythumowas.shop/.env**:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
   ```
   
   **medusa-backend/.env**:
   ```env
   DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb"
   ```
   
   ⚠️ **Important**: Use the SAME URL in both files!

✅ **Done?** Move to Step 4

---

### Option B: Local PostgreSQL (If you prefer local)

**Only if you want to run PostgreSQL on your computer**

1. **Install PostgreSQL**:
   - Windows: https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt install postgresql`

2. **Start PostgreSQL**:
   - Windows: Should start automatically
   - Mac/Linux: `brew services start postgresql` or `sudo service postgresql start`

3. **Create database**:
   ```bash
   createdb rythumowa
   ```

4. **Add to BOTH .env files**:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/rythumowa"
   ```
   
   Replace `password` with your PostgreSQL password

✅ **Done?** Move to Step 4

---

## 🔴 Step 4: Set Up Redis (Required for Medusa)

### Option A: Upstash (Recommended - Easiest)

**Why Upstash?**
- ✅ Free tier
- ✅ No installation
- ✅ Works immediately

**Steps:**

1. **Go to**: https://upstash.com
2. **Sign up** (free)
3. **Create Redis database**:
   - Click "Create Database"
   - Name: "rythumowa-redis"
   - Region: Choose closest to you
   - Click "Create"
4. **Copy connection string**:
   - Click on your database
   - Copy the "Redis URL" (starts with `redis://`)
5. **Add to medusa-backend/.env**:
   ```env
   REDIS_URL="redis://default:password@xxx.upstash.io:6379"
   ```

✅ **Done?** Move to Step 5

---

### Option B: Local Redis (If you prefer local)

**Windows:**
1. Download: https://github.com/microsoftarchive/redis/releases
2. Extract and run `redis-server.exe`
3. Use: `REDIS_URL="redis://localhost:6379"`

**Mac:**
```bash
brew install redis
brew services start redis
```
Use: `REDIS_URL="redis://localhost:6379"`

**Linux:**
```bash
sudo apt install redis
sudo service redis-server start
```
Use: `REDIS_URL="redis://localhost:6379"`

✅ **Done?** Move to Step 5

---

## 🔐 Step 5: Generate Security Secrets

You need two random secrets for Medusa backend security.

### Generate Secrets:

**Option A: Online Generator (Easiest)**
1. Go to: https://generate-secret.vercel.app/32
2. Click "Generate" twice to get two different secrets
3. Copy each one

**Option B: Command Line**
```bash
# Run this twice to get two different secrets
openssl rand -base64 32
```

### Add to medusa-backend/.env:

```env
JWT_SECRET="paste-first-secret-here"
COOKIE_SECRET="paste-second-secret-here"
```

✅ **Done?** Move to Step 6

---

## 📋 Step 6: Verify Your Configuration

### Check rythumowas.shop/.env:

Should have:
- ✅ 3 Stack Auth keys (from stack-auth.com)
- ✅ DATABASE_URL (from Neon or local)
- ✅ NEXT_PUBLIC_MEDUSA_BACKEND_URL="http://localhost:9000"
- ✅ NEXT_PUBLIC_APP_URL="http://localhost:3000"

### Check medusa-backend/.env:

Should have:
- ✅ DATABASE_URL (same as rythumowas.shop)
- ✅ REDIS_URL (from Upstash or local)
- ✅ JWT_SECRET (generated secret)
- ✅ COOKIE_SECRET (generated secret)
- ✅ STORE_CORS="http://localhost:3000"
- ✅ ADMIN_CORS="http://localhost:9000"

---

## 🚀 Step 7: Run Database Migrations

Now that everything is configured, let's set up the database tables:

```bash
# 1. Push Prisma schema (creates tables for users, farmers, products)
cd rythumowas.shop
pnpm prisma db push

# 2. Run Medusa migrations (creates tables for orders, cart, etc)
cd ../medusa-backend
pnpm migrate
```

✅ **Done?** Move to Step 8

---

## 🎉 Step 8: Start Your Application!

Open TWO terminals:

**Terminal 1 - Start Medusa Backend:**
```bash
cd medusa-backend
pnpm dev
```

Wait until you see: "Server is ready on port 9000"

**Terminal 2 - Start Next.js Frontend:**
```bash
cd rythumowas.shop
pnpm dev
```

Wait until you see: "Ready on http://localhost:3000"

---

## 🌐 Access Your Application

- **Frontend**: http://localhost:3000
- **Medusa Admin**: http://localhost:9000/app
- **Medusa API**: http://localhost:9000

---

## ✅ Success Checklist

- [ ] Stack Auth keys configured
- [ ] PostgreSQL database set up (Neon or local)
- [ ] Redis set up (Upstash or local)
- [ ] Security secrets generated
- [ ] Both .env files configured
- [ ] Prisma migrations run
- [ ] Medusa migrations run
- [ ] Backend running on port 9000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000

---

## 🆘 Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL is correct
- Verify database exists
- Test connection: `psql "your-database-url"`

### "Cannot connect to Redis"
- Check REDIS_URL is correct
- Verify Redis is running: `redis-cli ping` (should return PONG)

### "Port already in use"
```bash
# Kill process on port
npx kill-port 3000
npx kill-port 9000
```

### "Module not found" errors
```bash
# Reinstall dependencies
pnpm install
```

---

**Need help?** Check the error message - it usually tells you what's missing!
