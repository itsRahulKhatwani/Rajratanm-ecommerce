import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/cart/validate
// Public — validates cart items and returns current real prices
// to prevent price manipulation at checkout.
export async function POST(request: Request) {
  try {
    const body: {
      items?: { productId: string; quantity: number }[];
    } = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "items array is required and must not be empty" },
        { status: 400 }
      );
    }

    const productIds = body.items.map((i) => i.productId);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        nameHindi: true,
        price: true,
        imageUrls: true,
        inStock: true,
      },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    let totalAmount = 0;

    const validatedItems = body.items.map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        // Product not found — flag as out of stock so frontend can warn user
        return {
          productId: item.productId,
          name: "Unknown Product",
          nameHindi: "",
          currentPrice: 0,
          imageUrl: null,
          inStock: false,
          quantity: item.quantity,
        };
      }

      if (product.inStock) {
        totalAmount += product.price * item.quantity;
      }

      return {
        productId: item.productId,
        name: product.name,
        nameHindi: product.nameHindi,
        currentPrice: product.price,
        imageUrl: product.imageUrls[0] ?? null,
        inStock: product.inStock,
        quantity: item.quantity,
      };
    });

    return NextResponse.json({ validatedItems, totalAmount });
  } catch (error) {
    console.error("[CART_VALIDATE] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
