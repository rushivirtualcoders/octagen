import type { Metadata, Viewport } from 'next'
import {
  jsonLd,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/seo'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: 'Octagen' }],
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/assets/images/hero-video-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'Octagen — premium motor oils and additives for India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@octagen_in',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/assets/images/hero-video-poster.jpg'],
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1215',
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/din-pro" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/assets/images/kc-shum-hwZq2xkf3mM-unsplash.jpg" />
        <link rel="preload" as="image" href="/assets/images/octagen-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
