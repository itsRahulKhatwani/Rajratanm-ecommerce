import { createServerClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

/**
 * Get the currently authenticated user from the server-side Supabase client.
 * Never throws — returns the User object or null.
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const supabase = createServerClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

/**
 * Require authentication — for use at the top of protected server actions
 * and API routes. Returns the user if authenticated, otherwise throws
 * a NextResponse with 401 status.
 */
export async function requireAuth(): Promise<User> {
  const user = await getAuthenticatedUser();

  if (!user) {
    // Importing here to avoid importing NextResponse at module level
    // in server components that don't need it.
    const { NextResponse } = await import("next/server");
    throw NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return user;
}
