import { prisma } from '@/lib/db'
import { FALLBACK_ARTICLES } from '@/lib/articles/content'
import type { PublicArticle } from '@/lib/articles/types'

function mapRow(row: {
  slug: string
  title: string
  excerpt: string
  body: string
  author: string
  coverImageUrl: string
  publishedAt: Date | null
  category: { name: string; slug: string }
}): PublicArticle {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    author: row.author,
    coverImageUrl: row.coverImageUrl,
    category: row.category,
    publishedAt: row.publishedAt?.toISOString() ?? null,
  }
}

export async function getPublishedArticles(limit = 6): Promise<PublicArticle[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      include: { category: { select: { name: true, slug: true } } },
    })

    if (rows.length === 0) return FALLBACK_ARTICLES.slice(0, limit)
    return rows.map(mapRow)
  } catch {
    return FALLBACK_ARTICLES.slice(0, limit)
  }
}

export async function getAllPublishedArticles(): Promise<PublicArticle[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      include: { category: { select: { name: true, slug: true } } },
    })

    if (rows.length === 0) return FALLBACK_ARTICLES
    return rows.map(mapRow)
  } catch {
    return FALLBACK_ARTICLES
  }
}

export async function getPublishedArticleBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const row = await prisma.article.findFirst({
      where: { slug, published: true },
      include: { category: { select: { name: true, slug: true } } },
    })

    if (row) return mapRow(row)
  } catch {
    // fall through to static content
  }

  return FALLBACK_ARTICLES.find((article) => article.slug === slug) ?? null
}

export async function getPublishedArticleSlugs(): Promise<string[]> {
  const articles = await getAllPublishedArticles()
  return articles.map((article) => article.slug)
}
