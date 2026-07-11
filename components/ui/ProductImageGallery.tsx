"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  imageUrls: string[];
  productName: string;
}

export default function ProductImageGallery({ imageUrls, productName }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="aspect-square w-full bg-[#1A2E44] flex items-center justify-center rounded-xl border border-[#C9A84C]/20">
        <svg className="w-16 h-16 text-[#C9A84C]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square w-full bg-[#1A2E44] overflow-hidden rounded-xl border border-[#C9A84C]/20 cursor-pointer group"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={imageUrls[selectedIndex]}
          alt={productName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 bg-[#0D1B2A]/80 text-[#C9A84C] px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-opacity">
            Click to expand
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      {imageUrls.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {imageUrls.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                idx === selectedIndex ? 'border-[#C9A84C]' : 'border-transparent hover:border-[#C9A84C]/50'
              }`}
            >
              <Image src={url} alt={`${productName} thumbnail ${idx + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-[#F5F0E8] hover:text-[#C9A84C] transition-colors p-2"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="relative w-full max-w-5xl h-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrls[selectedIndex]}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {imageUrls.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-10 text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors p-4 bg-black/50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(prev => (prev === 0 ? imageUrls.length - 1 : prev - 1));
                }}
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-4 md:right-10 text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors p-4 bg-black/50 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(prev => (prev === imageUrls.length - 1 ? 0 : prev + 1));
                }}
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
