import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerClient } from "@/lib/supabase";

// GET /api/products
// Public — supports ?category=, ?featured=true, ?search=
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const products = await prisma.product.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(featured === "true" ? { featured: true } : {}),
        ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products, total: products.length });
  } catch (error) {
    console.error("[PRODUCTS_GET] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/products — Protected
export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: {
      name?: string;
      nameHindi?: string;
      slug?: string;
      category?: string;
      price?: number;
      description?: string;
      descriptionHindi?: string;
      origin?: string;
      chakra?: string;
      healingProps?: string;
      weight?: string;
      imageUrls?: string[];
      inStock?: boolean;
      featured?: boolean;
    } = await request.json();

    // Required field validation
    const required = ["name", "slug", "category", "price", "description"] as const;
    const missing = required.filter((field) => !body[field] && body[field] !== 0);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missing },
        { status: 400 }
      );
    }

    // Slug uniqueness check
    const existing = await prisma.product.findUnique({ where: { slug: body.slug! } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name!,
        nameHindi: body.nameHindi ?? "",
        slug: body.slug!,
        category: body.category!,
        price: Number(body.price),
        description: body.description!,
        descriptionHindi: body.descriptionHindi ?? "",
        origin: body.origin ?? null,
        chakra: body.chakra ?? null,
        healingProps: body.healingProps ?? null,
        weight: body.weight ?? null,
        imageUrls: body.imageUrls ?? [],
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("[PRODUCTS_POST] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
