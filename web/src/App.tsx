'use client'

import PageIntro from './components/ui/PageIntro'
import Hero from './components/sections/Hero'
import Marketing from './components/sections/Marketing'
import ProductGroups from './components/sections/ProductGroups'
import MarketingActivities from './components/sections/MarketingActivities'
import MostLoved from './components/sections/MostLoved'
import Testimonials from './components/sections/Testimonials'
import type { CatalogueCategory, CatalogueProduct, MarketingMediaItem } from '@/lib/catalogue'
import type { ActivityItem } from './components/sections/MarketingActivities'

export default function App({
  media,
  categories,
  activities,
  lovedProducts,
}: {
  media: MarketingMediaItem[]
  categories: CatalogueCategory[]
  activities: ActivityItem[]
  lovedProducts: CatalogueProduct[]
}) {
  return (
    <>
      <PageIntro />
      <Hero />
      <ProductGroups categories={categories} />
      <Marketing media={media} />
      <MarketingActivities activities={activities} />
      <MostLoved products={lovedProducts} />
      <Testimonials />
    </>
  )
}
