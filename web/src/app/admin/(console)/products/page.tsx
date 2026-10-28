import { prisma } from '@/lib/db'
import ProductsAdminPanel from '@/components/admin/ProductsAdminPanel'

export default async function ProductsPage() {
  const [products, categories, subcategories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: { select: { id: true, name: true } },
        subcategory: { select: { id: true, name: true } },
      },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.productSubcategory.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] }),
  ])

  return (
    <ProductsAdminPanel products={products} categories={categories} subcategories={subcategories} />
  )
}
