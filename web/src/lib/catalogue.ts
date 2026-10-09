/** Static catalogue for homepage + Car/Bike listing — no admin required.
 * Product clicks open Liqui Moly India product / download pages.
 * The range itself lives in retail-catalogue.ts (April 2026 lists, no prices).
 */
import { RETAIL_CATEGORIES, RETAIL_PRODUCTS } from './retail-catalogue'

export type VehiclePath = 'car' | 'bike'

export type CatalogueProduct = {
  id: string
  name: string
  shortDescription: string
  categorySlug: string
  subcategorySlug: string
  subcategoryName: string
  path: VehiclePath
  packSize: string
  articleId: string
  image: string
  /** Liqui Moly product details / download page */
  liquiMolyUrl: string
  loved?: boolean
}

export type CatalogueCategory = {
  slug: string
  name: string
  path: VehiclePath
  description: string
  /** Shown as a shortcut on the homepage product groups */
  featured?: boolean
}

export type MarketingMediaItem = {
  id: string
  type: 'image' | 'video'
  src: string
  poster?: string
  title: string
  caption: string
  href?: string
  featured?: boolean
}

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = RETAIL_CATEGORIES

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = RETAIL_PRODUCTS

export const LIQUI_MOLY_INDIA_URL = 'https://www.liqui-moly.com/en/in/'

export const MARKETING_MEDIA = [
  {
    id: 'm-banner',
    type: 'image' as const,
    src: '/assets/images/lm/for-the-drivers-hero.jpg',
    title: 'For the drivers',
    caption: 'German motor oils & additives — the LIQUI MOLY standard for India.',
    href: LIQUI_MOLY_INDIA_URL,
    featured: true,
  },
  {
    id: 'm-video-oil',
    type: 'video' as const,
    src: 'https://www.youtube.com/embed/jUmgqOH6ofY',
    poster: '/assets/images/performance-oil-commercial-poster.jpg',
    title: 'What is motor oil?',
    caption: 'Official LIQUI MOLY film — how German engineering builds engine protection.',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'm-f1',
    type: 'image' as const,
    src: '/assets/images/lm/f1-alt2.jpg',
    title: 'Formula 1 partnership',
    caption: 'Race-proven chemistry on the world’s biggest stage.',
    href: 'https://www.liqui-moly.com/en/in/',
  },
  {
    id: 'm-video-cera',
    type: 'video' as const,
    src: 'https://www.youtube.com/embed/vpzRSUsaqZU',
    poster: '/assets/images/products/cera-tec.png',
    title: 'Cera Tec protection',
    caption: 'Official product film — ceramic wear protection up to 50,000 km.',
    href: 'https://www.liqui-moly.com/en/in/p/cera-tec-3721/',
  },
  {
    id: 'm-black-falcon',
    type: 'image' as const,
    src: '/assets/images/lm/black-falcon.jpg',
    title: 'Black Falcon endurance',
    caption: 'Motorsport partnerships that push lubricants to the limit.',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'm-drivers',
    type: 'image' as const,
    src: '/assets/images/lm/for-the-drivers-large.jpg',
    title: 'Built for drivers',
    caption: 'Owner-facing brand stories from liqui-moly.com.',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'm-mxgp',
    type: 'image' as const,
    src: '/assets/images/lm/mxgp.jpg',
    title: 'Two-wheel performance',
    caption: 'Motorcycle programmes and bike chemistry under the same brand.',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'm-btcc',
    type: 'image' as const,
    src: '/assets/images/lm/btcc.jpg',
    title: 'Touring car DNA',
    caption: 'Track-bred standards that carry into everyday driving.',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'm-classic',
    type: 'image' as const,
    src: '/assets/images/lm/classic-cars.jpg',
    title: 'Heritage & craft',
    caption: 'Decades of German lubricant engineering — Made in Germany.',
    href: LIQUI_MOLY_INDIA_URL,
  },
]

export const MARKETING_ACTIVITIES = [
  {
    id: 'a1',
    title: 'Motorsport partnerships',
    text: 'Formula 1, endurance and series partnerships — the same brand language drivers recognise worldwide.',
    image: '/assets/images/lm/f1-alt2.jpg',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'a2',
    title: 'Workshop programmes',
    text: 'Support for professional workshops with specification guidance and authorized supply in India.',
    image: '/assets/images/lm/engstler.jpg',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'a3',
    title: 'Driver campaigns',
    text: 'Owner-facing stories that put German lubricant engineering into everyday driving.',
    image: '/assets/images/lm/for-the-drivers.jpg',
    href: LIQUI_MOLY_INDIA_URL,
  },
  {
    id: 'a4',
    title: 'Trade & training',
    text: 'Technical sessions and catalogue briefings for fleets and service partners across India.',
    image: '/assets/images/lm/turner.jpg',
    href: LIQUI_MOLY_INDIA_URL,
  },
]

export function productsByPath(path: VehiclePath) {
  return CATALOGUE_PRODUCTS.filter((p) => p.path === path)
}

export function categoriesByPath(path: VehiclePath) {
  return CATALOGUE_CATEGORIES.filter((c) => c.path === path)
}

export function mostLovedProducts() {
  return CATALOGUE_PRODUCTS.filter((p) => p.loved)
}

export function searchCatalogue(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return { products: [] as CatalogueProduct[], activities: [] as typeof MARKETING_ACTIVITIES }

  const products = CATALOGUE_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.categorySlug.includes(q) ||
      p.subcategoryName.toLowerCase().includes(q) ||
      p.packSize.toLowerCase().includes(q) ||
      p.path.includes(q),
  )

  const activities = MARKETING_ACTIVITIES.filter(
    (a) => a.title.toLowerCase().includes(q) || a.text.toLowerCase().includes(q),
  )

  return { products, activities }
}
