"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Blog } from '@prisma/client';
import { XCircle, Loader2, Clock } from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageUploader from '@/components/ui/ImageUploader';

export default function BlogEditForm({ blog, isNew = false }: { blog?: Partial<Blog>, isNew?: boolean }) {
  const router = useRouter();
  const [title, setTitle] = useState(blog?.title || '');
  const [titleHindi, setTitleHindi] = useState(blog?.titleHindi || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [excerptHindi, setExcerptHindi] = useState(blog?.excerptHindi || '');
  const [content, setContent] = useState(blog?.content || '');
  const [contentHindi, setContentHindi] = useState(blog?.contentHindi || '');
  const [coverImage, setCoverImage] = useState(blog?.coverImage || '');
  const [published, setPublished] = useState(blog?.published ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !excerpt || !coverImage) {
      setError('Title, English content, English excerpt, and cover image are required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    let finalSlug = blog?.slug;
    if (isNew) {
      finalSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const payload = {
      title,
      titleHindi,
      slug: finalSlug,
      excerpt,
      excerptHindi,
      content,
      contentHindi,
      coverImage,
      published,
    };

    try {
      const url = isNew ? '/api/blogs' : `/api/blogs/${blog?.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update blog');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/blogs');
        router.refresh();
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsSubmitting(false);
    }
  };

  const updatedAt = blog?.updatedAt ? new Intl.DateTimeFormat('en-IN', { 
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(blog.updatedAt)) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#F5F0E8]">{isNew ? 'Create Blog Post' : 'Edit Blog Post'}</h1>
        {updatedAt && (
          <div className="flex items-center text-sm text-gray-400 bg-[#0D2137] border border-[#C9A84C]/20 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: {updatedAt}
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3 text-red-400">
          <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400 font-medium">
          Blog updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Blog Content (English)
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Title (EN) <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-lg text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="Blog title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Excerpt (EN) <span className="text-red-400">*</span></label>
                <span className="text-xs text-gray-400">{excerpt.length}/200</span>
              </div>
              <textarea
                value={excerpt}
                maxLength={200}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] min-h-[80px]"
                placeholder="Short preview text..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Content (EN) <span className="text-red-400">*</span></label>
              <div className="min-h-[400px]">
                <RichTextEditor 
                  value={content} 
                  onChange={setContent} 
                  placeholder="Write your post here..."
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Blog Content (Hindi)
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Title (HI)</label>
              <input
                type="text"
                value={titleHindi}
                onChange={(e) => setTitleHindi(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-lg text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="हिंदी में शीर्षक"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">Excerpt (HI)</label>
                <span className="text-xs text-gray-400">{excerptHindi.length}/200</span>
              </div>
              <textarea
                value={excerptHindi}
                maxLength={200}
                onChange={(e) => setExcerptHindi(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] min-h-[80px]"
                placeholder="हिंदी में छोटा विवरण..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Content (HI)</label>
              <div className="min-h-[400px]">
                <RichTextEditor 
                  value={contentHindi} 
                  onChange={setContentHindi} 
                  placeholder="हिंदी में सामग्री..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-6 space-y-8">
            <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
              <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
                Blog Settings
              </h2>

              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${!published ? 'text-gray-300' : 'text-gray-500'}`}>Save as Draft</span>
                  <div 
                    className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors ${published ? 'bg-[#C9A84C]' : 'bg-gray-600'}`}
                    onClick={() => setPublished(!published)}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${published ? 'translate-x-7' : 'translate-x-0'}`} />
                  </div>
                  <span className={`font-medium ${published ? 'text-[#C9A84C]' : 'text-gray-500'}`}>Publish Now</span>
                </div>
                {published && blog?.publishedAt && (
                  <p className="text-xs text-gray-400 mt-2 text-right">
                    Published on: {new Intl.DateTimeFormat('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    }).format(new Date(blog.publishedAt))}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
              <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
                Cover Image <span className="text-red-400">*</span>
              </h2>
              
              <ImageUploader 
                existingUrls={coverImage ? [coverImage] : []}
                onUploadComplete={(urls) => setCoverImage(urls[0] || '')}
                multiple={false}
                maxImages={1}
              />
              
              {coverImage && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">Preview:</p>
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    className="w-full aspect-[16/9] object-cover rounded-lg border border-[#C9A84C]/30"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 ${
                published 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-[#C9A84C] hover:bg-[#D4B86A] text-[#0D2137]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {isNew ? 'Saving...' : 'Updating...'}
                </>
              ) : (
                isNew ? 'Create Post' : 'Update Post'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
