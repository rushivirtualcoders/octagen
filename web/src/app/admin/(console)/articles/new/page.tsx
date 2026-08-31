import { prisma } from '@/lib/db'
import ArticleForm from '@/components/admin/ArticleForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default async function NewArticlePage() {
  const categories = await prisma.articleCategory.findMany({ orderBy: { name: 'asc' } })
  return (
    <div>
      <PageHeader eyebrow="Insights" title="Add article" backHref="/admin/articles" backLabel="Back to articles" />
      <ArticleForm categories={categories} />
    </div>
  )
}
