"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface BlogContentClientProps {
  blog: {
    title: string;
    titleHindi: string;
    content: string;
    contentHindi: string;
    coverImage: string;
  };
}

export default function BlogContentClient({ blog }: BlogContentClientProps) {
  const { t, language } = useLanguage();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const displayTitle = t(blog.title, blog.titleHindi);
  const displayContent = language === 'en' ? blog.content : (blog.contentHindi || blog.content);
  
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(displayTitle);
  const encodedImage = encodeURIComponent(blog.coverImage || '');

  return (
    <>
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6 leading-tight">
        {displayTitle}
      </h1>

      <div className="w-full h-px bg-[#C9A84C]/20 my-8" />

      {/* Safe: content is admin-entered via Cloudinary/Supabase CMS */}
      <div 
        className="prose prose-invert prose-headings:text-[#C9A84C] prose-p:text-[#F5F0E8]/90 prose-strong:text-[#C9A84C] prose-a:text-[#C9A84C] max-w-none text-lg leading-loose"
        dangerouslySetInnerHTML={{ __html: displayContent }}
      />

      {/* Share Section */}
      <div className="mt-16 pt-8 border-t border-[#C9A84C]/20">
        <h3 className="text-[#F5F0E8] font-medium mb-4">Share this article:</h3>
        <div className="flex gap-4">
          <a
            href={`https://wa.me/?text=${encodedTitle} - ${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform"
            aria-label="Share on WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.573-.187-.981-.342-2.303-.882-3.777-3.243-3.889-3.393-.111-.151-.922-1.229-.922-2.341 0-1.112.583-1.661.792-1.884.208-.223.454-.279.602-.279.149 0 .298.005.428.011.139.006.325-.052.51.396.186.448.636 1.556.692 1.667.056.111.093.239.019.389-.074.149-.111.239-.223.389-.111.149-.239.317-.334.41-.111.111-.228.231-.102.449.126.218.562.928 1.206 1.503.829.743 1.522.973 1.745 1.084.223.111.353.093.483-.056.13-.149.562-.654.711-.877.149-.223.298-.186.499-.111.201.074 1.263.595 1.486.706.223.111.372.167.428.258.056.091.056.529-.088.934z"/></svg>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:scale-110 transition-transform"
            aria-label="Share on Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          <a
            href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E60023] text-white hover:scale-110 transition-transform"
            aria-label="Share on Pinterest"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.279 1.14c-.038.154-.127.188-.288.113-1.077-.496-1.75-2.051-1.75-3.3 0-2.686 1.953-5.152 5.626-5.152 2.951 0 5.244 2.1 5.244 4.908 0 2.931-1.846 5.289-4.411 5.289-1.394 0-2.705-.724-3.155-1.583 0 0-.69 2.628-.857 3.272-.31 1.197-1.155 2.695-1.721 3.606 1.436.444 2.97.683 4.549.683 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </>
  );
}
