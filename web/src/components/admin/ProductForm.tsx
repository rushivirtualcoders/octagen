'use client'

import { useActionState, useMemo, useState } from 'react'
import type { Product, ProductCategory, ProductSubcategory } from '@prisma/client'
import { saveProduct } from '@/lib/cms/actions'
import { asLines } from '@/lib/cms/form'
import { slugify } from '@/lib/cms/slug'
import FormBanner from './FormBanner'
import { Check, Field, fieldClass } from './Fields'

export default function ProductForm({
  product,
  categories,
  subcategories = [],
}: {
  product?: Product
  categories: ProductCategory[]
  subcategories?: ProductSubcategory[]
}) {
  const [state, action, pending] = useActionState(saveProduct, null)
  const [slug, setSlug] = useState(product?.slug ?? '')
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? '')
  const [subcategoryId, setSubcategoryId] = useState(product?.subcategoryId ?? '')
  const errors = state?.fieldErrors ?? {}

  const categorySubs = useMemo(
    () =>
      subcategories
        .filter((sub) => sub.categoryId === categoryId && sub.active)
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)),
    [categoryId, subcategories],
  )

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
          <input
            className={fieldClass(errors.articleNumber)}
            name="articleNumber"
            defaultValue={product?.articleNumber}
            required
            minLength={2}
          />
        </Field>
        <Field label="Application" error={errors.application}>
          <select
            className={fieldClass(errors.application)}
            name="application"
            defaultValue={product?.application ?? 'CAR'}
            required
          >
            <option value="CAR">Car</option>
            <option value="BIKE">Bike</option>
            <option value="BOTH">Car + bike</option>
          </select>
        </Field>
        <Field label="Category" error={errors.categoryId}>
          <select
            className={fieldClass(errors.categoryId)}
            name="categoryId"
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value)
              setSubcategoryId('')
            }}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.vehiclePath === 'BIKE' ? 'Bike' : 'Car'})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Subcategory (optional)" error={errors.subcategoryId}>
          <select
            className={fieldClass(errors.subcategoryId)}
            name="subcategoryId"
            value={subcategoryId}
            onChange={(event) => setSubcategoryId(event.target.value)}
            disabled={!categoryId || categorySubs.length === 0}
          >
            <option value="">
              {!categoryId
                ? 'Select a category first'
                : categorySubs.length === 0
                  ? 'No subcategories for this category'
                  : 'None'}
            </option>
            {categorySubs.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Image URL" error={errors.imageUrl}>
          <input className={fieldClass(errors.imageUrl)} name="imageUrl" defaultValue={product?.imageUrl} />
        </Field>
        <Field label="LIQUI MOLY URL" error={errors.liquiMolyUrl}>
          <input
            className={fieldClass(errors.liquiMolyUrl)}
            name="liquiMolyUrl"
            type="url"
            placeholder="https://www.liqui-moly.com/en/in/p/…"
            defaultValue={product?.liquiMolyUrl}
            required
          />
        </Field>
      </div>
      <p className="text-xs text-muted">
        Product clicks open this external URL — no in-site product detail page, prices, or cart.
      </p>
      <Field label="Pack sizes (one per line)" error={errors.packSizes}>
        <textarea
          className={fieldClass(errors.packSizes)}
          name="packSizes"
          rows={3}
          defaultValue={asLines(product?.packSizes)}
        />
      </Field>
      <Field label="Short description" error={errors.shortDescription}>
        <textarea
          className={fieldClass(errors.shortDescription)}
          name="shortDescription"
          rows={2}
          defaultValue={product?.shortDescription}
          maxLength={400}
        />
      </Field>
      <Field label="Description" error={errors.description}>
        <textarea
          className={fieldClass(errors.description)}
          name="description"
          rows={6}
          defaultValue={product?.description}
        />
      </Field>
      <Field label="Benefits (one per line)" error={errors.benefits}>
        <textarea
          className={fieldClass(errors.benefits)}
          name="benefits"
          rows={4}
          defaultValue={asLines(product?.benefits)}
        />
      </Field>
      <Field label="Approvals (one per line)" error={errors.approvals}>
        <textarea
          className={fieldClass(errors.approvals)}
          name="approvals"
          rows={3}
          defaultValue={asLines(product?.approvals)}
        />
      </Field>
      <Field label="Application notes" error={errors.applicationNotes}>
        <textarea
          className={fieldClass(errors.applicationNotes)}
          name="applicationNotes"
          rows={3}
          defaultValue={product?.applicationNotes}
        />
      </Field>
      <div className="flex flex-wrap gap-6">
        <Check name="loved" label="Most loved" defaultChecked={product?.loved} />
        <Check name="featured" label="Featured" defaultChecked={product?.featured} />
        <Check name="published" label="Active" defaultChecked={product?.published} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60"
      >
        {pending ? 'Saving…' : product ? 'Save product' : 'Create product'}
      </button>
    </form>
  )
}
