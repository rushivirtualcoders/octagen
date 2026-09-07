import { prisma } from '@/lib/db'
import ProductsAdminPanel from '@/components/admin/ProductsAdminPanel'

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: { select: { id: true, name: true } } },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } }),
  ])

  return <ProductsAdminPanel products={products} categories={categories} />
}
