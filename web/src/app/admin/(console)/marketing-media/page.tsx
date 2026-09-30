import { prisma } from '@/lib/db'
import MarketingMediaAdminPanel from '@/components/admin/MarketingMediaAdminPanel'

export default async function MarketingMediaPage() {
  const media = await prisma.marketingMedia.findMany({
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
  })

  return <MarketingMediaAdminPanel media={media} />
}
