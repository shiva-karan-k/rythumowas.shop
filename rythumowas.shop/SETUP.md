# Rythu Mowa Setup Guide

## Project Structure

- **/** (root) - About Rythu Mowa landing page
- **/shop** - Customer storefront (your Bolt design)
- **/admin** - Admin dashboard for managing farmers & products
- **/farmer** - Farmer dashboard for managing their products

## Quick Start

### 1. Install Dependencies

```bash
cd rythumowas.shop
pnpm install
```

### 2. Setup Database

Create a PostgreSQL database and update `.env`:

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Push Database Schema

```bash
pnpm db:push
```

### 4. Run Development Server

```bash
pnpm dev
```

Visit:
- http://localhost:3000 - Main landing page
- http://localhost:3000/shop - Storefront
- http://localhost:3000/admin - Admin dashboard
- http://localhost:3000/farmer - Farmer dashboard

## Database Schema

### Models:
- **User** - Authentication (Admin, Farmer, Customer)
- **Farmer** - Farmer profiles with verification
- **Product** - Products with farmer relationship
- **Order** - Customer orders
- **OrderItem** - Order line items

## Features Implemented

✅ Landing page explaining Rythu Mowa
✅ Storefront with your Bolt design
✅ Database schema for marketplace
✅ Farmer onboarding structure
✅ Admin management structure

## Next Steps

1. **Authentication**: Implement NextAuth.js for login/signup
2. **Farmer Onboarding**: Build registration form
3. **Product Management**: CRUD operations for farmers
4. **Admin Dashboard**: Approve farmers, manage products
5. **Payment Integration**: Razorpay/Stripe
6. **Image Upload**: Cloudinary/S3 for product images

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Database
- Use Neon, Supabase, or Railway for PostgreSQL

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **UI**: Tailwind CSS + Radix UI
- **Deployment**: Vercel
