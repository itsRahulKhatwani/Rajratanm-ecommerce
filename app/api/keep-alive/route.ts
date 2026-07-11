import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await prisma.product.count()
    return NextResponse.json(
      { status: 'alive', timestamp: new Date().toISOString() },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { status: 'db_error' },
      { status: 500 }
    )
  }
}
