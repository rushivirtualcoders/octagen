import type { Metadata } from 'next'
import ProductListing from '@/components/products/ProductListing'
import { getCatalogueCategories, getCatalogueProducts } from '@/lib/cms/public-catalogue'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: `Car products | ${SITE_NAME}`,
  description:
    'Browse LIQUI MOLY car motor oils, additives, care and gear oils. Open a product for details and its information sheet. Inquiry and supply via Octagen India.',
  alternates: { canonical: `${SITE_URL}/products/car` },
}

export default async function CarProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; product?: string }>
}) {
  const params = await searchParams
  const [categories, products] = await Promise.all([
    getCatalogueCategories('car'),
    getCatalogueProducts('car'),
  ])

  return (
    <ProductListing
      key={params.category ?? 'all'}
      path="car"
      categories={categories}
      products={products}
      initialCategory={params.category}
      initialProduct={params.product}
    />
  )
}
