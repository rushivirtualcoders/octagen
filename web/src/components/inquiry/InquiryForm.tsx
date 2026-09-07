'use client'

import { useState, type FormEvent } from 'react'

export type InquiryFormValues = {
  type?: 'GENERAL' | 'WORKSHOP' | 'BULK' | 'PRODUCT_QUOTE'
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'w-full rounded-[10px] border-0 bg-[#f3f4f6] px-4 py-3.5 text-sm text-ink placeholder:text-muted/80 outline-none transition-shadow focus:ring-2 focus:ring-lm-blue/35'

type Props = {
  defaults?: InquiryFormValues
  onSuccess?: () => void
  submitLabel?: string
  compact?: boolean
}

export default function InquiryForm({
  defaults,
  onSuccess,
  submitLabel = 'Send Message',
  compact = false,
}: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      type: (['GENERAL', 'WORKSHOP', 'BULK', 'PRODUCT_QUOTE'].includes(String(data.get('type')))
        ? String(data.get('type'))
        : 'GENERAL') as NonNullable<InquiryFormValues['type']>,
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      subject: String(data.get('subject') || '').trim(),
      message: String(data.get('message') || '').trim(),
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
      onSuccess?.()
    } catch {
      setStatus('error')
      setError('Could not send your message. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'space-y-2.5' : 'space-y-3'} noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            className={fieldClass}
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            defaultValue={defaults?.name}
            placeholder="Your Name *"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="sr-only">Your email</span>
          <input
            className={fieldClass}
            name="email"
            type="email"
            required
            maxLength={120}
            defaultValue={defaults?.email}
            placeholder="Your Email *"
            autoComplete="email"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Phone number</span>
          <input
            className={fieldClass}
            name="phone"
            type="tel"
            maxLength={40}
            defaultValue={defaults?.phone}
            placeholder="Phone Number"
            autoComplete="tel"
          />
        </label>
        <label className="block">
          <span className="sr-only">Subject</span>
          <input
            className={fieldClass}
            name="subject"
            type="text"
            maxLength={160}
            defaultValue={defaults?.subject}
            placeholder="Your Subject"
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">Inquiry type</span>
        <select
          className={fieldClass}
          name="type"
          defaultValue={defaults?.type || 'GENERAL'}
        >
          <option value="GENERAL">General inquiry</option>
          <option value="PRODUCT_QUOTE">Product quote</option>
          <option value="WORKSHOP">Workshop partnership</option>
          <option value="BULK">Bulk / distributor</option>
        </select>
      </label>

      <label className="block">
        <span className="sr-only">Your message</span>
        <textarea
          className={`${fieldClass} ${compact ? 'min-h-[8rem]' : 'min-h-[10rem]'} resize-y`}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          defaultValue={defaults?.message}
          placeholder="Your message *"
        />
      </label>

      {status === 'success' ? (
        <p className="rounded-[10px] border border-lm-blue/30 bg-lm-blue/5 px-4 py-3 text-sm text-ink">
          Message sent. Your inquiry is in the Octagen inbox — we will respond shortly.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="rounded-[10px] border border-lm-red/30 bg-lm-red/5 px-4 py-3 text-sm text-lm-red">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="site-btn inline-flex items-center gap-2 bg-lm-blue px-7 py-3.5 text-[0.7rem] font-semibold tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span aria-hidden className="text-base leading-none">
          −
        </span>
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
