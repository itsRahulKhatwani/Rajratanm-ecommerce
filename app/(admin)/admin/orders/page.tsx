import React from 'react';
import { prisma } from '@/lib/prisma';
import OrdersTable from '@/components/admin/OrdersTable';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#F5F0E8]">Orders</h1>
      </div>

      <OrdersTable orders={orders as any} />
    </div>
  );
}
