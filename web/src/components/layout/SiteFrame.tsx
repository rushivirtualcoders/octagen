'use client'

import { usePathname } from 'next/navigation'
import PublicShell from '@/components/layout/PublicShell'
import type { NavCategory } from '@/components/sections/Navbar'
import type { CatalogueProduct } from '@/lib/catalogue'

export default function SiteFrame({
  children,
  searchProducts,
  searchActivities,
  navCategories,
}: {
  children: React.ReactNode
  searchProducts: CatalogueProduct[]
  searchActivities: { id: string; title: string; text?: string; href: string }[]
  navCategories: NavCategory[]
}) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return children

  return (
    <PublicShell
      searchProducts={searchProducts}
      searchActivities={searchActivities}
      navCategories={navCategories}
    >
      {children}
    </PublicShell>
  )
}
