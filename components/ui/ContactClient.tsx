"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2 } from 'lucide-react';

export default function ContactClient() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to send');
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(t('common.error', 'Something went wrong'));
    }
  };

  return (
    <main className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#C9A84C] mb-4">
          {t("contact.title")}
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl mx-auto">
          {t("contact.responseNote")}
        </p>
      </div>

      <div className="bg-[#0D1B2A] p-8 md:p-12 rounded-2xl border border-[#C9A84C]/20 shadow-[0_8px_30px_rgba(201,168,76,0.1)]">
        {status === 'success' ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-2xl font-playfair text-[#F5F0E8] mb-2">Message Sent!</h2>
            <p className="text-[#F5F0E8]/70">Thank you for reaching out. We will get back to you shortly.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 px-6 py-2 border border-[#C9A84C] text-[#C9A84C] rounded-lg hover:bg-[#C9A84C]/10 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {status === 'error' && (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-lg border border-red-500/30">
                {errorMessage}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#F5F0E8]/70 mb-2">{t("contact.name")} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded-lg p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[#F5F0E8]/70 mb-2">{t("contact.email")} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded-lg p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-[#F5F0E8]/70 mb-2">{t("contact.phone")}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded-lg p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-[#F5F0E8]/70 mb-2">{t("contact.message")} *</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded-lg p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#C9A84C] text-[#0D1B2A] font-bold py-4 rounded-lg hover:bg-[#D4B96A] transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {status === 'submitting' ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending...</>
                ) : (
                  t("contact.send")
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
