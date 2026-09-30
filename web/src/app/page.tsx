import HomePage from '@/App'
import {
  getCatalogueCategories,
  getCatalogueProducts,
  getMarketingActivities,
  getMarketingMedia,
  getMostLovedProducts,
} from '@/lib/cms/public-catalogue'

export default async function Page() {
  const [media, categories, activities, lovedProducts, searchProducts] = await Promise.all([
    getMarketingMedia(),
    getCatalogueCategories(),
    getMarketingActivities(),
    getMostLovedProducts(),
    getCatalogueProducts(),
  ])

  return (
    <HomePage
      media={media}
      categories={categories}
      activities={activities}
      lovedProducts={lovedProducts}
      searchProducts={searchProducts}
    />
  )
}
