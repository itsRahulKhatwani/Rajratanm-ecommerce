import { prisma } from "@/lib/prisma"
import ProductsTable from "@/components/admin/ProductsTable"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair text-[#C9A84C]">Products</h1>
        <Link href="/admin/products/new" className="flex items-center gap-2 bg-[#C9A84C] text-[#0D1B2A] px-4 py-2 rounded hover:bg-[#B8962F] transition-colors font-medium">
          <PlusCircle size={18} />
          <span>Add Product</span>
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  )
}
