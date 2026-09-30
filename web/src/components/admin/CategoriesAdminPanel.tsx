'use client'

import { useState } from 'react'
import type { ActionState } from '@/lib/cms/action-state'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import CategoryForm from '@/components/admin/CategoryForm'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import { ActiveStatus } from '@/components/admin/StatusBadge'

export type CategoryRow = {
  id: string
  name: string
  slug: string
  description?: string
  vehiclePath?: 'CAR' | 'BIKE'
  sortOrder?: number
  active?: boolean
}

export default function CategoriesAdminPanel({
  eyebrow,
  title,
  addLabel,
  categories,
  columns,
  withDescription = false,
  withVehiclePath = false,
  saveAction,
  deleteAction,
}: {
  eyebrow: string
  title: string
  addLabel: string
  categories: CategoryRow[]
  columns: string[]
  withDescription?: boolean
  withVehiclePath?: boolean
  saveAction: (state: ActionState, formData: FormData) => Promise<ActionState>
  deleteAction: (formData: FormData) => void | Promise<void>
}) {
  const [mode, setMode] = useState<'closed' | 'create' | 'edit'>('closed')
  const [active, setActive] = useState<CategoryRow | null>(null)

  return (
    <div>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        action={
          <button
            type="button"
            onClick={() => {
              setActive(null)
              setMode('create')
            }}
            className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white"
          >
            {addLabel}
          </button>
        }
      />

      <DataTable columns={columns} empty={categories.length === 0}>
        {categories.map((category) => (
          <tr key={category.id} className="border-t border-line">
            <td className="px-4 py-3 font-medium text-ink">{category.name}</td>
            <td className="px-4 py-3 text-ink/70">{category.slug}</td>
            {withVehiclePath ? (
              <td className="px-4 py-3 text-ink/70">
                {category.vehiclePath === 'BIKE' ? 'Bike' : 'Car'}
              </td>
            ) : null}
            {withDescription ? (
              <td className="px-4 py-3 text-ink/70">{category.sortOrder ?? 0}</td>
            ) : null}
            <td className="px-4 py-3">
              <ActiveStatus active={category.active ?? true} />
            </td>
            <TableActions>
              <ActionIconButton
                label={`Edit ${category.name}`}
                onClick={() => {
                  setActive(category)
                  setMode('edit')
                }}
              />
              <DeleteButton
                action={deleteAction}
                id={category.id}
                confirmMessage={`Delete category “${category.name}”?`}
              />
            </TableActions>
          </tr>
        ))}
      </DataTable>

      <AdminModal
        open={mode !== 'closed'}
        eyebrow={eyebrow}
        title={mode === 'edit' ? 'Edit category' : 'Add category'}
        onClose={() => setMode('closed')}
        size="md"
      >
        <CategoryForm
          key={active?.id || 'new-category'}
          action={saveAction}
          withDescription={withDescription}
          withVehiclePath={withVehiclePath}
          values={
            mode === 'edit' && active
              ? {
                  id: active.id,
                  name: active.name,
                  slug: active.slug,
                  description: active.description,
                  vehiclePath: active.vehiclePath,
                  sortOrder: active.sortOrder,
                  active: active.active,
                }
              : { active: true, vehiclePath: 'CAR' }
          }
        />
      </AdminModal>
    </div>
  )
}
