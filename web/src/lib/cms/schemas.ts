import { z } from 'zod'

const slug = z
  .string()
  .min(2, 'Slug must be at least 2 characters')
  .max(80, 'Slug is too long')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens')

function splitLines(value: unknown) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean)
  return String(value ?? '')
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(120),
})

const optionalUrl = z
  .string()
  .max(500)
  .optional()
  .default('')
  .refine((value) => !value || /^https?:\/\//i.test(value) || value.startsWith('/'), {
    message: 'Use an absolute http(s) URL or a site path starting with /',
  })

const externalUrl = z
  .string()
  .min(1, 'LIQUI MOLY URL is required')
  .max(500)
  .refine((value) => /^https?:\/\//i.test(value), {
    message: 'Enter a full http(s) URL to liqui-moly.com',
  })

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  slug,
  description: z.string().max(400, 'Description is too long').optional().default(''),
  vehiclePath: z.enum(['CAR', 'BIKE'], { message: 'Select Car or Bike path' }),
  sortOrder: z.coerce.number().int('Sort order must be a whole number').min(0).max(999).optional().default(0),
  active: z.boolean().optional().default(true),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters').max(120),
  slug,
  articleNumber: z.string().min(2, 'Article number is required').max(40),
  application: z.enum(['CAR', 'BIKE', 'BOTH'], { message: 'Select an application' }),
  categoryId: z.string().min(1, 'Select a category'),
  packSizes: z.preprocess(splitLines, z.array(z.string()).max(12, 'Too many pack sizes')),
  imageUrl: z.string().max(500).optional().default(''),
  shortDescription: z.string().max(400, 'Short description is too long').optional().default(''),
  description: z.string().max(8000, 'Description is too long').optional().default(''),
  benefits: z.preprocess(splitLines, z.array(z.string()).max(20)),
  approvals: z.preprocess(splitLines, z.array(z.string()).max(30)),
  applicationNotes: z.string().max(4000).optional().default(''),
  liquiMolyUrl: externalUrl,
  featured: z.boolean().optional().default(false),
  loved: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false),
})

export const marketingMediaSchema = z.object({
  type: z.enum(['IMAGE', 'VIDEO'], { message: 'Select image or video' }),
  src: z.string().min(1, 'Media source is required').max(500),
  poster: optionalUrl,
  title: z.string().min(2, 'Title must be at least 2 characters').max(120),
  caption: z.string().max(400, 'Caption is too long').optional().default(''),
  sortOrder: z.coerce.number().int().min(0).max(999).optional().default(0),
  published: z.boolean().optional().default(true),
})

export const marketingActivitySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(120),
  text: z.string().max(800, 'Text is too long').optional().default(''),
  imageUrl: z.string().max(500).optional().default(''),
  href: optionalUrl,
  sortOrder: z.coerce.number().int().min(0).max(999).optional().default(0),
  published: z.boolean().optional().default(true),
})
export const articleCategorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  slug,
  active: z.boolean().optional().default(true),
})

export const articleSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(160),
  slug,
  excerpt: z.string().max(400, 'Excerpt is too long').optional().default(''),
  body: z.string().max(20000, 'Body is too long').optional().default(''),
  author: z.string().max(80).optional().default('Octagen'),
  coverImageUrl: z.string().max(500).optional().default(''),
  categoryId: z.string().min(1, 'Select a category'),
  relatedProductIds: z.preprocess(splitLines, z.array(z.string()).max(12)),
  published: z.boolean().optional().default(false),
})

export const inquiryStatusSchema = z.object({
  status: z.enum(['NEW', 'READ', 'REPLIED', 'CLOSED'], { message: 'Select a valid status' }),
})

export const inquiryCreateSchema = z.object({
  type: z.enum(['GENERAL', 'WORKSHOP', 'BULK', 'PRODUCT_QUOTE']),
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional().default(''),
  company: z.string().max(120).optional().default(''),
  subject: z.string().max(160).optional().default(''),
  message: z.string().min(10).max(4000),
  productId: z.string().optional(),
})

export const siteSettingsSchema = z.object({
  homepage: z.object({
    heroEyebrow: z.string().min(2, 'Eyebrow is required').max(80),
    heroTitle: z.string().min(2, 'Title is required').max(160),
    heroBody: z.string().min(2, 'Body is required').max(600),
    bannerNote: z.string().max(200).optional().default(''),
  }),
  aboutLiquiMoly: z.object({
    title: z.string().min(2, 'Title is required').max(120),
    body: z.string().min(2, 'Body is required').max(8000),
  }),
  aboutOctagen: z.object({
    title: z.string().min(2, 'Title is required').max(120),
    body: z.string().min(2, 'Body is required').max(8000),
  }),
  contact: z.object({
    address: z.string().min(2, 'Address is required').max(300),
    email: z.string().email('Enter a valid contact email'),
    phone: z.string().max(80).optional().default(''),
    mapUrl: z.string().max(500).optional().default(''),
  }),
})
