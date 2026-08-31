import { prisma } from '@/lib/db'
import { deleteInquiry } from '@/lib/cms/actions'
import { ActionIconLink } from '@/components/admin/ActionIcons'
import DeleteButton from '@/components/admin/DeleteButton'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import { PageHeader } from '@/components/admin/PageHeader'
import { InquiryStatusBadge, StatusBadge } from '@/components/admin/StatusBadge'

const TYPE_LABEL: Record<string, string> = {
  GENERAL: 'General',
  WORKSHOP: 'Workshop',
  BULK: 'Bulk',
  PRODUCT_QUOTE: 'Product quote',
}

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <PageHeader eyebrow="Inbox" title="Inquiries" />
      <DataTable columns={['When', 'Type', 'From', 'Status', 'Actions']} empty={inquiries.length === 0}>
        {inquiries.map((inquiry) => (
          <tr key={inquiry.id} className="border-t border-line">
            <td className="px-4 py-3 text-muted">{inquiry.createdAt.toLocaleString('en-IN')}</td>
            <td className="px-4 py-3">
              <StatusBadge tone="neutral">{TYPE_LABEL[inquiry.type] ?? inquiry.type}</StatusBadge>
            </td>
            <td className="px-4 py-3">
              <p className="font-medium text-ink">{inquiry.name}</p>
              <p className="text-xs text-muted">{inquiry.email}</p>
            </td>
            <td className="px-4 py-3">
              <InquiryStatusBadge status={inquiry.status} />
            </td>
            <TableActions>
              <ActionIconLink href={`/admin/inquiries/${inquiry.id}`} label={`Open inquiry from ${inquiry.name}`} variant="open" />
              <DeleteButton
                action={deleteInquiry}
                id={inquiry.id}
                confirmMessage={`Delete inquiry from “${inquiry.name}”?`}
              />
            </TableActions>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
