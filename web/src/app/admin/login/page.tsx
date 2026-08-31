import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import LoginForm from '@/components/admin/LoginForm'
import { ASSETS } from '@/lib/constants'

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session) redirect('/admin')

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f7fb] px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-[28rem] rounded-full bg-lm-orange/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 size-[24rem] rounded-full bg-lm-red/10 blur-3xl"
      />

      <div className="relative w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-[0_24px_80px_rgba(11,18,21,0.08)]">
        <div className="mb-6 flex items-center gap-3">
          <img src={ASSETS.octagenLogo} alt="Octagen" className="h-9 w-auto" />
          <span className="h-8 w-px bg-line" />
          <p className="tech-label text-lm-red">Staff CMS</p>
        </div>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink">Octagen CMS</h1>
        <p className="mt-2 mb-7 text-sm leading-relaxed text-muted">
          Sign in to manage the LIQUI MOLY catalogue, articles and inquiries.
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
