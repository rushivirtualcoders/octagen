'use client'

import { useActionState, useState } from 'react'
import type { Article, ArticleCategory } from '@prisma/client'
import { saveArticle } from '@/lib/cms/actions'
import { asLines } from '@/lib/cms/form'
import { slugify } from '@/lib/cms/slug'
import FormBanner from './FormBanner'
import { Check, Field, fieldClass } from './Fields'

export default function ArticleForm({
  article,
  categories,
}: {
  article?: Article
  categories: ArticleCategory[]
}) {
  const [state, action, pending] = useActionState(saveArticle, null)
  const [slug, setSlug] = useState(article?.slug ?? '')
  const errors = state?.fieldErrors ?? {}

  return (
    <form action={action} className="grid gap-4">
      {article ? <input type="hidden" name="id" value={article.id} /> : null}
      <FormBanner state={state} />
      <Field label="Title" error={errors.title}>
        <input
          className={fieldClass(errors.title)}
          name="title"
          defaultValue={article?.title}
          required
          minLength={2}
          onBlur={(event) => {
            if (!slug) setSlug(slugify(event.target.value))
          }}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
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
        <Field label="Author" error={errors.author}>
          <input className={fieldClass(errors.author)} name="author" defaultValue={article?.author ?? 'Octagen'} />
        </Field>
      </div>
      <Field label="Category" error={errors.categoryId}>
        <select className={fieldClass(errors.categoryId)} name="categoryId" defaultValue={article?.categoryId} required>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Cover image URL" error={errors.coverImageUrl}>
        <input className={fieldClass(errors.coverImageUrl)} name="coverImageUrl" defaultValue={article?.coverImageUrl} />
      </Field>
      <Field label="Excerpt" error={errors.excerpt}>
        <textarea className={fieldClass(errors.excerpt)} name="excerpt" rows={2} defaultValue={article?.excerpt} maxLength={400} />
      </Field>
      <Field label="Body" error={errors.body}>
        <textarea className={fieldClass(errors.body)} name="body" rows={12} defaultValue={article?.body} />
      </Field>
      <Field label="Related product IDs (one per line)" error={errors.relatedProductIds}>
        <textarea className={fieldClass(errors.relatedProductIds)} name="relatedProductIds" rows={3} defaultValue={asLines(article?.relatedProductIds)} />
      </Field>
      <Check name="published" label="Active" defaultChecked={article?.published} />
      <button type="submit" disabled={pending} className="w-fit rounded-md bg-lm-red px-6 py-3 text-sm font-bold uppercase text-white disabled:opacity-60">
        {pending ? 'Saving…' : article ? 'Save article' : 'Create article'}
      </button>
    </form>
  )
}
