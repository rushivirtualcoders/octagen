import { saveArticleCategory } from '@/lib/cms/actions'
import CategoryForm from '@/components/admin/CategoryForm'
import { PageHeader } from '@/components/admin/PageHeader'

export default function NewArticleCategoryPage() {
  return (
    <div>
      <PageHeader eyebrow="Insights" title="Add article category" backHref="/admin/article-categories" backLabel="Back to categories" />
      <CategoryForm action={saveArticleCategory} />
    </div>
  )
}
