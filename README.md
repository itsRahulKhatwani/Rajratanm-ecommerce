# Raj Ratanm — Full-Stack E-Commerce & Blog Platform

Welcome to the **Raj Ratanm** project documentation. This is a production-grade, bilingual (English & Hindi) e-commerce and blog website built for a premium Indian brand selling precious stones, semi-precious gemstones, artificial jewelry, and healing crystals.

---

## 🏗️ 1. Project Overview & How It Works

The platform is designed to provide a premium, mystical, and trustworthy experience for customers, while giving the owner complete control over content without touching the code. 

**Key Features:**
- **Bilingual Interface:** A global toggle switches the entire UI (products, blogs, navigation) between English and Hindi.
- **E-Commerce:** Full shopping cart functionality (persisted via `localStorage`) with a smooth checkout flow.
- **Content Management:** An upcoming protected Admin Dashboard where the owner can add/edit products, write blogs, and manage orders.
- **Premium Aesthetics:** A rich dark navy, gold, and emerald color scheme with subtle micro-animations (glows, floats, hovers) to reflect the premium nature of gemstones.

### Tech Stack
- **Framework:** NCSS (v4)
- **Database:** Supabaseext.js 14 (App Router, TypeScript)
- **Styling:** Tailwind  (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Supabase Auth
- **Media Storage:** Cloudinary
- **Payments:** Razorpay (Integrated but inactive pending live keys)

---

## ✅ 2. Current Implementations (What's Done)

The core foundation and public-facing frontend are completely built. Even without a live database, the site elegantly handles missing data with beautifully designed "empty states."

1. **Design System:** Custom Tailwind theme (`globals.css`) with CSS variables for brand colors and keyframe animations.
2. **Bilingual Data Layer:** A React Context (`LanguageContext.tsx`) that manages language state (EN/HI) and handles all static translations.
3. **Database Schema:** The Prisma schema (`prisma/schema.prisma`) is defined with models for `Product`, `Blog`, `Order`, `OrderItem`, and `Testimonial`.
4. **Public Pages:** 
   - **Homepage:** Hero section, Featured Products, Trust Badges, Latest Blogs, and Testimonials.
   - **Shop:** Category filtering, responsive product grid, and stock status indicators.
   - **Product Detail:** Image galleries, bilingual descriptions, metaphysical properties (Chakra, Healing Props), and related products.
   - **Blog & Blog Detail:** Rich text article rendering and social sharing links.
   - **Cart & Checkout:** Client-side cart state management and a checkout form (currently defaults to Cash on Delivery).
   - **Static Pages:** About Us and Contact Us (with functional UI).
5. **Libraries & Helpers:** Initialized clients for Prisma, Supabase, Cloudinary, and Razorpay.

---

## 🚧 3. Under Development & Further Plans

We are currently transitioning from the Frontend phase to the Backend & Admin phase.

### To Be Implemented:
1. **API Routes (Backend):**
   - CRUD endpoints for Products and Blogs.
   - Endpoints for Order creation and management.
2. **Admin Dashboard UI:**
   - A secure dashboard (`/admin`) to view stats and recent orders.
   - Interfaces to list, add, edit, and delete Products and Blogs.
3. **Rich Text & Image Uploads:**
   - Integrating a rich text editor (React Quill) for product/blog descriptions.
   - Connecting Cloudinary for secure, server-side image uploads directly from the admin panel.
4. **SEO & Polish:**
   - Dynamic `sitemap.xml` and `robots.txt`.
   - GitHub Actions CI/CD pipeline for automated testing and deployment to Vercel.

---

## 🗄️ 4. Database & Architecture

The project uses a hybrid data approach:
- **Prisma ORM:** Handles all database queries, schema migrations, and types. It connects to the Supabase PostgreSQL database via a direct connection string (`DATABASE_URL`).
- **Supabase Client:** Strictly handles User Authentication and Session management. 

### Data Models
- **Product:** Stores bilingual names/descriptions, pricing, category, stock status, and an array of Cloudinary image URLs.
- **Blog:** Stores bilingual titles/content, excerpts, publish status, and a cover image.
- **Order & OrderItem:** Tracks customer details, purchased items, total amount, and delivery status (Pending, Confirmed, Shipped, Delivered).

---

## 🔐 5. Authentication (Supabase)

Authentication is strictly for the **Admin Dashboard**. Customers do not need to create accounts to browse or checkout. 

**How it works:**
1. Next.js Middleware (`middleware.ts`) intercepts all requests to `/admin/*`.
2. It checks for a valid Supabase session cookie.
3. If no valid session is found, the user is immediately redirected to the public homepage.
4. The site owner will be provided with a single Admin login to access the dashboard.

---

## 🛍️ 6. Adding Products & Blogs (The Workflow)

Once the Admin Dashboard is complete, the site owner will manage content without writing code:

**Adding a Product:**
1. Admin navigates to `/admin/products/new`.
2. Fills out the form (Name, Price, Category, etc.) in both English and Hindi.
3. Uploads images. The images are sent to an API route, uploaded securely to **Cloudinary**, and the resulting URLs are saved to the database.
4. Clicks "Save". The product immediately appears on the public Shop page.

**Writing a Blog:**
1. Admin navigates to `/admin/blogs/new`.
2. Writes the article using the integrated Rich Text Editor (English & Hindi tabs).
3. Uploads a Cover Image.
4. Toggles "Published" to make it live on the site.

---

## 💳 7. Payments (Razorpay)

The Razorpay integration code (`lib/razorpay.ts`) and API routes are structured but intentionally marked as **Inactive**. 

Currently, the cart allows users to place an order via "Cash on Delivery", which saves the order to the database with a "pending" status. Once the business domain is registered and Razorpay API keys are acquired, the integration can be activated by uncommenting the relevant code and adding the keys to the `.env` file.
