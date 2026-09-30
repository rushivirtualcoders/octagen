'use client'

import { useActionState } from 'react'
import type { MarketingActivity } from '@prisma/client'
import { saveMarketingActivity } from '@/lib/cms/actions'
import FormBanner from './FormBanner'
import { Check, Field, fieldClass } from './Fields'

export default function MarketingActivityForm({ activity }: { activity?: MarketingActivity }) {
  const [state, action, pending] = useActionState(saveMarketingActivity, null)
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={action} className="grid gap-4">
      {activity ? <input type="hidden" name="id" value={activity.id} /> : null}
      <FormBanner state={state} />
      <Field label="Title" error={errors.title}>
        <input
          className={fieldClass(errors.title)}
          name="title"
          defaultValue={activity?.title}
          required
          minLength={2}
          maxLength={120}
        />
      </Field>
      <Field label="Text" error={errors.text}>
        <textarea
          className={fieldClass(errors.text)}
          name="text"
          rows={4}
          defaultValue={activity?.text}
          maxLength={800}
        />
      </Field>
      <Field label="Image URL" error={errors.imageUrl}>
        <input className={fieldClass(errors.imageUrl)} name="imageUrl" defaultValue={activity?.imageUrl} />
      </Field>
      <Field label="Link URL" error={errors.href}>
        <input
          className={fieldClass(errors.href)}
          name="href"
          placeholder="https://www.liqui-moly.com/…"
          defaultValue={activity?.href}
        />
      </Field>
      <Field label="Sort order" error={errors.sortOrder}>
        <input
          className={fieldClass(errors.sortOrder)}
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={activity?.sortOrder ?? 0}
        />
      </Field>
      <Check name="published" label="Published" defaultChecked={activity?.published ?? true} />
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60"
      >
        {pending ? 'Saving…' : activity ? 'Save activity' : 'Create activity'}
      </button>
    </form>
  )
}
