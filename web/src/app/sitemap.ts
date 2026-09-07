import type { MetadataRoute } from 'next'
import { getPublishedArticleSlugs } from '@/lib/cms/public-articles'
import { SITE_URL } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPublishedArticleSlugs()

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date('2026-08-19'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/articles/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
