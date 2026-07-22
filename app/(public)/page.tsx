import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeaturedBlogs from "@/components/sections/FeaturedBlogs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import type { Metadata } from 'next';
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Raj Ratnam — Precious Stones & Healing Crystals India',
  description: 'Shop authentic precious stones, semi-precious ' +
    'gemstones, healing crystals and jewelry. Ethically sourced ' +
    'from India\'s finest mines. Blue Sapphire, Emerald, ' +
    'Rose Quartz and more.',
  openGraph: {
    title: 'Raj Ratnam — Where Ancient Wisdom Meets Modern Elegance',
    description: 'Discover our curated collection of precious ' +
      'stones, healing crystals, and jewelry.',
    type: 'website'
  }
};

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let featuredBlogs: any[] = [];

  try {
    featuredProducts = await prisma.product.findMany({
      where: { featured: true, inStock: true },
      take: 4,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, nameHindi: true, slug: true,
        category: true, price: true, imageUrls: true, inStock: true
      }
    });

    featuredBlogs = await prisma.blog.findMany({
      where: { published: true },
      take: 3,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true, title: true, titleHindi: true, slug: true,
        excerpt: true, excerptHindi: true, 
        coverImage: true, publishedAt: true
      }
    });
  } catch (error) {
    console.warn("Database connection failed, using empty arrays fallback");
  }

  return (
    <>
      <HeroSection />
      <FeaturedProducts products={featuredProducts as any} />
      <FeaturedBlogs blogs={featuredBlogs as any} />
      <TestimonialsSection testimonials={[]} />
    </>
  );
}
