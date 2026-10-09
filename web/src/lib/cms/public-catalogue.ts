/**
 * Public catalogue readers.
 * Car and bike products come from the April 2026 retail range in catalogue.ts (no prices).
 * Marketing still reads the CMS, with a static fallback.
 */
import { prisma } from '@/lib/db'
import {
  CATALOGUE_CATEGORIES,
  CATALOGUE_PRODUCTS,
  MARKETING_ACTIVITIES,
  MARKETING_MEDIA,
  type CatalogueCategory,
  type CatalogueProduct,
  type MarketingMediaItem,
  type VehiclePath,
} from '@/lib/catalogue'

export async function getCatalogueCategories(path?: VehiclePath): Promise<CatalogueCategory[]> {
  return path ? CATALOGUE_CATEGORIES.filter((category) => category.path === path) : CATALOGUE_CATEGORIES
}

export async function getCatalogueProducts(path?: VehiclePath): Promise<CatalogueProduct[]> {
  return path ? CATALOGUE_PRODUCTS.filter((product) => product.path === path) : CATALOGUE_PRODUCTS
}

export async function getMostLovedProducts(): Promise<CatalogueProduct[]> {
  return CATALOGUE_PRODUCTS.filter((product) => product.loved)
}

export async function getMarketingActivities() {
  try {
    const rows = await prisma.marketingActivity.findMany({
      where: { published: true },
      orderBy: { sortOrder: 'asc' },
    })
    if (rows.length === 0) return MARKETING_ACTIVITIES
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      text: row.text,
      image: row.imageUrl,
      href: row.href,
    }))
  } catch {
    return MARKETING_ACTIVITIES
  }
}

export async function getMarketingMedia(): Promise<MarketingMediaItem[]> {
  try {
    const rows = await prisma.marketingMedia.findMany({
      where: { published: true },
      orderBy: { sortOrder: 'asc' },
    })
    if (rows.length === 0) return MARKETING_MEDIA
    return rows.map((row, index) => ({
      id: row.id,
      type: row.type === 'VIDEO' ? ('video' as const) : ('image' as const),
      src: row.src,
      poster: row.poster || undefined,
      title: row.title,
      caption: row.caption,
      featured: index === 0 && row.type === 'IMAGE',
    }))
  } catch {
    return MARKETING_MEDIA
  }
}
