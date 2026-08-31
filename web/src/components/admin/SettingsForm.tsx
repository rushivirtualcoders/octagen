'use client'

import { useActionState } from 'react'
import { saveSiteSettings } from '@/lib/cms/actions'
import FormBanner from './FormBanner'
import { Field, fieldClass } from './Fields'

type Block = { title?: string; body?: string }
type Home = { heroEyebrow?: string; heroTitle?: string; heroBody?: string; bannerNote?: string }
type Contact = { address?: string; email?: string; phone?: string; mapUrl?: string }

export default function SettingsForm({
  home,
  liquiMoly,
  octagen,
  contact,
}: {
  home: Home
  liquiMoly: Block
  octagen: Block
  contact: Contact
}) {
  const [state, action, pending] = useActionState(saveSiteSettings, null)
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={action} className="max-w-3xl space-y-8">
      <FormBanner state={state} />
      <section className="grid gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold uppercase">Homepage</h2>
        <Field label="Eyebrow" error={errors['homepage.heroEyebrow']}>
          <input className={fieldClass(errors['homepage.heroEyebrow'])} name="heroEyebrow" defaultValue={home.heroEyebrow} required />
        </Field>
        <Field label="Title" error={errors['homepage.heroTitle']}>
          <input className={fieldClass(errors['homepage.heroTitle'])} name="heroTitle" defaultValue={home.heroTitle} required />
        </Field>
        <Field label="Body" error={errors['homepage.heroBody']}>
          <textarea className={fieldClass(errors['homepage.heroBody'])} name="heroBody" rows={3} defaultValue={home.heroBody} required />
        </Field>
        <Field label="Banner note" error={errors['homepage.bannerNote']}>
          <input className={fieldClass(errors['homepage.bannerNote'])} name="bannerNote" defaultValue={home.bannerNote} />
        </Field>
      </section>
      <section className="grid gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold uppercase">About LIQUI MOLY</h2>
        <Field label="Title" error={errors['aboutLiquiMoly.title']}>
          <input className={fieldClass(errors['aboutLiquiMoly.title'])} name="lmTitle" defaultValue={liquiMoly.title} required />
        </Field>
        <Field label="Body" error={errors['aboutLiquiMoly.body']}>
          <textarea className={fieldClass(errors['aboutLiquiMoly.body'])} name="lmBody" rows={5} defaultValue={liquiMoly.body} required />
        </Field>
      </section>
      <section className="grid gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold uppercase">About Octagen</h2>
        <Field label="Title" error={errors['aboutOctagen.title']}>
          <input className={fieldClass(errors['aboutOctagen.title'])} name="octTitle" defaultValue={octagen.title} required />
        </Field>
        <Field label="Body" error={errors['aboutOctagen.body']}>
          <textarea className={fieldClass(errors['aboutOctagen.body'])} name="octBody" rows={5} defaultValue={octagen.body} required />
        </Field>
      </section>
      <section className="grid gap-4 rounded-xl border border-line bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg font-bold uppercase">Contact</h2>
        <Field label="Address" error={errors['contact.address']}>
          <input className={fieldClass(errors['contact.address'])} name="address" defaultValue={contact.address} required />
        </Field>
        <Field label="Email" error={errors['contact.email']}>
          <input className={fieldClass(errors['contact.email'])} name="email" type="email" defaultValue={contact.email} required />
        </Field>
        <Field label="Phone" error={errors['contact.phone']}>
          <input className={fieldClass(errors['contact.phone'])} name="phone" defaultValue={contact.phone} />
        </Field>
        <Field label="Map URL" error={errors['contact.mapUrl']}>
          <input className={fieldClass(errors['contact.mapUrl'])} name="mapUrl" defaultValue={contact.mapUrl} />
        </Field>
      </section>
      <button type="submit" disabled={pending} className="rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60">
        {pending ? 'Saving…' : 'Save settings'}
      </button>
    </form>
  )
}
