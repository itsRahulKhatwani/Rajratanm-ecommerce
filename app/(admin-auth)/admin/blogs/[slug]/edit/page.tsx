import { prisma } from "@/lib/prisma"
import BlogEditForm from "@/components/admin/BlogEditForm"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug: resolvedParams.slug }
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="p-8">
      <BlogEditForm blog={blog} />
    </div>
  )
}
