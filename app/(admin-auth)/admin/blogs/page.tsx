import { prisma } from "@/lib/prisma"
import BlogsTable from "@/components/admin/BlogsTable"
import Link from "next/link"
import { PenLine } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-playfair text-[#C9A84C]">Blog Posts</h1>
        <Link href="/admin/blogs/new" className="flex items-center gap-2 bg-[#C9A84C] text-[#0D1B2A] px-4 py-2 rounded hover:bg-[#B8962F] transition-colors font-medium">
          <PenLine size={18} />
          <span>Write Post</span>
        </Link>
      </div>
      <BlogsTable blogs={blogs} />
    </div>
  )
}
