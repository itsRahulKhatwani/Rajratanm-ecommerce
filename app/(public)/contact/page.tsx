"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission — will connect to Supabase later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-gold mb-4">
            {t("contact.title")}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="rounded-2xl border border-gold/10 bg-navy-light/50 p-8">
            {submitted ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-emerald mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-playfair text-2xl text-gold mb-2">Message Sent!</h3>
                <p className="text-ivory/50">{t("contact.responseNote")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-ivory/70 mb-2">{t("contact.name")}</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ivory/70 mb-2">{t("contact.email")}</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ivory/70 mb-2">{t("contact.phone")}</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ivory/70 mb-2">{t("contact.message")}</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t("common.loading") : t("contact.send")}
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl border border-gold/20 bg-navy-light/50 card-hover group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald/20 text-emerald-light group-hover:bg-emerald/30 transition-colors shrink-0">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h3 className="font-playfair text-xl text-gold font-semibold mb-1">
                  {t("contact.whatsapp")}
                </h3>
                <p className="text-ivory/50 text-sm">Quick responses on WhatsApp</p>
              </div>
            </a>

            {/* Business Hours */}
            <div className="p-6 rounded-2xl border border-gold/10 bg-navy-light/50">
              <h3 className="font-playfair text-xl text-gold font-semibold mb-3">
                {t("contact.hours")}
              </h3>
              <p className="text-ivory/60">{t("contact.hoursValue")}</p>
            </div>

            {/* Note */}
            <div className="p-6 rounded-2xl border border-emerald/20 bg-emerald/5">
              <p className="text-emerald-light text-sm font-medium">
                📬 {t("contact.responseNote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
