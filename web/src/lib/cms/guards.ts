import { prisma } from '../db'
import { text } from './form'

export function requireId(formData: FormData, label = 'Record') {
  const id = text(formData, 'id')
  if (!id) throw new Error(`${label} id is required`)
  return id
}

export async function assertProductCategoryDeletable(id: string) {
  const linked = await prisma.product.count({ where: { categoryId: id } })
  if (linked > 0) {
    throw new Error('This category still has products. Move or delete them first.')
  }
}

export async function assertArticleCategoryDeletable(id: string) {
  const linked = await prisma.article.count({ where: { categoryId: id } })
  if (linked > 0) {
    throw new Error('This category still has articles. Move or delete them first.')
  }
}
