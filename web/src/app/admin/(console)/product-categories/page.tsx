import { prisma } from '@/lib/db'
import ProductCategoriesAdminPanel from '@/components/admin/ProductCategoriesAdminPanel'

export default async function ProductCategoriesPage() {
  const categories = await prisma.productCategory.findMany({
    include: { subcategories: { orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] } },
    orderBy: [{ vehiclePath: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
  })

  return <ProductCategoriesAdminPanel categories={categories} />
}
