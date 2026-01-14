# Car Junction LLC

## Overview
A complete Next.js web application for Car Junction LLC, a car dealership website with an admin panel for managing inventory, categories, and customer inquiries. Features database-driven vehicle listings, working contact/inquiry forms with email integration, search/filter functionality, and responsive design.

## Tech Stack
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS v4
- PostgreSQL (Neon) for database
- Resend for email integration
- Radix UI components
- bcryptjs for password hashing

## Project Structure
- `app/` - Next.js App Router pages and layouts
  - `admin/` - Admin panel pages (dashboard, vehicles, categories, inquiries, applications)
  - `vehicles/` - Vehicle browse and detail pages
  - `contact/` - Contact page
  - `finder/` - Car finder form
  - `apply-online/` - Credit application form
  - `api/` - API routes
- `components/` - React components including UI primitives
- `hooks/` - Custom React hooks
- `lib/` - Utility functions (db, auth, email)
- `public/` - Static assets and images
- `styles/` - Global CSS styles

## Database Schema
- `vehicles` - Vehicle listings with make, model, year, price, etc.
- `categories` - Vehicle categories
- `inquiries` - Customer inquiries
- `applications` - Credit applications
- `admin_users` - Admin user accounts

## Admin Panel
- URL: /admin
- Default credentials: username "admin", password "admin123"
- Features: Vehicle CRUD, category management, inquiry viewer, application viewer, settings (change password)
- Session-based authentication with HTTP-only cookies
- Logout functionality available in sidebar

## Important Configuration
- Database must be initialized by calling GET /api/init-db before first use
- All forms send emails to cjunctionllc@gmail.com
- Resend integration handles all email functionality
- Admin session uses HTTP-only cookies

## Development
- Run `npm run dev` to start the development server
- The app runs on port 5000
- Initialize database: GET /api/init-db

## Deployment
- Build: `npm run build`
- Start: `npm run start`

## Recent Changes (January 2026)
- Added complete admin panel with authentication
- Connected database for vehicles, categories, inquiries, applications
- Integrated Resend email for all forms
- Updated vehicle browse page to fetch from database
- Created credit application form with database storage
- Fixed captcha component hydration issues
