import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeaturedBlogs from "@/components/sections/FeaturedBlogs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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
