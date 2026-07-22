import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductImageGallery from '@/components/ui/ProductImageGallery';
import ProductInfoClient from '@/components/ui/ProductInfoClient';
import ProductCard from '@/components/ui/ProductCard';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  let product = null;
  try {
    const resolvedParams = await params;
    product = await prisma.product.findUnique({
      where: { slug: resolvedParams.slug },
      select: {
        name: true,
        description: true,
        imageUrls: true,
        price: true,
        category: true,
        origin: true
      }
    });
  } catch (error) {
    console.warn("Database connection failed for generateMetadata");
  }
  if (!product) return {};

  // Strip HTML tags from description for meta
  const plainDescription = product.description
    .replace(/<[^>]*>/g, '')
    .slice(0, 160);

  return {
    title: `${product.name} — Buy Online`,
    description: `${plainDescription}. Price: ₹${product.price.toLocaleString('en-IN')}. Authentic ${product.category} stone from ${product.origin || 'India'}.`,
    openGraph: {
      title: `${product.name} | Raj Ratnam`,
      description: plainDescription,
      images: product.imageUrls[0] ? [{
        url: product.imageUrls[0],
        width: 800,
        height: 600,
        alt: product.name
      }] : [],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: plainDescription,
      images: product.imageUrls[0] ? [product.imageUrls[0]] : []
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  let product = null;
  let relatedProducts: any[] = [];

  try {
    const resolvedParams = await params;
    product = await prisma.product.findUnique({
      where: { slug: resolvedParams.slug }
    });

    if (product) {
      relatedProducts = await prisma.product.findMany({
        where: { 
          category: product.category,
          slug: { not: product.slug },
          inStock: true
        },
        take: 4,
        select: {
          id: true, name: true, nameHindi: true, slug: true,
          category: true, price: true, imageUrls: true
        }
      });
    }
  } catch (error) {
    console.warn("Database connection failed for ProductPage");
  }

  if (!product) notFound();

  const plainDesc = product.description.replace(/<[^>]+>/g, '');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": plainDesc,
    "image": product.imageUrls,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "INR",
      "availability": product.inStock 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock"
    }
  };

  return (
    <main className="py-12 px-4 max-w-7xl mx-auto">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* LEFT COLUMN: Gallery */}
        <div className="lg:w-1/2">
          <div className="sticky top-24">
            <ProductImageGallery imageUrls={product.imageUrls} productName={product.name} />
          </div>
        </div>

        {/* RIGHT COLUMN: Product Info */}
        <div className="lg:w-1/2">
          <ProductInfoClient product={product} />
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="mt-32 border-t border-[#C9A84C]/20 pt-16">
          <h2 className="font-playfair text-3xl font-bold text-[#F5F0E8] mb-8 text-center">
            You May Also Like
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
            {relatedProducts.map(p => (
              <div key={p.id} className="min-w-[280px] snap-center">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
