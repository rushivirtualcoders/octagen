import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/admin/PageHeader'
import SettingsForm from '@/components/admin/SettingsForm'

type Block = { title?: string; body?: string }
type Home = { heroEyebrow?: string; heroTitle?: string; heroBody?: string; bannerNote?: string }
type Contact = { address?: string; email?: string; phone?: string; mapUrl?: string }

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: 'site' } })
  const home = (settings?.homepage ?? {}) as Home
  const liquiMoly = (settings?.aboutLiquiMoly ?? {}) as Block
  const octagen = (settings?.aboutOctagen ?? {}) as Block
  const contact = (settings?.contact ?? {}) as Contact

  return (
    <div>
      <PageHeader eyebrow="Globals" title="Site CMS" />
      <SettingsForm home={home} liquiMoly={liquiMoly} octagen={octagen} contact={contact} />
    </div>
  )
}
