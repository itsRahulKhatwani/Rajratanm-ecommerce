import { prisma } from "@/lib/prisma"
import ProductEditForm from "@/components/admin/ProductEditForm"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function EditProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="p-8">
      <ProductEditForm product={product} />
    </div>
  )
}
