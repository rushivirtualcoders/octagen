import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date('2026-08-19'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
