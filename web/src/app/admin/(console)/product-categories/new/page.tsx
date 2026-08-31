import { saveProductCategory } from '@/lib/cms/actions'
import CategoryForm from '@/components/admin/CategoryForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default function NewProductCategoryPage() {
  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="Add product category" backHref="/admin/product-categories" backLabel="Back to categories" />
      <CategoryForm action={saveProductCategory} withDescription />
    </div>
  )
}
