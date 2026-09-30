'use client'

import { useLenis } from './lib/useLenis'
import Cursor from './components/ui/Cursor'
import PageIntro from './components/ui/PageIntro'
import ScrollProgress from './components/ui/ScrollProgress'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import Marketing from './components/sections/Marketing'
import ProductGroups from './components/sections/ProductGroups'
import MarketingActivities from './components/sections/MarketingActivities'
import MostLoved from './components/sections/MostLoved'
import Testimonials from './components/sections/Testimonials'
import Footer from './components/sections/Footer'
import { InquiryProvider } from './components/inquiry/InquiryProvider'
import type { CatalogueCategory, CatalogueProduct, MarketingMediaItem } from '@/lib/catalogue'
import type { ActivityItem } from './components/sections/MarketingActivities'

export default function App({
  media,
  categories,
  activities,
  lovedProducts,
  searchProducts,
}: {
  media: MarketingMediaItem[]
  categories: CatalogueCategory[]
  activities: ActivityItem[]
  lovedProducts: CatalogueProduct[]
  searchProducts: CatalogueProduct[]
}) {
  useLenis()

  return (
    <InquiryProvider>
      <PageIntro />
      <ScrollProgress />
      <Cursor />
      <Navbar searchProducts={searchProducts} searchActivities={activities} />
      <main>
        <Hero />
        <ProductGroups categories={categories} />
        <Marketing media={media} />
        <MarketingActivities activities={activities} />
        <MostLoved products={lovedProducts} />
        <Testimonials />
      </main>
      <Footer />
    </InquiryProvider>
  )
}
