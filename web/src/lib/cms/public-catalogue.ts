/**
 * Public catalogue readers.
 * Car and bike products come from the April 2026 retail range in catalogue.ts (no prices).
 * Category / subcategory taxonomy prefers the CMS (admin), with retail fallback.
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

export type NavSubcategory = { slug: string; name: string; count: number }

export type NavCategory = {
  slug: string
  name: string
  path: VehiclePath
  count?: number
  subcategories?: NavSubcategory[]
}

function pathFromEnum(value: 'CAR' | 'BIKE'): VehiclePath {
  return value === 'BIKE' ? 'bike' : 'car'
}

function retailNavCategories(): NavCategory[] {
  const categoryCounts = new Map<string, number>()
  const categoryNames = new Map(CATALOGUE_CATEGORIES.map((category) => [category.slug, category.name]))
  const subcategoryGroups = new Map<string, Map<string, { name: string; count: number }>>()

  for (const product of CATALOGUE_PRODUCTS) {
    categoryCounts.set(product.categorySlug, (categoryCounts.get(product.categorySlug) ?? 0) + 1)
    if (product.subcategoryName === categoryNames.get(product.categorySlug)) continue
    const group = subcategoryGroups.get(product.categorySlug) ?? new Map()
    const current = group.get(product.subcategorySlug)
    group.set(product.subcategorySlug, {
      name: product.subcategoryName,
      count: (current?.count ?? 0) + 1,
    })
    subcategoryGroups.set(product.categorySlug, group)
  }

  return CATALOGUE_CATEGORIES.map((category) => ({
    slug: category.slug,
    name: category.name,
    path: category.path,
    count: categoryCounts.get(category.slug) ?? 0,
    subcategories: [...(subcategoryGroups.get(category.slug)?.entries() ?? [])]
      .map(([slug, value]) => ({ slug, ...value }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  }))
}

/** Categories + nested subcategories for the Products flyout (admin CMS first). */
export async function getNavCategories(): Promise<NavCategory[]> {
  try {
    const rows = await prisma.productCategory.findMany({
      where: { active: true },
      include: {
        subcategories: {
          where: { active: true },
          orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
        },
        _count: { select: { products: { where: { published: true } } } },
      },
      orderBy: [{ vehiclePath: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    })
    if (rows.length === 0) return retailNavCategories()

    return rows.map((category) => ({
      slug: category.slug,
      name: category.name,
      path: pathFromEnum(category.vehiclePath),
      count: category._count.products,
      subcategories: category.subcategories.map((sub) => ({
        slug: sub.slug,
        name: sub.name,
        count: 0,
      })),
    }))
  } catch {
    return retailNavCategories()
  }
}

export async function getCatalogueCategories(path?: VehiclePath): Promise<CatalogueCategory[]> {
  try {
    const rows = await prisma.productCategory.findMany({
      where: {
        active: true,
        ...(path ? { vehiclePath: path === 'bike' ? 'BIKE' : 'CAR' } : {}),
      },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    })
    if (rows.length === 0) {
      return path ? CATALOGUE_CATEGORIES.filter((category) => category.path === path) : CATALOGUE_CATEGORIES
    }
    return rows.map((row) => ({
      slug: row.slug,
      name: row.name,
      path: pathFromEnum(row.vehiclePath),
      description: row.description || row.name,
      featured: false,
    }))
  } catch {
    return path ? CATALOGUE_CATEGORIES.filter((category) => category.path === path) : CATALOGUE_CATEGORIES
  }
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
