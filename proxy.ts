import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes — all other paths pass through
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Skip protection if Supabase is not configured (local dev with dummy values)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl === "https://dummy.supabase.co"
  ) {
    return NextResponse.next();
  }

  // Create a Supabase client with the request cookies forwarded
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoginPage = pathname === "/admin/login";

  // --- LOGIN PAGE ---
  // If user IS already authenticated and tries to visit /admin/login,
  // redirect them to the dashboard — no need to log in again.
  if (isLoginPage) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Not authenticated — allow through to the login page
    return NextResponse.next();
  }

  // --- ALL OTHER /admin/* PAGES ---
  // If no valid session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Authenticated — allow through
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
