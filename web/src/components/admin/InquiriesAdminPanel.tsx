'use client'

import { useEffect, useState, useTransition } from 'react'
import type { Inquiry, InquiryStatus, Product } from '@prisma/client'
import { deleteInquiry, markInquiryRead } from '@/lib/cms/actions'
import { ActionIconButton } from '@/components/admin/ActionIcons'
import AdminModal from '@/components/admin/AdminModal'
import { DataTable, TableActions } from '@/components/admin/DataTable'
import DeleteButton from '@/components/admin/DeleteButton'
import InquiryStatusForm from '@/components/admin/InquiryStatusForm'
import { PageHeader } from '@/components/admin/PageHeader'
import { InquiryStatusBadge, StatusBadge } from '@/components/admin/StatusBadge'

const TYPE_LABEL: Record<string, string> = {
  GENERAL: 'General',
  WORKSHOP: 'Workshop',
  BULK: 'Bulk',
  PRODUCT_QUOTE: 'Product quote',
}

type InquiryRow = Inquiry & {
  product: Pick<Product, 'id' | 'name'> | null
  createdAt: string | Date
}

export default function InquiriesAdminPanel({ inquiries }: { inquiries: InquiryRow[] }) {
  const [active, setActive] = useState<InquiryRow | null>(null)
  const [displayStatus, setDisplayStatus] = useState<InquiryStatus | null>(null)
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (!active) {
      setDisplayStatus(null)
      return
    }
    const next = active.status === 'NEW' ? 'READ' : active.status
    setDisplayStatus(next)
    if (active.status === 'NEW') {
      const formData = new FormData()
      formData.set('id', active.id)
      startTransition(() => {
        void markInquiryRead(formData)
      })
    }
  }, [active])

  return (
    <div>
      <PageHeader eyebrow="Inbox" title="Inquiries" />

      <DataTable
        columns={['When', 'Type', 'From', 'Subject', 'Status', 'Actions']}
        empty={inquiries.length === 0}
      >
        {inquiries.map((inquiry) => (
          <tr key={inquiry.id} className="border-t border-line">
            <td className="px-4 py-3 text-muted">
              {new Date(inquiry.createdAt).toLocaleString('en-IN')}
            </td>
            <td className="px-4 py-3">
              <StatusBadge tone="neutral">{TYPE_LABEL[inquiry.type] ?? inquiry.type}</StatusBadge>
            </td>
            <td className="px-4 py-3">
              <p className="font-medium text-ink">{inquiry.name}</p>
              <p className="text-xs text-muted">{inquiry.email}</p>
            </td>
            <td className="max-w-[14rem] truncate px-4 py-3 text-sm text-muted">
              {inquiry.subject || '—'}
            </td>
            <td className="px-4 py-3">
              <InquiryStatusBadge
                status={active?.id === inquiry.id && displayStatus ? displayStatus : inquiry.status}
              />
            </td>
            <TableActions>
              <ActionIconButton
                label={`Open inquiry from ${inquiry.name}`}
                variant="open"
                onClick={() => setActive(inquiry)}
              />
              <DeleteButton
                action={deleteInquiry}
                id={inquiry.id}
                confirmMessage={`Delete inquiry from “${inquiry.name}”?`}
              />
            </TableActions>
          </tr>
        ))}
      </DataTable>

      <AdminModal
        open={Boolean(active)}
        eyebrow="Inbox"
        title={active?.name || 'Inquiry'}
        onClose={() => setActive(null)}
        size="lg"
      >
        {active && displayStatus ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <InquiryStatusBadge status={displayStatus} />
              <StatusBadge tone="neutral">{TYPE_LABEL[active.type] ?? active.type}</StatusBadge>
            </div>

            <dl className="space-y-2 rounded-xl border border-line bg-[#f8fafc] p-4 text-sm text-ink/80">
              <div>
                <span className="text-muted">Email:</span> {active.email}
              </div>
              <div>
                <span className="text-muted">Phone:</span> {active.phone || '—'}
              </div>
              <div>
                <span className="text-muted">Company:</span> {active.company || '—'}
              </div>
              <div>
                <span className="text-muted">Subject:</span> {active.subject || '—'}
              </div>
              <div>
                <span className="text-muted">Product:</span> {active.product?.name || '—'}
              </div>
              <div>
                <span className="text-muted">Received:</span>{' '}
                {new Date(active.createdAt).toLocaleString('en-IN')}
              </div>
            </dl>

            <p className="whitespace-pre-wrap rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink/80">
              {active.message}
            </p>

            <InquiryStatusForm id={active.id} status={displayStatus} />

            <div className="flex items-center gap-3 border-t border-line pt-4">
              <DeleteButton
                action={deleteInquiry}
                id={active.id}
                label="Delete inquiry"
                confirmMessage={`Delete inquiry from “${active.name}”? This cannot be undone.`}
              />
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  )
}
