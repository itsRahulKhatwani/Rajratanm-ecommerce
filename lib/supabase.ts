import { createClient } from "@supabase/supabase-js";

/**
 * Browser client — safe to use in client components.
 * Uses the anon key which respects Row Level Security.
 */
export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Server client — for API routes and server components only.
 * Uses the service role key which BYPASSES Row Level Security.
 * Never expose this client or its key to the browser.
 */
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
