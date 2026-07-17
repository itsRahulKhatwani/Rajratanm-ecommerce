import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerClient } from "@/lib/supabase";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/products/[id] — looks up by SLUG (id param = slug)
// Public
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id: slug } = await params;
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("[PRODUCT_GET] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/products/[id] — Protected, partial update by slug
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: slug } = await params;

    // Confirm the product exists first
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body: Partial<{
      name: string;
      nameHindi: string;
      slug: string;
      category: string;
      price: number;
      description: string;
      descriptionHindi: string;
      origin: string | null;
      chakra: string | null;
      healingProps: string | null;
      weight: string | null;
      imageUrls: string[];
      inStock: boolean;
      featured: boolean;
    }> = await request.json();

    const product = await prisma.product.update({
      where: { slug },
      data: {
        ...(body.name !== undefined ? { name: body.name } : {}),
        ...(body.nameHindi !== undefined ? { nameHindi: body.nameHindi } : {}),
        ...(body.slug !== undefined ? { slug: body.slug } : {}),
        ...(body.category !== undefined ? { category: body.category } : {}),
        ...(body.price !== undefined ? { price: Number(body.price) } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
        ...(body.descriptionHindi !== undefined ? { descriptionHindi: body.descriptionHindi } : {}),
        ...(body.origin !== undefined ? { origin: body.origin } : {}),
        ...(body.chakra !== undefined ? { chakra: body.chakra } : {}),
        ...(body.healingProps !== undefined ? { healingProps: body.healingProps } : {}),
        ...(body.weight !== undefined ? { weight: body.weight } : {}),
        ...(body.imageUrls !== undefined ? { imageUrls: body.imageUrls } : {}),
        ...(body.inStock !== undefined ? { inStock: body.inStock } : {}),
        ...(body.featured !== undefined ? { featured: body.featured } : {}),
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("[PRODUCT_PUT] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/products/[id] — Protected
export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: slug } = await params;

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { slug } });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("[PRODUCT_DELETE] Error:", error);
    if (error.code === 'P2003') {
      return NextResponse.json({ error: "Cannot delete product because it's part of past customer orders. Please mark it 'Out of Stock' instead to preserve order history." }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
