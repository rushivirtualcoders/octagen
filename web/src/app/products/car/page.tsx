import type { Metadata } from 'next'
import PublicShell from '@/components/layout/PublicShell'
import ProductListing from '@/components/products/ProductListing'
import {
  getCatalogueCategories,
  getCatalogueProducts,
  getMarketingActivities,
} from '@/lib/cms/public-catalogue'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Car products | ${SITE_NAME}`,
  description:
    'Browse LIQUI MOLY car motor oils, additives, care and gear oils. Product details open on liqui-moly.com — inquiry and supply via Octagen India.',
  alternates: { canonical: `${SITE_URL}/products/car` },
}

export default async function CarProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const [categories, products, allProducts, activities] = await Promise.all([
    getCatalogueCategories('car'),
    getCatalogueProducts('car'),
    getCatalogueProducts(),
    getMarketingActivities(),
  ])

  return (
    <PublicShell searchProducts={allProducts} searchActivities={activities}>
      <ProductListing
        path="car"
        categories={categories}
        products={products}
        initialCategory={params.category}
      />
    </PublicShell>
  )
}
