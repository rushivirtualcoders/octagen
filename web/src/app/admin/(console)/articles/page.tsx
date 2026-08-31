import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteArticle } from '@/lib/cms/actions'
import { ActionIconLink } from '@/components/admin/ActionIcons'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import { PublishStatus } from '@/components/admin/StatusBadge'

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    include: { category: true },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div>
      <PageHeader
        eyebrow="Insights"
        title="Articles"
        action={
          <Link href="/admin/articles/new" className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white">
            Add article
          </Link>
        }
      />
      <DataTable columns={['Title', 'Category', 'Status', 'Actions']} empty={articles.length === 0}>
        {articles.map((article) => (
          <tr key={article.id} className="border-t border-line">
            <td className="px-4 py-3 font-medium text-ink">{article.title}</td>
            <td className="px-4 py-3 text-ink/70">{article.category.name}</td>
            <td className="px-4 py-3">
              <PublishStatus published={article.published} />
            </td>
            <TableActions>
              <ActionIconLink href={`/admin/articles/${article.id}`} label={`Edit ${article.title}`} />
              <DeleteButton action={deleteArticle} id={article.id} confirmMessage={`Delete article “${article.title}”?`} />
            </TableActions>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
