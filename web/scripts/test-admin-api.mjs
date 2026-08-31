import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()
const results = []

function pass(name) {
  results.push({ name, ok: true })
  console.log(`✓ ${name}`)
}

function fail(name, error) {
  results.push({ name, ok: false, error: String(error) })
  console.error(`✗ ${name}: ${error}`)
}

async function main() {
  try {
    const categories = await prisma.productCategory.findMany({ take: 1 })
    pass('Product categories readable')
    if (!categories.length) throw new Error('No seeded categories')

    const products = await prisma.product.findMany({ take: 1 })
    pass('Products readable')
    if (!products.length) throw new Error('No seeded products')

    const articles = await prisma.article.findMany({ take: 1 })
    pass('Articles readable')

    const articleCategories = await prisma.articleCategory.findMany({ take: 1 })
    pass('Article categories readable')

    const inquiries = await prisma.inquiry.findMany({ take: 1 })
    pass('Inquiries readable')

    const settings = await prisma.siteSetting.findUnique({ where: { id: 'site' } })
    pass('Site settings readable')
    if (!settings) throw new Error('Site settings not seeded')

    const user = await prisma.user.findUnique({ where: { email: 'admin@octagen.in' } })
    pass('Admin user readable')
    if (!user) throw new Error('Admin user not seeded')

    const inquiry = await prisma.inquiry.create({
      data: {
        type: 'GENERAL',
        name: 'API Test',
        email: 'api-test@octagen.in',
        message: 'Automated admin API verification message.',
      },
    })
    pass('Inquiry create works')
    await prisma.inquiry.delete({ where: { id: inquiry.id } })
    pass('Inquiry delete works')

    const slug = `test-cat-${Date.now()}`
    const cat = await prisma.productCategory.create({
      data: { name: 'Test Category', slug, description: 'temp', sortOrder: 99 },
    })
    pass('Product category create works')
    await prisma.productCategory.delete({ where: { id: cat.id } })
    pass('Product category delete works')

    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
    loginSchema.parse({ email: 'admin@octagen.in', password: 'ChangeMeNow!2026' })
    pass('Login schema validates')

    const res = await fetch('http://localhost:3000/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'GENERAL',
        name: 'Fetch Test',
        email: 'fetch-test@octagen.in',
        message: 'Testing public inquiry API endpoint.',
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (!json.ok || !json.id) throw new Error('Invalid response')
    pass('POST /api/inquiries works')
    await prisma.inquiry.delete({ where: { id: json.id } })

    const bad = await fetch('http://localhost:3000/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bad: true }),
    })
    if (bad.status !== 400) throw new Error(`Expected 400, got ${bad.status}`)
    pass('POST /api/inquiries rejects invalid payload')

    const protectedRes = await fetch('http://localhost:3000/admin/products', { redirect: 'manual' })
    if (protectedRes.status !== 307 && protectedRes.status !== 302) {
      throw new Error(`Expected redirect, got ${protectedRes.status}`)
    }
    pass('Admin routes require auth')
  } catch (error) {
    fail('Unexpected failure', error)
  } finally {
    await prisma.$disconnect()
  }

  const failed = results.filter((r) => !r.ok)
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  if (failed.length) process.exit(1)
}

main()
