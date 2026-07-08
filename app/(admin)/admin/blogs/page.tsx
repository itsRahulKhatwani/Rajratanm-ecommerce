import Link from "next/link";

export default function AdminBlogsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl font-bold text-gold">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="px-6 py-3 rounded-xl bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors"
        >
          + Write Blog
        </Link>
      </div>

      <div className="rounded-2xl border border-gold/10 bg-navy-light/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Title</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Status</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Date</th>
              <th className="px-6 py-4 text-right text-ivory/50 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-6 py-16 text-center text-ivory/30">
                No blog posts yet. Click &quot;Write Blog&quot; to share your first story.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
