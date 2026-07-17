"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Package, Truck, CheckCircle, Clock, Loader2, Search } from 'lucide-react';
import Image from 'next/image';

export default function TrackOrderPage() {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderId.trim() })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch order');
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || 'Order not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return { text: 'Pending', icon: Clock, color: 'text-yellow-500' };
      case 'confirmed': return { text: 'Confirmed', icon: CheckCircle, color: 'text-blue-400' };
      case 'shipped': return { text: 'Shipped', icon: Truck, color: 'text-indigo-400' };
      case 'delivered': return { text: 'Delivered', icon: Package, color: 'text-green-500' };
      default: return { text: status, icon: Package, color: 'text-gray-400' };
    }
  };

  return (
    <main className="py-16 px-4 max-w-4xl mx-auto min-h-[70vh]">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="font-playfair text-4xl font-bold text-[#F5F0E8] mb-4">
          Track Your Order
        </h1>
        <p className="text-[#F5F0E8]/70 text-lg">
          Enter your Order ID below to see the real-time status of your package.
        </p>
      </div>

      <div className="bg-[#0D1B2A] p-8 rounded-xl border border-[#C9A84C]/20 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <form onSubmit={handleTrack} className="flex gap-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. cm04...)"
            className="flex-grow bg-[#1A2E44] border border-[#C9A84C]/30 rounded-lg p-4 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#C9A84C] text-[#0D1B2A] font-bold px-8 py-4 rounded-lg hover:bg-[#D4B96A] transition-colors flex items-center justify-center min-w-[140px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 mr-2" /> Track</>}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-center">
            {error}
          </div>
        )}

        {order && (
          <div className="mt-10 animate-fade-in">
            <h2 className="text-xl font-medium text-[#F5F0E8] border-b border-[#C9A84C]/20 pb-4 mb-6">
              Order Details
            </h2>
            
            <div className="space-y-6">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <p className="text-sm text-[#F5F0E8]/50 mb-1">Order ID</p>
                  <p className="font-mono text-[#F5F0E8]">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[#F5F0E8]/50 mb-1">Date</p>
                  <p className="text-[#F5F0E8]">
                    {new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(order.createdAt))}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#F5F0E8]/50 mb-1">Total</p>
                  <p className="text-[#C9A84C] font-semibold text-lg">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="bg-[#1A2E44] rounded-lg p-6 flex flex-col items-center justify-center">
                <p className="text-sm text-[#F5F0E8]/50 mb-4 uppercase tracking-widest">Current Status</p>
                {(() => {
                  const { text, icon: Icon, color } = getStatusDisplay(order.status);
                  return (
                    <div className="flex items-center gap-3">
                      <Icon className={`w-10 h-10 ${color}`} />
                      <span className={`text-3xl font-bold ${color}`}>{text}</span>
                    </div>
                  );
                })()}
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-[#F5F0E8] font-medium">Items in this order:</h3>
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 bg-[#1A2E44]/50 p-4 rounded-lg">
                    <div className="relative w-16 h-16 bg-[#0D1B2A] rounded overflow-hidden flex-shrink-0">
                      {item.product.imageUrls?.[0] && (
                        <Image src={item.product.imageUrls[0]} alt={item.product.name} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-[#F5F0E8] font-medium">{item.product.name}</p>
                      <p className="text-[#F5F0E8]/50 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
