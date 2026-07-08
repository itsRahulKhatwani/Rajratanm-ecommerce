"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import Button from "@/components/ui/Button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    nameHindi: string;
    slug: string;
    category: string;
    price: number;
    imageUrls: string[];
    inStock: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();

  const name = language === "hi" ? product.nameHindi : product.name;
  const hasImage = product.imageUrls.length > 0;

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-gold/10 bg-navy-light card-hover">
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-dark">
          {hasImage ? (
            <Image
              src={product.imageUrls[0]}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-ivory/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-4 left-4 px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-sm bg-navy/90 text-gold backdrop-blur-md border border-gold/30 shadow-lg">
            {product.category}
          </span>
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm flex items-center justify-center">
              <span className="text-rose font-bold text-sm tracking-widest uppercase border border-rose/50 px-4 py-2 rounded-sm bg-navy/50">{t("products.outOfStock")}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-playfair text-lg font-semibold text-ivory group-hover:text-gold transition-colors duration-300 mb-2 line-clamp-1">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-gold font-semibold text-lg">₹{product.price.toLocaleString("en-IN")}</p>
          <Link href={`/shop/${product.slug}`}>
            <span className="text-sm text-ivory/50 hover:text-gold transition-colors duration-300">
              {t("products.viewDetails")} →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
