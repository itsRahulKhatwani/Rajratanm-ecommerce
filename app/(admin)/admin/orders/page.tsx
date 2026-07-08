export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-gold mb-8">Orders</h1>

      <div className="rounded-2xl border border-gold/10 bg-navy-light/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Order ID</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Customer</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Date</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Status</th>
              <th className="px-6 py-4 text-right text-ivory/50 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-ivory/30">
                No orders yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
