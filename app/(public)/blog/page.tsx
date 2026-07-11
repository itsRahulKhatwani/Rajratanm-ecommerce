import { prisma } from "@/lib/prisma";
import BlogCard from "@/components/ui/BlogCard";
import BlogHeader from "@/components/ui/BlogHeader";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let blogs: any[] = [];
  try {
    blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true, title: true, titleHindi: true,
        slug: true, excerpt: true, excerptHindi: true,
        coverImage: true, publishedAt: true
      }
    });
  } catch (error) {
    console.warn("Database connection failed, using empty array fallback");
  }

  return (
    <main className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <BlogHeader />

        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-[#C9A84C]/10 bg-[#1A2E44]/30 text-center">
            <BookOpen className="w-16 h-16 text-[#C9A84C]/30 mb-6" />
            <p className="text-[#F5F0E8]/40 text-lg font-playfair italic max-w-md mx-auto">
              Our journal is coming soon. We're preparing articles on gemstone healing and wisdom.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog as any} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
