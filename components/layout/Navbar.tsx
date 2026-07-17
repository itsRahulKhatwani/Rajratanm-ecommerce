"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getCartCount } from "@/lib/cart";
import { createBrowserClient } from "@/lib/supabase-client";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setCartCount(getCartCount());
    const updateCount = () => setCartCount(getCartCount());
    window.addEventListener("cart-updated", updateCount);
    return () => window.removeEventListener("cart-updated", updateCount);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
    
    const supabase = createBrowserClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: "/", label: "nav.home" },
    { href: "/shop", label: "nav.shop" },
    { href: "/blog", label: "nav.blog" },
    { href: "/about", label: "nav.about" },
    { href: "/contact", label: "nav.contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#C9A84C]/10 bg-[#0D1B2A]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-playfair text-2xl md:text-3xl font-bold text-[#C9A84C] tracking-tight">
              Raj Ratanm
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors duration-300 text-xs font-semibold tracking-[0.2em] uppercase relative group py-2"
              >
                {t(link.label)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-4">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center border border-[#C9A84C] rounded-full overflow-hidden transition-colors text-xs font-semibold"
            >
              <span className={`px-2 py-1 ${language === 'en' ? 'bg-[#C9A84C] text-[#0D1B2A]' : 'bg-transparent text-[#F5F0E8] hover:bg-[#C9A84C]/20'}`}>EN</span>
              <span className={`px-2 py-1 ${language === 'hi' ? 'bg-[#C9A84C] text-[#0D1B2A]' : 'bg-transparent text-[#F5F0E8] hover:bg-[#C9A84C]/20'}`}>हि</span>
            </button>

            {/* Cart icon */}
            <Link
              href="/cart"
              className="relative p-2 text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors duration-300"
              aria-label={t("nav.cart")}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-[#0D1B2A] bg-[#C9A84C] rounded-full transform translate-x-1/4 -translate-y-1/4">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account / Sign In */}
            <div className="relative">
              {user ? (
                <Link
                  href="/account"
                  className="p-2 text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors duration-300 inline-block"
                  aria-label="Account"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </Link>
              ) : (
                <div className="relative group">
                  <button
                    className="p-2 text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors duration-300 inline-block"
                    aria-label="Account"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-[#0D2137] border border-[#C9A84C]/20 rounded-lg shadow-xl py-2">
                      <Link 
                        href="/login" 
                        className="block px-4 py-2 text-sm text-[#F5F0E8]/70 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
                      >
                        Customer Login
                      </Link>
                      <Link 
                        href="/admin/login" 
                        className="block px-4 py-2 text-sm text-[#F5F0E8]/70 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
                      >
                        Admin Portal
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F5F0E8]/70 hover:text-[#C9A84C] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#C9A84C]/10 py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-[#F5F0E8]/70 hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide"
                >
                  {t(link.label)}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
