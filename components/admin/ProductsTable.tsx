"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@prisma/client';
import { Gem, Edit, Trash2, Star, AlertCircle } from 'lucide-react';

export default function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (slug: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeleteId(null);
        router.refresh();
      } else {
        console.error('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteProduct = products.find(p => p.id === deleteId);

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20 bg-[#0D2137]">
        <table className="w-full text-left text-sm text-[#F5F0E8]">
          <thead className="bg-[#C9A84C]/10 text-xs uppercase border-b border-[#C9A84C]/20">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A84C]/10">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-[#C9A84C]/5 transition-colors">
                <td className="px-4 py-3">
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.name} 
                      className="w-12 h-12 rounded object-cover border border-[#C9A84C]/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                      <Gem className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[#F5F0E8]">{product.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{product.slug}</div>
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </td>
                <td className="px-4 py-3 font-medium">
                  ₹{product.price.toLocaleString('en-IN')}
                </td>
                <td className="px-4 py-3">
                  {product.inStock ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {product.featured ? (
                    <Star className="w-5 h-5 text-[#C9A84C] fill-[#C9A84C]" />
                  ) : (
                    <Star className="w-5 h-5 text-gray-500" />
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link 
                      href={`/admin/products/${product.slug}/edit`}
                      className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="p-1.5 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && deleteProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#0D2137] border border-[#C9A84C]/30 rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-[#F5F0E8]">Delete Product</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <span className="font-semibold text-white">{deleteProduct.name}</span>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                disabled={isDeleting}
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDelete(deleteProduct.slug)}
                className="px-4 py-2 rounded text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
