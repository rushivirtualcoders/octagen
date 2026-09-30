/** Static catalogue for homepage + Car/Bike listing — no admin required.
 * Product clicks open Liqui Moly India product / download pages.
 */

export type VehiclePath = 'car' | 'bike'

export type CatalogueProduct = {
  id: string
  name: string
  shortDescription: string
  categorySlug: string
  path: VehiclePath
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

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    slug: 'motor-oils',
    name: 'Motor oils',
    path: 'car',
    description: 'Synthetic and specialist engine oils for passenger cars.',
  },
  {
    slug: 'additives',
    name: 'Additives',
    path: 'car',
    description: 'Engine, fuel and transmission additives for care and protection.',
  },
  {
    slug: 'car-care',
    name: 'Car care',
    path: 'car',
    description: 'Cleaning and care products for interior and exterior.',
  },
  {
    slug: 'gear-oils',
    name: 'Gear oils',
    path: 'car',
    description: 'Transmission and differential lubricants.',
  },
  {
    slug: 'motorcycle-oils',
    name: 'Motorcycle oils',
    path: 'bike',
    description: '4-stroke and specialty oils for two-wheelers.',
  },
  {
    slug: 'bike-additives',
    name: 'Bike additives',
    path: 'bike',
    description: 'Fuel and oil additives for motorcycle engines.',
  },
  {
    slug: 'bike-care',
    name: 'Bike care',
    path: 'bike',
    description: 'Chain care, cleaners and maintenance for riders.',
  },
]

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = [
  {
    id: 'top-tec-4200',
    name: 'Top Tec 4200 5W-30',
    shortDescription: 'Low-SAPS HC synthetic for modern petrol and diesel engines.',
    categorySlug: 'motor-oils',
    path: 'car',
    image: '/assets/images/products/top-tec-4200.png',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/top-tec-4200-5w-30-3707/',
    loved: true,
  },
  {
    id: 'molygen-ng',
    name: 'Molygen New Generation 5W-30',
    shortDescription: 'High-tech motor oil with molecular friction protection.',
    categorySlug: 'motor-oils',
    path: 'car',
    image: '/assets/images/products/molygen-new-generation.png',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/molygen-new-generation-5w-30-20232/',
    loved: true,
  },
  {
    id: 'synthoil-energy',
    name: 'Synthoil Energy 0W-40',
    shortDescription: 'Fully synthetic for high-performance and turbo engines.',
    categorySlug: 'motor-oils',
    path: 'car',
    image: '/assets/images/engine-oil.jpg',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/synthoil-energy-0w-40-1363/',
  },
  {
    id: 'cera-tec',
    name: 'Cera Tec',
    shortDescription: 'Ceramic wear protection additive for engines and transmissions.',
    categorySlug: 'additives',
    path: 'car',
    image: '/assets/images/products/cera-tec.png',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/cera-tec-3721/',
    loved: true,
  },
  {
    id: 'engine-flush',
    name: 'Engine Flush',
    shortDescription: 'Cleans the oil circuit before an oil change.',
    categorySlug: 'additives',
    path: 'car',
    image: '/assets/images/oil-pour.jpg',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/engine-flush-2427/',
  },
  {
    id: 'rim-cleaner',
    name: 'Special Rim Cleaner',
    shortDescription: 'Intensive cleaner for alloy and steel wheels.',
    categorySlug: 'car-care',
    path: 'car',
    image: '/assets/images/products/premium-rim-cleaner.png',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/special-rim-cleaner-1597/',
  },
  {
    id: 'hypoid-gear',
    name: 'Hypoid Gear Oil GL5 85W-90',
    shortDescription: 'Mineral hypoid gear oil for axles and differentials.',
    categorySlug: 'gear-oils',
    path: 'car',
    image: '/assets/images/products/product-bottle.jpg',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/hypoid-gear-oil-tdl-85w-90-1407/',
  },
  {
    id: 'motorbike-4t',
    name: 'Motorbike 4T Synth 10W-40 Street',
    shortDescription: 'Fully synthetic 4-stroke oil for street motorcycles.',
    categorySlug: 'motorcycle-oils',
    path: 'bike',
    image: '/assets/images/lm/mxgp.jpg',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/motorbike-4t-synth-10w-40-street-2592/',
    loved: true,
  },
  {
    id: 'motorbike-10w50',
    name: 'Motorbike 4T Synth 10W-50 Street Race',
    shortDescription: 'High-performance synthetic for demanding bike engines.',
    categorySlug: 'motorcycle-oils',
    path: 'bike',
    image: '/assets/images/lm/hillclimb.jpg',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/motorbike-4t-synth-10w-50-street-race-2593/',
    loved: true,
  },
  {
    id: 'bike-oil-additive',
    name: 'Motorbike Oil Additive',
    shortDescription: 'Anti-wear additive for motorcycle engines and gearboxes.',
    categorySlug: 'bike-additives',
    path: 'bike',
    image: '/assets/images/products/cera-tec.png',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/motorbike-oil-additive-1580/',
  },
  {
    id: 'chain-lube',
    name: 'Motorbike Chain Lube',
    shortDescription: 'Adhesive chain spray for road and off-road use.',
    categorySlug: 'bike-care',
    path: 'bike',
    image: '/assets/images/lm/classic-cars.jpg',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/motorbike-chain-lube-1508/',
    loved: true,
  },
  {
    id: 'bike-cleaner',
    name: 'Motorbike Cleaner',
    shortDescription: 'Bike wash for paint, plastic and metal surfaces.',
    categorySlug: 'bike-care',
    path: 'bike',
    image: '/assets/images/paint.jpg',
    liquiMolyUrl: 'https://www.liqui-moly.com/en/in/p/motorbike-cleaner-1509/',
  },
]

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
      p.path.includes(q),
  )

  const activities = MARKETING_ACTIVITIES.filter(
    (a) => a.title.toLowerCase().includes(q) || a.text.toLowerCase().includes(q),
  )

  return { products, activities }
}
