"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { addToCart } from '@/lib/cart';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    nameHindi: string;
    slug: string;
    category: string;
    price: number;
    imageUrls: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const displayName = t(product.name, product.nameHindi);
  const displayCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const formattedPrice = "₹" + product.price.toLocaleString('en-IN');

  return (
    <div className="group relative flex flex-col bg-[#0D1B2A] rounded-xl border border-[#C9A84C]/20 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(201,168,76,0.15)]">
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full bg-[#1A2E44] overflow-hidden">
        {product.imageUrls && product.imageUrls.length > 0 ? (
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#C9A84C]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-[#C9A84C] text-[#0D1B2A] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          {displayCategory}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        <div className="flex-grow">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-playfair text-xl text-[#F5F0E8] font-medium leading-tight mb-2 hover:text-[#C9A84C] transition-colors line-clamp-2">
              {displayName}
            </h3>
          </Link>
          <div className="text-[#C9A84C] font-semibold text-lg">
            {formattedPrice}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded text-sm font-semibold transition-all ${
              added 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-[#C9A84C] text-[#0D1B2A] hover:bg-[#D4B96A]'
            }`}
          >
            {added ? 'Added ✓' : t('products.addToCart', 'कार्ट में जोड़ें')}
          </button>
          <Link 
            href={`/shop/${product.slug}`}
            className="w-full py-2.5 rounded text-sm font-semibold text-center border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
          >
            {t('products.viewDetails', 'विवरण देखें')}
          </Link>
        </div>
      </div>
    </div>
  );
}
