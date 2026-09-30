'use client'

import { useState } from 'react'
import type { MarketingMedia } from '@prisma/client'
import { deleteMarketingMedia } from '@/lib/cms/actions'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import MarketingMediaForm from '@/components/admin/MarketingMediaForm'
import { PageHeader } from '@/components/admin/PageHeader'
import { PublishStatus, StatusBadge } from '@/components/admin/StatusBadge'

export default function MarketingMediaAdminPanel({ media }: { media: MarketingMedia[] }) {
  const [mode, setMode] = useState<'closed' | 'create' | 'edit'>('closed')
  const [active, setActive] = useState<MarketingMedia | null>(null)

  return (
    <div>
      <PageHeader
        eyebrow="Homepage"
        title="Marketing media"
        action={
          <button
            type="button"
            onClick={() => {
              setActive(null)
              setMode('create')
            }}
            className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white"
          >
            Add media
          </button>
        }
      />
      <p className="mb-4 max-w-2xl text-sm text-muted">
        Images and videos for the marketing gallery. Kept in CMS even if the public Marketing section is
        temporarily unused.
      </p>

      <DataTable columns={['Title', 'Type', 'Sort', 'Status', 'Actions']} empty={media.length === 0}>
        {media.map((item) => (
          <tr key={item.id} className="border-t border-line">
            <td className="px-4 py-3">
              <p className="font-medium text-ink">{item.title}</p>
              <p className="line-clamp-1 text-xs text-muted">{item.src}</p>
            </td>
            <td className="px-4 py-3">
              <StatusBadge tone="info">{item.type === 'VIDEO' ? 'Video' : 'Image'}</StatusBadge>
            </td>
            <td className="px-4 py-3 text-ink/70">{item.sortOrder}</td>
            <td className="px-4 py-3">
              <PublishStatus published={item.published} />
            </td>
            <TableActions>
              <ActionIconButton
                label={`Edit ${item.title}`}
                onClick={() => {
                  setActive(item)
                  setMode('edit')
                }}
              />
              <DeleteButton
                action={deleteMarketingMedia}
                id={item.id}
                confirmMessage={`Delete media “${item.title}”?`}
              />
            </TableActions>
          </tr>
        ))}
      </DataTable>

      <AdminModal
        open={mode !== 'closed'}
        eyebrow="Homepage"
        title={mode === 'edit' ? 'Edit media' : 'Add media'}
        onClose={() => setMode('closed')}
        size="lg"
      >
        <MarketingMediaForm key={active?.id || 'new-media'} media={mode === 'edit' && active ? active : undefined} />
      </AdminModal>
    </div>
  )
}
