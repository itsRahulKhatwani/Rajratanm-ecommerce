import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blog = await prisma.blog.create({
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
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
