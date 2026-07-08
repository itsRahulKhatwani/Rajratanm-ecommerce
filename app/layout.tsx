import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Raj Ratanm — Premium Gemstones & Healing Crystals",
    template: "%s | Raj Ratanm",
  },
  description:
    "Discover authentic precious stones, semi-precious gemstones, artificial jewelry, and healing crystals. Ethically sourced, expert curated. Where ancient wisdom meets modern elegance.",
  keywords: [
    "gemstones",
    "healing crystals",
    "precious stones",
    "semi-precious stones",
    "Indian jewelry",
    "spiritual healing",
    "chakra stones",
    "Raj Ratanm",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Raj Ratanm",
    title: "Raj Ratanm — Premium Gemstones & Healing Crystals",
    description:
      "Discover authentic precious stones, semi-precious gemstones, artificial jewelry, and healing crystals.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-navy text-ivory font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
