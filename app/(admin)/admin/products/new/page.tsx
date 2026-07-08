"use client";

import { useState } from "react";

export default function NewProductPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Will POST to /api/products when DB is connected
    alert("Product creation requires database connection. Connect Supabase and run Prisma migrations first.");
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-gold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Product Name (English)</label>
            <input type="text" required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Product Name (Hindi)</label>
            <input type="text" required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
        </div>

        {/* Slug & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Slug (URL-friendly name)</label>
            <input type="text" required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Category</label>
            <select className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors">
              <option value="precious">Precious</option>
              <option value="semi-precious">Semi-Precious</option>
              <option value="crystal">Crystal</option>
              <option value="jewelry">Jewelry</option>
            </select>
          </div>
        </div>

        {/* Price & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Price (₹)</label>
            <input type="number" required step="0.01" className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Weight</label>
            <input type="text" placeholder="e.g. 5-7 carats" className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Origin</label>
            <input type="text" placeholder="e.g. Sri Lanka" className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
        </div>

        {/* Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Description (English)</label>
            <textarea rows={6} required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Description (Hindi)</label>
            <textarea rows={6} required className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors resize-none" />
          </div>
        </div>

        {/* Chakra & Healing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Chakra</label>
            <input type="text" placeholder="e.g. Heart Chakra" className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ivory/70 mb-2">Healing Properties</label>
            <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors resize-none" />
          </div>
        </div>

        {/* Image URLs */}
        <div>
          <label className="block text-sm font-medium text-ivory/70 mb-2">Image URLs (Cloudinary — one per line)</label>
          <textarea rows={3} placeholder="https://res.cloudinary.com/..." className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory focus:outline-none focus:border-gold/50 transition-colors resize-none" />
          <p className="text-xs text-ivory/30 mt-1">Upload images to Cloudinary first, then paste the URLs here.</p>
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-ivory/70 cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-gold w-4 h-4" />
            In Stock
          </label>
          <label className="flex items-center gap-2 text-ivory/70 cursor-pointer">
            <input type="checkbox" className="accent-gold w-4 h-4" />
            Featured
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 rounded-xl bg-gold text-navy font-semibold hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
}
