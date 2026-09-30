import { prisma } from '@/lib/db'
import MarketingActivitiesAdminPanel from '@/components/admin/MarketingActivitiesAdminPanel'

export default async function MarketingActivitiesPage() {
  const activities = await prisma.marketingActivity.findMany({
    orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
  })

  return <MarketingActivitiesAdminPanel activities={activities} />
}
