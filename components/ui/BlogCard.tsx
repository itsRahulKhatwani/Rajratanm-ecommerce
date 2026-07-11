"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen } from 'lucide-react';

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
  const { t } = useLanguage();

  const displayTitle = t(blog.title, blog.titleHindi);
  const displayExcerpt = t(blog.excerpt, blog.excerptHindi);
  
  const formattedDate = blog.publishedAt 
    ? new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(blog.publishedAt))
    : '';

  return (
    <div className="group flex flex-col bg-[#0D1B2A] rounded-xl border border-[#C9A84C]/20 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(201,168,76,0.15)]">
      {/* Image Section */}
      <div className="relative aspect-[16/9] w-full bg-[#1A2E44] overflow-hidden">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-[#C9A84C]/30" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        {formattedDate && (
          <div className="text-xs text-[#F5F0E8]/50 mb-3 tracking-wider uppercase font-medium">
            {formattedDate}
          </div>
        )}
        
        <Link href={`/blog/${blog.slug}`} className="mb-3">
          <h3 className="font-playfair text-xl text-[#F5F0E8] font-medium leading-snug group-hover:text-[#C9A84C] transition-colors line-clamp-2">
            {displayTitle}
          </h3>
        </Link>
        
        <p className="text-[#F5F0E8]/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
          {displayExcerpt}
        </p>

        <Link 
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center text-[#C9A84C] text-sm font-semibold hover:underline mt-auto"
        >
          {t('blog.readMore', 'और पढ़ें')} <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
