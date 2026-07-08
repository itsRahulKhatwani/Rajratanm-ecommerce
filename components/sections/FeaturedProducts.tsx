"use client";

import { useLanguage } from "@/lib/LanguageContext";
import ProductCard from "@/components/ui/ProductCard";

interface FeaturedProductsProps {
  products: Array<{
    id: string;
    name: string;
    nameHindi: string;
    slug: string;
    category: string;
    price: number;
    imageUrls: string[];
    inStock: boolean;
  }>;
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gold mb-4">
            {t("products.featured")}
          </h2>
          <p className="text-ivory/50 text-lg max-w-2xl mx-auto">
            {t("products.featured.desc")}
          </p>
        </div>

        {/* Products Grid or Empty State */}
        {products.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-gold/10 bg-navy-light/30">
            <svg className="w-16 h-16 text-gold/30 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-ivory/40 text-lg font-playfair italic">
              {t("products.empty")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
