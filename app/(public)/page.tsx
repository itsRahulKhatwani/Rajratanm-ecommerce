"use client";

import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FeaturedBlogs from "@/components/sections/FeaturedBlogs";
import WhyRajRatanm from "@/components/sections/WhyRajRatanm";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  // No database calls — all sections receive empty arrays
  // and render elegant empty states until owner adds content via admin
  return (
    <>
      <HeroSection />
      <FeaturedProducts products={[]} />
      <WhyRajRatanm />
      <FeaturedBlogs blogs={[]} />
      <TestimonialsSection testimonials={[]} />
    </>
  );
}
