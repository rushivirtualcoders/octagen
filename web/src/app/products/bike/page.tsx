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
  title: `Bike products | ${SITE_NAME}`,
  description:
    'Browse LIQUI MOLY motorcycle oils, additives and bike care. Product details open on liqui-moly.com — inquiry and supply via Octagen India.',
  alternates: { canonical: `${SITE_URL}/products/bike` },
}

export default async function BikeProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const [categories, products, allProducts, activities] = await Promise.all([
    getCatalogueCategories('bike'),
    getCatalogueProducts('bike'),
    getCatalogueProducts(),
    getMarketingActivities(),
  ])

  return (
    <PublicShell searchProducts={allProducts} searchActivities={activities}>
      <ProductListing
        path="bike"
        categories={categories}
        products={products}
        initialCategory={params.category}
      />
    </PublicShell>
  )
}
