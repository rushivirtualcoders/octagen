import Link from 'next/link'
import { prisma } from '@/lib/db'

export default async function AdminHomePage() {
  const [products, published, articles, inquiries, unread] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.article.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
  ])

  const cards = [
    { label: 'Products', value: products, href: '/admin/products', note: `${published} published` },
    { label: 'Articles', value: articles, href: '/admin/articles', note: 'Insights library' },
    { label: 'Inquiries', value: inquiries, href: '/admin/inquiries', note: `${unread} new` },
  ]

  return (
    <div>
      <p className="tech-label text-lm-red">Overview</p>
      <h1 className="font-display mt-2 text-3xl font-extrabold uppercase text-ink">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-lm-orange/40 hover:shadow-md">
            <p className="tech-label text-muted">{card.label}</p>
            <p className="font-display mt-2 text-4xl font-bold text-ink">{card.value}</p>
            <p className="mt-2 text-xs text-muted">{card.note}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
