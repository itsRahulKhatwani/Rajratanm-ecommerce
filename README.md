# Raj Ratanm — Premium E-Commerce & Blog Platform

## 1. Project Overview
Raj Ratanm is a production-grade, bilingual (English & Hindi) e-commerce and blog website built for a premium Indian brand selling precious stones, semi-precious gemstones, artificial jewelry, and healing crystals.

The platform provides a mystical, luxurious, and trustworthy experience with a rich dark navy and gold aesthetic, while giving the owner complete control over content through a protected admin dashboard.

## 2. Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (v4)
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Authentication:** Supabase Auth
- **Media Hosting:** Cloudinary
- **Payments:** Razorpay (Currently structured and inactive pending live keys)
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## 3. Step-by-Step Local Setup

1. **Clone and Install Dependencies:**
   ```bash
   git clone <repository_url>
   cd rajratanm
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Fill in the keys (instructions below).

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` with your browser.

## 4. How to Connect Supabase

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. In your Supabase Project Settings -> API, find:
   - Project URL -> `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role secret -> `SUPABASE_SERVICE_ROLE_KEY`
3. Add these to your `.env` file.
4. Go to **Authentication -> Providers** in Supabase and ensure Email provider is enabled.

## 5. How to Run Prisma Migrations

1. In Supabase, go to **Project Settings -> Database** and copy the Connection String (URI).
2. Add it to your `.env` file as `DATABASE_URL`. Make sure to replace `[YOUR-PASSWORD]` with your actual database password.
3. Push the schema to your database and generate the Prisma Client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

## 6. How to Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/) and create a free account.
2. Find your Cloud Name, API Key, and API Secret on the dashboard. Add them to `.env`.
3. Go to **Settings -> Upload** and add an "Upload preset".
4. Set the preset name (e.g. `rajratanm_signed`) and set Signing Mode to **Signed**.
5. Add this preset name to `.env` as `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

## 7. How to Deploy to Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/), click **Add New Project**, and import your GitHub repository.
3. During setup, expand **Environment Variables** and paste the contents of your `.env` file.
4. Set the Build Command to `npx prisma generate && next build`.
5. Click **Deploy**.

## 8. How to Activate Razorpay

The Razorpay integration is pre-wired but currently inactive. When you have your live domain and Razorpay account ready:
1. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to your `.env` (and Vercel environment variables).
2. Open `lib/razorpay.ts` and uncomment the Razorpay initialization code.
3. Open `app/api/payment/create-order/route.ts` and uncomment the payment creation logic.
4. Open `app/api/payment/verify/route.ts` and uncomment the signature verification logic.
5. In `app/(public)/cart/page.tsx`, remove the placeholder text and integrate the Razorpay checkout script using the `window.Razorpay` object.

## 9. How to Add First Admin User

Since `/admin` routes are protected, you need an authenticated user to access them.
1. Go to your Supabase Dashboard -> **Authentication -> Users**.
2. Click **Add User** -> **Create New User**.
3. Enter an email and password for the admin account.
4. On your live site (or localhost), you can now log in using these credentials (once a login UI is wired up, or by manually generating a session in development).
*Note: In local development with dummy keys, the middleware gracefully bypasses authentication so you can test the UI.*
