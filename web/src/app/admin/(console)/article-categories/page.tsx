import { prisma } from '@/lib/db'
import { deleteArticleCategory, saveArticleCategory } from '@/lib/cms/actions'
import CategoriesAdminPanel from '@/components/admin/CategoriesAdminPanel'

export default async function ArticleCategoriesPage() {
  const categories = await prisma.articleCategory.findMany({ orderBy: { name: 'asc' } })

  return (
    <CategoriesAdminPanel
      eyebrow="Insights"
      title="Article categories"
      addLabel="Add category"
      columns={['Name', 'Slug', 'Status', 'Actions']}
      categories={categories}
      saveAction={saveArticleCategory}
      deleteAction={deleteArticleCategory}
    />
  )
}
