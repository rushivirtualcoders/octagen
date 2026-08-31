import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { saveProductCategory } from '@/lib/cms/actions'
import CategoryForm from '@/components/admin/CategoryForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default async function EditProductCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await prisma.productCategory.findUnique({ where: { id } })
  if (!category) notFound()

  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="Edit product category" backHref="/admin/product-categories" backLabel="Back to categories" />
      <CategoryForm action={saveProductCategory} withDescription values={category} />
    </div>
  )
}
