"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function BlogDetailPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto text-center py-24">
        <svg className="w-20 h-20 text-gold/20 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h1 className="font-playfair text-3xl text-gold mb-4">Post Not Found</h1>
        <p className="text-ivory/50 mb-8">This blog post hasn&apos;t been published yet. Posts will appear here once the owner writes them through the admin dashboard.</p>
        <Link href="/blog" className="text-gold hover:text-gold-light transition-colors">
          ← Back to {t("blog.title")}
        </Link>
      </div>
    </div>
  );
}
