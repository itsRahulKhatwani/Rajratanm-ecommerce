import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createServerClient } from "@/lib/supabase";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/blogs/[id] — looks up by SLUG
// Public can only see published=true blogs.
// Drafts return 404 for unauthenticated callers (don't reveal drafts exist).
export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id: slug } = await params;
    const blog = await prisma.blog.findUnique({ where: { slug } });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!blog.published) {
      // Check if the caller is an authenticated admin
      const supabase = createServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        // Return 404 — don't reveal the draft exists
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("[BLOG_GET] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/blogs/[id] — Protected, partial update by slug
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: slug } = await params;

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const body: Partial<{
      title: string;
      titleHindi: string;
      slug: string;
      content: string;
      contentHindi: string;
      excerpt: string;
      excerptHindi: string;
      coverImage: string;
      published: boolean;
    }> = await request.json();

    // If publishing for the first time, stamp publishedAt
    const publishedAt =
      body.published === true && !existing.publishedAt
        ? new Date()
        : existing.publishedAt;

    const blog = await prisma.blog.update({
      where: { slug },
      data: {
        ...(body.title !== undefined ? { title: body.title } : {}),
        ...(body.titleHindi !== undefined ? { titleHindi: body.titleHindi } : {}),
        ...(body.slug !== undefined ? { slug: body.slug } : {}),
        ...(body.content !== undefined ? { content: body.content } : {}),
        ...(body.contentHindi !== undefined ? { contentHindi: body.contentHindi } : {}),
        ...(body.excerpt !== undefined ? { excerpt: body.excerpt } : {}),
        ...(body.excerptHindi !== undefined ? { excerptHindi: body.excerptHindi } : {}),
        ...(body.coverImage !== undefined ? { coverImage: body.coverImage } : {}),
        ...(body.published !== undefined ? { published: body.published } : {}),
        publishedAt,
      },
    });

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("[BLOG_PUT] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — Protected
export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: slug } = await params;

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await prisma.blog.delete({ where: { slug } });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("[BLOG_DELETE] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
