import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '@/components/ui/BlogCard';
import BlogContentClient from '@/components/ui/BlogContentClient';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  let blog = null;
  try {
    const resolvedParams = await params;
    blog = await prisma.blog.findFirst({
      where: { slug: resolvedParams.slug, published: true },
      select: { title: true, excerpt: true, coverImage: true }
    });
  } catch (error) {
    console.warn("Database connection failed for generateMetadata");
  }
  if (!blog) return {};
  
  return {
    title: `${blog.title} | Raj Ratnam Blog`,
    description: blog.excerpt,
    openGraph: { images: [blog.coverImage || ''] }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  let blog = null;
  let relatedBlogs: any[] = [];

  try {
    const resolvedParams = await params;
    blog = await prisma.blog.findFirst({
      where: { slug: resolvedParams.slug, published: true }
    });
    
    if (blog) {
      relatedBlogs = await prisma.blog.findMany({
        where: { 
          published: true,
          slug: { not: blog.slug }
        },
        take: 3,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true, title: true, titleHindi: true,
          slug: true, excerpt: true, excerptHindi: true,
          coverImage: true, publishedAt: true
        }
      });
    }
  } catch (error) {
    console.warn("Database connection failed for BlogPostPage");
  }

  if (!blog) notFound();

  const formattedDate = blog.publishedAt 
    ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(blog.publishedAt))
    : '';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": blog.coverImage,
    "datePublished": blog.publishedAt,
    "publisher": {
      "@type": "Organization",
      "name": "Raj Ratnam"
    }
  };

  return (
    <main className="py-12 px-4 max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="text-sm text-[#F5F0E8]/50 mb-6">
        <Link href="/blog" className="hover:text-[#C9A84C] transition-colors">Blog</Link>
        <span className="mx-2">→</span>
        <span className="text-[#C9A84C]">{blog.title}</span>
      </div>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-8 border border-[#C9A84C]/20">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      )}

      {formattedDate && (
        <div className="text-[#F5F0E8]/50 text-sm font-medium tracking-widest uppercase mb-4">
          {formattedDate}
        </div>
      )}

      <BlogContentClient blog={blog} />

      <div className="w-full h-px bg-[#C9A84C]/20 my-16" />

      {relatedBlogs.length > 0 && (
        <div className="pt-8">
          <h2 className="font-playfair text-3xl font-bold text-[#F5F0E8] mb-8 text-center">
            More from our Journal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map(rb => (
              <BlogCard key={rb.id} blog={rb as any} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
