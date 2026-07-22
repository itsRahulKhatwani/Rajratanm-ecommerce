import { createServerClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createServerClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase())
      const isUserAdmin = Boolean(data.user.email && adminEmails.includes(data.user.email.trim().toLowerCase()))
      
      // If this is an admin email, redirect to admin dashboard
      if (isUserAdmin) {
        return NextResponse.redirect(new URL('/admin', origin))
      }
      
      // Otherwise it's a customer, redirect to account or intended page
      return NextResponse.redirect(new URL(next, origin))
    }
  }

  // If something went wrong, redirect to login with error
  return NextResponse.redirect(
    new URL('/login?error=auth_failed', origin)
  )
}
