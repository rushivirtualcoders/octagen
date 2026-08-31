import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { deleteInquiry } from '@/lib/cms/actions'
import DeleteButton from '@/components/admin/DeleteButton'
import { PageHeader } from '@/components/admin/PageHeader'
import InquiryStatusForm from '@/components/admin/InquiryStatusForm'
import { InquiryStatusBadge, StatusBadge } from '@/components/admin/StatusBadge'

const TYPE_LABEL: Record<string, string> = {
  GENERAL: 'General',
  WORKSHOP: 'Workshop',
  BULK: 'Bulk',
  PRODUCT_QUOTE: 'Product quote',
}

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const inquiry = await prisma.inquiry.findUnique({ where: { id }, include: { product: true } })
  if (!inquiry) notFound()

  if (inquiry.status === 'NEW') {
    await prisma.inquiry.update({ where: { id }, data: { status: 'READ' } })
  }

  const displayStatus = inquiry.status === 'NEW' ? 'READ' : inquiry.status

  return (
    <div className="max-w-2xl">
      <PageHeader eyebrow="Inbox" title={inquiry.name} backHref="/admin/inquiries" backLabel="Back to inquiries" />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <InquiryStatusBadge status={displayStatus} />
        <StatusBadge tone="neutral">{TYPE_LABEL[inquiry.type] ?? inquiry.type}</StatusBadge>
      </div>
      <dl className="space-y-2 rounded-xl border border-line bg-white p-5 text-sm text-ink/80 shadow-sm">
        <div>Email: {inquiry.email}</div>
        <div>Phone: {inquiry.phone || '—'}</div>
        <div>Company: {inquiry.company || '—'}</div>
        <div>Product: {inquiry.product?.name || '—'}</div>
        <div>Received: {inquiry.createdAt.toLocaleString('en-IN')}</div>
      </dl>
      <p className="mt-6 whitespace-pre-wrap rounded-xl border border-line bg-white p-4 text-sm leading-relaxed text-ink/80 shadow-sm">
        {inquiry.message}
      </p>
      <InquiryStatusForm id={inquiry.id} status={displayStatus} />
      <div className="mt-6 flex items-center gap-3">
        <DeleteButton
          action={deleteInquiry}
          id={inquiry.id}
          label="Delete inquiry"
          confirmMessage={`Delete inquiry from “${inquiry.name}”? This cannot be undone.`}
        />
        <span className="text-xs text-muted">Delete inquiry</span>
      </div>
    </div>
  )
}
