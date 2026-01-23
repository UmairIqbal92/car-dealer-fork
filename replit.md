# Car Junction LLC

## Overview
A complete Next.js web application for Car Junction LLC, a car dealership website with an admin panel for managing inventory, categories, and customer inquiries. Features database-driven vehicle listings, working contact/inquiry forms with email integration, search/filter functionality, and responsive design.

**For complete developer documentation, see: `DEVELOPER_DOCS.md`**

## Tech Stack
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS v4
- PostgreSQL (Neon) for database
- Resend for email integration
- Radix UI components
- bcryptjs for password hashing

## Quick Start
```bash
npm install
npm run dev
# Visit /api/init-db to initialize database
```

## Admin Panel
- **URL:** /admin
- **Credentials:** username `admin`, password `admin123`
- Features: Vehicle CRUD, category management, inquiry viewer, application viewer

## Key Files
- `lib/db.ts` - Database connection
- `lib/email.ts` - Email functions
- `lib/auth.ts` - Authentication helpers
- `lib/seo-config.ts` - **SEO settings (Google Console, Analytics, etc.)**
- `components/` - React components
- `app/api/` - API routes

## SEO Configuration (lib/seo-config.ts)
Edit this file to add your verification codes and tracking IDs:
- `googleVerification` - Google Search Console verification code
- `bingVerification` - Bing Webmaster verification code
- `googleTagManagerId` - Google Tag Manager ID (GTM-XXXXX)
- `googleAnalyticsId` - Google Analytics ID (G-XXXXXX)
- `facebookPixelId` - Facebook Pixel ID
- Social media URLs in `business.socialMedia`

## Brand Color
Primary: `#C74B3F` (soft coral red)

## Contact
- Email: cjunctionllc@gmail.com
- WhatsApp: +1 (214) 215-6273
- Address: 2435 Glenda Lane Ste 4, Dallas, Texas 75229
