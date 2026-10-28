'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const INQUIRY_TYPES = [
  { value: 'GENERAL', label: 'General Inquiry' },
  { value: 'PRODUCT_QUOTE', label: 'Product Inquiry' },
  { value: 'WORKSHOP', label: 'Workshop Partnership' },
  { value: 'BULK', label: 'Bulk / Distributor' },
] as const

const labelClass = 'mb-1.5 block text-sm font-medium text-ink'
const inputClass =
  'w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-lm-red focus:ring-2 focus:ring-lm-red/20'

export default function ContactEnquiryForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot — bots fill "website"
    if (String(data.get('website') || '').trim()) {
      setStatus('success')
      form.reset()
      return
    }

    const country = String(data.get('country') || '').trim()
    const product = String(data.get('product') || '').trim()
    const messageBody = String(data.get('message') || '').trim()
    const extras = [
      country ? `Country: ${country}` : '',
      product ? `Product of interest: ${product}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const payload = {
      type: (['GENERAL', 'WORKSHOP', 'BULK', 'PRODUCT_QUOTE'].includes(String(data.get('type')))
        ? String(data.get('type'))
        : 'GENERAL') as 'GENERAL' | 'WORKSHOP' | 'BULK' | 'PRODUCT_QUOTE',
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      company: String(data.get('company') || '').trim(),
      subject: product || 'Contact page inquiry',
      message: extras ? `${extras}\n\n${messageBody}` : messageBody,
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setStatus('error')
        setError(json.error || 'Could not send your message. Please try again.')
        return
      }

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Could not send your message. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>
            Name <span className="text-lm-red">*</span>
          </span>
          <input className={inputClass} name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" />
        </label>
        <label className="block">
          <span className={labelClass}>Company</span>
          <input className={inputClass} name="company" type="text" maxLength={120} autoComplete="organization" />
        </label>
        <label className="block">
          <span className={labelClass}>
            Email <span className="text-lm-red">*</span>
          </span>
          <input className={inputClass} name="email" type="email" required maxLength={120} autoComplete="email" />
        </label>
        <label className="block">
          <span className={labelClass}>Phone</span>
          <input className={inputClass} name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
        <label className="block">
          <span className={labelClass}>
            Country <span className="text-lm-red">*</span>
          </span>
          <input className={inputClass} name="country" type="text" required maxLength={80} defaultValue="India" autoComplete="country-name" />
        </label>
        <label className="block">
          <span className={labelClass}>Inquiry Type</span>
          <select className={inputClass} name="type" defaultValue="GENERAL">
            {INQUIRY_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Product of interest</span>
        <input
          className={inputClass}
          name="product"
          type="text"
          maxLength={160}
          placeholder="e.g. Top Tec 4200, Cera Tec, motorcycle oil…"
        />
      </label>

      <label className="block">
        <span className={labelClass}>
          Message <span className="text-lm-red">*</span>
        </span>
        <textarea
          className={`${inputClass} min-h-[8rem] resize-y`}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          placeholder="Share vehicle details, viscosity grade, quantity or partnership needs…"
        />
      </label>

      {/* Honeypot — visually hidden */}
      <label className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        Website URL
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {status === 'success' ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Message sent. Your inquiry is in the Octagen inbox — we will respond shortly.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="rounded-lg border border-lm-red/30 bg-lm-red/5 px-4 py-3 text-sm text-lm-red">{error}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 rounded-lg bg-lm-red px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c96a0e] disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Enquiry →'}
        </button>
        <p className="text-xs text-muted">Typical response within one business day.</p>
      </div>
    </form>
  )
}
