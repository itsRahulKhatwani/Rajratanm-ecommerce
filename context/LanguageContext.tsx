"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (enOrKey: string, hi?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cart": "Cart",
    "nav.admin": "Admin",

    // Hero
    "hero.title": "Gems That Carry Stories",
    "hero.subtitle": "Discover our curated collection of premium gemstones, healing crystals, and spiritual jewelry — ethically sourced, expertly authenticated.",
    "hero.cta": "Explore the Collection",

    // Products
    "products.featured": "Featured Collection",
    "products.featured.desc": "Handpicked treasures from the earth, curated for those who seek authenticity.",
    "products.empty": "Our collection is being curated. Check back soon.",
    "products.addToCart": "Add to Cart",
    "products.viewDetails": "View Details",
    "products.inStock": "In Stock",
    "products.outOfStock": "Out of Stock",
    "products.relatedProducts": "You May Also Like",
    "products.origin": "Origin",
    "products.chakra": "Chakra",
    "products.healing": "Healing Properties",
    "products.weight": "Weight",

    // Shop
    "shop.title": "Shop",
    "shop.desc": "Explore our full collection of crystals, jewelry, and more.",
    "shop.all": "All",
    "shop.precious": "Precious",
    "shop.semiPrecious": "Semi-Precious",
    "shop.crystals": "Crystals",
    "shop.jewelry": "Jewelry",
    "shop.empty": "Our gemstone collection is being handpicked. Visit us soon.",

    // Blog
    "blog.title": "Journal",
    "blog.desc": "Insights on healing, crystals, and spiritual growth.",
    "blog.readMore": "Read More",
    "blog.empty": "Our writers are crafting stories of gem and spirit. Stay tuned.",
    "blog.publishedOn": "Published on",
    "blog.share": "Share this article",
    "blog.relatedPosts": "Related Posts",

    // About
    "about.title": "About Raj Ratnam",
    "about.story.title": "Our Story",
    "about.values.title": "Our Values",
    "about.authenticity": "Authenticity",
    "about.ethics": "Ethics",
    "about.spirituality": "Spirituality",
    "about.beauty": "Beauty",

    // Contact
    "contact.title": "Get in Touch",
    "contact.name": "Your Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.whatsapp": "Chat on WhatsApp",
    "contact.hours": "Business Hours",
    "contact.hoursValue": "Monday – Saturday, 10 AM – 7 PM IST",
    "contact.responseNote": "We respond within 24 hours",

    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty.",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.shippingFree": "Free",
    "cart.shippingNote": "Free shipping on orders above ₹999",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",
    "cart.continueShopping": "Continue Shopping",
    "cart.remove": "Remove",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.customerName": "Full Name",
    "checkout.email": "Email",
    "checkout.phone": "Phone",
    "checkout.address": "Address",
    "checkout.city": "City",
    "checkout.state": "State",
    "checkout.pincode": "Pincode",
    "checkout.payOnDelivery": "Pay on Delivery",
    "checkout.placeOrder": "Place Order",
    "checkout.razorpayInactive": "Online payment coming soon",

    // Trust badges
    "trust.authentic": "100% Authentic",
    "trust.authenticDesc": "Every gem certified and verified",
    "trust.ethical": "Ethically Sourced",
    "trust.ethicalDesc": "Responsibly mined, fairly traded",
    "trust.guidance": "Expert Guidance",
    "trust.guidanceDesc": "Personalized spiritual consultation",
    "trust.secure": "Secure Payments",
    "trust.secureDesc": "Your transactions are protected",

    // Testimonials
    "testimonials.title": "What Our Customers Say",
    "testimonials.empty": "Customer stories coming soon.",

    // Why section
    "why.title": "Why Raj Ratnam?",
    "why.desc": "Every piece in our collection carries the ancient energy of the Earth, hand-selected with care and certified with expertise.",

    // Footer
    "footer.tagline": "Where ancient wisdom meets modern elegance",
    "footer.quickLinks": "Quick Links",
    "footer.support": "Support",
    "footer.followUs": "Follow Us",
    "footer.whatsapp": "Chat with us",
    "footer.copyright": "© 2025 Raj Ratnam. All rights reserved.",

    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.backToHome": "Back to Home",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.shop": "दुकान",
    "nav.blog": "ब्लॉग",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.cart": "कार्ट",
    "nav.admin": "एडमिन",

    // Hero
    "hero.title": "रत्न जो कहानियाँ सुनाते हैं",
    "hero.subtitle": "प्रीमियम रत्नों, हीलिंग क्रिस्टल और आध्यात्मिक आभूषणों का हमारा चुना हुआ संग्रह खोजें — नैतिक रूप से प्राप्त, विशेषज्ञ प्रमाणित।",
    "hero.cta": "संग्रह देखें",

    // Products
    "products.featured": "विशेष संग्रह",
    "products.featured.desc": "प्रामाणिकता चाहने वालों के लिए पृथ्वी से चुने गए खज़ाने।",
    "products.empty": "हमारा संग्रह तैयार किया जा रहा है। जल्द वापस आएँ।",
    "products.addToCart": "कार्ट में जोड़ें",
    "products.viewDetails": "विवरण देखें",
    "products.inStock": "उपलब्ध",
    "products.outOfStock": "स्टॉक में नहीं",
    "products.relatedProducts": "आपको यह भी पसंद आ सकता है",
    "products.origin": "उत्पत्ति",
    "products.chakra": "चक्र",
    "products.healing": "उपचार गुण",
    "products.weight": "वज़न",

    // Shop
    "shop.title": "दुकान",
    "shop.desc": "क्रिस्टल, आभूषण और बहुत कुछ का पूरा संग्रह देखें।",
    "shop.all": "सभी",
    "shop.precious": "कीमती",
    "shop.semiPrecious": "अर्ध-कीमती",
    "shop.crystals": "क्रिस्टल",
    "shop.jewelry": "आभूषण",
    "shop.empty": "हमारा रत्न संग्रह चुना जा रहा है। जल्द आएँ।",

    // Blog
    "blog.title": "जर्नल",
    "blog.desc": "हीलिंग, क्रिस्टल और आध्यात्मिक विकास पर अंतर्दृष्टि।",
    "blog.readMore": "और पढ़ें",
    "blog.empty": "हमारे लेखक रत्न और आत्मा की कहानियाँ गढ़ रहे हैं। बने रहें।",
    "blog.publishedOn": "प्रकाशित",
    "blog.share": "यह लेख साझा करें",
    "blog.relatedPosts": "संबंधित लेख",

    // About
    "about.title": "राज रत्नम् के बारे में",
    "about.story.title": "हमारी कहानी",
    "about.values.title": "हमारे मूल्य",
    "about.authenticity": "प्रामाणिकता",
    "about.ethics": "नैतिकता",
    "about.spirituality": "आध्यात्मिकता",
    "about.beauty": "सुंदरता",

    // Contact
    "contact.title": "संपर्क करें",
    "contact.name": "आपका नाम",
    "contact.email": "ईमेल पता",
    "contact.phone": "फ़ोन नंबर",
    "contact.message": "आपका संदेश",
    "contact.send": "संदेश भेजें",
    "contact.whatsapp": "व्हाट्सएप पर बात करें",
    "contact.hours": "व्यापार के घंटे",
    "contact.hoursValue": "सोमवार – शनिवार, सुबह 10 – शाम 7 IST",
    "contact.responseNote": "हम 24 घंटे में जवाब देते हैं",

    // Cart
    "cart.title": "आपकी कार्ट",
    "cart.empty": "आपकी कार्ट खाली है।",
    "cart.subtotal": "उप-कुल",
    "cart.shipping": "शिपिंग",
    "cart.shippingFree": "मुफ़्त",
    "cart.shippingNote": "₹999 से ऊपर के ऑर्डर पर मुफ़्त शिपिंग",
    "cart.total": "कुल",
    "cart.checkout": "चेकआउट करें",
    "cart.continueShopping": "शॉपिंग जारी रखें",
    "cart.remove": "हटाएँ",

    // Checkout
    "checkout.title": "चेकआउट",
    "checkout.customerName": "पूरा नाम",
    "checkout.email": "ईमेल",
    "checkout.phone": "फ़ोन",
    "checkout.address": "पता",
    "checkout.city": "शहर",
    "checkout.state": "राज्य",
    "checkout.pincode": "पिनकोड",
    "checkout.payOnDelivery": "डिलीवरी पर भुगतान",
    "checkout.placeOrder": "ऑर्डर दें",
    "checkout.razorpayInactive": "ऑनलाइन भुगतान जल्द उपलब्ध",

    // Trust badges
    "trust.authentic": "100% प्रामाणिक",
    "trust.authenticDesc": "हर रत्न प्रमाणित और सत्यापित",
    "trust.ethical": "नैतिक रूप से प्राप्त",
    "trust.ethicalDesc": "ज़िम्मेदारी से खनन, निष्पक्ष व्यापार",
    "trust.guidance": "विशेषज्ञ मार्गदर्शन",
    "trust.guidanceDesc": "व्यक्तिगत आध्यात्मिक परामर्श",
    "trust.secure": "सुरक्षित भुगतान",
    "trust.secureDesc": "आपके लेनदेन सुरक्षित हैं",

    // Testimonials
    "testimonials.title": "हमारे ग्राहक क्या कहते हैं",
    "testimonials.empty": "ग्राहक कहानियाँ जल्द आ रही हैं।",

    // Why section
    "why.title": "क्यों राज रत्नम्?",
    "why.desc": "हमारे संग्रह का हर टुकड़ा पृथ्वी की प्राचीन ऊर्जा वहन करता है, देखभाल से चुना गया और विशेषज्ञता से प्रमाणित।",

    // Footer
    "footer.tagline": "जहाँ प्राचीन ज्ञान आधुनिक शान से मिलता है",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.support": "सहायता",
    "footer.followUs": "हमें फॉलो करें",
    "footer.whatsapp": "हमसे बात करें",
    "footer.copyright": "© 2025 राज रत्नम्। सर्वाधिकार सुरक्षित।",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.error": "कुछ गलत हुआ",
    "common.backToHome": "होम पर वापस जाएँ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("raj-ratnam-language") as Language | null;
    if (saved === "en" || saved === "hi") {
      setLanguage(saved);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "en" ? "hi" : "en";
      localStorage.setItem("raj-ratnam-language", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (enOrKey: string, fallbackHi?: string): string => {
      // 1. Try to find the string in the static dictionary
      const dictValue = translations[language]?.[enOrKey];
      if (dictValue) return dictValue;

      // 2. If not in dictionary, treat it as a dynamic string (e.g. from DB)
      if (fallbackHi !== undefined) {
        return language === "en" ? enOrKey : fallbackHi;
      }

      // 3. Ultimate fallback
      return enOrKey;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
