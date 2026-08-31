import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteProduct } from '@/lib/cms/actions'
import { ActionIconLink } from '@/components/admin/ActionIcons'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import { FeaturedBadge, PublishStatus } from '@/components/admin/StatusBadge'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Product inventory"
        action={
          <Link href="/admin/products/new" className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white">
            Add product
          </Link>
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
              <ActionIconLink href={`/admin/products/${product.id}`} label={`Edit ${product.name}`} />
              <DeleteButton action={deleteProduct} id={product.id} confirmMessage={`Delete product “${product.name}”?`} />
            </TableActions>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
