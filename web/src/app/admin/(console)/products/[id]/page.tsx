import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import ProductForm from '@/components/admin/ProductForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])
  if (!product) notFound()

  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="Edit product" backHref="/admin/products" backLabel="Back to products" />
      <ProductForm product={product} categories={categories} />
    </div>
  )
}
