import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import ArticleForm from '@/components/admin/ArticleForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [article, categories] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.articleCategory.findMany({ orderBy: { name: 'asc' } }),
  ])
  if (!article) notFound()

  return (
    <div>
      <PageHeader eyebrow="Insights" title="Edit article" backHref="/admin/articles" backLabel="Back to articles" />
      <ArticleForm article={article} categories={categories} />
    </div>
  )
}
