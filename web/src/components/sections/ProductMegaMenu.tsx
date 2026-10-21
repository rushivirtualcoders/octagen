'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { VehiclePath } from '@/lib/catalogue'

export type NavSubcategory = { slug: string; name: string; count: number }

export type NavCategory = {
  slug: string
  name: string
  path: VehiclePath
  count?: number
  subcategories?: NavSubcategory[]
}

type MenuProps = {
  path: VehiclePath
  categories: NavCategory[]
  activeSlug: string | null
  onNavigate: () => void
  onPick: (path: VehiclePath) => void
  onSelect: (slug: string) => void
}

function vehicleTotal(categories: NavCategory[], key: VehiclePath) {
  return categories
    .filter((category) => category.path === key)
    .reduce((sum, category) => sum + (category.count ?? 0), 0)
}

const MENU_CSS = `
  .pm {
    --ink: #0b1215;
    --muted: #6b7280;
    --soft: #9aa3ad;
    --line: #e8edf2;
    --orange: #e97e11;
    --orange-soft: #fff6eb;
    display: grid;
    gap: 18px;
  }
  .pm-label {
    margin: 0 0 12px;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--soft);
  }
  .pm-vehicles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .pm-vehicle {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--line);
    background: #fff;
    color: var(--ink);
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
  }
  .pm-vehicle:hover { border-color: #d7dde5; }
  .pm-vehicle:focus-visible {
    outline: 2px solid var(--orange);
    outline-offset: 2px;
  }
  .pm-vehicle-on {
    border-color: var(--orange);
    background: var(--orange-soft);
    box-shadow: inset 3px 0 0 var(--orange);
  }
  .pm-vehicle-name {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
  }
  .pm-vehicle-on .pm-vehicle-name { color: var(--orange); }
  .pm-vehicle-count {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--soft);
    font-variant-numeric: tabular-nums;
  }
  .pm-vehicle-on .pm-vehicle-count { color: var(--orange); }
  .pm-all {
    display: inline-block;
    margin-top: 10px;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--orange);
    text-decoration: none;
  }
  .pm-all:hover { color: #c96a0e; }
  .pm-scroll {
    max-height: min(26rem, 62vh);
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    list-style: none;
    margin: 0;
    padding: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .pm-scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
  .pm-row { display: flex; align-items: stretch; min-width: 0; }
  .pm-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
    border: 0;
    border-radius: 2px;
    background: transparent;
    font-size: 0.875rem;
    line-height: 1.35;
    color: var(--ink);
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.12s ease, color 0.12s ease;
  }
  .pm-link:hover {
    color: var(--orange);
    background: #f7f9fb;
  }
  .pm-link:focus-visible {
    outline: 2px solid var(--orange);
    outline-offset: 1px;
  }
  .pm-link-on {
    color: var(--orange);
    font-weight: 600;
    background: var(--orange-soft);
  }
  .pm-link-on:hover { background: var(--orange-soft); }
  .pm-count {
    flex-shrink: 0;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--soft);
    font-variant-numeric: tabular-nums;
  }
  .pm-link-on .pm-count { color: var(--orange); }
  .pm-chevron {
    flex-shrink: 0;
    width: 10px;
    height: 10px;
    opacity: 0;
    color: var(--orange);
  }
  .pm-link-on .pm-chevron { opacity: 1; }
  .pm-toggle {
    width: 36px;
    height: 36px;
    border: 0;
    background: transparent;
    font-size: 1.15rem;
    line-height: 1;
    color: var(--ink);
    cursor: pointer;
  }
  .pm-mobile-subs {
    list-style: none;
    margin: 0 0 6px;
    padding: 2px 0 6px 12px;
    border-left: 2px solid var(--orange);
  }
  .pm-mobile-subs a {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 7px 0;
    font-size: 0.84rem;
    color: #4b5563;
    text-decoration: none;
  }
  .pm-mobile-subs a:hover { color: var(--orange); }
  .pm-subs { display: none; }
  .pm-sub-head {
    margin: 0 0 12px;
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--ink);
  }
  .pm-empty {
    margin: 0 0 14px;
    font-size: 0.84rem;
    line-height: 1.5;
    color: var(--muted);
  }
  .pm-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--orange);
    text-decoration: none;
  }
  .pm-cta:hover { color: #c96a0e; }
  @media (min-width: 64rem) {
    .pm {
      grid-template-columns: 168px minmax(0, 1.05fr) minmax(0, 0.95fr);
      gap: 0;
      align-items: start;
    }
    .pm-vehicles {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-right: 24px;
      border-right: 1px solid var(--line);
    }
    .pm-cats {
      min-width: 0;
      overflow: hidden;
      padding: 0 28px;
      border-right: 1px solid var(--line);
    }
    .pm-subs {
      display: block;
      min-width: 0;
      overflow: hidden;
      padding-left: 28px;
    }
    .pm-toggle,
    .pm-mobile-subs { display: none !important; }
  }
`

function Chevron() {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className="pm-chevron">
      <path d="M3 1.5 7 5 3 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function ProductMegaMenu({
  path,
  categories,
  activeSlug,
  onNavigate,
  onPick,
  onSelect,
}: MenuProps) {
  const items = categories.filter((category) => category.path === path)
  const label = path === 'car' ? 'Car' : 'Bike'
  const [focus, setFocus] = useState<string | null>(activeSlug ?? items[0]?.slug ?? null)
  const focused = items.find((category) => category.slug === focus) ?? null
  const subs = focused?.subcategories ?? []

  useEffect(() => {
    const next = categories.filter((category) => category.path === path)
    setFocus(
      activeSlug && next.some((category) => category.slug === activeSlug)
        ? activeSlug
        : next[0]?.slug ?? null,
    )
  }, [activeSlug, categories, path])

  return (
    <div className="pm">
      <style>{MENU_CSS}</style>

      <div className="pm-vehicles">
        <p className="pm-label">Vehicle</p>
        {(['car', 'bike'] as VehiclePath[]).map((key) => {
          const active = path === key
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => onPick(key)}
              className={`pm-vehicle ${active ? 'pm-vehicle-on' : ''}`}
            >
              <span className="pm-vehicle-name">{key === 'car' ? 'Car' : 'Bike'}</span>
              <span className="pm-vehicle-count">{vehicleTotal(categories, key)} products</span>
            </button>
          )
        })}
        <Link href={`/products/${path}`} onClick={onNavigate} className="pm-all">
          All {label.toLowerCase()} products
        </Link>
      </div>

      <div className="pm-cats">
        <p className="pm-label">Category</p>
        <ul data-lenis-prevent className="pm-scroll">
          {items.map((category) => {
            const open = focused?.slug === category.slug
            const nested = category.subcategories ?? []
            return (
              <li key={category.slug} onMouseEnter={() => setFocus(category.slug)}>
                <div className="pm-row">
                  <Link
                    href={`/products/${path}?category=${category.slug}`}
                    onClick={() => {
                      onSelect(category.slug)
                      onNavigate()
                    }}
                    aria-current={activeSlug === category.slug ? 'page' : undefined}
                    className={`pm-link ${open ? 'pm-link-on' : ''}`}
                  >
                    <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {category.name}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      {typeof category.count === 'number' ? (
                        <span className="pm-count">{category.count}</span>
                      ) : null}
                      {nested.length > 0 ? <Chevron /> : null}
                    </span>
                  </Link>
                  {nested.length > 0 ? (
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={`${open ? 'Hide' : 'Show'} ${category.name} subcategories`}
                      onClick={() => setFocus(open ? null : category.slug)}
                      className="pm-toggle"
                    >
                      {open ? '−' : '+'}
                    </button>
                  ) : null}
                </div>
                {open && nested.length > 0 ? (
                  <ul className="pm-mobile-subs">
                    {nested.map((subcategory) => (
                      <li key={subcategory.slug}>
                        <Link
                          href={`/products/${path}?category=${category.slug}&subcategory=${subcategory.slug}`}
                          onClick={() => {
                            onSelect(category.slug)
                            onNavigate()
                          }}
                        >
                          <span>{subcategory.name}</span>
                          <span className="pm-count">{subcategory.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </div>

      <div className="pm-subs">
        <p className="pm-label">Subcategory</p>
        {focused ? <p className="pm-sub-head">{focused.name}</p> : null}

        {subs.length > 0 ? (
          <ul data-lenis-prevent className="pm-scroll">
            {subs.map((subcategory) => (
              <li key={subcategory.slug}>
                <Link
                  href={`/products/${path}?category=${focused?.slug}&subcategory=${subcategory.slug}`}
                  onClick={() => {
                    if (focused) onSelect(focused.slug)
                    onNavigate()
                  }}
                  className="pm-link"
                >
                  <span>{subcategory.name}</span>
                  <span className="pm-count">{subcategory.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : focused ? (
          <>
            <p className="pm-empty">This category has no product lines. Open it to browse all products.</p>
            <Link
              href={`/products/${path}?category=${focused.slug}`}
              onClick={() => {
                onSelect(focused.slug)
                onNavigate()
              }}
              className="pm-cta"
            >
              View {focused.count ?? ''} {focused.name} →
            </Link>
          </>
        ) : (
          <p className="pm-empty">Choose a category to see subcategories.</p>
        )}
      </div>
    </div>
  )
}
