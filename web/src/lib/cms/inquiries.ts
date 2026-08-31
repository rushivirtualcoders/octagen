import { prisma } from '../db'
import { inquiryCreateSchema } from './schemas'

export async function createInquiry(input: unknown) {
  const parsed = inquiryCreateSchema.parse(input)
  const record = await prisma.inquiry.create({
    data: {
      type: parsed.type,
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      company: parsed.company,
      message: parsed.message,
      productId: parsed.productId || null,
    },
  })
  return record.id
}
