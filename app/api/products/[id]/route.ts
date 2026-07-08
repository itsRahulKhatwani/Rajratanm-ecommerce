import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products/[id]
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const product = await prisma.product.findUnique({ where: { id: resolvedParams.id } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id: resolvedParams.id },
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
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.product.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
