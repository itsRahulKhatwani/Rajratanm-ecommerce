import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products — List all products (with optional category filter)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/products — Create a new product (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        nameHindi: body.nameHindi,
        slug: body.slug,
        category: body.category,
        price: parseFloat(body.price),
        description: body.description,
        descriptionHindi: body.descriptionHindi,
        origin: body.origin || null,
        chakra: body.chakra || null,
        healingProps: body.healingProps || null,
        weight: body.weight || null,
        imageUrls: body.imageUrls || [],
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
