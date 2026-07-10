import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Gem,
  BookOpen,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";

// Status badge color mapping
const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  delivered: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default async function AdminDashboard() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect("/admin/login");
  }

  let totalProducts = 0;
  let publishedBlogs = 0;
  let totalOrders = 0;
  let totalRevenue = 0;
  let recentOrders: {
    id: string;
    customerName: string;
    totalAmount: number;
    status: string;
    createdAt: Date;
    _count: { items: number };
  }[] = [];
  let dbError = false;

  try {
    const [productsCount, blogsCount, ordersCount, revenueAgg, recent] =
      await Promise.all([
        prisma.product.count(),
        prisma.blog.count({ where: { published: true } }),
        prisma.order.count(),
        prisma.order.aggregate({ _sum: { totalAmount: true } }),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            customerName: true,
            totalAmount: true,
            status: true,
            createdAt: true,
            _count: { select: { items: true } },
          },
        }),
      ]);

    totalProducts = productsCount;
    publishedBlogs = blogsCount;
    totalOrders = ordersCount;
    totalRevenue = revenueAgg._sum.totalAmount ?? 0;
    recentOrders = recent;
  } catch (err) {
    console.error("[ADMIN_DASHBOARD] Error fetching stats:", err);
    dbError = true;
  }

  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toLocaleString("en-IN"),
      icon: Gem,
    },
    {
      label: "Published Blogs",
      value: publishedBlogs.toLocaleString("en-IN"),
      icon: BookOpen,
    },
    {
      label: "Total Orders",
      value: totalOrders.toLocaleString("en-IN"),
      icon: ShoppingBag,
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  if (dbError) {
    return (
      <div>
        <h1
          className="text-3xl font-bold text-[#F5F0E8] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dashboard
        </h1>
        <p className="text-[#F5F0E8]/50 mb-8">
          Welcome back. Here&apos;s what&apos;s happening with Raj Ratanm.
        </p>
        <div className="rounded-xl border border-[#C97D7D]/30 bg-[#C97D7D]/10 p-6 text-center">
          <p className="text-[#D4999A] text-sm">
            Unable to connect to the database. Please check your DATABASE_URL
            environment variable and ensure the database is running.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h1
        className="text-3xl font-bold text-[#F5F0E8] mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Dashboard
      </h1>
      <p className="text-[#F5F0E8]/50 mb-8">
        Welcome back. Here&apos;s what&apos;s happening with Raj Ratanm.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-xl border border-[#C9A84C]/15 bg-[#0D2137]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#F5F0E8]/50">{stat.label}</span>
                <Icon className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <p
                className="text-3xl font-bold text-[#F5F0E8]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-[#C9A84C]/15 bg-[#0D2137] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-semibold text-[#C9A84C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Recent Orders
          </h2>
          {recentOrders.length > 0 && (
            <Link
              href="/admin/orders"
              className="text-sm text-[#C9A84C] hover:text-[#D4B96A] transition-colors"
            >
              View All Orders →
            </Link>
          )}
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-12 text-[#F5F0E8]/30">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No orders yet. Share your store to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#C9A84C]/10">
                  <th className="text-left py-3 px-2 text-[#F5F0E8]/40 font-medium">
                    Customer Name
                  </th>
                  <th className="text-left py-3 px-2 text-[#F5F0E8]/40 font-medium">
                    Items
                  </th>
                  <th className="text-left py-3 px-2 text-[#F5F0E8]/40 font-medium">
                    Total
                  </th>
                  <th className="text-left py-3 px-2 text-[#F5F0E8]/40 font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 px-2 text-[#F5F0E8]/40 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#C9A84C]/5 last:border-0"
                  >
                    <td className="py-3 px-2 text-[#F5F0E8]">
                      {order.customerName}
                    </td>
                    <td className="py-3 px-2 text-[#F5F0E8]/60">
                      {order._count.items}
                    </td>
                    <td className="py-3 px-2 text-[#F5F0E8]">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          statusColors[order.status] ??
                          "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-[#F5F0E8]/50">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
