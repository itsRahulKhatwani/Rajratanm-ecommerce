"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "💎" },
  { href: "/admin/blogs", label: "Blogs", icon: "📝" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-navy-dark border-r border-gold/10 p-6 hidden md:block">
      <Link href="/admin" className="block mb-10">
        <span className="font-playfair text-xl font-bold text-gold">Raj Ratanm</span>
        <span className="block text-xs text-ivory/40 mt-1">Admin Dashboard</span>
      </Link>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-ivory/50 hover:text-gold hover:bg-gold/5"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-10">
        <Link href="/" className="text-sm text-ivory/30 hover:text-gold transition-colors">
          ← Back to Site
        </Link>
      </div>
    </aside>
  );
}
