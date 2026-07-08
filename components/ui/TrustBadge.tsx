"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

interface TrustBadgeProps {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
}

export default function TrustBadge({ icon, titleKey, descKey }: TrustBadgeProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-gold/10 bg-navy-light/50 card-hover group">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald/20 text-emerald-light mb-4 group-hover:bg-emerald/30 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-playfair text-lg font-semibold text-gold mb-2">
        {t(titleKey)}
      </h3>
      <p className="text-ivory/60 text-sm leading-relaxed">
        {t(descKey)}
      </p>
    </div>
  );
}
