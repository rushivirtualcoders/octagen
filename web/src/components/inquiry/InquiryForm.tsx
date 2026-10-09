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
  'w-full rounded-[10px] border-0 bg-[#f3f4f6] text-sm text-ink placeholder:text-muted/80 outline-none transition-shadow focus:ring-2 focus:ring-lm-blue/35'

const INQUIRY_TYPES: { value: NonNullable<InquiryFormValues['type']>; label: string }[] = [
  { value: 'GENERAL', label: 'General inquiry' },
  { value: 'WORKSHOP', label: 'Workshop partnership' },
  { value: 'BULK', label: 'Bulk distributor application' },
  { value: 'PRODUCT_QUOTE', label: 'Product quote' },
]

type Props = {
  defaults?: InquiryFormValues
  onSuccess?: () => void
  submitLabel?: string
  compact?: boolean
  submitClassName?: string
  showTypeChoices?: boolean
}

export default function InquiryForm({
  defaults,
  onSuccess,
  submitLabel = 'Send Message',
  compact = false,
  submitClassName = 'bg-lm-blue hover:opacity-90',
  showTypeChoices = false,
}: Props) {
  const inputClass = `${fieldClass} ${compact ? 'px-3 py-2.5' : 'px-4 py-3.5'}`
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
    <form onSubmit={onSubmit} className={compact ? 'space-y-2' : 'space-y-3'} noValidate>
      <div className={`grid sm:grid-cols-2 ${compact ? 'gap-2' : 'gap-3'}`}>
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            className={inputClass}
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
            className={inputClass}
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

      <div className={`grid sm:grid-cols-2 ${compact ? 'gap-2' : 'gap-3'}`}>
        <label className="block">
          <span className="sr-only">Phone number</span>
          <input
            className={inputClass}
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
            className={inputClass}
            name="subject"
            type="text"
            maxLength={160}
            defaultValue={defaults?.subject}
            placeholder="Your Subject"
          />
        </label>
      </div>

      {showTypeChoices ? (
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Inquiry type</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {INQUIRY_TYPES.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-sm text-ink has-[:checked]:border-ink has-[:checked]:bg-surface"
              >
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  defaultChecked={(defaults?.type || 'GENERAL') === option.value}
                  className="accent-[#e97e11]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <label className="block">
          <span className="sr-only">Inquiry type</span>
          <select className={inputClass} name="type" defaultValue={defaults?.type || 'GENERAL'}>
            {INQUIRY_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="sr-only">Your message</span>
        <textarea
          className={`${inputClass} ${compact ? 'min-h-[4.5rem]' : 'min-h-[10rem]'} resize-y`}
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
        className={`site-btn inline-flex items-center gap-2 font-semibold tracking-[0.2em] text-white uppercase transition-opacity disabled:cursor-not-allowed disabled:opacity-60 ${compact ? 'px-5 py-2.5 text-[0.65rem]' : 'px-7 py-3.5 text-[0.7rem]'} ${submitClassName}`}
      >
        <span aria-hidden className="text-base leading-none">
          −
        </span>
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
