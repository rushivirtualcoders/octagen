'use client'

import { useActionState } from 'react'
import type { MarketingMedia } from '@prisma/client'
import { saveMarketingMedia } from '@/lib/cms/actions'
import FormBanner from './FormBanner'
import { Check, Field, fieldClass } from './Fields'

export default function MarketingMediaForm({ media }: { media?: MarketingMedia }) {
  const [state, action, pending] = useActionState(saveMarketingMedia, null)
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={action} className="grid gap-4">
      {media ? <input type="hidden" name="id" value={media.id} /> : null}
      <FormBanner state={state} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Type" error={errors.type}>
          <select className={fieldClass(errors.type)} name="type" defaultValue={media?.type ?? 'IMAGE'} required>
            <option value="IMAGE">Image</option>
            <option value="VIDEO">Video</option>
          </select>
        </Field>
        <Field label="Sort order" error={errors.sortOrder}>
          <input
            className={fieldClass(errors.sortOrder)}
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={media?.sortOrder ?? 0}
          />
        </Field>
      </div>
      <Field label="Title" error={errors.title}>
        <input
          className={fieldClass(errors.title)}
          name="title"
          defaultValue={media?.title}
          required
          minLength={2}
          maxLength={120}
        />
      </Field>
      <Field label="Source URL / path" error={errors.src}>
        <input
          className={fieldClass(errors.src)}
          name="src"
          defaultValue={media?.src}
          required
          placeholder="/assets/images/… or https://www.youtube.com/embed/…"
        />
      </Field>
      <Field label="Video poster (optional)" error={errors.poster}>
        <input className={fieldClass(errors.poster)} name="poster" defaultValue={media?.poster} />
      </Field>
      <Field label="Caption" error={errors.caption}>
        <textarea
          className={fieldClass(errors.caption)}
          name="caption"
          rows={2}
          defaultValue={media?.caption}
          maxLength={400}
        />
      </Field>
      <Check name="published" label="Published" defaultChecked={media?.published ?? true} />
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60"
      >
        {pending ? 'Saving…' : media ? 'Save media' : 'Create media'}
      </button>
    </form>
  )
}
