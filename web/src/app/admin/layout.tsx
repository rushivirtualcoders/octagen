import type { Metadata } from 'next'
import Toaster from '@/components/admin/Toaster'

export const metadata: Metadata = {
  title: 'Octagen CMS',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
