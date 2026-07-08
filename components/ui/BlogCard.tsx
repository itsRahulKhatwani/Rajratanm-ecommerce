"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    titleHindi: string;
    slug: string;
    excerpt: string;
    excerptHindi: string;
    coverImage: string;
    publishedAt: Date | string | null;
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { language, t } = useLanguage();

  const title = language === "hi" ? blog.titleHindi : blog.title;
  const excerpt = language === "hi" ? blog.excerptHindi : blog.excerpt;
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="group rounded-2xl overflow-hidden border border-gold/10 bg-navy-light card-hover flex flex-col">
      {/* Cover Image */}
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-navy-dark">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-ivory/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {date && (
          <p className="text-xs text-ivory/40 mb-3 font-medium uppercase tracking-wider">
            {date}
          </p>
        )}
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="font-playfair text-xl font-semibold text-ivory group-hover:text-gold transition-colors duration-300 mb-3 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-ivory/60 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {excerpt}
        </p>
        <Link
          href={`/blog/${blog.slug}`}
          className="text-gold text-sm font-medium hover:text-gold-light transition-colors duration-300 inline-flex items-center gap-1"
        >
          {t("blog.readMore")} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
