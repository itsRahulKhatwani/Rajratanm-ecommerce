"use client";

import { useLanguage } from "@/lib/LanguageContext";
import ProductCard from "@/components/ui/ProductCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ShopContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const categories = [
    { key: "all", label: "shop.all" },
    { key: "precious", label: "shop.precious" },
    { key: "semi-precious", label: "shop.semiPrecious" },
    { key: "crystal", label: "shop.crystals" },
    { key: "jewelry", label: "shop.jewelry" },
  ];

  // No products until owner adds them via admin
  const products: Array<any> = [];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-gold mb-4">
            {t("shop.title")}
          </h1>
          <p className="text-ivory/50 text-lg max-w-2xl mx-auto">
            {t("shop.desc")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={cat.key === "all" ? "/shop" : `/shop?category=${cat.key}`}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border backdrop-blur-sm ${
                activeCategory === cat.key
                  ? "bg-gold/90 text-navy-dark border-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : "border-gold/30 text-ivory/60 bg-navy-light/20 hover:border-gold hover:text-gold hover:bg-gold/5"
              }`}
            >
              {t(cat.label)}
            </a>
          ))}
        </div>

        {/* Products Grid or Empty State */}
        {products.length === 0 ? (
          <div className="text-center py-32 rounded-3xl border border-gold/10 bg-navy-light/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/50 pointer-events-none" />
            <svg style={{ width: '5rem', height: '5rem' }} className="block mx-auto mb-8 text-gold/30 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-ivory/60 text-2xl font-playfair italic mb-2 relative z-10">
              {t("shop.empty")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-ivory/40">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
