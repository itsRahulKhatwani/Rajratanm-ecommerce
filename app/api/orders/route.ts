import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerClient } from "@/lib/supabase";

// GET /api/orders — Admin only
// Supports ?status= filter
export async function GET(request: Request) {
  try {
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
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

    // Validate each item
    for (const item of body.items) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return NextResponse.json(
          {
            error:
              "Each item must have a valid productId and quantity of at least 1",
          },
          { status: 400 }
        );
      }
    }

    // Fetch current prices from DB — never trust client-side prices
    const productIds = body.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    const priceMap = new Map(products.map((p) => [p.id, p.price]));

    // Verify all products exist
    for (const item of body.items) {
      if (!priceMap.has(item.productId)) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }
    }

    // Calculate total server-side
    const totalAmount = body.items.reduce((sum, item) => {
      return sum + priceMap.get(item.productId)! * item.quantity;
    }, 0);

    // Create Order + OrderItems in a single transaction
    const order = await prisma.$transaction(async (tx) => {
      return tx.order.create({
        data: {
          customerName: body.customerName!,
          customerEmail: body.customerEmail!,
          customerPhone: body.customerPhone!,
          address: body.address!,
          city: body.city!,
          state: body.state!,
          pincode: body.pincode!,
          totalAmount,
          status: "pending",
          razorpayOrderId: null,
          items: {
            create: body.items!.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: priceMap.get(item.productId)!,
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
