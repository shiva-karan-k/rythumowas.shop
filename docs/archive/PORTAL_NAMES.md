# 🌾 RythuMowa Marketplace - Portal Names

## Portal Branding

### 1. RythuMowa Portal (రైతు మోవ పోర్టల్)
**For:** Farmers  
**Port:** 3001  
**URL:** http://localhost:3001  
**Purpose:** Farmer dashboard to manage products, orders, and earnings

**Features:**
- Product management
- Order tracking
- Earnings dashboard
- Profile settings
- Clerk authentication

---

### 2. Janulu Portal (జనులు పోర్టల్)
**For:** Customers  
**Port:** 3002  
**URL:** http://localhost:3002  
**Purpose:** Customer marketplace to browse and buy products

**Features:**
- Product browsing
- Shopping cart
- Checkout
- Order tracking
- Bolt UI design

---

## Name Meanings

**RythuMowa** (రైతు మోవ)
- రైతు (Rythu) = Farmer
- మోవ (Mowa) = Platform/Movement
- **Meaning:** "Farmer's Platform"

**Janulu** (జనులు)
- జనులు (Janulu) = People/Customers
- **Meaning:** "People's Portal"

---

## Architecture

```
┌─────────────────────────────────────┐
│     RythuMowa Portal (3001)         │
│     రైతు మోవ పోర్టల్                │
│     For Farmers                     │
│     - Manage Products               │
│     - Track Orders                  │
│     - View Earnings                 │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│     Medusa Backend (9000)           │
│     Commerce Engine                 │
│     - Products                      │
│     - Orders                        │
│     - Payments                      │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│     Janulu Portal (3002)            │
│     జనులు పోర్టల్                   │
│     For Customers                   │
│     - Browse Products               │
│     - Shopping Cart                 │
│     - Checkout                      │
└─────────────────────────────────────┘
```

---

## Quick Access

| Portal | Telugu Name | URL | Purpose |
|--------|-------------|-----|---------|
| RythuMowa | రైతు మోవ పోర్టల్ | http://localhost:3001 | Farmers |
| Janulu | జనులు పోర్టల్ | http://localhost:3002 | Customers |

---

## Branding Colors

**RythuMowa Portal:**
- Primary: Green (#378365)
- Accent: Light Green
- Theme: Agricultural, Professional

**Janulu Portal:**
- Primary: Green (#378365)
- Accent: Orange (#ffa96e)
- Yellow: (#fff0d1)
- Theme: Warm, Inviting, Shopping

---

**Both portals share:**
- Same Clerk authentication
- Same user database
- Same Medusa backend
- Unified RythuMowa brand family
