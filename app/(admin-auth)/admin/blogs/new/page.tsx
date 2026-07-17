import BlogEditForm from "@/components/admin/BlogEditForm"

export default function NewBlogPage() {
  return (
    <div className="p-8">
      <BlogEditForm isNew={true} />
    </div>
  )
}
