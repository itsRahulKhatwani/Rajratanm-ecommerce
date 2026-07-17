import { prisma } from "@/lib/prisma"
import BlogEditForm from "@/components/admin/BlogEditForm"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function EditBlogPage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug }
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
