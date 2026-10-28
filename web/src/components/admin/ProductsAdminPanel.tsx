'use client'

import { useMemo, useState } from 'react'
import type { Product, ProductCategory, ProductSubcategory } from '@prisma/client'
import { deleteProduct } from '@/lib/cms/actions'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import ProductForm from '@/components/admin/ProductForm'
import { FeaturedBadge, LovedBadge, PublishStatus } from '@/components/admin/StatusBadge'
import Pagination, { ADMIN_PAGE_SIZE, paginate } from '@/components/ui/Pagination'

type ProductRow = Product & {
  category: Pick<ProductCategory, 'id' | 'name'>
  subcategory: Pick<ProductSubcategory, 'id' | 'name'> | null
}

export default function ProductsAdminPanel({
  products,
  categories,
  subcategories = [],
}: {
  products: ProductRow[]
  categories: ProductCategory[]
  subcategories?: ProductSubcategory[]
}) {
  const [mode, setMode] = useState<'closed' | 'create' | 'edit'>('closed')
  const [active, setActive] = useState<ProductRow | null>(null)
  const [page, setPage] = useState(1)
  const paged = useMemo(() => paginate(products, page, ADMIN_PAGE_SIZE), [page, products])

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Product inventory"
        action={
          <button
            type="button"
            onClick={() => {
              setActive(null)
              setMode('create')
            }}
            className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white"
          >
            Add product
          </button>
        }
      />

      <DataTable columns={['Product', 'Article no.', 'Category', 'Status', 'Actions']} empty={paged.total === 0}>
        {paged.items.map((product) => (
          <tr key={product.id} className="border-t border-line">
            <td className="px-4 py-3">
              <p className="font-medium text-ink">{product.name}</p>
              <p className="text-xs text-muted">{product.application}</p>
            </td>
            <td className="px-4 py-3 text-ink/70">{product.articleNumber}</td>
            <td className="px-4 py-3 text-ink/70">
              <p>{product.category.name}</p>
              {product.subcategory ? (
                <p className="text-xs text-muted">{product.subcategory.name}</p>
              ) : null}
            </td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <PublishStatus published={product.published} />
                <LovedBadge loved={product.loved} />
                <FeaturedBadge featured={product.featured} />
              </div>
            </td>
            <TableActions>
              <ActionIconButton
                label={`Edit ${product.name}`}
                onClick={() => {
                  setActive(product)
                  setMode('edit')
                }}
              />
              <DeleteButton
                action={deleteProduct}
                id={product.id}
                confirmMessage={`Delete product “${product.name}”?`}
              />
            </TableActions>
          </tr>
        ))}
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
        open={mode !== 'closed'}
        eyebrow="Catalogue"
        title={mode === 'edit' ? 'Edit product' : 'Add product'}
        onClose={() => setMode('closed')}
        size="xl"
      >
        <ProductForm
          key={active?.id || 'new-product'}
          product={mode === 'edit' && active ? active : undefined}
          categories={categories}
          subcategories={subcategories}
        />
      </AdminModal>
    </div>
  )
}
