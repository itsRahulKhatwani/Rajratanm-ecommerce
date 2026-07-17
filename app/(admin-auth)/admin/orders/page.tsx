import { prisma } from "@/lib/prisma"
import OrdersTable from "@/components/admin/OrdersTable"

export const dynamic = "force-dynamic"

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: true
    }
  })
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair text-[#C9A84C]">Orders</h1>
      </div>
      <OrdersTable orders={orders as any} />
    </div>
  )
}
