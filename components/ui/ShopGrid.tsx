"use client";

import React, { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { useLanguage } from '@/context/LanguageContext';

interface ProductData {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  category: string;
  price: number;
  imageUrls: string[];
}

export default function ShopGrid({ products }: { products: ProductData[] }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'precious', label: 'Precious' },
    { id: 'semi-precious', label: 'Semi-Precious' },
    { id: 'crystal', label: 'Crystals' },
    { id: 'jewelry', label: 'Jewelry' }
  ];

  const filtered = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  // Overall empty state if the entire DB is empty
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <svg className="w-16 h-16 text-[#C9A84C]/30 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-[#F5F0E8]/40 text-xl font-playfair italic">
          {t("Our collection is being curated", "हमारा संग्रह तैयार किया जा रहा है")}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#C9A84C] mb-4">
          Our Collection
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl mx-auto">
          {t("Handpicked gemstones, crystals, and jewelry", "हस्तचयनित रत्न, क्रिस्टल और आभूषण")}
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeFilter === filter.id 
                ? 'bg-[#C9A84C] text-[#0D1B2A]' 
                : 'border border-[#C9A84C] text-[#F5F0E8] hover:bg-[#C9A84C]/20'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-[#F5F0E8]/40 text-sm mb-6 text-center">
        Showing {filtered.length} of {products.length} products
      </div>

      {/* Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl border border-[#C9A84C]/10 bg-[#1A2E44]/30">
          <p className="text-[#F5F0E8]/40 text-lg">
            No {activeFilter} products available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
