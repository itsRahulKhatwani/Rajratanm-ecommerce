import { prisma } from "@/lib/prisma";
import ShopGrid from "@/components/ui/ShopGrid";

export const dynamic = "force-dynamic";

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
