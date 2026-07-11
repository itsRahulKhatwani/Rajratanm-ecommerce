import { createServerClient } from './supabase'
import type { User } from '@supabase/supabase-js'

export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const supabase = await createServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null
    return user
  } catch {
    return null
  }
}

export async function getAdminUser(): Promise<User | null> {
  const user = await getAuthenticatedUser()
  if (!user) return null
  if (user.email !== process.env.ADMIN_EMAIL) return null
  return user
}

// Use in API routes — throws 401 response if not admin
export async function requireAdmin() {
  const user = await getAdminUser()
  if (!user) {
    throw new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }
  return user
}
