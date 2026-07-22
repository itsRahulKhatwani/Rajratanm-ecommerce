"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { addToCart } from '@/lib/cart';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    nameHindi: string;
    category: string;
    price: number;
    description: string;
    descriptionHindi: string;
    inStock: boolean;
    origin?: string | null;
    chakra?: string | null;
    healing?: string | null;
    weight?: string | null;
  };
}

export default function ProductInfoClient({ product }: ProductInfoProps) {
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const displayName = t(product.name, product.nameHindi);
  const displayDesc = t(product.description, product.descriptionHindi);
  const displayCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const formattedPrice = "₹" + product.price.toLocaleString('en-IN');
  
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919828016063";
  const waMessage = encodeURIComponent(`Hi, I'm interested in ${product.name}`);
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div>
        <div className="inline-block bg-[#C9A84C] text-[#0D1B2A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          {displayCategory}
        </div>
        <h1 className="font-playfair text-3xl md:text-5xl font-bold text-[#F5F0E8] mb-4 leading-tight">
          {displayName}
        </h1>
        <div className="text-3xl text-[#C9A84C] font-semibold">
          {formattedPrice}
        </div>
      </div>

      <div className="w-full h-px bg-[#C9A84C]/20" />

      {/* Description */}
      <div>
        {/* Safe: content is admin-entered via Cloudinary/Supabase CMS */}
        <div 
          className="prose prose-invert prose-p:text-[#F5F0E8]/80 prose-headings:text-[#C9A84C] prose-a:text-[#C9A84C] max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: displayDesc }}
        />
      </div>

      {/* Product Details Grid */}
      {(product.origin || product.chakra || product.healing || product.weight) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.origin && (
            <div className="bg-[#1A2E44] p-4 rounded-lg border border-[#C9A84C]/10">
              <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">Origin</div>
              <div className="text-[#F5F0E8] text-sm flex items-center"><span className="mr-2">📍</span> {product.origin}</div>
            </div>
          )}
          {product.chakra && (
            <div className="bg-[#1A2E44] p-4 rounded-lg border border-[#C9A84C]/10">
              <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">Chakra</div>
              <div className="text-[#F5F0E8] text-sm flex items-center"><span className="mr-2">✨</span> {product.chakra}</div>
            </div>
          )}
          {product.healing && (
            <div className="bg-[#1A2E44] p-4 rounded-lg border border-[#C9A84C]/10">
              <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">Healing Properties</div>
              <div className="text-[#F5F0E8] text-sm flex items-center"><span className="mr-2">🌿</span> {product.healing}</div>
            </div>
          )}
          {product.weight && (
            <div className="bg-[#1A2E44] p-4 rounded-lg border border-[#C9A84C]/10">
              <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-wider mb-1">Weight/Size</div>
              <div className="text-[#F5F0E8] text-sm flex items-center"><span className="mr-2">⚖️</span> {product.weight}</div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="space-y-4 pt-4">
        {/* Stock Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
            {product.inStock ? t('products.inStock', 'उपलब्ध') : t('products.outOfStock', 'स्टॉक में नहीं')}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-4 rounded-lg text-lg font-bold transition-all ${
              !product.inStock 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : added 
                  ? 'bg-green-600 text-white' 
                  : 'bg-[#C9A84C] text-[#0D1B2A] hover:bg-[#D4B96A] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]'
            }`}
          >
            {added ? 'Added to Cart ✓' : t('products.addToCart', 'कार्ट में जोड़ें')}
          </button>
          
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-lg text-center font-bold border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
          >
            {t("Enquire on WhatsApp", "व्हाट्सएप पर पूछताछ करें")}
          </a>
        </div>
      </div>
    </div>
  );
}
