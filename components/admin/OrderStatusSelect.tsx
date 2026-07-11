"use client";

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface OrderStatusSelectProps {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsUpdating(true);
    setShowSuccess(false);
    setError(false);

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error('Update failed');
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setError(true);
      setStatus(currentStatus); // revert
      setTimeout(() => setError(false), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        value={status}
        onChange={handleChange}
        disabled={isUpdating}
        className="bg-[#1A2E44] border border-[#C9A84C]/30 text-[#F5F0E8] text-xs rounded px-2 py-1 focus:outline-none focus:border-[#C9A84C]"
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
      
      {isUpdating && <span className="text-[10px] text-gray-400 flex items-center"><Loader2 className="w-3 h-3 animate-spin mr-1" /> Updating...</span>}
      {showSuccess && <span className="text-[10px] text-green-400">✓ Updated</span>}
      {error && <span className="text-[10px] text-red-400">Failed</span>}
    </div>
  );
}
