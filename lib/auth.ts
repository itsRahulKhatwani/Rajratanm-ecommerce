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

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false
  const adminEmails = (process.env.ADMIN_EMAIL || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
  return adminEmails.includes(email.trim().toLowerCase())
}

export async function getAdminUser(): Promise<User | null> {
  const user = await getAuthenticatedUser()
  if (!user) return null
  if (!isAdminEmail(user.email)) return null
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
