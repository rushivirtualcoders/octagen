'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { headers } from 'next/headers'
import { prisma } from '../db'
import { createSession, destroySession, findStaffByEmail, requireAdmin } from '../auth'
import { rateLimit } from '../rate-limit'
import { writeAudit } from './audit'
import { checked, text } from './form'
import { assertArticleCategoryDeletable, assertProductCategoryDeletable, requireId } from './guards'
import { fromUnknown, fromZod, toastPath, type ActionState } from './action-state'
import {
  articleCategorySchema,
  articleSchema,
  categorySchema,
  inquiryStatusSchema,
  loginSchema,
  productSchema,
  siteSettingsSchema,
} from './schemas'

function revalidateAdmin(path: string) {
  revalidatePath(path)
  revalidatePath('/admin')
}

export async function loginAction(formData: FormData) {
  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || headerList.get('x-real-ip') || 'local'
  const limited = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000)
  if (!limited.ok) return { error: 'Too many login attempts. Try again in 15 minutes.' }

  const parsed = loginSchema.safeParse({
    email: text(formData, 'email'),
    password: text(formData, 'password'),
  })
  if (!parsed.success) return fromZod(parsed.error)

  const user = await findStaffByEmail(parsed.data.email)
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return { error: 'Invalid email or password.' }
  }

  await createSession({ id: user.id, email: user.email, name: user.name, role: user.role })
  redirect(toastPath('/admin', 'Signed in'))
}

export async function logoutAction() {
  await destroySession()
  redirect(toastPath('/admin/login', 'Signed out'))
}

export async function saveProductCategory(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, 'id') || null
  try {
    const session = await requireAdmin()
    const parsed = categorySchema.safeParse({
      name: text(formData, 'name'),
      slug: text(formData, 'slug'),
      description: text(formData, 'description'),
      sortOrder: text(formData, 'sortOrder') || 0,
      active: checked(formData, 'active'),
    })
    if (!parsed.success) return fromZod(parsed.error)
    const record = id
      ? await prisma.productCategory.update({ where: { id }, data: parsed.data })
      : await prisma.productCategory.create({ data: parsed.data })
    await writeAudit(session.email, id ? 'update' : 'create', 'ProductCategory', record.id)
    revalidateAdmin('/admin/product-categories')
  } catch (error) {
    return fromUnknown(error)
  }
  redirect(toastPath('/admin/product-categories', id ? 'Category updated' : 'Category created'))
}

export async function deleteProductCategory(formData: FormData) {
  try {
    const session = await requireAdmin()
    const id = requireId(formData, 'Category')
    await assertProductCategoryDeletable(id)
    await prisma.productCategory.delete({ where: { id } })
    await writeAudit(session.email, 'delete', 'ProductCategory', id)
    revalidateAdmin('/admin/product-categories')
  } catch (error) {
    redirect(toastPath('/admin/product-categories', fromUnknown(error)?.error || 'Could not delete category', 'error'))
  }
  redirect(toastPath('/admin/product-categories', 'Category deleted'))
}

export async function saveProduct(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, 'id') || null
  try {
    const session = await requireAdmin()
    const parsed = productSchema.safeParse({
      name: text(formData, 'name'),
      slug: text(formData, 'slug'),
      articleNumber: text(formData, 'articleNumber'),
      application: text(formData, 'application'),
      categoryId: text(formData, 'categoryId'),
      packSizes: text(formData, 'packSizes'),
      imageUrl: text(formData, 'imageUrl'),
      shortDescription: text(formData, 'shortDescription'),
      description: text(formData, 'description'),
      benefits: text(formData, 'benefits'),
      approvals: text(formData, 'approvals'),
      applicationNotes: text(formData, 'applicationNotes'),
      featured: checked(formData, 'featured'),
      published: checked(formData, 'published'),
    })
    if (!parsed.success) return fromZod(parsed.error)
    const record = id
      ? await prisma.product.update({ where: { id }, data: parsed.data })
      : await prisma.product.create({ data: parsed.data })
    await writeAudit(session.email, id ? 'update' : 'create', 'Product', record.id)
    revalidateAdmin('/admin/products')
  } catch (error) {
    return fromUnknown(error)
  }
  redirect(toastPath('/admin/products', id ? 'Product updated' : 'Product created'))
}

export async function deleteProduct(formData: FormData) {
  try {
    const session = await requireAdmin()
    const id = requireId(formData, 'Product')
    await prisma.product.delete({ where: { id } })
    await writeAudit(session.email, 'delete', 'Product', id)
    revalidateAdmin('/admin/products')
  } catch (error) {
    redirect(toastPath('/admin/products', fromUnknown(error)?.error || 'Could not delete product', 'error'))
  }
  redirect(toastPath('/admin/products', 'Product deleted'))
}

export async function saveArticleCategory(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, 'id') || null
  try {
    const session = await requireAdmin()
    const parsed = articleCategorySchema.safeParse({
      name: text(formData, 'name'),
      slug: text(formData, 'slug'),
      active: checked(formData, 'active'),
    })
    if (!parsed.success) return fromZod(parsed.error)
    const record = id
      ? await prisma.articleCategory.update({ where: { id }, data: parsed.data })
      : await prisma.articleCategory.create({ data: parsed.data })
    await writeAudit(session.email, id ? 'update' : 'create', 'ArticleCategory', record.id)
    revalidateAdmin('/admin/article-categories')
  } catch (error) {
    return fromUnknown(error)
  }
  redirect(toastPath('/admin/article-categories', id ? 'Category updated' : 'Category created'))
}

export async function deleteArticleCategory(formData: FormData) {
  try {
    const session = await requireAdmin()
    const id = requireId(formData, 'Category')
    await assertArticleCategoryDeletable(id)
    await prisma.articleCategory.delete({ where: { id } })
    await writeAudit(session.email, 'delete', 'ArticleCategory', id)
    revalidateAdmin('/admin/article-categories')
  } catch (error) {
    redirect(toastPath('/admin/article-categories', fromUnknown(error)?.error || 'Could not delete category', 'error'))
  }
  redirect(toastPath('/admin/article-categories', 'Category deleted'))
}

export async function saveArticle(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, 'id') || null
  try {
    const session = await requireAdmin()
    const parsed = articleSchema.safeParse({
      title: text(formData, 'title'),
      slug: text(formData, 'slug'),
      excerpt: text(formData, 'excerpt'),
      body: text(formData, 'body'),
      author: text(formData, 'author') || 'Octagen',
      coverImageUrl: text(formData, 'coverImageUrl'),
      categoryId: text(formData, 'categoryId'),
      relatedProductIds: text(formData, 'relatedProductIds'),
      published: checked(formData, 'published'),
    })
    if (!parsed.success) return fromZod(parsed.error)
    const existing = id ? await prisma.article.findUnique({ where: { id } }) : null
    const data = {
      ...parsed.data,
      publishedAt: parsed.data.published ? existing?.publishedAt ?? new Date() : null,
    }
    const record = id
      ? await prisma.article.update({ where: { id }, data })
      : await prisma.article.create({ data })
    await writeAudit(session.email, id ? 'update' : 'create', 'Article', record.id)
    revalidateAdmin('/admin/articles')
  } catch (error) {
    return fromUnknown(error)
  }
  redirect(toastPath('/admin/articles', id ? 'Article updated' : 'Article created'))
}

export async function deleteArticle(formData: FormData) {
  try {
    const session = await requireAdmin()
    const id = requireId(formData, 'Article')
    await prisma.article.delete({ where: { id } })
    await writeAudit(session.email, 'delete', 'Article', id)
    revalidateAdmin('/admin/articles')
  } catch (error) {
    redirect(toastPath('/admin/articles', fromUnknown(error)?.error || 'Could not delete article', 'error'))
  }
  redirect(toastPath('/admin/articles', 'Article deleted'))
}

export async function updateInquiryStatus(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = text(formData, 'id')
  try {
    const session = await requireAdmin()
    if (!id) return { error: 'Inquiry id is required.' }
    const parsed = inquiryStatusSchema.safeParse({ status: text(formData, 'status') })
    if (!parsed.success) return fromZod(parsed.error)
    await prisma.inquiry.update({ where: { id }, data: parsed.data })
    await writeAudit(session.email, 'update', 'Inquiry', id)
    revalidateAdmin('/admin/inquiries')
  } catch (error) {
    return fromUnknown(error)
  }
  redirect(toastPath('/admin/inquiries', 'Inquiry status updated'))
}

export async function markInquiryRead(formData: FormData) {
  try {
    const session = await requireAdmin()
    const id = requireId(formData, 'Inquiry')
    const inquiry = await prisma.inquiry.findUnique({ where: { id } })
    if (inquiry?.status === 'NEW') {
      await prisma.inquiry.update({ where: { id }, data: { status: 'READ' } })
      await writeAudit(session.email, 'update', 'Inquiry', id)
      revalidateAdmin('/admin/inquiries')
    }
  } catch {
    // silent — list view still usable
  }
}

export async function deleteInquiry(formData: FormData) {
  try {
    const session = await requireAdmin()
    const id = requireId(formData, 'Inquiry')
    await prisma.inquiry.delete({ where: { id } })
    await writeAudit(session.email, 'delete', 'Inquiry', id)
    revalidateAdmin('/admin/inquiries')
  } catch (error) {
    redirect(toastPath('/admin/inquiries', fromUnknown(error)?.error || 'Could not delete inquiry', 'error'))
  }
  redirect(toastPath('/admin/inquiries', 'Inquiry deleted'))
}

export async function saveSiteSettings(_prev: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const session = await requireAdmin()
    const parsed = siteSettingsSchema.safeParse({
      homepage: {
        heroEyebrow: text(formData, 'heroEyebrow'),
        heroTitle: text(formData, 'heroTitle'),
        heroBody: text(formData, 'heroBody'),
        bannerNote: text(formData, 'bannerNote'),
      },
      aboutLiquiMoly: {
        title: text(formData, 'lmTitle'),
        body: text(formData, 'lmBody'),
      },
      aboutOctagen: {
        title: text(formData, 'octTitle'),
        body: text(formData, 'octBody'),
      },
      contact: {
        address: text(formData, 'address'),
        email: text(formData, 'email'),
        phone: text(formData, 'phone'),
        mapUrl: text(formData, 'mapUrl'),
      },
    })
    if (!parsed.success) return fromZod(parsed.error)
    await prisma.siteSetting.upsert({
      where: { id: 'site' },
      update: parsed.data,
      create: { id: 'site', ...parsed.data },
    })
    await writeAudit(session.email, 'update', 'SiteSetting', 'site')
    revalidateAdmin('/admin/settings')
  } catch (error) {
    return fromUnknown(error)
  }
  redirect(toastPath('/admin/settings', 'Site settings saved'))
}
