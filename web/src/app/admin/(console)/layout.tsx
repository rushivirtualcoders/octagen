import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import AdminShell from '@/components/admin/AdminShell'

export default async function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  const unread = await prisma.inquiry.count({ where: { status: 'NEW' } })

  return (
    <AdminShell user={session} unread={unread}>
      {children}
    </AdminShell>
  )
}
