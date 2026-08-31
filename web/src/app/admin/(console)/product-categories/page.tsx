import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deleteProductCategory } from '@/lib/cms/actions'
import { ActionIconLink } from '@/components/admin/ActionIcons'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'

export default async function ProductCategoriesPage() {
  const categories = await prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' } })

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Product categories"
        action={
          <Link href="/admin/product-categories/new" className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white">
            Add category
          </Link>
        }
      />
      <DataTable columns={['Name', 'Slug', 'Sort', 'Actions']} empty={categories.length === 0}>
        {categories.map((category) => (
          <tr key={category.id} className="border-t border-line">
            <td className="px-4 py-3 font-medium text-ink">{category.name}</td>
            <td className="px-4 py-3 text-ink/70">{category.slug}</td>
            <td className="px-4 py-3 text-ink/70">{category.sortOrder}</td>
            <TableActions>
              <ActionIconLink href={`/admin/product-categories/${category.id}`} label={`Edit ${category.name}`} />
              <DeleteButton action={deleteProductCategory} id={category.id} confirmMessage={`Delete category “${category.name}”?`} />
            </TableActions>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
