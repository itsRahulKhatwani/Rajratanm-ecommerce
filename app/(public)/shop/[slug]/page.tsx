"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function ProductDetailPage() {
  const { t } = useLanguage();

  // Product will be fetched from DB once connected — for now show a not-found state
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto text-center py-24">
        <svg className="w-20 h-20 text-gold/20 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h1 className="font-playfair text-3xl text-gold mb-4">Product Not Found</h1>
        <p className="text-ivory/50 mb-8">This product hasn&apos;t been added yet. Products will appear here once the owner adds them through the admin dashboard.</p>
        <Link href="/shop" className="text-gold hover:text-gold-light transition-colors">
          ← {t("cart.continueShopping")}
        </Link>
      </div>
    </div>
  );
}
