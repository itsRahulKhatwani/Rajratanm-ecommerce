# Raj Ratnam — E-Commerce Platform

> Premium e-commerce platform for precious stones,
> semi-precious gemstones, healing crystals, and jewelry.
> Built with Next.js 14, Supabase, Prisma, and Cloudinary.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | Supabase Magic Link |
| Images | Cloudinary |
| Deployment | Vercel |
| CI/CD | GitHub Actions |
| Payments | Razorpay (pre-wired) |

## Features

- Bilingual storefront (English + Hindi)
- Product catalog with category filtering
- Image gallery with lightbox on product pages
- Blog/journal with rich text editor
- Persistent shopping cart (localStorage)
- Cash on delivery checkout
- Admin dashboard (products, blogs, orders)
- Magic Link authentication (passwordless)
- SEO optimized (sitemap, robots, JSON-LD, OpenGraph)
- Mobile-first responsive design

## Local Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free)
- Cloudinary account (free)

### 1. Clone and install
git clone https://github.com/itsRahulKhatwani/Rajratnam-ecommerce
cd Rajratnam-ecommerce
npm install

### 2. Environment variables
cp .env.example .env
Fill in all values in .env (see Environment Variables section)

### 3. Database setup
npx prisma generate
npx prisma db push

### 4. Run development server
npm run dev

Open http://localhost:3000

## Environment Variables

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
ADMIN_EMAIL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=

## Supabase Setup

1. Create project at supabase.com
2. Copy API keys to .env
3. Authentication → URL Configuration:
   Site URL: your domain
   Redirect URLs: your domain + /auth/callback
4. Authentication → Users → Add admin user

## Cloudinary Setup

1. Create account at cloudinary.com
2. Copy cloud name, API key, API secret to .env
3. Settings → Upload → Create signed upload preset
4. Set folder to: rajratnam/products

## Deployment (Vercel)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

## Activating Razorpay (when ready)

1. Create Razorpay account at razorpay.com
2. Get live API keys
3. Add to .env:
   RAZORPAY_KEY_ID=your_live_key
   RAZORPAY_KEY_SECRET=your_live_secret
4. Uncomment Razorpay code in:
   app/(public)/cart/page.tsx
   lib/razorpay.ts

## Admin Access

1. Go to /admin
2. Enter your ADMIN_EMAIL
3. Click Send Magic Link
4. Click link in email
5. Access granted to dashboard

## Adding Your First Product

1. Log into /admin
2. Go to Products → Add New Product
3. Fill in English + Hindi details
4. Upload images via Cloudinary
5. Toggle Featured ON for homepage display
6. Save Product

## Project Structure

app/
  (admin)/     Admin dashboard (protected)
  (public)/    Public storefront
  api/         API routes
  auth/        Auth callback handler
components/
  admin/       Admin-specific components
  layout/      Navbar, Footer, Sidebar
  sections/    Homepage sections
  ui/          Reusable UI components
context/       React context (Language)
lib/           Supabase, Prisma, Cloudinary clients
prisma/        Database schema
