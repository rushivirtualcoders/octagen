import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@octagen.in').toLowerCase()
  const password = process.env.ADMIN_PASSWORD || 'ChangeMeNow!2026'
  const name = process.env.ADMIN_NAME || 'Octagen Admin'
  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name, role: 'admin' },
  })

  const oils = await prisma.productCategory.upsert({
    where: { slug: 'motor-oils' },
    update: {},
    create: {
      name: 'Motor oils',
      slug: 'motor-oils',
      description: 'Synthetic and specialist grades for OEM specifications.',
      sortOrder: 1,
    },
  })
  const additives = await prisma.productCategory.upsert({
    where: { slug: 'additives' },
    update: {},
    create: {
      name: 'Additives',
      slug: 'additives',
      description: 'Wear protection, cleaning and performance chemistry.',
      sortOrder: 2,
    },
  })
  const care = await prisma.productCategory.upsert({
    where: { slug: 'car-care' },
    update: {},
    create: {
      name: 'Car care',
      slug: 'car-care',
      description: 'Wheel, surface and workshop care systems.',
      sortOrder: 3,
    },
  })

  const products = [
    {
      name: 'Top Tec 4200 5W-30',
      slug: 'top-tec-4200-5w-30',
      articleNumber: 'P000323',
      application: 'CAR' as const,
      categoryId: oils.id,
      packSizes: ['1L', '5L'],
      imageUrl: '/assets/images/products/top-tec-4200.png',
      shortDescription: 'Low-SAPS fully synthetic oil for modern petrol and diesel engines.',
      description:
        'Long-drain, low-SAPS chemistry for after-treatment systems. Typical approvals include BMW Longlife-04, MB 229.51 and VW 504/507.',
      benefits: ['OEM long-life approvals', 'DPF / GPF compatible', 'Stable under high temperature'],
      approvals: ['ACEA C3', 'BMW Longlife-04', 'MB 229.51', 'VW 504 00 / 507 00'],
      featured: true,
      published: true,
    },
    {
      name: 'Cera Tec',
      slug: 'cera-tec',
      articleNumber: 'P000017',
      application: 'BOTH' as const,
      categoryId: additives.id,
      packSizes: ['300ml'],
      imageUrl: '/assets/images/products/cera-tec.png',
      shortDescription: 'Ceramic wear-protection additive for engines and gearboxes.',
      description: 'Reduces friction and metal contact. Mixable with commercial motor and gear oils.',
      benefits: ['Ceramic film', 'Lower wear on load', 'Compatible with catalytic converters'],
      approvals: [],
      featured: true,
      published: true,
    },
    {
      name: 'Premium Rim Cleaner',
      slug: 'premium-rim-cleaner',
      articleNumber: 'P005662',
      application: 'CAR' as const,
      categoryId: care.id,
      packSizes: ['750ml'],
      imageUrl: '/assets/images/products/premium-rim-cleaner.png',
      shortDescription: 'Acid-free gel rim cleaner with dirt indicator.',
      description: 'pH-neutral gel that clings to the wheel and turns purple when the soil is ready to rinse.',
      benefits: ['Acid-free', 'Chrome-safe', 'Colour-change indicator'],
      approvals: [],
      featured: false,
      published: true,
    },
    {
      name: 'Molygen New Generation 5W-40',
      slug: 'molygen-new-generation-5w-40',
      articleNumber: 'P001758',
      application: 'BOTH' as const,
      categoryId: oils.id,
      packSizes: ['1L', '4L', '5L'],
      imageUrl: '/assets/images/products/molygen-new-generation.png',
      shortDescription: 'Fully synthetic oil with Molecular Friction Control.',
      description: 'MFC chemistry for high-output petrol engines. Distinctive green oil colour.',
      benefits: ['Friction control', 'High-temp stability', 'Cold-start protection'],
      approvals: ['ACEA A3/B4', 'API SN', 'MB 229.5', 'Porsche A40'],
      featured: true,
      published: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    })
  }

  await prisma.articleCategory.upsert({
    where: { slug: 'oil-selection' },
    update: {},
    create: { name: 'Oil selection', slug: 'oil-selection' },
  })
  await prisma.articleCategory.upsert({
    where: { slug: 'workshop' },
    update: {},
    create: { name: 'Workshop', slug: 'workshop' },
  })

  await prisma.siteSetting.upsert({
    where: { id: 'site' },
    update: {},
    create: {
      id: 'site',
      homepage: {
        heroEyebrow: 'LIQUI MOLY India',
        heroTitle: 'German motor oil. Supplied by Octagen.',
        heroBody:
          'Official catalogue and inquiry desk for vehicle owners, workshops and bulk buyers across India.',
        bannerNote: 'Submit Inquiry / Get Quote — no cart, no public prices.',
      },
      aboutLiquiMoly: {
        title: 'About LIQUI MOLY',
        body: 'Founded in Ulm in 1957. Formulations developed and produced in Germany for OEM-approved lubrication and care.',
      },
      aboutOctagen: {
        title: 'About Octagen',
        body: 'Octagen is the exclusive authorized national distributor for LIQUI MOLY in India. We operate inquiry, supply and fulfilment.',
      },
      contact: {
        address: 'India (office and warehouse details to be confirmed)',
        email: 'info@octagen.in',
        phone: '',
        mapUrl: '',
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
