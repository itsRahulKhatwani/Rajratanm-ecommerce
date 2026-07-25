import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { isAdminEmail } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect('/admin/login')
  }

  // TypeScript narrowing — user is guaranteed non-null past this point
  const adminUser = user!

  return (
    <div className="p-8">
      <div className="mb-12 border-b border-[#C9A84C]/20 pb-6">
        <h1 className="text-3xl font-playfair text-[#C9A84C] mb-2">Welcome Back</h1>
        <p className="text-sm text-[#F5F0E8]/70">Logged in as {adminUser.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#0D2137] p-6 rounded-xl border border-[#C9A84C]/30 shadow-lg">
          <h2 className="text-xl text-[#C9A84C] font-semibold mb-4">Products</h2>
          <p className="opacity-70 text-[#F5F0E8] mb-4">Manage your gemstone and jewelry inventory.</p>
          <Link href="/admin/products" className="block text-center w-full py-2 bg-[#C9A84C] text-[#0D1B2A] rounded font-medium hover:bg-[#B8962F] transition-colors">
            View Products
          </Link>
        </div>
        
        <div className="bg-[#0D2137] p-6 rounded-xl border border-[#C9A84C]/30 shadow-lg">
          <h2 className="text-xl text-[#C9A84C] font-semibold mb-4">Orders</h2>
          <p className="opacity-70 text-[#F5F0E8] mb-4">View and process customer orders.</p>
          <Link href="/admin/orders" className="block text-center w-full py-2 bg-[#C9A84C] text-[#0D1B2A] rounded font-medium hover:bg-[#B8962F] transition-colors">
            Manage Orders
          </Link>
        </div>

        <div className="bg-[#0D2137] p-6 rounded-xl border border-[#C9A84C]/30 shadow-lg">
          <h2 className="text-xl text-[#C9A84C] font-semibold mb-4">Blog Posts</h2>
          <p className="opacity-70 text-[#F5F0E8] mb-4">Write and manage journal entries.</p>
          <Link href="/admin/blogs" className="block text-center w-full py-2 bg-[#C9A84C] text-[#0D1B2A] rounded font-medium hover:bg-[#B8962F] transition-colors">
            Manage Blogs
          </Link>
        </div>

        <div className="bg-[#0D2137] p-6 rounded-xl border border-[#C9A84C]/30 shadow-lg">
          <h2 className="text-xl text-[#C9A84C] font-semibold mb-4">Messages</h2>
          <p className="opacity-70 text-[#F5F0E8] mb-4">Read customer enquiries from the contact form.</p>
          <Link href="/admin/messages" className="block text-center w-full py-2 bg-[#C9A84C] text-[#0D1B2A] rounded font-medium hover:bg-[#B8962F] transition-colors">
            View Messages
          </Link>
        </div>
      </div>
    </div>
  )
}
