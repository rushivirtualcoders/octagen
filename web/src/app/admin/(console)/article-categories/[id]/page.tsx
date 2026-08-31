import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { saveArticleCategory } from '@/lib/cms/actions'
import CategoryForm from '@/components/admin/CategoryForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default async function EditArticleCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await prisma.articleCategory.findUnique({ where: { id } })
  if (!category) notFound()

  return (
    <div>
      <PageHeader eyebrow="Insights" title="Edit article category" backHref="/admin/article-categories" backLabel="Back to categories" />
      <CategoryForm action={saveArticleCategory} values={category} />
    </div>
  )
}
