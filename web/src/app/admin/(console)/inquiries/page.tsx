import { prisma } from '@/lib/db'
import InquiriesAdminPanel from '@/components/admin/InquiriesAdminPanel'

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    include: { product: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return <InquiriesAdminPanel inquiries={inquiries} />
}
