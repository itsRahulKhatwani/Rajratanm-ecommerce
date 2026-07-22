import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Create response to modify cookies
  let response = NextResponse.next({
    request: { headers: request.headers }
  })

  // Create Supabase client with cookie handling for middleware
  const supabase = createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers }
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers }
          })
          response.cookies.set({ name, value: '', ...options })
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const adminEmails = (process.env.ADMIN_EMAIL || '').split(',').map(e => e.trim().toLowerCase())
  const isUserAdmin = Boolean(user?.email && adminEmails.includes(user.email.trim().toLowerCase()))
  
  // Handle /admin routes
  if (pathname.startsWith('/admin')) {
    
    // Allow /admin/login page through always
    if (pathname === '/admin/login') {
      // If already logged in as admin, redirect to dashboard
      if (user && isUserAdmin) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      // Not logged in or not admin — show login page
      return response
    }

    // For all other /admin routes:
    // Not logged in at all
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Logged in but NOT the admin email
    // This prevents customers from accessing admin
    if (!isUserAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Is admin — allow through
    return response
  }

  // Handle /account route (customer protected page)
  if (pathname.startsWith('/account')) {
    if (!user) {
      return NextResponse.redirect(
        new URL('/login?redirect=/account', request.url)
      )
    }
    return response
  }

  // All other public routes — allow through
  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/auth/callback'
  ]
}
