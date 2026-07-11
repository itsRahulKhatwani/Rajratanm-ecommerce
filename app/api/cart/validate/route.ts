import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();
    
    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid items format' }, { status: 400 });
    }

    if (items.length === 0) {
      return NextResponse.json({ items: [] });
    }

    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        nameHindi: true,
        price: true,
        imageUrls: true,
        inStock: true
      }
    });

    const validatedItems = items.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      if (!product) return null;
      
      return {
        productId: product.id,
        name: product.name,
        nameHindi: product.nameHindi,
        currentPrice: product.price,
        imageUrl: product.imageUrls[0] || '',
        inStock: product.inStock,
        quantity: cartItem.quantity
      };
    }).filter(Boolean);

    return NextResponse.json({ items: validatedItems });
  } catch (error) {
    console.error('Error validating cart:', error);
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
  }
}
