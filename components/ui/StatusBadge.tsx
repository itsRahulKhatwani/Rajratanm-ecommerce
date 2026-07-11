import React from 'react';

export default function StatusBadge({ status }: { status: string }) {
  let colors = '';
  switch (status.toLowerCase()) {
    case 'pending':
      colors = 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      break;
    case 'confirmed':
      colors = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      break;
    case 'shipped':
      colors = 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      break;
    case 'delivered':
      colors = 'bg-green-500/20 text-green-400 border-green-500/30';
      break;
    case 'draft':
      colors = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      break;
    case 'published':
      colors = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      break;
    default:
      colors = 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium border ${colors}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
