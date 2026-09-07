import type { PublicArticle } from './types'

/** Fallback articles when CMS is empty or unavailable — kept in sync with prisma seed. */
export const FALLBACK_ARTICLES: PublicArticle[] = [
  {
    slug: 'choose-engine-oil-india',
    title: 'How to choose the right engine oil for your car in India',
    excerpt:
      'Start with the manufacturer specification, then match viscosity and OEM approvals before you inquire for LIQUI MOLY supply through Octagen.',
    body: [
      'Indian driving mixes heat, traffic and varied fuel quality. The correct engine oil is not a brand preference — it is a specification decision tied to your engine, emissions hardware and drain interval.',
      'Open the owner manual or service booklet and note the required viscosity grade (for example 5W-30 or 5W-40) and the approval codes your manufacturer lists. Modern petrol and diesel engines often require low-SAPS formulations that protect diesel particulate filters and catalytic converters.',
      'LIQUI MOLY develops and manufactures lubricants in Germany. Lines such as Top Tec and Molygen are built around real OEM test sequences — BMW Longlife, Mercedes-Benz, VW 504.00/507.00, ACEA C3 and similar approvals are not marketing labels; they confirm the oil passed the tests your engine was designed around.',
      'Once the specification is clear, Octagen — the exclusive authorized national distributor — can quote the correct LIQUI MOLY grade, pack size and supply route for retail, workshop or fleet demand. Submit an inquiry with your vehicle details rather than guessing at the shelf.',
    ].join('\n\n'),
    author: 'Octagen Technical Desk',
    coverImageUrl: '/assets/images/tim-mossholder-atgIjoAJdWg-unsplash.jpg',
    category: { name: 'Oil selection', slug: 'oil-selection' },
    publishedAt: '2026-08-15T00:00:00.000Z',
  },
  {
    slug: 'understanding-oem-approvals',
    title: 'Understanding OEM approvals: VW, BMW and Mercedes specifications',
    excerpt:
      'Approval codes on the label tell you an oil was tested to a manufacturer standard — here is how to read them before specifying LIQUI MOLY for a service bay or fleet.',
    body: [
      'OEM approvals are the bridge between a lubricant and the engine it protects. A VW 504.00/507.00 approval, for instance, confirms extended drain compatibility and after-treatment protection for many VAG-group engines. BMW Longlife-04 and Mercedes-Benz 229.51 similarly encode test results rather than marketing claims.',
      'Workshops see the cost of mismatch every day: premature DPF issues, catalyst contamination, turbo coking and warranty disputes. Using an oil that meets the published code removes that risk and keeps service documentation clean.',
      'LIQUI MOLY publishes approvals per product on technical data sheets. Octagen supplies the same formulations nationally — there is no parallel “India-only” blend when you order through the authorized distributor channel.',
      'When you are unsure which code applies, send Octagen the VIN, model year and current mileage. We will map the specification to an in-catalogue LIQUI MOLY product and quote supply — inquiry only, no checkout on this site.',
    ].join('\n\n'),
    author: 'Octagen Technical Desk',
    coverImageUrl: '/assets/images/products/top-tec-4200.png',
    category: { name: 'Oil selection', slug: 'oil-selection' },
    publishedAt: '2026-08-08T00:00:00.000Z',
  },
  {
    slug: 'workshop-bulk-supply-octagen',
    title: 'Workshop guide: ordering LIQUI MOLY in bulk through Octagen',
    excerpt:
      'Professional bays and fleet operators need consistent pack sizes, specification records and responsive supply — how Octagen supports B2B LIQUI MOLY programmes in India.',
    body: [
      'Workshops live on repeatability: the same oil spec every service, the same container size on the shelf, the same distributor when a job is urgent. Octagen exists as the national distributor precisely to provide that continuity for LIQUI MOLY in India.',
      'Start by listing the specifications you service most often — common examples include ACEA C3 5W-30 programmes, 5W-40 performance grades and dedicated diesel low-SAPS oils. Note typical monthly volume and preferred pack formats (1 L retail, 4 L service, 5 L/20 L bulk).',
      'Octagen responds with product mapping, indicative lead times and quote-based supply. There is no public price list on this catalogue site by design; B2B relationships are handled through inquiry and account conversation.',
      'Technical questions — compatibility with existing flush procedures, additive use, or mixed fleet approvals — can be raised in the same inquiry. The goal is a specification-first supply chain, not a race to the cheapest generic barrel.',
    ].join('\n\n'),
    author: 'Octagen Workshop Team',
    coverImageUrl: '/assets/images/lm/for-the-drivers-large.jpg',
    category: { name: 'Workshop', slug: 'workshop' },
    publishedAt: '2026-08-01T00:00:00.000Z',
  },
  {
    slug: 'when-to-use-liqui-moly-additives',
    title: 'When does a LIQUI MOLY additive fit the application?',
    excerpt:
      'Additives such as Cera Tec are targeted chemistry — not a substitute for the correct motor oil. Learn where they earn their place in a maintenance programme.',
    body: [
      'Motor oil is the primary protection system. Additives address specific duty-cycle needs: friction reduction, wear protection on high-load components, cleaning before an oil change, or treating fuel and oil seals.',
      'Cera Tec is a well-known example: a micro-ceramic solid lubricant suspension that reduces friction in engines, manual gearboxes and differentials when used as directed. It is not a replacement for meeting the correct oil specification.',
      'Best practice: confirm the base oil and drain interval first, then discuss whether an additive supports the customer’s use case — high-mileage urban driving, track days, commercial idle time, or extended service intervals under manufacturer approval.',
      'Octagen can recommend LIQUI MOLY additive families from the official catalogue and quote supply. Describe the machine, current oil grade and what you are trying to solve; we will stay inside published application data.',
    ].join('\n\n'),
    author: 'Octagen Technical Desk',
    coverImageUrl: '/assets/images/products/cera-tec.png',
    category: { name: 'Oil selection', slug: 'oil-selection' },
    publishedAt: '2026-07-22T00:00:00.000Z',
  },
  {
    slug: 'two-wheeler-oil-indian-conditions',
    title: 'Two-wheeler oil selection for Indian riding conditions',
    excerpt:
      'Heat, stop-start traffic and varied maintenance intervals make motorcycle oil specification critical — especially when you want LIQUI MOLY protection on two wheels.',
    body: [
      'Motorcycles stress oil differently from cars: shared sumps, higher revs, wet clutches on many models and air-cooled engines that swing through wide temperature ranges in a single commute.',
      'Always begin with the manufacturer’s JASO and viscosity requirements. Racing or high-performance bikes may need dedicated four-stroke motorcycle oils that protect the gearbox without slipping the clutch pack.',
      'LIQUI MOLY’s motorcycle programme covers road, touring and competition use — formulated and produced in Germany with the same quality system as the automotive range. Octagen distributes nationally for owners, independent garages and fleet operators running two-wheel assets.',
      'Submit an inquiry with make, model, engine capacity and typical use (daily commute, long tour, track). We will align a specification-first recommendation and quote pack sizes available through the authorized channel.',
    ].join('\n\n'),
    author: 'Octagen Technical Desk',
    coverImageUrl: '/assets/images/lm/mxgp.jpg',
    category: { name: 'Workshop', slug: 'workshop' },
    publishedAt: '2026-07-10T00:00:00.000Z',
  },
  {
    slug: 'made-in-germany-formulation-matters',
    title: 'Made in Germany: why formulation origin still matters',
    excerpt:
      'LIQUI MOLY develops and manufactures in Ulm — a single quality system from R&D to bottling. Here is why that matters for distributors, workshops and drivers in India.',
    body: [
      'Founded in 1957, LIQUI MOLY remains an independent German lubricant and additive specialist. Formulations are developed in-house, tested against OEM and industry standards, and produced under one quality regime — not licensed loosely to third-party blenders.',
      'For Octagen as national distributor, that means every SKU we supply traces back to the same technical documentation workshops expect in Europe: approvals, data sheets, application notes and batch consistency.',
      'Motorsport partnerships — from touring cars to Grand Prix weekends — are not decorative. They stress products in measurable ways and feed real-world chemistry back into consumer and commercial lines.',
      'When you specify LIQUI MOLY through Octagen, you are choosing a German-formulated product with an authorized supply path in India. Submit an inquiry to start a retail, workshop or bulk conversation — specification first, quote second.',
    ].join('\n\n'),
    author: 'Octagen',
    coverImageUrl: '/assets/images/lm/for-the-drivers-hero.jpg',
    category: { name: 'Workshop', slug: 'workshop' },
    publishedAt: '2026-06-28T00:00:00.000Z',
  },
]

export function formatArticleDate(value: string | null) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function articleParagraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}
