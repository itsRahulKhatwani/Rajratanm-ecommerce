import { createServerClient } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import CustomerSignOut from '@/components/ui/CustomerSignOut'

export default async function AccountPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Middleware handles redirect but add backup check
  if (!user) redirect('/login?redirect=/account')

  // Fetch this customer's orders by their email
  const orders = await prisma.order.findMany({
    where: { customerEmail: user.email! },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              slug: true,
              imageUrls: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-[#0D1B2A] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-playfair text-4xl text-[#C9A84C] mb-2">
            My Account
          </h1>
          <p className="text-[#F5F0E8]/60">
            Welcome back, {user.email}
          </p>
        </div>

        {/* Orders section */}
        <div>
          <h2 className="font-playfair text-2xl text-[#F5F0E8] mb-6">
            My Orders
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#0D2137] rounded-xl 
                            border border-[#C9A84C]/10">
              <p className="text-[#F5F0E8]/50 mb-4">
                You haven't placed any orders yet.
              </p>
              <Link
                href="/shop"
                className="bg-[#C9A84C] text-[#0D1B2A] px-6 py-2 
                           rounded-lg font-medium hover:bg-[#B8962F]
                           transition-colors"
              >
                Browse Our Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="bg-[#0D2137] rounded-xl border 
                             border-[#C9A84C]/10 overflow-hidden"
                >
                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between 
                                  gap-4 p-5 border-b border-[#C9A84C]/10">
                    <div>
                      <p className="text-[#F5F0E8]/50 text-xs mb-1">
                        Order ID
                      </p>
                      <p className="text-[#F5F0E8] font-mono text-sm">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#F5F0E8]/50 text-xs mb-1">
                        Date
                      </p>
                      <p className="text-[#F5F0E8] text-sm">
                        {new Intl.DateTimeFormat('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }).format(new Date(order.createdAt))}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#F5F0E8]/50 text-xs mb-1">
                        Total
                      </p>
                      <p className="text-[#C9A84C] font-medium">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <StatusBadge status={order.status as 'pending' | 'processing' | 'shipped' | 'delivered'} />
                  </div>

                  {/* Order items */}
                  <div className="p-5 space-y-3">
                    {order.items.map(item => (
                      <div key={item.id}
                           className="flex items-center gap-4">
                        {/* Product image */}
                        <div className="w-14 h-14 rounded-lg overflow-hidden 
                                        bg-[#0D1B2A] flex-shrink-0">
                          {item.product.imageUrls[0] ? (
                            <img
                              src={item.product.imageUrls[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center 
                                            justify-center text-[#C9A84C]/40">
                              💎
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-[#F5F0E8] text-sm font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-[#F5F0E8]/50 text-xs">
                            Qty: {item.quantity} × 
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <p className="text-[#C9A84C] text-sm font-medium">
                          ₹{(item.price * item.quantity)
                            .toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp follow up */}
                  <div className="px-5 pb-5">
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I have a query about my order #${order.id.slice(0, 8).toUpperCase()}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-400 hover:text-green-300 
                                 flex items-center gap-1 transition-colors"
                    >
                      💬 Enquire about this order on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sign out button */}
        <CustomerSignOut />
      </div>
    </div>
  )
}
