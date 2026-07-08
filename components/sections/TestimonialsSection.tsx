"use client";

import { useLanguage } from "@/lib/LanguageContext";

interface TestimonialsSectionProps {
  testimonials: Array<{
    id: string;
    name: string;
    location: string;
    content: string;
    rating: number;
  }>;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-navy-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gold mb-4">
            {t("testimonials.title")}
          </h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-gold/10 bg-navy-light/30">
            <svg className="w-12 h-12 text-gold/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-ivory/40 text-lg font-playfair italic">
              {t("testimonials.empty")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="p-8 rounded-2xl border border-gold/10 bg-navy-light/50 card-hover"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < item.rating ? "text-gold" : "text-ivory/20"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-ivory/70 leading-relaxed mb-6 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-ivory">{item.name}</p>
                  <p className="text-sm text-ivory/40">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
