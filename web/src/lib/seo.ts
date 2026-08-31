export const SITE_URL = 'https://octagen.in'

export const SITE_NAME = 'LIQUI MOLY India by Octagen'

export const SITE_TITLE =
  'LIQUI MOLY India — Premium Motor Oils & Additives | Octagen Authorized Distributor'

export const SITE_DESCRIPTION =
  'Buy LIQUI MOLY high-performance motor oils, additives and car care products in India. Octagen is the exclusive authorized national distributor. OEM-approved engine oils for cars, bikes, fleets and workshops.'

export const SITE_KEYWORDS = [
  'LIQUI MOLY India',
  'Liqui Moly motor oil India',
  'Octagen distributor',
  'engine oil India',
  'Top Tec 4200',
  'Cera Tec',
  'Molygen',
  'synthetic motor oil India',
  'motor oil additive India',
  'car care India',
  'bike engine oil India',
  'workshop supply India',
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
        'Octagen is the exclusive authorized national distributor for LIQUI MOLY in India, supplying premium motor oils, additives and car care products to vehicle owners, workshops and fleets.',
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
      description: 'Official LIQUI MOLY distributor website for India',
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
        'Buy LIQUI MOLY motor oils, additives and car care in India. Submit an inquiry or get a quote from Octagen, the exclusive authorized national distributor.',
      inLanguage: 'en-IN',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        ],
      },
    },
    {
      '@type': 'ItemList',
      name: 'LIQUI MOLY Flagship Products — India',
      description: 'Flagship LIQUI MOLY products available through Octagen in India',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Product',
            name: 'LIQUI MOLY Top Tec 4200 5W-30',
            brand: { '@type': 'Brand', name: 'LIQUI MOLY' },
            description:
              'Low-SAPS fully synthetic motor oil for modern petrol and diesel engines. Meets BMW Longlife-04, MB 229.51, VW 504/507, Porsche C30.',
            image: `${SITE_URL}/assets/images/products/top-tec-4200.png`,
            sku: 'P000323',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#organization` },
              areaServed: 'IN',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Product',
            name: 'LIQUI MOLY Cera Tec',
            brand: { '@type': 'Brand', name: 'LIQUI MOLY' },
            description:
              'High-tech ceramic wear protection additive. Reduces friction and wear for engines, gearboxes and differentials.',
            image: `${SITE_URL}/assets/images/products/cera-tec.png`,
            sku: 'P000017',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#organization` },
              areaServed: 'IN',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Product',
            name: 'LIQUI MOLY Premium Rim Cleaner',
            brand: { '@type': 'Brand', name: 'LIQUI MOLY' },
            description:
              'Acid-free pH-neutral gel rim cleaner with dirt indicator. Safe on all alloy, chrome and sensitive wheel surfaces.',
            image: `${SITE_URL}/assets/images/products/premium-rim-cleaner.png`,
            sku: 'P005662',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#organization` },
              areaServed: 'IN',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Product',
            name: 'LIQUI MOLY Molygen New Generation 5W-40',
            brand: { '@type': 'Brand', name: 'LIQUI MOLY' },
            description:
              'Fully synthetic motor oil with MFC Molecular Friction Control technology. ACEA A3/B4, MB 229.5, Porsche A40.',
            image: `${SITE_URL}/assets/images/products/molygen-new-generation.png`,
            sku: 'P001758',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE_URL}/#organization` },
              areaServed: 'IN',
            },
          },
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where can I buy LIQUI MOLY products in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'LIQUI MOLY products in India are available exclusively through Octagen, the authorized national distributor. Submit an inquiry or get a quote at octagen.in.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is the authorized LIQUI MOLY distributor in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Octagen is the exclusive authorized national distributor for LIQUI MOLY in India. They supply motor oils, additives and car care products to vehicle owners, workshops and bulk buyers across the country.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which LIQUI MOLY oil is right for my car?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The correct LIQUI MOLY oil depends on your vehicle's OEM specification — check your owner's manual for the viscosity grade and approval code (e.g. ACEA C3, BMW Longlife-04, VW 504.00). Contact Octagen with your vehicle details for a guided recommendation.",
          },
        },
        {
          '@type': 'Question',
          name: 'Is LIQUI MOLY available for bikes and motorcycles in India?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. LIQUI MOLY offers dedicated motor oils and additives for two-wheelers including motorcycles, scooters and performance bikes. Octagen supplies these across India — submit an inquiry for availability and volume.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can workshops and fleets order LIQUI MOLY in bulk?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Octagen handles wholesale and bulk supply for workshops, service centres and fleet operators across India. Use the Submit Inquiry / Get Quote form on octagen.in to start the conversation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is LIQUI MOLY made in Germany?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. LIQUI MOLY products are formulated, developed and manufactured in Germany. The brand is a global leader in motor oil and additives and an official sponsor of Formula 1, MotoGP and other motorsport categories.',
          },
        },
      ],
    },
  ],
}
