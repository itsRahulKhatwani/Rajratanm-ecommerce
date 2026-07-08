import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const blog = await prisma.blog.findUnique({ where: { id: resolvedParams.id } });
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const blog = await prisma.blog.update({
      where: { id: resolvedParams.id },
      data: {
        title: body.title,
        titleHindi: body.titleHindi,
        slug: body.slug,
        content: body.content,
        contentHindi: body.contentHindi,
        excerpt: body.excerpt,
        excerptHindi: body.excerptHindi,
        coverImage: body.coverImage,
        published: body.published ?? false,
        publishedAt: body.published ? new Date() : null,
      },
    });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.blog.delete({ where: { id: resolvedParams.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
