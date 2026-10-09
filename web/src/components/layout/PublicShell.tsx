'use client'

import { useLenis } from '@/lib/useLenis'
import Cursor from '@/components/ui/Cursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { InquiryProvider } from '@/components/inquiry/InquiryProvider'
import type { CatalogueProduct } from '@/lib/catalogue'
import type { NavCategory } from '@/components/sections/Navbar'

export default function PublicShell({
  children,
  searchProducts,
  searchActivities,
  navCategories = [],
}: {
  children: React.ReactNode
  searchProducts?: CatalogueProduct[]
  searchActivities?: { id: string; title: string; text?: string; href: string }[]
  navCategories?: NavCategory[]
}) {
  useLenis()

  return (
    <InquiryProvider>
      <ScrollProgress />
      <Cursor />
      <div className="grain" aria-hidden />
      <Navbar
        searchProducts={searchProducts}
        searchActivities={searchActivities}
        categories={navCategories}
      />
      <main>{children}</main>
      <Footer />
    </InquiryProvider>
  )
}
