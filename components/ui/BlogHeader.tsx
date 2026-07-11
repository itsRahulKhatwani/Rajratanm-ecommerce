"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function BlogHeader() {
  const { t } = useLanguage();
  return (
    <div className="text-center mb-16">
      <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#C9A84C] mb-4">
        {t("From Our Journal", "हमारे जर्नल से")}
      </h1>
      <p className="text-[#F5F0E8]/50 text-lg max-w-2xl mx-auto">
        {t("Stories, wisdom, and guides from the world of gemstones", "रत्नों की दुनिया से कहानियाँ और मार्गदर्शन")}
      </p>
    </div>
  );
}
