/**
 * CMS-backed catalogue readers for the public site.
 * Falls back to static `web/src/lib/catalogue.ts` when the DB is empty or unavailable.
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

function toVehiclePath(value: string): VehiclePath {
  return value === 'BIKE' || value === 'bike' ? 'bike' : 'car'
}

function mapProduct(row: {
  slug: string
  name: string
  shortDescription: string
  imageUrl: string
  liquiMolyUrl: string
  loved: boolean
  application: string
  category: { slug: string; vehiclePath: string }
}): CatalogueProduct {
  return {
    id: row.slug,
    name: row.name,
    shortDescription: row.shortDescription,
    categorySlug: row.category.slug,
    path: toVehiclePath(row.application === 'BOTH' ? row.category.vehiclePath : row.application),
    image: row.imageUrl,
    liquiMolyUrl: row.liquiMolyUrl,
    loved: row.loved,
  }
}

function mapCategory(row: {
  slug: string
  name: string
  description: string
  vehiclePath: string
}): CatalogueCategory {
  return {
    slug: row.slug,
    name: row.name,
    path: toVehiclePath(row.vehiclePath),
    description: row.description,
  }
}

export async function getCatalogueCategories(path?: VehiclePath): Promise<CatalogueCategory[]> {
  try {
    const rows = await prisma.productCategory.findMany({
      where: {
        active: true,
        ...(path ? { vehiclePath: path === 'bike' ? 'BIKE' : 'CAR' } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    })
    if (rows.length === 0) {
      return path ? CATALOGUE_CATEGORIES.filter((c) => c.path === path) : CATALOGUE_CATEGORIES
    }
    return rows.map(mapCategory)
  } catch {
    return path ? CATALOGUE_CATEGORIES.filter((c) => c.path === path) : CATALOGUE_CATEGORIES
  }
}

export async function getCatalogueProducts(path?: VehiclePath): Promise<CatalogueProduct[]> {
  try {
    const rows = await prisma.product.findMany({
      where: {
        published: true,
        liquiMolyUrl: { not: '' },
        ...(path
          ? {
              OR: [
                { application: path === 'bike' ? 'BIKE' : 'CAR' },
                { application: 'BOTH', category: { vehiclePath: path === 'bike' ? 'BIKE' : 'CAR' } },
              ],
            }
          : {}),
      },
      include: { category: { select: { slug: true, vehiclePath: true } } },
      orderBy: { name: 'asc' },
    })
    if (rows.length === 0) {
      return path ? CATALOGUE_PRODUCTS.filter((p) => p.path === path) : CATALOGUE_PRODUCTS
    }
    return rows.map(mapProduct)
  } catch {
    return path ? CATALOGUE_PRODUCTS.filter((p) => p.path === path) : CATALOGUE_PRODUCTS
  }
}

export async function getMostLovedProducts(): Promise<CatalogueProduct[]> {
  try {
    const rows = await prisma.product.findMany({
      where: { published: true, loved: true, liquiMolyUrl: { not: '' } },
      include: { category: { select: { slug: true, vehiclePath: true } } },
      orderBy: { name: 'asc' },
    })
    if (rows.length === 0) return CATALOGUE_PRODUCTS.filter((p) => p.loved)
    return rows.map(mapProduct)
  } catch {
    return CATALOGUE_PRODUCTS.filter((p) => p.loved)
  }
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
