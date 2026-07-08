"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import Button from "@/components/ui/Button";

interface CartItem {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CartPage() {
  const { language, t } = useLanguage();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("rajratanm_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("rajratanm_cart", JSON.stringify(newCart));
  };

  const updateQty = (id: string, delta: number) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const removeItem = (id: string) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    localStorage.removeItem("rajratanm_cart");
    setCart([]);
    setIsSubmitting(false);
    setOrderPlaced(true);
  };

  if (!mounted) return null;

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <svg className="w-20 h-20 text-emerald mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="font-playfair text-4xl text-gold mb-4">Order Placed!</h1>
          <p className="text-ivory/50 mb-8">Thank you for your order. We&apos;ll confirm it shortly.</p>
          <Link href="/shop">
            <Button variant="outline">{t("cart.continueShopping")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gold mb-10">
          {t("cart.title")}
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 rounded-2xl border border-gold/10 bg-navy-light/30">
            <svg className="w-20 h-20 text-gold/20 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p className="text-ivory/40 text-xl font-playfair italic mb-6">{t("cart.empty")}</p>
            <Link href="/shop">
              <Button variant="outline">{t("cart.continueShopping")}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gold/10 bg-navy-light/50">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-navy-dark shrink-0">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={language === "hi" ? item.nameHindi : item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-playfair text-ivory font-semibold">
                        {language === "hi" ? item.nameHindi : item.name}
                      </h4>
                      <p className="text-gold font-medium">₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full border border-gold/20 text-ivory/60 hover:border-gold hover:text-gold transition-colors flex items-center justify-center">−</button>
                      <span className="text-ivory w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full border border-gold/20 text-ivory/60 hover:border-gold hover:text-gold transition-colors flex items-center justify-center">+</button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-rose/60 hover:text-rose text-sm transition-colors">
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="rounded-2xl border border-gold/10 bg-navy-light/50 p-6 h-fit sticky top-24">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-ivory/60">
                  <span>{t("cart.subtotal")}</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-ivory/60">
                  <span>{t("cart.shipping")}</span>
                  <span className={shipping === 0 ? "text-emerald" : ""}>
                    {shipping === 0 ? t("cart.shippingFree") : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-ivory/30">{t("cart.shippingNote")}</p>
                )}
                <div className="border-t border-gold/10 pt-3 flex justify-between text-lg font-semibold">
                  <span className="text-ivory">{t("cart.total")}</span>
                  <span className="text-gold">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {!showCheckout ? (
                <Button variant="primary" size="lg" className="w-full" onClick={() => setShowCheckout(true)}>
                  {t("cart.checkout")}
                </Button>
              ) : (
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <input type="text" required placeholder={t("checkout.customerName")} className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors text-sm" />
                  <input type="email" required placeholder={t("checkout.email")} className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors text-sm" />
                  <input type="tel" required placeholder={t("checkout.phone")} className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors text-sm" />
                  <textarea required placeholder={t("checkout.address")} rows={2} className="w-full px-4 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors text-sm resize-none" />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" required placeholder={t("checkout.city")} className="w-full px-3 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors text-sm" />
                    <input type="text" required placeholder={t("checkout.state")} className="w-full px-3 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors text-sm" />
                    <input type="text" required placeholder={t("checkout.pincode")} className="w-full px-3 py-3 rounded-xl bg-navy border border-gold/20 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold/50 transition-colors text-sm" />
                  </div>

                  <div className="p-3 rounded-xl border border-emerald/20 bg-emerald/5 text-sm">
                    <label className="flex items-center gap-2 text-ivory/70 cursor-pointer">
                      <input type="radio" name="payment" value="cod" defaultChecked className="accent-gold" />
                      {t("checkout.payOnDelivery")}
                    </label>
                  </div>
                  <div className="p-3 rounded-xl border border-gold/10 bg-navy-light/30 text-sm text-ivory/30 italic">
                    {/* ACTIVATE RAZORPAY: replace with live keys when domain is ready */}
                    {t("checkout.razorpayInactive")}
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t("common.loading") : t("checkout.placeOrder")}
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
