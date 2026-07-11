import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductEditForm from '@/components/admin/ProductEditForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const slug = params.id;
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  if (!product) {
    notFound();
  }

  return <ProductEditForm product={product} />;
}
