# RythuMowa Farmer Portal

Dashboard for farmers to manage their products, orders, and earnings.

## Features

- 🔐 Clerk authentication
- 📊 Dashboard with stats
- 📦 Product management
- 🛍️ Order tracking
- 💰 Earnings overview
- 👤 Profile management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Get Clerk keys:
   - Go to https://clerk.com
   - Create a new application
   - Copy your keys

3. Configure environment:
```bash
cp .env.local.example .env.local
# Add your Clerk keys
```

4. Start development server:
```bash
npm run dev
```

Portal runs on: http://localhost:3001

## Pages

- `/` - Landing page with authentication
- `/dashboard` - Main dashboard
- `/products` - Product management (coming soon)
- `/orders` - Order tracking (coming soon)
- `/profile` - Profile settings (coming soon)

## Integration

The farmer portal connects to the Medusa backend API for:
- Product CRUD operations
- Order management
- Profile updates
- Earnings tracking

## Authentication

Uses Clerk for secure authentication:
- Sign up / Sign in
- User management
- Session handling
- Protected routes
