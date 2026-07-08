"use client";

import { useState } from "react";

export default function NewBlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    alert("Blog creation requires database connection. Connect Supabase and run Prisma migrations first.");
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-gold mb-8">Write New Blog</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Title (English)</label>
            <input type="text" required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Title (Hindi)</label>
            <input type="text" required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
        </div>

        {/* Slug & Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Slug (URL-friendly name)</label>
            <input type="text" required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Cover Image URL (Cloudinary)</label>
            <input type="url" required placeholder="https://res.cloudinary.com/..." className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
        </div>

        {/* Excerpt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Excerpt (English)</label>
            <textarea rows={3} required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Excerpt (Hindi)</label>
            <textarea rows={3} required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors resize-none" />
          </div>
        </div>

        {/* Content - English */}
        <div>
          <label className="block text-sm font-medium text-ivory/70 mb-2">Content (English) — HTML/Rich Text</label>
          <textarea rows={10} required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors font-mono text-sm" />
        </div>

        {/* Content - Hindi */}
        <div>
          <label className="block text-sm font-medium text-ivory/70 mb-2">Content (Hindi) — HTML/Rich Text</label>
          <textarea rows={10} required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors font-mono text-sm" />
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-ivory/70 cursor-pointer">
            <input type="checkbox" className="accent-gold w-4 h-4" />
            Publish immediately
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 rounded-xl bg-gold text-navy font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Blog"}
        </button>
      </form>
    </div>
  );
}
