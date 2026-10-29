import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/auth";

// GET /api/orders — Admin only
// Supports ?status= filter
export async function GET(request: Request) {
  try {
    const user = await getAdminUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const orders = await prisma.order.findMany({
      where: status ? { status } : undefined,
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders, total: orders.length });
  } catch (error) {
    console.error("[ORDERS_GET] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/orders — Public (customers place orders)
export async function POST(request: Request) {
  try {
    const body: {
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      address?: string;
      city?: string;
      state?: string;
      pincode?: string;
      items?: { productId: string; quantity: number }[];
    } = await request.json();

    // Validate required customer fields
    const requiredFields = [
      "customerName",
      "customerEmail",
      "customerPhone",
      "address",
      "city",
      "state",
      "pincode",
    ] as const;
    const missing = requiredFields.filter((f) => !body[f]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missing },
        { status: 400 }
      );
    }

    // Validate items array
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields", missing: ["items"] },
        { status: 400 }
      );
    }

    // Validate each item (valid productId and positive integer quantity)
    for (const item of body.items) {
      if (
        !item.productId ||
        !item.quantity ||
        item.quantity < 1 ||
        !Number.isInteger(item.quantity)
      ) {
        return NextResponse.json(
          {
            error:
              "Each item must have a valid productId and an integer quantity of at least 1",
          },
          { status: 400 }
        );
      }
    }

    // Fetch current prices and stock status from DB — never trust client-side data
    const productIds = body.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true, inStock: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    // Verify all products exist and are in stock
    for (const item of body.items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }
      if (!product.inStock) {
        return NextResponse.json(
          { error: `Product "${product.name}" is currently out of stock.` },
          { status: 400 }
        );
      }
    }

    // Calculate total server-side
    const totalAmount = body.items.reduce((sum, item) => {
      return sum + productMap.get(item.productId)!.price * item.quantity;
    }, 0);

    // Create Order + OrderItems in a single transaction
    const order = await prisma.$transaction(async (tx) => {
      return tx.order.create({
        data: {
          customerName: body.customerName!.trim(),
          customerEmail: body.customerEmail!.trim().toLowerCase(),
          customerPhone: body.customerPhone!.trim(),
          address: body.address!.trim(),
          city: body.city!.trim(),
          state: body.state!.trim(),
          pincode: body.pincode!.trim(),
          totalAmount,
          status: "pending",
          razorpayOrderId: null,
          items: {
            create: body.items!.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: productMap.get(item.productId)!.price,
            })),
          },
        },
        select: {
          id: true,
          totalAmount: true,
          status: true,
        },
      });
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("[ORDERS_POST] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
