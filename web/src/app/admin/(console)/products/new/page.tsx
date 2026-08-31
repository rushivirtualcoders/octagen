import { prisma } from '@/lib/db'
import ProductForm from '@/components/admin/ProductForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default async function NewProductPage() {
  const categories = await prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } })
  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="Add product" backHref="/admin/products" backLabel="Back to products" />
      <ProductForm categories={categories} />
    </div>
  )
}
