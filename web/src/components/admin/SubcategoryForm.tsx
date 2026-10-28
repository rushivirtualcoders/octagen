'use client'

import { useActionState, useState } from 'react'
import type { ActionState } from '@/lib/cms/action-state'
import { slugify } from '@/lib/cms/slug'
import FormBanner from './FormBanner'
import { Check, Field, fieldClass } from './Fields'

export default function SubcategoryForm({
  action,
  categoryId,
  categoryName,
  values,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>
  categoryId: string
  categoryName: string
  values?: {
    id?: string
    name?: string
    slug?: string
    sortOrder?: number
    active?: boolean
  }
}) {
  const [state, formAction, pending] = useActionState(action, null)
  const [slug, setSlug] = useState(values?.slug ?? '')
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={formAction} className="grid gap-4">
      {values?.id ? <input type="hidden" name="id" value={values.id} /> : null}
      <input type="hidden" name="categoryId" value={categoryId} />
      <FormBanner state={state} />
      <p className="text-sm text-muted">
        Parent category: <span className="font-medium text-ink">{categoryName}</span>
      </p>
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
      <Field label="Sort order" error={errors.sortOrder}>
        <input
          className={fieldClass(errors.sortOrder)}
          name="sortOrder"
          type="number"
          min={0}
          defaultValue={values?.sortOrder ?? 0}
        />
      </Field>
      <Check name="active" label="Active" defaultChecked={values?.active ?? true} />
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60"
      >
        {pending ? 'Saving…' : values?.id ? 'Save subcategory' : 'Create subcategory'}
      </button>
    </form>
  )
}
