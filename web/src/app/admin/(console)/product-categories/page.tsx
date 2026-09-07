import { prisma } from '@/lib/db'
import { deleteProductCategory, saveProductCategory } from '@/lib/cms/actions'
import CategoriesAdminPanel from '@/components/admin/CategoriesAdminPanel'

export default async function ProductCategoriesPage() {
  const categories = await prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } })

  return (
    <CategoriesAdminPanel
      eyebrow="Catalogue"
      title="Product categories"
      addLabel="Add category"
      columns={['Name', 'Slug', 'Sort', 'Status', 'Actions']}
      withDescription
      categories={categories}
      saveAction={saveProductCategory}
      deleteAction={deleteProductCategory}
    />
  )
}
