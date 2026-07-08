"use client";

import { useLanguage } from "@/lib/LanguageContext";
import BlogCard from "@/components/ui/BlogCard";

interface FeaturedBlogsProps {
  blogs: Array<{
    id: string;
    title: string;
    titleHindi: string;
    slug: string;
    excerpt: string;
    excerptHindi: string;
    coverImage: string;
    publishedAt: Date | string | null;
  }>;
}

export default function FeaturedBlogs({ blogs }: FeaturedBlogsProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-navy-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gold mb-4">
            {t("blog.title")}
          </h2>
          <p className="text-ivory/50 text-lg max-w-2xl mx-auto">
            {t("blog.desc")}
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-gold/10 bg-navy-light/30">
            <svg className="w-16 h-16 text-gold/30 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-ivory/40 text-lg font-playfair italic">
              {t("blog.empty")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
