'use client'

import { useEffect } from 'react'
import type { CatalogueProduct } from '@/lib/catalogue'
import { sheetForProduct } from '@/lib/product-sheets'

export default function ProductDetails({
  product,
  onClose,
}: {
  product: CatalogueProduct
  onClose: () => void
}) {
  const sheet = sheetForProduct(product)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6">
      <button type="button" aria-label="Close product details" className="absolute inset-0" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
        data-lenis-prevent
        className="relative max-h-[min(92vh,52rem)] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-2xl border border-line bg-white p-5 sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="tech-label text-lm-red">Product information</p>
          <button type="button" onClick={onClose} className="text-sm font-semibold text-ink">
            Close
          </button>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-[180px_minmax(0,1fr)]">
          <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-surface">
            <img src={product.image} alt="" className="max-h-[80%] max-w-[70%] object-contain" />
          </div>
          <div>
            <p className="text-xs text-muted">{product.subcategoryName}</p>
            <h2 id="product-details-title" className="mt-1 text-2xl font-semibold tracking-tight text-ink">
              {product.name}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Article {product.articleId} · {product.packSize}
            </p>
            {sheet ? (
              <a
                href={sheet.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-full bg-lm-red px-4 py-2 text-sm font-semibold text-white hover:bg-[#c96a0e]"
              >
                Open product information
              </a>
            ) : null}
          </div>
        </div>

        {sheet ? (
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink">
            <section>
              <h3 className="text-sm font-semibold">Description</h3>
              <p className="mt-1 text-muted">{sheet.description}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold">Properties</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {sheet.properties.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="text-sm font-semibold">Specifications and approvals</h3>
              <p className="mt-1 text-muted">{sheet.approvals.join(' · ')}</p>
              <p className="mt-2 text-xs text-muted">
                LIQUI MOLY recommends this product where these specifications or original part numbers are required:
              </p>
              <p className="mt-1 text-muted">{sheet.recommendations.join(' · ')}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold">Technical data</h3>
              <div className="mt-2 overflow-hidden rounded-xl border border-line">
                <table className="w-full text-left text-xs">
                  <tbody>
                    {sheet.technicalData.map((row) => (
                      <tr key={row.label} className="border-t border-line first:border-t-0">
                        <th className="px-3 py-2 font-medium text-ink">{row.label}</th>
                        <td className="px-3 py-2 text-muted">{row.value}</td>
                        <td className="px-3 py-2 text-muted">{row.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h3 className="text-sm font-semibold">Areas of application</h3>
              <p className="mt-1 text-muted">{sheet.areasOfApplication}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold">Application</h3>
              <p className="mt-1 text-muted">{sheet.application}</p>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  )
}
