"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase-client";
import {
  LayoutDashboard,
  Gem,
  PlusCircle,
  BookOpen,
  PenLine,
  ShoppingBag,
  LogOut,
  Loader2,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Gem },
  { href: "/admin/products/new", label: "Add Product", icon: PlusCircle },
  { href: "/admin/blogs", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/blogs/new", label: "Write Blog", icon: PenLine },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  function isActive(href: string): boolean {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0D1B2A] border-r border-[#C9A84C]/20 flex flex-col">
      {/* Brand */}
      <div className="p-6 pb-2">
        <Link href="/admin" className="block">
          <span
            className="text-xl font-bold text-[#C9A84C] block"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Raj Ratnam
          </span>
          <span className="text-xs text-[#F5F0E8]/40 mt-0.5 block">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active
                  ? "text-[#C9A84C] bg-[#C9A84C]/10 border-l-2 border-[#C9A84C]"
                  : "text-[#F5F0E8]/50 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom — Sign Out */}
      <div className="p-4 border-t border-[#C9A84C]/10">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[#C97D7D] hover:bg-[#C97D7D]/10 transition-colors disabled:opacity-50"
        >
          {signingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
