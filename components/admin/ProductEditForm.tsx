"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import { XCircle, Loader2, Clock } from 'lucide-react';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageUploader from '@/components/ui/ImageUploader';

export default function ProductEditForm({ product, isNew = false }: { product?: Partial<Product>, isNew?: boolean }) {
  const router = useRouter();
  const [name, setName] = useState(product?.name || '');
  const [nameHindi, setNameHindi] = useState(product?.nameHindi || '');
  const [slug, setSlug] = useState(product?.slug || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price ? product.price.toString() : '');
  const [description, setDescription] = useState(product?.description || '');
  const [descriptionHindi, setDescriptionHindi] = useState(product?.descriptionHindi || '');
  const [origin, setOrigin] = useState(product?.origin || '');
  const [chakra, setChakra] = useState(product?.chakra || '');
  const [healingProps, setHealingProps] = useState(product?.healingProps || '');
  const [weight, setWeight] = useState(product?.weight || '');
  const [imageUrls, setImageUrls] = useState<string[]>(product?.imageUrls || []);
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !price || !description) {
      setError('Name, category, price, and English description are required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      name,
      nameHindi,
      slug,
      category,
      price: parseFloat(price),
      description,
      descriptionHindi,
      origin,
      chakra,
      healingProps,
      weight,
      imageUrls,
      inStock,
      featured
    };

    try {
      const url = isNew ? '/api/products' : `/api/products/${product?.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update product');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/products');
        router.refresh();
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsSubmitting(false);
    }
  };

  const updatedAt = product?.updatedAt ? new Intl.DateTimeFormat('en-IN', { 
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(new Date(product.updatedAt)) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#F5F0E8]">{isNew ? 'Add New Product' : 'Edit Product'}</h1>
        {updatedAt && (
          <div className="flex items-center text-sm text-gray-400 bg-[#0D2137] border border-[#C9A84C]/20 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: {updatedAt}
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3 text-red-400">
          <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400 font-medium">
          Product updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Product Details (English)
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name (EN) <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="Product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description (EN) <span className="text-red-400">*</span></label>
              <RichTextEditor 
                value={description} 
                onChange={setDescription} 
                placeholder="Write a detailed description..."
              />
            </div>
          </div>

          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Product Details (Hindi)
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Name (HI)</label>
              <input
                type="text"
                value={nameHindi}
                onChange={(e) => setNameHindi(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="हिंदी में नाम"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description (HI)</label>
              <RichTextEditor 
                value={descriptionHindi} 
                onChange={setDescriptionHindi} 
                placeholder="हिंदी में विवरण"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Pricing & Category
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category <span className="text-red-400">*</span></label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                required
              >
                <option value="">Select a category</option>
                <option value="precious">Precious Stones</option>
                <option value="semi-precious">Semi-Precious Stones</option>
                <option value="crystal">Healing Crystals</option>
                <option value="jewelry">Artificial Jewelry</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Price (₹) <span className="text-red-400">*</span></label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
              />
              <p className="text-xs text-yellow-500/80 mt-1">Warning: Changing the slug will break existing links to this product.</p>
            </div>
          </div>

          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Product Details
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Origin</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="e.g. Sri Lanka, Rajasthan"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Chakra</label>
              <input
                type="text"
                value={chakra}
                onChange={(e) => setChakra(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="e.g. Heart Chakra"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Healing Properties</label>
              <textarea
                value={healingProps}
                onChange={(e) => setHealingProps(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C] min-h-[100px]"
                placeholder="Describe the healing properties..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Weight/Size</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-2.5 text-[#F5F0E8] focus:outline-none focus:border-[#C9A84C]"
                placeholder="e.g. 5-7 carats"
              />
            </div>
          </div>

          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Status
            </h2>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300 cursor-pointer" htmlFor="inStockToggle">In Stock</label>
              <div 
                id="inStockToggle"
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${inStock ? 'bg-green-500' : 'bg-gray-600'}`}
                onClick={() => setInStock(!inStock)}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${inStock ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-300 cursor-pointer" htmlFor="featuredToggle">Featured on Homepage</label>
                <span className="text-xs text-gray-400 mt-1">Show this product in the Featured Products section on the homepage</span>
              </div>
              <div 
                id="featuredToggle"
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${featured ? 'bg-[#C9A84C]' : 'bg-gray-600'}`}
                onClick={() => setFeatured(!featured)}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${featured ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>

          <div className="bg-[#0D2137] rounded-lg p-6 border border-[#C9A84C]/20 space-y-6">
            <h2 className="text-lg font-medium text-[#C9A84C] border-b border-[#C9A84C]/20 pb-2">
              Product Images
            </h2>
            
            <ImageUploader 
              existingUrls={imageUrls}
              onUploadComplete={setImageUrls}
              multiple={true}
              maxImages={5}
            />
            <p className="text-xs text-gray-400 mt-2">
              Upload up to 5 images. First image will be the main product image.
            </p>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="lg:col-span-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C9A84C] hover:bg-[#D4B86A] text-[#0D2137] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {isNew ? 'Saving...' : 'Updating...'}
              </>
            ) : (
              isNew ? 'Create Product' : 'Update Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
