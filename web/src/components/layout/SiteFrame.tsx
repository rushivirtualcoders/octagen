'use client'

import { usePathname } from 'next/navigation'
import PublicShell from '@/components/layout/PublicShell'
import type { CatalogueProduct } from '@/lib/catalogue'

export default function SiteFrame({
  children,
  searchProducts,
  searchActivities,
}: {
  children: React.ReactNode
  searchProducts: CatalogueProduct[]
  searchActivities: { id: string; title: string; text?: string; href: string }[]
}) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return children

  return (
    <PublicShell searchProducts={searchProducts} searchActivities={searchActivities}>
      {children}
    </PublicShell>
  )
}
