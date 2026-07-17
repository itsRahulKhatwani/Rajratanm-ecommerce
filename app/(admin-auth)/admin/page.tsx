import { createServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL?.trim()

  if (!user || user.email !== adminEmail) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-[#F5F0E8] p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-[#C9A84C]/20 pb-6">
          <div>
            <h1 className="text-3xl font-playfair text-[#C9A84C] mb-2">Admin Dashboard</h1>
            <p className="text-sm opacity-70">Logged in as {user.email}</p>
          </div>
          <form action="/auth/signout" method="POST">
            <button 
              type="submit"
              className="px-4 py-2 border border-[#C9A84C]/50 text-[#C9A84C] rounded-lg hover:bg-[#C9A84C]/10 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0D2137] p-6 rounded-xl border border-[#C9A84C]/30 shadow-lg">
            <h2 className="text-xl text-[#C9A84C] font-semibold mb-4">Products</h2>
            <p className="opacity-70 mb-4">Manage your gemstone and jewelry inventory.</p>
            <button className="w-full py-2 bg-[#C9A84C] text-[#0D1B2A] rounded font-medium hover:bg-[#B8962F] transition-colors disabled:opacity-50" disabled>Coming Soon</button>
          </div>
          
          <div className="bg-[#0D2137] p-6 rounded-xl border border-[#C9A84C]/30 shadow-lg">
            <h2 className="text-xl text-[#C9A84C] font-semibold mb-4">Orders</h2>
            <p className="opacity-70 mb-4">View and process customer orders.</p>
            <button className="w-full py-2 bg-[#C9A84C] text-[#0D1B2A] rounded font-medium hover:bg-[#B8962F] transition-colors disabled:opacity-50" disabled>Coming Soon</button>
          </div>

          <div className="bg-[#0D2137] p-6 rounded-xl border border-[#C9A84C]/30 shadow-lg">
            <h2 className="text-xl text-[#C9A84C] font-semibold mb-4">Blog Posts</h2>
            <p className="opacity-70 mb-4">Write and manage journal entries.</p>
            <button className="w-full py-2 bg-[#C9A84C] text-[#0D1B2A] rounded font-medium hover:bg-[#B8962F] transition-colors disabled:opacity-50" disabled>Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  )
}
