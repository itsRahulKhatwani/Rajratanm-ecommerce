import ProductEditForm from "@/components/admin/ProductEditForm"

export default function NewProductPage() {
  return (
    <div className="p-8">
      <ProductEditForm isNew={true} />
    </div>
  )
}
