# Car Junction LLC - Developer Documentation

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Reference](#api-reference)
6. [Pages & Routes](#pages--routes)
7. [Components](#components)
8. [Authentication](#authentication)
9. [Email Integration](#email-integration)
10. [Development Guide](#development-guide)
11. [Deployment](#deployment)

---

## Overview

Car Junction LLC is a full-featured car dealership website built with Next.js 16 (App Router). It includes:
- Public vehicle browsing with search/filter
- Multiple customer inquiry forms
- Multi-step credit application
- Admin panel for inventory management
- Email notifications via Resend
- PostgreSQL database

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | React framework (App Router) |
| React | 19 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| PostgreSQL | 15+ | Database (Neon-backed) |
| Resend | 1.x | Email service |
| Radix UI | Latest | UI components |
| bcryptjs | 2.x | Password hashing |
| Lucide React | Latest | Icons |

---

## Project Structure

```
car-junction/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   │
│   ├── admin/                   # Admin panel
│   │   ├── page.tsx            # Dashboard
│   │   ├── login/page.tsx      # Login page
│   │   ├── vehicles/           # Vehicle management
│   │   │   ├── page.tsx       # List vehicles
│   │   │   ├── new/page.tsx   # Add vehicle
│   │   │   └── [id]/page.tsx  # Edit vehicle
│   │   ├── categories/page.tsx # Brand/category management
│   │   ├── inquiries/page.tsx  # View inquiries
│   │   ├── applications/page.tsx # View credit apps
│   │   └── settings/page.tsx   # Admin settings
│   │
│   ├── api/                     # API routes
│   │   ├── init-db/route.ts    # Database initialization
│   │   ├── vehicles/           # Vehicle CRUD
│   │   ├── categories/         # Category CRUD
│   │   ├── brands/route.ts     # Get brands
│   │   ├── contact/route.ts    # Contact form
│   │   ├── car-finder/route.ts # Car finder form
│   │   ├── export-query/route.ts # Export query form
│   │   ├── inquiries/route.ts  # Inquiries
│   │   ├── applications/route.ts # Credit applications
│   │   └── admin/              # Admin auth routes
│   │
│   ├── vehicles/               # Public vehicle pages
│   │   ├── page.tsx           # Browse vehicles
│   │   └── [id]/page.tsx      # Vehicle detail
│   │
│   ├── contact/page.tsx        # Contact page
│   ├── finder/page.tsx         # Car finder form
│   ├── apply-online/page.tsx   # Credit application
│   ├── export-query/page.tsx   # Export query form
│   ├── about/page.tsx          # About us
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of service
│   ├── cookies/page.tsx        # Cookie policy
│   └── licensing/page.tsx      # Licensing info
│
├── components/                  # React components
│   ├── ui/                     # Shadcn UI components
│   ├── header.tsx              # Site header/nav
│   ├── footer.tsx              # Site footer
│   ├── hero-section.tsx        # Homepage hero
│   ├── features-section.tsx    # Features section
│   ├── brand-section.tsx       # Brand logos
│   ├── vehicle-card.tsx        # Vehicle display card
│   ├── floating-actions.tsx    # WhatsApp & scroll buttons
│   ├── captcha.tsx             # Math captcha component
│   └── structured-data.tsx     # SEO structured data
│
├── lib/                        # Utility libraries
│   ├── db.ts                   # Database connection
│   ├── auth.ts                 # Authentication helpers
│   └── email.ts                # Email functions
│
├── hooks/                      # Custom React hooks
│   └── use-toast.ts            # Toast notifications
│
├── public/                     # Static assets
│   ├── brands/                 # Brand logo images
│   └── images/                 # Other images
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    └── next.config.ts
```

---

## Database Schema

### Tables

#### `vehicles`
```sql
id              SERIAL PRIMARY KEY
title           VARCHAR(255)
make            VARCHAR(100)
model           VARCHAR(100)
year            INTEGER
price           DECIMAL(10,2)
mileage         INTEGER
fuel_type       VARCHAR(50)
transmission    VARCHAR(50)
body_type       VARCHAR(50)
exterior_color  VARCHAR(50)
interior_color  VARCHAR(50)
vin             VARCHAR(50)
stock_number    VARCHAR(50)
description     TEXT
features        TEXT[]
images          TEXT[]
status          VARCHAR(20) DEFAULT 'available'
category_id     INTEGER REFERENCES categories(id)
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()
```

#### `categories`
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(100)
slug            VARCHAR(100) UNIQUE
image           VARCHAR(500)
vehicle_count   INTEGER DEFAULT 0
created_at      TIMESTAMP DEFAULT NOW()
```

#### `inquiries`
```sql
id              SERIAL PRIMARY KEY
first_name      VARCHAR(100)
last_name       VARCHAR(100)
email           VARCHAR(255)
phone           VARCHAR(50)
message         TEXT
vehicle_id      INTEGER REFERENCES vehicles(id)
inquiry_type    VARCHAR(50)
status          VARCHAR(20) DEFAULT 'new'
created_at      TIMESTAMP DEFAULT NOW()
```

#### `applications`
```sql
id              SERIAL PRIMARY KEY
buyer_data      JSONB
co_buyer_data   JSONB
vehicle_id      INTEGER
status          VARCHAR(20) DEFAULT 'pending'
created_at      TIMESTAMP DEFAULT NOW()
```

#### `admin_users`
```sql
id              SERIAL PRIMARY KEY
username        VARCHAR(100) UNIQUE
password_hash   VARCHAR(255)
created_at      TIMESTAMP DEFAULT NOW()
```

---

## API Reference

### Public APIs

#### Vehicles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles` | List vehicles (with filters) |
| GET | `/api/vehicles/[id]` | Get single vehicle |
| GET | `/api/brands` | Get all brands with counts |
| GET | `/api/vehicle-options` | Get filter dropdown options |

**Query Parameters for `/api/vehicles`:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `make` - Filter by make
- `model` - Filter by model
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `minYear` - Minimum year
- `maxYear` - Maximum year
- `search` - Keyword search

#### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories |

#### Forms
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| POST | `/api/car-finder` | Submit car finder request |
| POST | `/api/export-query` | Submit export query |
| POST | `/api/inquiries` | Submit vehicle inquiry |
| POST | `/api/applications` | Submit credit application |

### Admin APIs (Requires Authentication)

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/check` | Check session status |
| POST | `/api/admin/change-password` | Change password |

#### Vehicle Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/vehicles` | Create vehicle |
| PUT | `/api/vehicles/[id]` | Update vehicle |
| DELETE | `/api/vehicles/[id]` | Delete vehicle |

#### Category Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/[id]` | Update category |
| DELETE | `/api/categories/[id]` | Delete category |

#### Data Access
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inquiries` | List all inquiries |
| GET | `/api/applications` | List all applications |

---

## Pages & Routes

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, features, brands |
| `/vehicles` | Browse all vehicles with filters |
| `/vehicles/[id]` | Individual vehicle details |
| `/contact` | Contact form page |
| `/finder` | Car finder request form |
| `/apply-online` | Multi-step credit application |
| `/export-query` | Vehicle export query form |
| `/about` | About the dealership |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/cookies` | Cookie policy |
| `/licensing` | Licensing information |

### Admin Pages

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login page |
| `/admin` | Dashboard with stats |
| `/admin/vehicles` | Vehicle list management |
| `/admin/vehicles/new` | Add new vehicle |
| `/admin/vehicles/[id]` | Edit existing vehicle |
| `/admin/categories` | Manage brands/categories |
| `/admin/inquiries` | View customer inquiries |
| `/admin/applications` | View credit applications |
| `/admin/settings` | Change admin password |

---

## Components

### Layout Components
- `Header` - Navigation bar with logo and menu
- `Footer` - Site footer with links, contact info, map
- `FloatingActions` - WhatsApp button and scroll-to-top

### Page Components
- `HeroSection` - Homepage hero with search
- `FeaturesSection` - Feature cards section
- `BrandSection` - Brand logos grid
- `VehicleCard` - Vehicle listing card

### Form Components
- `Captcha` - Math-based security captcha

### UI Components (Shadcn)
Located in `components/ui/`:
- Button, Input, Label, Select
- Card, Dialog, Sheet
- Table, Tabs, Toast
- And more...

---

## Authentication

### Admin Login
- **URL:** `/admin/login`
- **Default Credentials:** 
  - Username: `admin`
  - Password: `admin123`

### Session Management
- Uses HTTP-only cookies for security
- Session stored in `admin_session` cookie
- 24-hour session expiry
- Password hashed with bcryptjs

### Protected Routes
All `/admin/*` routes (except login) check for valid session via `/api/admin/check`

---

## Email Integration

### Configuration
Email is handled through Replit's Resend integration connector. No API key needed in environment variables.

### Email Functions (lib/email.ts)
```typescript
sendInquiryEmail(data)      // Vehicle inquiries
sendContactEmail(data)       // Contact form
sendCarFinderEmail(data)     // Car finder requests
sendApplicationEmail(data)   // Credit applications
```

### All emails sent to:
`cjunctionllc@gmail.com`

---

## Development Guide

### Initial Setup
```bash
# Install dependencies
npm install

# Initialize database (first time only)
# Visit: http://localhost:5000/api/init-db

# Start development server
npm run dev
```

### Environment Variables
Managed automatically by Replit:
- `DATABASE_URL` - PostgreSQL connection
- `SESSION_SECRET` - Admin session security
- Resend API via Replit connector

### Key Commands
```bash
npm run dev      # Development server (port 5000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding a New Vehicle (Admin)
1. Login at `/admin/login`
2. Go to Vehicles > Add New
3. Fill in vehicle details
4. Upload images (URLs)
5. Save

### Color Scheme
Primary brand color: `#C74B3F` (soft coral red)
Hover state: `#b33f35`

---

## Deployment

### Replit Deployment
1. Click "Deploy" in Replit
2. Choose deployment type (Autoscale recommended)
3. Configure build: `npm run build`
4. Configure run: `npm run start`

### Other Platforms
Required environment variables:
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=random-secret-key
RESEND_API_KEY=re_...  # If not using Replit connector
```

### Build Output
- Static pages pre-rendered
- API routes as serverless functions
- Optimized for edge deployment

---

## Troubleshooting

### Admin Login Not Working
```sql
-- Delete and reinitialize admin user
DELETE FROM admin_users WHERE username = 'admin';
-- Then visit /api/init-db
```

### Database Connection Issues
- Check `DATABASE_URL` environment variable
- Ensure PostgreSQL is running
- Visit `/api/init-db` to reinitialize

### Emails Not Sending
- Verify Resend integration is connected in Replit
- Check server logs for errors
- Test with `/api/contact` POST request

---

## Contact

- **Business Email:** cjunctionllc@gmail.com
- **WhatsApp:** +1 (214) 215-6273
- **Address:** 2435 Glenda Lane Ste 4, Dallas, Texas 75229
