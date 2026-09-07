'use client'

import { useState } from 'react'
import type { Article, ArticleCategory } from '@prisma/client'
import { deleteArticle } from '@/lib/cms/actions'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import ArticleForm from '@/components/admin/ArticleForm'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import { PublishStatus } from '@/components/admin/StatusBadge'

type ArticleRow = Article & { category: Pick<ArticleCategory, 'id' | 'name'> }

export default function ArticlesAdminPanel({
  articles,
  categories,
}: {
  articles: ArticleRow[]
  categories: ArticleCategory[]
}) {
  const [mode, setMode] = useState<'closed' | 'create' | 'edit'>('closed')
  const [active, setActive] = useState<ArticleRow | null>(null)

  return (
    <div>
      <PageHeader
        eyebrow="Insights"
        title="Articles"
        action={
          <button
            type="button"
            onClick={() => {
              setActive(null)
              setMode('create')
            }}
            className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white"
          >
            Add article
          </button>
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
              <ActionIconButton
                label={`Edit ${article.title}`}
                onClick={() => {
                  setActive(article)
                  setMode('edit')
                }}
              />
              <DeleteButton
                action={deleteArticle}
                id={article.id}
                confirmMessage={`Delete article “${article.title}”?`}
              />
            </TableActions>
          </tr>
        ))}
      </DataTable>

      <AdminModal
        open={mode !== 'closed'}
        eyebrow="Insights"
        title={mode === 'edit' ? 'Edit article' : 'Add article'}
        onClose={() => setMode('closed')}
        size="xl"
      >
        <ArticleForm
          key={active?.id || 'new-article'}
          article={mode === 'edit' && active ? active : undefined}
          categories={categories}
        />
      </AdminModal>
    </div>
  )
}
