export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://octagen.virtualcodershub.com').replace(
  /\/$/,
  '',
)

export const SITE_NAME = 'Octagen'

export const SITE_TITLE = 'Octagen — Premium Motor Oils & Additives | India'

export const SITE_DESCRIPTION =
  'Octagen supplies premium motor oils, additives and car care across India for vehicle owners, workshops and fleets. Submit an inquiry or get a quote — catalogue first, no cart.'

export const SITE_KEYWORDS = [
  'Octagen',
  'Octagen India',
  'motor oil India',
  'engine oil India',
  'synthetic motor oil',
  'motor oil additive India',
  'car care India',
  'bike engine oil India',
  'workshop supply India',
  'bulk lubricant India',
]

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Octagen',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/images/octagen-logo.png`,
      },
      description:
        'Octagen supplies premium motor oils, additives and car care products to vehicle owners, workshops and fleets across India.',
      sameAs: [] as string[],
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'info@octagen.in',
        availableLanguage: ['English', 'Hindi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: 'Octagen — premium motor oils, additives and car care for India',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      description:
        'Browse Octagen’s catalogue and submit an inquiry or get a quote for motor oils, additives and car care in India.',
      inLanguage: 'en-IN',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }],
      },
    },
  ],
}
