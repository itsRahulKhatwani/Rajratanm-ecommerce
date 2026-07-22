import type { Metadata } from 'next';
import { prisma } from "@/lib/prisma";
import ShopGrid from "@/components/ui/ShopGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Shop Gemstones & Crystals',
  description: 'Browse our complete collection of precious stones, ' +
    'semi-precious gemstones, healing crystals and artificial ' +
    'jewelry. Authentic, ethically sourced, shipped across India.',
  openGraph: {
    title: 'Shop — Raj Ratnam Gemstone Collection',
    description: 'Precious stones, healing crystals and jewelry ' +
      'handpicked from India\'s finest mines.'
  }
};

export default async function ShopPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { inStock: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, nameHindi: true, slug: true,
        category: true, price: true, imageUrls: true
      }
    });
  } catch (error) {
    console.warn("Database connection failed, using empty array fallback");
  }

  return (
    <main className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ShopGrid products={products as any} />
      </div>
    </main>
  );
}
