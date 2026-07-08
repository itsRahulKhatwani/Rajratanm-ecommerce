import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-playfair text-3xl font-bold text-gold">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-6 py-3 rounded-xl bg-gold text-navy font-semibold text-sm hover:bg-gold-light transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Products table — will be populated from DB */}
      <div className="rounded-2xl border border-gold/10 bg-navy-light/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Product</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Category</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Price</th>
              <th className="px-6 py-4 text-left text-ivory/50 font-medium">Stock</th>
              <th className="px-6 py-4 text-right text-ivory/50 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-ivory/30">
                No products yet. Click &quot;Add Product&quot; to create your first listing.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
