import HomePage from '@/App'
import {
  getCatalogueCategories,
  getMarketingActivities,
  getMarketingMedia,
  getMostLovedProducts,
} from '@/lib/cms/public-catalogue'

export default async function Page() {
  const [media, categories, activities, lovedProducts] = await Promise.all([
    getMarketingMedia(),
    getCatalogueCategories(),
    getMarketingActivities(),
    getMostLovedProducts(),
  ])

  return (
    <HomePage
      media={media}
      categories={categories}
      activities={activities}
      lovedProducts={lovedProducts}
    />
  )
}
