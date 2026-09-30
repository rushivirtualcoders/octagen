'use client'

import { useState } from 'react'
import type { MarketingActivity } from '@prisma/client'
import { deleteMarketingActivity } from '@/lib/cms/actions'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import MarketingActivityForm from '@/components/admin/MarketingActivityForm'
import { PageHeader } from '@/components/admin/PageHeader'
import { PublishStatus } from '@/components/admin/StatusBadge'

export default function MarketingActivitiesAdminPanel({
  activities,
}: {
  activities: MarketingActivity[]
}) {
  const [mode, setMode] = useState<'closed' | 'create' | 'edit'>('closed')
  const [active, setActive] = useState<MarketingActivity | null>(null)

  return (
    <div>
      <PageHeader
        eyebrow="Homepage"
        title="Marketing activities"
        action={
          <button
            type="button"
            onClick={() => {
              setActive(null)
              setMode('create')
            }}
            className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white"
          >
            Add activity
          </button>
        }
      />

      <DataTable columns={['Title', 'Sort', 'Status', 'Actions']} empty={activities.length === 0}>
        {activities.map((activity) => (
          <tr key={activity.id} className="border-t border-line">
            <td className="px-4 py-3">
              <p className="font-medium text-ink">{activity.title}</p>
              <p className="line-clamp-1 text-xs text-muted">{activity.text}</p>
            </td>
            <td className="px-4 py-3 text-ink/70">{activity.sortOrder}</td>
            <td className="px-4 py-3">
              <PublishStatus published={activity.published} />
            </td>
            <TableActions>
              <ActionIconButton
                label={`Edit ${activity.title}`}
                onClick={() => {
                  setActive(activity)
                  setMode('edit')
                }}
              />
              <DeleteButton
                action={deleteMarketingActivity}
                id={activity.id}
                confirmMessage={`Delete activity “${activity.title}”?`}
              />
            </TableActions>
          </tr>
        ))}
      </DataTable>

      <AdminModal
        open={mode !== 'closed'}
        eyebrow="Homepage"
        title={mode === 'edit' ? 'Edit activity' : 'Add activity'}
        onClose={() => setMode('closed')}
        size="lg"
      >
        <MarketingActivityForm
          key={active?.id || 'new-activity'}
          activity={mode === 'edit' && active ? active : undefined}
        />
      </AdminModal>
    </div>
  )
}
