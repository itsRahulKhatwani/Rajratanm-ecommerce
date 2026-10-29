import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // 1. Direct database query via Prisma connection pooler
    const productCount = await prisma.product.count()

    // 2. Also ping Supabase REST gateway to register API activity
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && anonKey) {
      await fetch(`${supabaseUrl}/rest/v1/`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      }).catch((err) => {
        console.warn('[KEEP-ALIVE] Supabase REST ping warning:', err.message)
      })
    }

    return NextResponse.json(
      {
        status: 'alive',
        productCount,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[KEEP-ALIVE] Error:', error)
    return NextResponse.json(
      {
        status: 'db_error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
