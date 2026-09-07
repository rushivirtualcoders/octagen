'use client'

import { useActionState, useState } from 'react'
import type { Product, ProductCategory } from '@prisma/client'
import { saveProduct } from '@/lib/cms/actions'
import { asLines } from '@/lib/cms/form'
import { slugify } from '@/lib/cms/slug'
import FormBanner from './FormBanner'
import { Check, Field, fieldClass } from './Fields'

export default function ProductForm({
  product,
  categories,
}: {
  product?: Product
  categories: ProductCategory[]
}) {
  const [state, action, pending] = useActionState(saveProduct, null)
  const [slug, setSlug] = useState(product?.slug ?? '')
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={action} className="grid gap-4">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <FormBanner state={state} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            className={fieldClass(errors.name)}
            name="name"
            defaultValue={product?.name}
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
            title="lowercase letters, numbers and hyphens"
          />
        </Field>
        <Field label="Article number" error={errors.articleNumber}>
          <input className={fieldClass(errors.articleNumber)} name="articleNumber" defaultValue={product?.articleNumber} required minLength={2} />
        </Field>
        <Field label="Application" error={errors.application}>
          <select className={fieldClass(errors.application)} name="application" defaultValue={product?.application ?? 'CAR'} required>
            <option value="CAR">Car</option>
            <option value="BIKE">Bike</option>
            <option value="BOTH">Car + bike</option>
          </select>
        </Field>
        <Field label="Category" error={errors.categoryId}>
          <select className={fieldClass(errors.categoryId)} name="categoryId" defaultValue={product?.categoryId} required>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Image URL" error={errors.imageUrl}>
          <input className={fieldClass(errors.imageUrl)} name="imageUrl" defaultValue={product?.imageUrl} />
        </Field>
      </div>
      <Field label="Pack sizes (one per line)" error={errors.packSizes}>
        <textarea className={fieldClass(errors.packSizes)} name="packSizes" rows={3} defaultValue={asLines(product?.packSizes)} />
      </Field>
      <Field label="Short description" error={errors.shortDescription}>
        <textarea className={fieldClass(errors.shortDescription)} name="shortDescription" rows={2} defaultValue={product?.shortDescription} maxLength={400} />
      </Field>
      <Field label="Description" error={errors.description}>
        <textarea className={fieldClass(errors.description)} name="description" rows={6} defaultValue={product?.description} />
      </Field>
      <Field label="Benefits (one per line)" error={errors.benefits}>
        <textarea className={fieldClass(errors.benefits)} name="benefits" rows={4} defaultValue={asLines(product?.benefits)} />
      </Field>
      <Field label="Approvals (one per line)" error={errors.approvals}>
        <textarea className={fieldClass(errors.approvals)} name="approvals" rows={3} defaultValue={asLines(product?.approvals)} />
      </Field>
      <Field label="Application notes" error={errors.applicationNotes}>
        <textarea className={fieldClass(errors.applicationNotes)} name="applicationNotes" rows={3} defaultValue={product?.applicationNotes} />
      </Field>
      <div className="flex gap-6">
        <Check name="featured" label="Featured" defaultChecked={product?.featured} />
        <Check name="published" label="Active" defaultChecked={product?.published} />
      </div>
      <button type="submit" disabled={pending} className="w-fit rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60">
        {pending ? 'Saving…' : product ? 'Save product' : 'Create product'}
      </button>
    </form>
  )
}
