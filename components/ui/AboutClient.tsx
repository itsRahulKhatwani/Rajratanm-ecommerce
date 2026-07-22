"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function AboutClient() {
  const { t } = useLanguage();

  const values = [
    { key: "about.authenticity", icon: "🔮", desc: "Every stone in our collection is carefully verified for authenticity, ensuring you receive only genuine, natural gemstones with certified origins." },
    { key: "about.ethics", icon: "🌿", desc: "We partner with responsible mining communities across India, ensuring fair wages and sustainable extraction practices that respect the earth." },
    { key: "about.spirituality", icon: "✨", desc: "Each crystal carries ancient energy. We honor this by providing detailed guidance on the spiritual and healing properties of every piece." },
    { key: "about.beauty", icon: "💎", desc: "We believe natural stones are nature's finest art. Our curators select only the most visually stunning specimens for our collection." },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-gold mb-6">
            {t("about.title")}
          </h1>
        </div>

        {/* Story */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl text-gold mb-8">{t("about.story.title")}</h2>
          <div className="space-y-6 text-ivory/70 leading-relaxed text-lg">
            <p>
              Raj Ratnam was born from a deep reverence for the earth&apos;s treasures. 
              In the heart of India, where ancient traditions of gemstone knowledge have 
              been passed down through generations, we began our journey to bring the 
              world&apos;s most authentic and powerful stones to those who seek them.
            </p>
            <p>
              Our founder grew up surrounded by the mystical world of precious stones — 
              learning to identify genuine crystals by their energy, understanding the 
              subtle differences between natural and treated gems, and discovering the 
              profound healing properties that different stones carry within them.
            </p>
            <p>
              Today, Raj Ratnam stands as a bridge between ancient wisdom and modern 
              living. Every piece in our collection is hand-selected, ethically sourced, 
              and accompanied by detailed information about its origins, properties, and 
              spiritual significance. We believe that the right stone, at the right time, 
              can transform lives.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="font-playfair text-3xl text-gold mb-10 text-center">{t("about.values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.key}
                className="p-8 rounded-2xl border border-gold/10 bg-navy-light/50 card-hover"
              >
                <span className="text-4xl mb-4 block">{v.icon}</span>
                <h3 className="font-playfair text-xl text-gold font-semibold mb-3">
                  {t(v.key)}
                </h3>
                <p className="text-ivory/60 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
