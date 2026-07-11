import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerClient } from "@/lib/supabase";

// GET /api/blogs
// Default: published only. ?all=true (admin): all including drafts — requires auth.
// Supports ?search= to filter by title.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const search = searchParams.get("search");

    if (all) {
      // Admin usage — require auth
      const supabase = await createServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const blogs = await prisma.blog.findMany({
      where: {
        ...(all ? {} : { published: true }),
        ...(search
          ? { title: { contains: search, mode: "insensitive" } }
          : {}),
      },
      orderBy: [
        { publishedAt: "desc" },
      ],
    });

    return NextResponse.json({ blogs, total: blogs.length });
  } catch (error) {
    console.error("[BLOGS_GET] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/blogs — Protected
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: {
      title?: string;
      titleHindi?: string;
      slug?: string;
      content?: string;
      contentHindi?: string;
      excerpt?: string;
      excerptHindi?: string;
      coverImage?: string;
      published?: boolean;
    } = await request.json();

    // Required field validation
    const required = ["title", "slug", "content", "excerpt", "coverImage"] as const;
    const missing = required.filter((field) => !body[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields", missing },
        { status: 400 }
      );
    }

    // Slug uniqueness check
    const existing = await prisma.blog.findUnique({ where: { slug: body.slug! } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const isPublished = body.published ?? false;

    const blog = await prisma.blog.create({
      data: {
        title: body.title!,
        titleHindi: body.titleHindi ?? "",
        slug: body.slug!,
        content: body.content!,
        contentHindi: body.contentHindi ?? "",
        excerpt: body.excerpt!,
        excerptHindi: body.excerptHindi ?? "",
        coverImage: body.coverImage!,
        published: isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error("[BLOGS_POST] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
