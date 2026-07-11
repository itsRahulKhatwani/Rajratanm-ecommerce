import React from 'react';
import Link from 'next/link';
import { PlusCircle, Gem } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ProductsTable from '@/components/admin/ProductsTable';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      slug: true,
      category: true,
      price: true,
      inStock: true,
      featured: true,
      imageUrls: true,
      createdAt: true,
      nameHindi: true,
      description: true,
      descriptionHindi: true,
      origin: true,
      chakra: true,
      healingProps: true,
      weight: true,
      updatedAt: true,
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-[#F5F0E8]">Products</h1>
        <Link 
          href="/admin/products/new"
          className="flex items-center space-x-2 bg-[#C9A84C] text-[#0D2137] px-4 py-2 rounded-lg font-medium hover:bg-[#D4B86A] transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Product</span>
        </Link>
      </div>

      {products.length > 0 ? (
        <ProductsTable products={products as any} />
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0D2137] border border-[#C9A84C]/20 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-4">
            <Gem className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h2 className="text-xl font-medium text-[#F5F0E8] mb-2">No products yet</h2>
          <p className="text-gray-400 mb-6">Add your first gemstone to get started</p>
          <Link 
            href="/admin/products/new"
            className="flex items-center space-x-2 bg-[#C9A84C] text-[#0D2137] px-4 py-2 rounded-lg font-medium hover:bg-[#D4B86A] transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
        </div>
      )}
    </div>
  );
}
