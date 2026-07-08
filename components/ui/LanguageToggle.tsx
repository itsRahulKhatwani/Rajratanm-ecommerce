"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-gold/40 bg-navy-dark/90 backdrop-blur-md text-[11px] font-bold tracking-[0.15em] transition-all duration-300 hover:border-gold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] shadow-inner"
      aria-label="Toggle language"
    >
      <span
        className={`transition-colors duration-300 tracking-wider ${
          language === "en" ? "text-gold font-bold" : "text-ivory/40"
        }`}
      >
        EN
      </span>
      <span className="text-gold/20">|</span>
      <span
        className={`transition-colors duration-300 tracking-wider ${
          language === "hi" ? "text-gold font-bold" : "text-ivory/40"
        }`}
      >
        हि
      </span>
    </button>
  );
}
