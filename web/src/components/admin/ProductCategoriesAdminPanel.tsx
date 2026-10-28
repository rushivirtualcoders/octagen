'use client'

import { Fragment, useMemo, useState } from 'react'
import type { ProductCategory, ProductSubcategory } from '@prisma/client'
import type { ActionState } from '@/lib/cms/action-state'
import {
  deleteProductCategory,
  deleteProductSubcategory,
  saveProductCategory,
  saveProductSubcategory,
} from '@/lib/cms/actions'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import CategoryForm from '@/components/admin/CategoryForm'
import SubcategoryForm from '@/components/admin/SubcategoryForm'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import { ActiveStatus } from '@/components/admin/StatusBadge'
import Pagination, { ADMIN_PAGE_SIZE, paginate } from '@/components/ui/Pagination'

type CategoryWithSubs = ProductCategory & { subcategories: ProductSubcategory[] }

type ModalState =
  | { kind: 'closed' }
  | { kind: 'category-create' }
  | { kind: 'category-edit'; category: CategoryWithSubs }
  | { kind: 'sub-create'; category: CategoryWithSubs }
  | { kind: 'sub-edit'; category: CategoryWithSubs; subcategory: ProductSubcategory }

export default function ProductCategoriesAdminPanel({
  categories,
}: {
  categories: CategoryWithSubs[]
}) {
  const [modal, setModal] = useState<ModalState>({ kind: 'closed' })
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const sorted = useMemo(
    () =>
      [...categories].sort((a, b) => {
        if (a.vehiclePath !== b.vehiclePath) return a.vehiclePath.localeCompare(b.vehiclePath)
        return a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
      }),
    [categories],
  )
  const paged = useMemo(() => paginate(sorted, page, ADMIN_PAGE_SIZE), [page, sorted])

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Product categories"
        action={
          <button
            type="button"
            onClick={() => setModal({ kind: 'category-create' })}
            className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white"
          >
            Add category
          </button>
        }
      />

      <p className="mb-4 max-w-3xl text-sm text-muted">
        Categories power the Products flyout (Car / Bike). Add subcategories under a category when the
        retail range nests series (for example Top Tec under Car Engine Oils). Flat sections need no
        subcategory.
      </p>

      <DataTable
        columns={['Name', 'Path', 'Subs', 'Sort', 'Status', 'Actions']}
        empty={paged.total === 0}
      >
        {paged.items.map((category) => {
          const open = expandedId === category.id
          const subs = [...category.subcategories].sort(
            (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name),
          )
          return (
            <Fragment key={category.id}>
              <tr className="border-t border-line">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setExpandedId(open ? null : category.id)}
                    className="flex items-center gap-2 text-left font-medium text-ink hover:text-lm-red"
                    aria-expanded={open}
                  >
                    <span aria-hidden className="text-muted">
                      {open ? '▾' : '▸'}
                    </span>
                    {category.name}
                  </button>
                  <p className="pl-5 text-xs text-muted">{category.slug}</p>
                </td>
                <td className="px-4 py-3 text-ink/70">
                  {category.vehiclePath === 'BIKE' ? 'Bike' : 'Car'}
                </td>
                <td className="px-4 py-3 text-ink/70">{subs.length}</td>
                <td className="px-4 py-3 text-ink/70">{category.sortOrder}</td>
                <td className="px-4 py-3">
                  <ActiveStatus active={category.active} />
                </td>
                <TableActions>
                  <ActionIconButton
                    variant="add"
                    label={`Add subcategory under ${category.name}`}
                    onClick={() => setModal({ kind: 'sub-create', category })}
                  />
                  <ActionIconButton
                    label={`Edit ${category.name}`}
                    onClick={() => setModal({ kind: 'category-edit', category })}
                  />
                  <DeleteButton
                    action={deleteProductCategory}
                    id={category.id}
                    confirmMessage={`Delete category “${category.name}”? Subcategories will also be removed.`}
                  />
                </TableActions>
              </tr>
              {open ? (
                <tr className="border-t border-line/60 bg-surface/40">
                  <td colSpan={6} className="px-4 py-3">
                    {subs.length === 0 ? (
                      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-2 text-sm text-muted">
                        <span>No subcategories yet — products link to this category only.</span>
                        <button
                          type="button"
                          onClick={() => setModal({ kind: 'sub-create', category })}
                          className="rounded-md border border-line bg-white px-3 py-1.5 text-xs font-semibold uppercase text-ink hover:border-lm-red hover:text-lm-red"
                        >
                          Add subcategory
                        </button>
                      </div>
                    ) : (
                      <ul className="divide-y divide-line/70 rounded-md border border-line bg-white">
                        {subs.map((sub) => (
                          <li
                            key={sub.id}
                            className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5"
                          >
                            <div>
                              <p className="text-sm font-medium text-ink">{sub.name}</p>
                              <p className="text-xs text-muted">
                                {sub.slug} · sort {sub.sortOrder}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <ActiveStatus active={sub.active} />
                              <ActionIconButton
                                label={`Edit ${sub.name}`}
                                onClick={() =>
                                  setModal({ kind: 'sub-edit', category, subcategory: sub })
                                }
                              />
                              <DeleteButton
                                action={deleteProductSubcategory}
                                id={sub.id}
                                confirmMessage={`Delete subcategory “${sub.name}”?`}
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              ) : null}
            </Fragment>
          )
        })}
      </DataTable>

      <Pagination
        className="mt-4"
        page={paged.page}
        pageCount={paged.pageCount}
        total={paged.total}
        pageSize={ADMIN_PAGE_SIZE}
        onPageChange={setPage}
      />

      <AdminModal
        open={modal.kind === 'category-create' || modal.kind === 'category-edit'}
        eyebrow="Catalogue"
        title={modal.kind === 'category-edit' ? 'Edit category' : 'Add category'}
        onClose={() => setModal({ kind: 'closed' })}
        size="md"
      >
        <CategoryForm
          key={modal.kind === 'category-edit' ? modal.category.id : 'new-category'}
          action={saveProductCategory as (state: ActionState, formData: FormData) => Promise<ActionState>}
          withDescription
          withVehiclePath
          values={
            modal.kind === 'category-edit'
              ? {
                  id: modal.category.id,
                  name: modal.category.name,
                  slug: modal.category.slug,
                  description: modal.category.description,
                  vehiclePath: modal.category.vehiclePath,
                  sortOrder: modal.category.sortOrder,
                  active: modal.category.active,
                }
              : { active: true, vehiclePath: 'CAR' }
          }
        />
      </AdminModal>

      <AdminModal
        open={modal.kind === 'sub-create' || modal.kind === 'sub-edit'}
        eyebrow="Catalogue"
        title={modal.kind === 'sub-edit' ? 'Edit subcategory' : 'Add subcategory'}
        onClose={() => setModal({ kind: 'closed' })}
        size="md"
      >
        {modal.kind === 'sub-create' || modal.kind === 'sub-edit' ? (
          <SubcategoryForm
            key={modal.kind === 'sub-edit' ? modal.subcategory.id : `new-sub-${modal.category.id}`}
            action={saveProductSubcategory as (state: ActionState, formData: FormData) => Promise<ActionState>}
            categoryId={modal.category.id}
            categoryName={modal.category.name}
            values={
              modal.kind === 'sub-edit'
                ? {
                    id: modal.subcategory.id,
                    name: modal.subcategory.name,
                    slug: modal.subcategory.slug,
                    sortOrder: modal.subcategory.sortOrder,
                    active: modal.subcategory.active,
                  }
                : { active: true }
            }
          />
        ) : null}
      </AdminModal>
    </div>
  )
}
