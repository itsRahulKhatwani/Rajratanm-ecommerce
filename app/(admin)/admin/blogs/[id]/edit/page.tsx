import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BlogEditForm from '@/components/admin/BlogEditForm';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const slug = params.id;
  const blog = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!blog) {
    notFound();
  }

  return <BlogEditForm blog={blog} />;
}
