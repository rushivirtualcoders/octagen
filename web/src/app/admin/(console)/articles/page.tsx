import { prisma } from '@/lib/db'
import ArticlesAdminPanel from '@/components/admin/ArticlesAdminPanel'

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      include: { category: { select: { id: true, name: true } } },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.articleCategory.findMany({ orderBy: { name: 'asc' } }),
  ])

  return <ArticlesAdminPanel articles={articles} categories={categories} />
}
