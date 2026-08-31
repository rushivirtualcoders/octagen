'use client'

import { useActionState, useState } from 'react'
import type { ActionState } from '@/lib/cms/action-state'
import { slugify } from '@/lib/cms/slug'
import FormBanner from './FormBanner'
import { Field, fieldClass } from './Fields'

export default function CategoryForm({
  action,
  values,
  withDescription = false,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>
  values?: { id?: string; name?: string; slug?: string; description?: string; sortOrder?: number }
  withDescription?: boolean
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const [slug, setSlug] = useState(values?.slug ?? '')
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={formAction} className="grid max-w-xl gap-4">
      {values?.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <FormBanner state={state} />
      <Field label="Name" error={errors.name}>
        <input
          className={fieldClass(errors.name)}
          name="name"
          defaultValue={values?.name}
          required
          minLength={2}
          onBlur={(event) => {
            if (!slug) setSlug(slugify(event.target.value))
          }}
        />
      </Field>
      <Field label="Slug" error={errors.slug}>
        <input
          className={fieldClass(errors.slug)}
          name="slug"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          required
          minLength={2}
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
        />
      </Field>
      {withDescription ? (
        <Field label="Description" error={errors.description}>
          <textarea className={fieldClass(errors.description)} name="description" rows={3} defaultValue={values?.description} maxLength={400} />
        </Field>
      ) : null}
      {withDescription ? (
        <Field label="Sort order" error={errors.sortOrder}>
          <input className={fieldClass(errors.sortOrder)} name="sortOrder" type="number" min={0} defaultValue={values?.sortOrder ?? 0} />
        </Field>
      ) : null}
      <button type="submit" disabled={pending} className="w-fit rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60">
        {pending ? 'Saving…' : values?.id ? 'Save category' : 'Create category'}
      </button>
    </form>
  )
}
