'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/lib/cms/actions'
import type { SessionUser } from '@/lib/auth'
import { ASSETS } from '@/lib/constants'

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/product-categories', label: 'Product categories' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/article-categories', label: 'Article categories' },
  { href: '/admin/inquiries', label: 'Inquiries' },
  { href: '/admin/settings', label: 'Site CMS' },
]

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function navClass(active: boolean) {
  return active
    ? 'flex items-center justify-between rounded-md bg-lm-red/10 px-3 py-2.5 text-sm font-semibold text-lm-red ring-1 ring-lm-red/25'
    : 'flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-ink/70 transition hover:bg-surface hover:text-ink'
}

function mobileNavClass(active: boolean) {
  return active
    ? 'tech-label shrink-0 rounded-md bg-lm-red/10 px-2.5 py-1.5 text-lm-red ring-1 ring-lm-red/25'
    : 'tech-label shrink-0 rounded-md px-2.5 py-1.5 text-muted'
}

export default function AdminShell({
  user,
  unread,
  children,
}: {
  user: SessionUser
  unread: number
  children: React.ReactNode
}) {
  const pathname = usePathname() ?? '/admin'

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white lg:flex lg:flex-col">
        <div className="h-1 w-full bg-gradient-to-r from-lm-orange via-white to-lm-red" />
        <div className="border-b border-line px-5 py-5">
          <img src={ASSETS.octagenLogo} alt="Octagen" className="h-8 w-auto" />
          <p className="tech-label mt-3 text-lm-red">Octagen CMS</p>
          <p className="font-display mt-1 text-lg font-bold uppercase text-ink">Control room</p>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link key={item.href} href={item.href} className={navClass(active)} aria-current={active ? 'page' : undefined}>
                {item.label}
                {item.href === '/admin/inquiries' && unread > 0 ? (
                  <span className="rounded bg-lm-red px-1.5 py-0.5 text-[10px] font-bold text-white">{unread}</span>
                ) : null}
              </Link>
            )
          })}
        </nav>
        <form action={logoutAction} className="border-t border-line p-4">
          <p className="truncate text-xs text-muted">{user.email}</p>
          <button type="submit" className="tech-label mt-3 text-lm-orange hover:text-ink">
            Sign out
          </button>
        </form>
      </aside>
      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
          <p className="font-display font-bold uppercase text-ink">Octagen CMS</p>
          <form action={logoutAction}>
            <button type="submit" className="tech-label text-lm-orange">
              Sign out
            </button>
          </form>
        </header>
        <div className="flex gap-2 overflow-x-auto border-b border-line bg-white px-4 py-2 lg:hidden">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={mobileNavClass(active)}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
        <main className="px-4 py-6 text-ink lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
