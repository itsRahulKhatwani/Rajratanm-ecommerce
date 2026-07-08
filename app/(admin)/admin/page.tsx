import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Products", value: "0", icon: "💎" },
    { label: "Total Orders", value: "0", icon: "📦" },
    { label: "Total Revenue", value: "₹0", icon: "💰" },
    { label: "Published Blogs", value: "0", icon: "📝" },
  ];

  return (
    <div>
      <h1 className="font-playfair text-3xl font-bold text-gold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-gold/10 bg-navy-light/50">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-ivory/50 text-sm mb-1">{stat.label}</p>
            <p className="font-playfair text-3xl font-bold text-ivory">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-10">
        <Link
          href="/admin/products/new"
          className="px-6 py-3 rounded-xl bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors"
        >
          + Add Product
        </Link>
        <Link
          href="/admin/blogs/new"
          className="px-6 py-3 rounded-xl border border-gold/30 text-gold font-semibold text-sm hover:bg-gold/10 transition-colors"
        >
          + Write Blog
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-gold/10 bg-navy-light/50 p-6">
        <h2 className="font-playfair text-xl text-gold font-semibold mb-4">Recent Orders</h2>
        <div className="text-center py-12 text-ivory/30">
          <p>No orders yet. Orders will appear here once customers start purchasing.</p>
        </div>
      </div>
    </div>
  );
}
