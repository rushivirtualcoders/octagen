'use client'

import { useLenis } from '@/lib/useLenis'
import Cursor from '@/components/ui/Cursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { InquiryProvider } from '@/components/inquiry/InquiryProvider'

export default function PublicShell({ children }: { children: React.ReactNode }) {
  useLenis()

  return (
    <InquiryProvider>
      <ScrollProgress />
      <Cursor />
      <div className="grain" aria-hidden />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </InquiryProvider>
  )
}
