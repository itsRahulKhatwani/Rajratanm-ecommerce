"use client";

import React, { useState, useMemo } from 'react';
import { Order, OrderItem, Product } from '@prisma/client';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';
import StatusBadge from '@/components/ui/StatusBadge';
import { ShoppingBag } from 'lucide-react';

type FullOrder = Order & {
  items: (OrderItem & { product: Product })[];
};

export default function OrdersTable({ orders }: { orders: FullOrder[] }) {
  const [filter, setFilter] = useState('all');

  const filteredOrders = useMemo(() => {
    if (filter === 'all') return orders;
    return orders.filter(o => o.status === filter);
  }, [orders, filter]);

  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${filter === 'all' ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 text-gray-400 hover:text-gray-200 bg-[#0D2137]'}`}
        >
          All: {counts.all}
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${filter === 'pending' ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 text-gray-400 hover:text-gray-200 bg-[#0D2137]'}`}
        >
          Pending: {counts.pending}
        </button>
        <button 
          onClick={() => setFilter('confirmed')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${filter === 'confirmed' ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 text-gray-400 hover:text-gray-200 bg-[#0D2137]'}`}
        >
          Confirmed: {counts.confirmed}
        </button>
        <button 
          onClick={() => setFilter('shipped')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${filter === 'shipped' ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 text-gray-400 hover:text-gray-200 bg-[#0D2137]'}`}
        >
          Shipped: {counts.shipped}
        </button>
        <button 
          onClick={() => setFilter('delivered')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${filter === 'delivered' ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 text-gray-400 hover:text-gray-200 bg-[#0D2137]'}`}
        >
          Delivered: {counts.delivered}
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20 bg-[#0D2137]">
          <table className="w-full text-left text-sm text-[#F5F0E8]">
            <thead className="bg-[#C9A84C]/10 text-xs uppercase border-b border-[#C9A84C]/20">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A84C]/10">
              {filteredOrders.map((order) => {
                const itemSummary = order.items.length <= 2 
                  ? order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')
                  : `${order.items[0].quantity}x ${order.items[0].product.name}, ${order.items[1].quantity}x ${order.items[1].product.name} +${order.items.length - 2} more`;

                return (
                  <tr key={order.id} className="hover:bg-[#C9A84C]/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#F5F0E8]">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.customerEmail}</div>
                      <div className="text-xs text-gray-400">{order.customerPhone}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-xs max-w-[200px] truncate">
                      {itemSummary}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-xs">
                      {new Intl.DateTimeFormat('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      }).format(new Date(order.createdAt))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-[#0D2137] border border-[#C9A84C]/20 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h2 className="text-xl font-medium text-[#F5F0E8] mb-2">No orders found</h2>
          <p className="text-gray-400">Orders will appear here when customers make purchases</p>
        </div>
      )}
    </div>
  );
}
