'use client'

import { useState } from 'react'
import type { Product, ProductCategory } from '@prisma/client'
import { deleteProduct } from '@/lib/cms/actions'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import ProductForm from '@/components/admin/ProductForm'
import { FeaturedBadge, PublishStatus } from '@/components/admin/StatusBadge'

type ProductRow = Product & { category: Pick<ProductCategory, 'id' | 'name'> }

export default function ProductsAdminPanel({
  products,
  categories,
}: {
  products: ProductRow[]
  categories: ProductCategory[]
}) {
  const [mode, setMode] = useState<'closed' | 'create' | 'edit'>('closed')
  const [active, setActive] = useState<ProductRow | null>(null)

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

      <DataTable columns={['Product', 'Article no.', 'Category', 'Status', 'Actions']} empty={products.length === 0}>
        {products.map((product) => (
          <tr key={product.id} className="border-t border-line">
            <td className="px-4 py-3">
              <p className="font-medium text-ink">{product.name}</p>
              <p className="text-xs text-muted">{product.application}</p>
            </td>
            <td className="px-4 py-3 text-ink/70">{product.articleNumber}</td>
            <td className="px-4 py-3 text-ink/70">{product.category.name}</td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <PublishStatus published={product.published} />
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
        />
      </AdminModal>
    </div>
  )
}
