"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, X, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCart, updateQuantity, removeFromCart, clearCart } from '@/lib/cart';

interface ValidatedItem {
  productId: string;
  name: string;
  nameHindi: string;
  currentPrice: number;
  imageUrl: string;
  inStock: boolean;
  quantity: number;
}

export default function CartPage() {
  const { t } = useLanguage();
  const [validatedItems, setValidatedItems] = useState<ValidatedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'confirm'>('cart');
  const [orderId, setOrderId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    customerName: '', customerEmail: '', customerPhone: '',
    address: '', city: '', state: '', pincode: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchValidatedCart = async () => {
    setIsLoading(true);
    const cartItems = getCart();
    
    if (cartItems.length === 0) {
      setValidatedItems([]);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/cart/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems })
      });
      if (res.ok) {
        const data = await res.json();
        setValidatedItems(data.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchValidatedCart();
    window.addEventListener('cart-updated', fetchValidatedCart);
    return () => window.removeEventListener('cart-updated', fetchValidatedCart);
  }, []);

  const hasOutOfStock = validatedItems.some(i => !i.inStock);
  const subtotal = validatedItems
    .filter(i => i.inStock)
    .reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setFormErrors({});

    const errors: Record<string, string> = {};
    if (!formData.customerName) errors.customerName = 'Required';
    if (!formData.customerEmail) errors.customerEmail = 'Required';
    if (!/^[0-9]{10}$/.test(formData.customerPhone)) errors.customerPhone = 'Must be 10 digits';
    if (!formData.address) errors.address = 'Required';
    if (!formData.city) errors.city = 'Required';
    if (!formData.state) errors.state = 'Required';
    if (!/^[0-9]{6}$/.test(formData.pincode)) errors.pincode = 'Must be 6 digits';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: getCart()
        })
      });

      if (!res.ok) {
        throw new Error('Failed to place order');
      }
      const data = await res.json();
      
      clearCart();
      setOrderId(data.order.id);
      setCheckoutStep('confirm');
    } catch (err) {
      setApiError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-12 h-12 animate-spin text-[#C9A84C]" />
      </div>
    );
  }

  if (validatedItems.length === 0 && checkoutStep === 'cart') {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <ShoppingBag className="w-20 h-20 text-[#C9A84C]/30 mb-6" />
        <h2 className="font-playfair text-3xl font-bold text-[#F5F0E8] mb-4">
          {t("cart.empty", "Your cart is empty")}
        </h2>
        <p className="text-[#F5F0E8]/50 mb-8 max-w-md">
          {t("Discover our gemstone collection and find the perfect stone for you.", "हमारे रत्न संग्रह की खोज करें")}
        </p>
        <Link href="/shop" className="bg-[#C9A84C] text-[#0D1B2A] font-bold py-3 px-8 rounded-lg hover:bg-[#D4B96A] transition-colors">
          {t("cart.continueShopping", "Shop Now")}
        </Link>
      </div>
    );
  }

  return (
    <main className="py-12 px-4 max-w-6xl mx-auto">
      {checkoutStep === 'cart' && (
        <div className="space-y-8 animate-fade-in">
          <h1 className="font-playfair text-3xl font-bold text-[#F5F0E8]">{t("cart.title", "Your Cart")}</h1>
          
          {hasOutOfStock && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg">
              Some items in your cart are out of stock. Please remove them before checking out.
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-4">
              {validatedItems.map(item => (
                <div key={item.productId} className="flex flex-col sm:flex-row items-center gap-4 bg-[#0D1B2A] p-4 rounded-xl border border-[#C9A84C]/20">
                  <div className="relative w-20 h-20 bg-[#1A2E44] rounded flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center"><ShoppingBag className="w-6 h-6 text-[#C9A84C]/30" /></div>
                    )}
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-medium text-[#F5F0E8]">{t(item.name, item.nameHindi)}</h3>
                    <div className="text-[#C9A84C] font-semibold text-sm">₹{item.currentPrice.toLocaleString('en-IN')}</div>
                    {!item.inStock && <div className="text-red-400 text-xs mt-1">Out of Stock</div>}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#C9A84C]/30 rounded">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        disabled={!item.inStock}
                        className="px-3 py-1 text-[#F5F0E8] hover:bg-[#C9A84C]/10 disabled:opacity-50"
                      >−</button>
                      <span className="px-3 py-1 text-[#F5F0E8] min-w-[2.5rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={!item.inStock}
                        className="px-3 py-1 text-[#F5F0E8] hover:bg-[#C9A84C]/10 disabled:opacity-50"
                      >+</button>
                    </div>
                    
                    <div className="font-semibold text-[#F5F0E8] w-24 text-right hidden sm:block">
                      ₹{(item.currentPrice * item.quantity).toLocaleString('en-IN')}
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/3">
              <div className="bg-[#0D1B2A] p-6 rounded-xl border border-[#C9A84C]/20 sticky top-24">
                <h2 className="text-xl font-medium text-[#F5F0E8] mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-[#F5F0E8]/70">
                    <span>{t("cart.subtotal", "Subtotal")}</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#F5F0E8]/70">
                    <span>{t("cart.shipping", "Shipping")}</span>
                    <span className={shipping === 0 ? "text-green-400" : ""}>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-xs text-[#C9A84C]/80 text-right">
                      {t("cart.shippingNote", "Free shipping on orders above ₹999")}
                    </div>
                  )}
                  <div className="h-px w-full bg-[#C9A84C]/20 my-4" />
                  <div className="flex justify-between text-[#F5F0E8] font-bold text-lg">
                    <span>{t("cart.total", "Total")}</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep('details')}
                  disabled={hasOutOfStock || validatedItems.length === 0}
                  className="w-full bg-[#C9A84C] text-[#0D1B2A] font-bold py-3 rounded-lg hover:bg-[#D4B96A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t("cart.checkout", "Proceed to Checkout")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {checkoutStep === 'details' && (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          <button 
            onClick={() => setCheckoutStep('cart')}
            className="text-[#C9A84C] text-sm hover:underline"
          >
            ← Back to Cart
          </button>
          
          <h1 className="font-playfair text-3xl font-bold text-[#F5F0E8]">Delivery Details</h1>

          {apiError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleCheckoutSubmit} className="space-y-8">
            <div className="bg-[#0D1B2A] p-6 rounded-xl border border-[#C9A84C]/20 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#F5F0E8]/70 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none"
                  />
                  {formErrors.customerName && <p className="text-red-400 text-xs mt-1">{formErrors.customerName}</p>}
                </div>
                <div>
                  <label className="block text-sm text-[#F5F0E8]/70 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                    className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none"
                  />
                  {formErrors.customerEmail && <p className="text-red-400 text-xs mt-1">{formErrors.customerEmail}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#F5F0E8]/70 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                  className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none"
                />
                {formErrors.customerPhone && <p className="text-red-400 text-xs mt-1">{formErrors.customerPhone}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#F5F0E8]/70 mb-1">Address *</label>
                <textarea
                  required
                  placeholder="House/Flat No, Street, Area"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none min-h-[80px]"
                />
                {formErrors.address && <p className="text-red-400 text-xs mt-1">{formErrors.address}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[#F5F0E8]/70 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none"
                  />
                  {formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm text-[#F5F0E8]/70 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none"
                  />
                  {formErrors.state && <p className="text-red-400 text-xs mt-1">{formErrors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm text-[#F5F0E8]/70 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full bg-[#1A2E44] border border-[#C9A84C]/30 rounded p-3 text-[#F5F0E8] focus:border-[#C9A84C] focus:outline-none"
                  />
                  {formErrors.pincode && <p className="text-red-400 text-xs mt-1">{formErrors.pincode}</p>}
                </div>
              </div>
            </div>

            <div className="bg-[#0D1B2A] p-6 rounded-xl border border-[#C9A84C]/20 space-y-4">
              <h2 className="text-xl font-medium text-[#F5F0E8]">Payment Method</h2>
              
              <label className="flex items-start space-x-4 p-4 border border-[#C9A84C] rounded-lg cursor-pointer bg-[#C9A84C]/5">
                <input type="radio" checked readOnly className="mt-1 w-4 h-4 accent-[#C9A84C]" />
                <div>
                  <div className="font-medium text-[#F5F0E8]">Cash on Delivery</div>
                  <div className="text-sm text-[#F5F0E8]/50">Pay when your order arrives</div>
                </div>
              </label>
              
              <label className="flex items-start space-x-4 p-4 border border-[#C9A84C]/20 rounded-lg opacity-50 cursor-not-allowed">
                <input type="radio" disabled className="mt-1 w-4 h-4" />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#F5F0E8]">Pay Online</span>
                    <span className="text-[10px] bg-[#C9A84C] text-[#0D1B2A] px-2 py-0.5 rounded font-bold uppercase">Coming Soon</span>
                  </div>
                  <div className="text-sm text-[#F5F0E8]/50">UPI, Cards, Net Banking — available soon</div>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#C9A84C] text-[#0D1B2A] font-bold py-4 rounded-lg text-lg hover:bg-[#D4B96A] transition-colors disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmitting ? (
                <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Placing Order...</>
              ) : (
                `Place Order • ₹${total.toLocaleString('en-IN')}`
              )}
            </button>
          </form>
        </div>
      )}

      {checkoutStep === 'confirm' && (
        <div className="max-w-xl mx-auto text-center space-y-8 py-16 animate-fade-in">
          <div className="flex justify-center">
            <CheckCircle className="w-24 h-24 text-green-500" />
          </div>
          <h1 className="font-playfair text-4xl font-bold text-[#C9A84C]">Order Placed Successfully!</h1>
          <p className="text-[#F5F0E8]/70 text-lg">
            Thank you for your order. We will contact you within 24 hours to confirm your order and delivery details.
          </p>
          
          <div className="bg-[#0D1B2A] p-6 rounded-xl border border-[#C9A84C]/20 text-left space-y-2 inline-block w-full max-w-sm">
            <div className="flex justify-between text-sm">
              <span className="text-[#F5F0E8]/50">Order ID:</span>
              <span className="font-mono text-[#F5F0E8]">{orderId?.slice(0, 8)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#F5F0E8]/50">Total Amount:</span>
              <span className="font-bold text-[#C9A84C]">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#F5F0E8]/50">Delivery to:</span>
              <span className="text-[#F5F0E8] text-right truncate w-32">{formData.customerName}, {formData.city}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a
              href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(`Hi, I just placed an order on Raj Ratanm. Order ID: ${orderId}. Please confirm.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#1EBE5A] transition-colors"
            >
              Track on WhatsApp
            </a>
            <Link 
              href="/shop"
              className="border-2 border-[#C9A84C] text-[#C9A84C] font-bold py-3 px-8 rounded-lg hover:bg-[#C9A84C]/10 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
