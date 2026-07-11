import React from 'react';
import Link from 'next/link';
import { PenLine, BookOpen } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import BlogsTable from '@/components/admin/BlogsTable';

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      publishedAt: true,
      coverImage: true,
      createdAt: true,
      titleHindi: true,
      content: true,
      contentHindi: true,
      excerpt: true,
      excerptHindi: true,
      updatedAt: true
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#F5F0E8]">Blog Posts</h1>
        <Link 
          href="/admin/blogs/new"
          className="flex items-center space-x-2 bg-[#C9A84C] text-[#0D2137] px-4 py-2 rounded-lg font-medium hover:bg-[#D4B86A] transition-colors"
        >
          <PenLine className="w-5 h-5" />
          <span>Write New Blog</span>
        </Link>
      </div>

      {blogs.length > 0 ? (
        <BlogsTable blogs={blogs as any} />
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0D2137] border border-[#C9A84C]/20 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h2 className="text-xl font-medium text-[#F5F0E8] mb-2">No blog posts yet</h2>
          <p className="text-gray-400 mb-6">Share your gemstone knowledge with the world</p>
          <Link 
            href="/admin/blogs/new"
            className="flex items-center space-x-2 bg-[#C9A84C] text-[#0D2137] px-4 py-2 rounded-lg font-medium hover:bg-[#D4B86A] transition-colors"
          >
            <PenLine className="w-5 h-5" />
            <span>Write First Post</span>
          </Link>
        </div>
      )}
    </div>
  );
}
