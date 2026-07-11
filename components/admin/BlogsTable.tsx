"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Blog } from '@prisma/client';
import { BookOpen, Edit, Trash2, AlertCircle } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';

export default function BlogsTable({ blogs }: { blogs: Blog[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (slug: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDeleteId(null);
        router.refresh();
      } else {
        console.error('Failed to delete blog');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const deleteBlog = blogs.find(b => b.id === deleteId);

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20 bg-[#0D2137]">
        <table className="w-full text-left text-sm text-[#F5F0E8]">
          <thead className="bg-[#C9A84C]/10 text-xs uppercase border-b border-[#C9A84C]/20">
            <tr>
              <th className="px-4 py-3">Cover</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A84C]/10">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-[#C9A84C]/5 transition-colors">
                <td className="px-4 py-3">
                  {blog.coverImage ? (
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-12 h-12 rounded object-cover border border-[#C9A84C]/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center border border-gray-700">
                      <BookOpen className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[#F5F0E8]">{blog.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{blog.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={blog.published ? 'published' : 'draft'} />
                </td>
                <td className="px-4 py-3 text-gray-300">
                  {blog.published && blog.publishedAt ? (
                    new Intl.DateTimeFormat('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    }).format(new Date(blog.publishedAt))
                  ) : (
                    '—'
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link 
                      href={`/admin/blogs/${blog.slug}/edit`}
                      className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteId(blog.id)}
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

      {deleteId && deleteBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#0D2137] border border-[#C9A84C]/30 rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-[#F5F0E8]">Delete Blog Post</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete <span className="font-semibold text-white">{deleteBlog.title}</span>? 
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
                onClick={() => handleDelete(deleteBlog.slug)}
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
