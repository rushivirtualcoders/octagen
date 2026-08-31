export const BRAND = 'LIQUI MOLY'
export const DISTRIBUTOR = 'Octagen'
export const CLAIM = 'FOR THE DRIVERS'

export const NAV_LINKS = [
  { href: '#paths', label: 'Explore' },
  { href: '#history', label: 'Heritage' },
  { href: '#spotlight', label: 'Flagship' },
  { href: '#advantage', label: 'Advantage' },
  { href: '#process', label: 'Inquiry' },
  { href: '#insights', label: 'Insights' },
  { href: '#guidance', label: 'Guidance' },
]

export const MACHINE_PATHS = [
  {
    id: 'car',
    index: '01',
    label: 'Car products',
    title: 'Engineered for every drive',
    text: 'Start with your vehicle and application, then narrow the catalogue using verified categories and technical specifications.',
    cta: 'Explore car categories',
    href: '#spotlight',
    image: '/assets/images/lm/black-falcon-lg.jpg',
    fallback: 'linear-gradient(135deg, #0b1215 0%, #003f7a 55%, #00519e 100%)',
    accent: '#00519E',
  },
  {
    id: 'bike',
    index: '02',
    label: 'Bike products',
    title: 'Performance built for two wheels',
    text: 'Motorcycle-focused lubrication, additive and care families for road, touring and demanding track use.',
    cta: 'Explore bike categories',
    href: '#spotlight',
    image: '/assets/images/lm/mxgp.jpg',
    fallback: 'linear-gradient(135deg, #0b1215 0%, #3d0010 40%, #e2001a 85%)',
    accent: '#E2001A',
  },
] as const

export const CATALOGUE_CATEGORIES = [
  {
    name: 'Motor oils',
    text: 'Synthetic, semi-synthetic and specialist grades for every specification.',
    path: 'car' as const,
  },
  {
    name: 'Additives',
    text: 'Targeted chemistry for protection, cleaning and performance gains.',
    path: 'car' as const,
  },
  {
    name: 'Car care',
    text: 'Workshop-grade cleaners, treatments and surface care systems.',
    path: 'car' as const,
  },
  {
    name: '2-Wheeler',
    text: 'Dedicated motorcycle oils and care for road, tour and race.',
    path: 'bike' as const,
  },
] as const

export const HISTORY_MILESTONES = [
  {
    year: '1957',
    era: 'Origins',
    title: 'Founded in Ulm, Germany',
    text: 'LIQUI MOLY begins as a specialist lubricant brand — chemistry first, motorsport ambition from day one.',
    accent: '#E2001A',
  },
  {
    year: '1970s',
    era: 'Manufacturing',
    title: 'In-house production scale',
    text: 'Formulations developed and produced under one roof — the same integrated model that still defines the brand.',
    accent: '#00519E',
  },
  {
    year: '1990s',
    era: 'Expansion',
    title: 'Global reach accelerates',
    text: 'Distribution grows across continents as workshops and OEM programmes adopt German-specification lubricants.',
    accent: '#C9972E',
  },
  {
    year: '2000s',
    era: 'Motorsport',
    title: 'Proven on the world stage',
    text: 'Track partnerships from touring cars to two-wheel grand prix — where oil film strength is measured in milliseconds.',
    accent: '#E2001A',
  },
  {
    year: 'Today',
    era: 'Innovation',
    title: '4,000+ products worldwide',
    text: 'A complete range spanning motor oils, additives and car care — engineered for passenger, commercial and performance use.',
    accent: '#00519E',
  },
  {
    year: 'India',
    era: 'Octagen',
    title: 'Exclusive national distribution',
    text: 'Octagen operates and fulfils LIQUI MOLY across India — authorised supply, technical support and inquiry-led ordering.',
    accent: '#00519E',
    distributor: true,
  },
] as const

export const MOTORSPORT_SLIDES = [
  {
    short: 'AMG GT',
    title: 'AMG GT',
    series: 'GT racing partner',
    text: 'LIQUI MOLY on AMG GT programmes — endurance heat, high shear, no second chances.',
    image: '/assets/images/lm/black-falcon-lg.jpg',
    alt: 'LIQUI MOLY AMG GT racing partnership',
  },
  {
    short: 'MotoGP',
    title: 'MotoGP',
    series: 'Two-wheel redline',
    text: 'Official lubricant partner in MotoGP — protection at lean angles and 18,000 rpm.',
    image: '/assets/images/lm/motogp.jpg',
    alt: 'LIQUI MOLY MotoGP motorcycle sponsorship',
  },
  {
    short: 'MXGP',
    title: 'MXGP',
    series: 'Motocross world',
    text: 'Dirt, impact and wide-open throttle. MXGP bikes that live on LIQUI MOLY.',
    image: '/assets/images/lm/mxgp.jpg',
    alt: 'LIQUI MOLY MXGP motocross sponsorship',
  },
  {
    short: 'F1',
    title: 'Formula 1',
    series: 'Grand Prix chemistry',
    text: 'Grand Prix weekends where every millilitre is specified, not guessed.',
    image: '/assets/images/lm/f1-alt2.jpg',
    alt: 'LIQUI MOLY Formula 1 motorsport presence',
  },
  {
    short: 'BTCC',
    title: 'BTCC',
    series: 'Touring cars',
    text: 'Door-to-door touring car racing — oil that holds viscosity through a full race stint.',
    image: '/assets/images/lm/btcc-lg.jpg',
    alt: 'LIQUI MOLY BTCC touring car sponsorship',
  },
  {
    short: 'Turner',
    title: 'Turner Motorsport',
    series: 'AMG endurance',
    text: 'Endurance GT programmes where LIQUI MOLY stays in the car from lights to flag.',
    image: '/assets/images/lm/turner-lg.jpg',
    alt: 'LIQUI MOLY Turner Motorsport AMG partnership',
  },
]

export type SpotlightCallout = {
  index: string
  label: string
  text: string
  /** Percent position around the bottle stage */
  top: string
  left: string
}

export type SpotlightProduct = {
  index: string
  category: string
  name: string
  format: string
  description: string
  detail: string
  glow: string
  image: string
  callouts: SpotlightCallout[]
  /** Drives a distinct motion system per slide */
  motion: 'orbit' | 'scan' | 'ripple'
}

export const SPOTLIGHT_PRODUCTS: SpotlightProduct[] = [
  {
    index: '01',
    category: 'Motor oil flagship',
    name: 'Top Tec 4200',
    format: '5W-30',
    description: 'Low-SAPS synthetic for modern engines — OEM-approved protection without compromise.',
    detail:
      'Long-drain capability, deposit control and thermal stability for high-tech petrol and diesel platforms.',
    glow: '#E2001A',
    image: '/assets/images/products/top-tec-4200.png',
    motion: 'orbit',
    callouts: [
      { index: '01', label: 'OEM approved', text: 'Meets major manufacturer specifications.', top: '12%', left: '8%' },
      { index: '02', label: 'Low SAPS', text: 'Protects exhaust after-treatment systems.', top: '38%', left: '72%' },
      { index: '03', label: 'Long drain', text: 'Extended service intervals where specified.', top: '68%', left: '14%' },
    ],
  },
  {
    index: '02',
    category: 'High-tech additive',
    name: 'Cera Tec',
    format: '300 ml',
    description: 'Micro-ceramic friction reduction for engines, gearboxes and differentials.',
    detail:
      'Surface-active chemistry that lowers wear under load — ideal for high-mileage and performance applications.',
    glow: '#00519E',
    image: '/assets/images/products/cera-tec.png',
    motion: 'scan',
    callouts: [
      { index: '01', label: 'Ceramic film', text: 'Microscopic layer reduces metal contact.', top: '18%', left: '68%' },
      { index: '02', label: 'Multi-system', text: 'Compatible with oils in engine and gearbox.', top: '48%', left: '6%' },
      { index: '03', label: 'Wear control', text: 'Protection during cold starts and load.', top: '74%', left: '58%' },
    ],
  },
  {
    index: '03',
    category: 'Vehicle care',
    name: 'Premium Rim Cleaner',
    format: '750 ml',
    description: 'Acid-free wheel cleaner for stubborn brake dust on coated and uncoated rims.',
    detail:
      'Spray-on application with colour-change indicator — lifts contamination without attacking sensitive finishes.',
    glow: '#C9972E',
    image: '/assets/images/products/premium-rim-cleaner.png',
    motion: 'ripple',
    callouts: [
      { index: '01', label: 'Pack format', text: 'Trigger spray for controlled coverage.', top: '14%', left: '62%' },
      { index: '02', label: 'Surface fit', text: 'Formulated for alloy and steel wheels.', top: '44%', left: '4%' },
      { index: '03', label: 'Safety guidance', text: 'Apply cool, rinse thoroughly, avoid heat.', top: '72%', left: '66%' },
    ],
  },
  {
    index: '04',
    category: 'Performance oil',
    name: 'Molygen New Generation',
    format: '5W-40',
    description: 'Molecular friction control for high-output street and sport engines.',
    detail:
      'Distinctive Molygen chemistry — smoother response and durable wear protection under demanding load.',
    glow: '#00519E',
    image: '/assets/images/products/molygen-new-generation.png',
    motion: 'orbit',
    callouts: [
      { index: '01', label: 'Molygen tech', text: 'Friction-modifier chemistry in full synthetic base.', top: '16%', left: '10%' },
      { index: '02', label: 'Sport engines', text: 'Built for high-output petrol and diesel platforms.', top: '42%', left: '70%' },
      { index: '03', label: 'Daily + load', text: 'Protection from cold start to sustained redline.', top: '70%', left: '18%' },
    ],
  },
]

export const PRODUCT_ADVANTAGES = [
  {
    index: '01',
    title: 'Engineering-led selection',
    text: 'Product discovery begins with the machine, application and approved technical information — not marketing guesswork.',
    cue: 'Application first',
    image: '/assets/images/engine-car.jpg',
    imageAlt: 'High-performance engine application',
  },
  {
    index: '02',
    title: 'Technical clarity',
    text: 'Specifications, approvals and application guidance will be presented in structured, searchable product records.',
    cue: 'OEM evidence',
    image: '/assets/images/engine-oil.png',
    imageAlt: 'LIQUI MOLY engine oil',
  },
  {
    index: '03',
    title: 'Support in India',
    text: 'Octagen connects product discovery with a qualified inquiry path for vehicle owners, workshops and bulk buyers.',
    cue: 'Octagen network',
    image: '/assets/images/lm/black-falcon-lg.jpg',
    imageAlt: 'Racing-proven LIQUI MOLY performance',
  },
] as const

export const INQUIRY_STEPS = [
  {
    index: '01',
    label: 'Application',
    title: 'Choose the machine',
    text: 'Start with car or two-wheeler. The catalogue will later filter by use, so the right chemistry sits in front of the right engine.',
    audience: 'Owners & workshops',
  },
  {
    index: '02',
    label: 'Specification',
    title: 'Read the evidence',
    text: 'Match viscosity, approvals and application notes from manufacturer data — the same technical record a workshop would trust on the bench.',
    audience: 'Technical buyers',
  },
  {
    index: '03',
    label: 'Inquiry',
    title: 'Submit inquiry / get quote',
    text: 'No cart, no checkout. Tell Octagen the product, volume and location — we quote supply for retail, workshop and bulk demand.',
    audience: 'B2B & B2C',
  },
  {
    index: '04',
    label: 'Fulfilment',
    title: 'Octagen delivers nationally',
    text: 'LIQUI MOLY India is operated and fulfilled by Octagen — authorised distribution with a single inquiry path from first question to delivery.',
    audience: 'India network',
  },
] as const

export const WHY_CHOOSE_US = [
  {
    title: 'German engineering',
    text: 'Formulations developed and tested in Germany — the same precision that powers global motorsport.',
  },
  {
    title: 'Motorsport proven',
    text: 'Trusted across Formula 1, MotoGP, and touring car championships where margins are measured in milliseconds.',
  },
  {
    title: 'Total protection',
    text: 'Advanced synthetic chemistry that shields engines from friction, heat, and deposits under extreme load.',
  },
  {
    title: 'Complete range',
    text: '4,000+ products spanning motor oils, additives, and car care — one brand for every application.',
  },
]

export const DEDICATED_SERVICES = [
  {
    title: 'National distribution',
    text: 'Octagen delivers LIQUI MOLY across India with authorised supply chains and consistent product integrity.',
    tag: 'Octagen India',
    image: '/assets/images/lm/for-the-drivers-large.jpg',
  },
  {
    title: 'Workshop support',
    text: 'Technical guidance for workshops, fleets, and performance garages choosing the right oil specification.',
    tag: 'Expert guidance',
    image: '/assets/images/lm/workshop.jpg',
  },
  {
    title: 'Motorsport partnerships',
    text: 'Racing-proven lubricants backed by real track data from BTCC, GT, and international series.',
    tag: 'Track proven',
    image: '/assets/images/lm/btcc-lg.jpg',
  },
  {
    title: 'Inquiry & quotes',
    text: 'Submit an inquiry for bulk supply, product selection, or distributor support — we respond promptly.',
    tag: 'Get quote',
    image: '/assets/images/lm/engstler-lg.jpg',
  },
]

/** Placeholder marketing figures — replace with approved claims before production. */
export const HERO_STATS = [
  { to: 150, suffix: '+', label: 'Countries worldwide' },
  { to: 4000, suffix: '+', label: 'Products in the range' },
  { to: 60, suffix: '+', label: 'Years of engineering' },
  { to: 24, suffix: '/7', label: 'Protection mindset' },
]

export const PERFORMANCE_METRICS = [
  { label: 'Lower friction', display: 'Synthetic', pct: 78 },
  { label: 'Extreme heat protection', display: 'Race-proven', pct: 88 },
  { label: 'Engine cleanliness', display: 'Detergent tech', pct: 92 },
  { label: 'High-speed performance', display: 'Motorsport DNA', pct: 96 },
]

export const ENGINE_STAGES = [
  {
    title: 'Oil pump & filter',
    text: 'Controlled pressure draws oil through the pump and filter, removing contaminants before circulation.',
  },
  {
    title: 'Crankshaft & bearings',
    text: 'A continuous oil film keeps the crankshaft riding on liquid — never on metal.',
  },
  {
    title: 'Pistons & cylinders',
    text: 'High-temperature film strength protects piston skirts and rings at maximum load.',
  },
  {
    title: 'Turbocharger',
    text: 'Thermal stability protects turbo bearings spinning far beyond 200,000 rpm.',
  },
]

export type Product = {
  index: string
  series: string
  name: string
  viscosity: string
  application: string
  description: string
  glow: string
  image: string
  specs: { label: string; value: string }[]
}

export const PRODUCTS: Product[] = [
  {
    index: '01',
    series: 'Top Tec',
    name: 'Top Tec 4200',
    viscosity: '5W-30',
    application: 'Modern passenger cars · OEM approved',
    description:
      'Flagship low-SAPS synthetic for high-tech engines that demand cleanliness, protection and long drain capability.',
    glow: '#E2001A',
    image: '/assets/images/products/product-bottle.png',
    specs: [
      { label: 'Viscosity', value: '5W-30' },
      { label: 'Base', value: 'Full synthetic' },
      { label: 'Use', value: 'OEM long drain' },
    ],
  },
  {
    index: '02',
    series: 'Molygen',
    name: 'Molygen New Generation',
    viscosity: '5W-40',
    application: 'High-output street & sport engines',
    description:
      'Molecular friction control with the distinctive Molygen chemistry — smoother response and durable wear protection.',
    glow: '#00519E',
    image: '/assets/images/products/product-bottle.png',
    specs: [
      { label: 'Viscosity', value: '5W-40' },
      { label: 'Base', value: 'Molygen' },
      { label: 'Use', value: 'Sport engines' },
    ],
  },
  {
    index: '03',
    series: 'Synthoil',
    name: 'Synthoil High Tech',
    viscosity: '5W-40',
    application: 'Performance & everyday protection',
    description:
      'Full-synthetic high-tech oil engineered for power delivery and reliable protection under demanding conditions.',
    glow: '#E2001A',
    image: '/assets/images/products/product-bottle.png',
    specs: [
      { label: 'Viscosity', value: '5W-40' },
      { label: 'Base', value: 'Synthoil' },
      { label: 'Use', value: 'Daily + load' },
    ],
  },
  {
    index: '04',
    series: 'Racing',
    name: 'Racing Synth',
    viscosity: '10W-60',
    application: 'Track days & motorsport engines',
    description:
      'Extreme shear stability for sustained redline running and race-level oil temperatures.',
    glow: '#00519E',
    image: '/assets/images/products/product-bottle.png',
    specs: [
      { label: 'Viscosity', value: '10W-60' },
      { label: 'Base', value: 'Racing synth' },
      { label: 'Use', value: 'Track / redline' },
    ],
  },
]

export const KNOWLEDGE_ARTICLES = [
  {
    index: '01',
    tag: 'Oil selection',
    title: 'How to approach engine-oil selection',
    summary:
      'Start with the machine and the published specification — viscosity, approvals and drain interval — before you inquire for supply.',
    stripe: '#00519E',
  },
  {
    index: '02',
    tag: 'Additives',
    title: 'When does an additive fit the application?',
    summary:
      'Additives are targeted chemistry, not a substitute for the correct oil. Use them where the duty cycle and manufacturer guidance align.',
    stripe: '#E2001A',
  },
  {
    index: '03',
    tag: 'Vehicle care',
    title: 'A practical routine for consistent vehicle care',
    summary:
      'Cleaners, treatments and surface care work as a system. A short workshop routine keeps the catalogue useful between oil changes.',
    stripe: 'linear-gradient(135deg, #00519E 0%, #E2001A 100%)',
  },
] as const

export const TECHNOLOGIES = [
  {
    title: 'Advanced synthetic base',
    text: 'Uniform synthetic molecules resist breakdown far beyond conventional mineral base stocks.',
  },
  {
    title: 'Thermal stability',
    text: 'Viscosity holds steady from cold start to extreme oil-film contact temperatures.',
  },
  {
    title: 'Friction control',
    text: 'Surface-active molecules reduce metal-to-metal drag, freeing power and cutting heat.',
  },
  {
    title: 'Engine cleanliness',
    text: 'Detergent–dispersant systems suspend deposits and keep tolerances factory-tight.',
  },
]

/** Our cinematic plates — not Liqui Moly media photos */
export const ASSETS = {
  hero: '/assets/images/hero-car.png',
  performance: '/assets/images/performance-car.png',
  racing: '/assets/images/racing-night.png',
  engine: '/assets/images/engine-oil.png',
  octagenLogo: '/assets/images/octagen-logo.png',
  bottle: '/assets/images/products/product-bottle.png',
  oilPour: '/assets/images/oil-pour.png',
  tireSmoke: '/assets/images/tire-smoke.png',
  heroVideo: '/assets/videos/hero-background.mp4',
  heroPoster: '/assets/images/hero-video-poster.jpg',
  insightsVideo: '/assets/videos/knowledge-cinematic.mp4',
  insightsPoster: '/assets/images/story-video-poster.jpg',
}

export const INQUIRY_MAILTO =
  'mailto:info@octagen.in?subject=LIQUI%20MOLY%20Inquiry%20%2F%20Get%20Quote'
